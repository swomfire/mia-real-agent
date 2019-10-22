import createSocketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import Logger from '../logger';
import AgentQueue from '../modules/queue/agentQueue';
import TicketService from '../modules/ticket/ticket.service';
import DisconnectQueue from '../modules/queue/disconnectQueue';
import { closeTicketTimeOut } from './timer';
import ConversationRoomQueue from '../modules/queue/conversationRoomQueue';
import { isAgent } from '../../app/utils/func-utils';
import { SOCKET_EMIT, REPLY_USER_ACTION, ROLES } from '../../common/enums';
import ReplyService from '../modules/reply/reply.service';
import UserQueue from '../modules/queue/userQueue';
import AdminQueue from '../modules/queue/adminQueue';

const ACTION_MESSAGE = 'ACTION_MESSAGE';
let socketIO;
class SocketIOServer {
  constructor(authenticate) {
    this.authenticate = authenticate;
  }

  connect(server) {
    socketIO = createSocketIO(server, {
      path: '/chat',
    });
    this.setUpSocket();
    return socketIO;
  }

  emitActionMessage(action) {
    socketIO.emit(ACTION_MESSAGE, action);
  }

  setUpSocket = () => {
    socketIO
      .on('connection',
        socketioJwt.authorize({
          secret: process.env.SECRET_KEY_JWT,
          timeout: 15000, // 15 seconds to send the authentication message
        }))
      .on('authenticated', async (socket) => {
        this.setUpConversationRoom(socket);
        const { data: user } = await this.authenticate(socket);
        if (!user) {
          // HMR error
          Logger.warning('[Socket.io]: An invalid foul! Disconnecting...');
          socket.disconnect();
          return;
        }
        const { email, role, _id: id } = user;
        const { connected } = socketIO.sockets;
        const { id: socketId } = socket.conn;

        socket.on('disconnect', async () => {
          Logger.info(`[Socket.io]: The foul [${email}] has exit the fray`);
          if (isAgent(role)) {
            AgentQueue.removeBySocket(socketId);
          } else if (role === ROLES.ADMIN) {
            AdminQueue.removeBySocket(socketId);
          } else {
            UserQueue.removeUser(id);
          }
          // if user/agent goes offline
          const tickets = await TicketService.handleTicketOffline(user);
          tickets.forEach(({ conversationId }) => {
            ReplyService.logUserAction(conversationId, id, REPLY_USER_ACTION.OFFLINE);
            return conversationId;
          });
          const timer = closeTicketTimeOut(user);
          DisconnectQueue.addTimer(timer, id);
          ConversationRoomQueue.userDisconnect(id);
        });

        // Handle user/agent online
        connected[socketId] = socket;
        DisconnectQueue.destroyTimer(id);
        const { _doc } = user;
        if (isAgent(role)) {
          Logger.info(`[Socket.io]: The Mercenary [${email}] has join the fray`);
          AgentQueue.add({ ..._doc, socketId });
        } else if (role === ROLES.ADMIN) {
          Logger.info(`[Socket.io]: The Lord [${email}] has join the fray`);
          AdminQueue.add({ ..._doc, socketId });
        } else {
          UserQueue.addUser(id, socket);
          Logger.info(`[Socket.io]: The Foul [${email}] has join the fray`);
        }
        const tickets = await TicketService.handleTicketOnline(user);
        const conversations = tickets.map(({ conversationId }) => {
          ReplyService.logUserAction(conversationId, id, REPLY_USER_ACTION.ONLINE);
          return conversationId;
        });
        ConversationRoomQueue.userOnline(id, conversations);
      });
  }

  setUpConversationRoom = (socket) => {
    socket.on(SOCKET_EMIT.JOIN_CONVERSATION, async ({ conversationId, userId }) => {
      ConversationRoomQueue.newUser(conversationId, userId, socket);
    });

    socket.on(SOCKET_EMIT.LEFT_CONVERSATION, async ({ conversationId, userId }) => {
      ConversationRoomQueue.removeUserFromConversation(conversationId, userId);
    });

    socket.on(SOCKET_EMIT.USER_TYPING, async ({ conversationId, userId, messages }) => {
      ConversationRoomQueue.observeUserTypingMessage(conversationId, userId, messages);
    });
  }
}

export const getSocketByUser = (user = {}) => {
  const { socketId } = user;
  const { connected } = socketIO.sockets;
  return connected[socketId];
};

export default SocketIOServer;
