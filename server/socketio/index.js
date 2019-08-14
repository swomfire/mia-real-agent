import createSocketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import Logger from '../logger';
import AgentQueue from '../modules/queue/agentQueue';
import TicketService from '../modules/ticket/ticket.service';
import { register, unregister } from '../modules/chat/chat.socket';
import DisconnectQueue from '../modules/queue/disconnectQueue';
import { closeTicketTimeOut } from './timer';
import ConversationRoomQueue from '../modules/queue/conversationRoomQueue';
import { isAgent } from '../../app/utils/func-utils';
import { SOCKET_EMIT } from '../../common/enums';

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
          unregister(id.toString(), socket);
          if (isAgent(role)) {
            AgentQueue.removeBySocket(socketId);
          }
          // if user/agent goes offline
          TicketService.handleTicketOffline(user);
          const timer = closeTicketTimeOut(user);
          DisconnectQueue.addTimer(timer, id);
          ConversationRoomQueue.userDisconnect(id);
        });
        connected[socketId] = socket;
        DisconnectQueue.destroyTimer(id);
        if (isAgent(role)) {
          Logger.info(`[Socket.io]: The Mercenary [${email}] has join the fray`);
          const { _doc } = user;
          AgentQueue.add({ ..._doc, socketId });
        } else {
          Logger.info(`[Socket.io]: The Foul [${email}] has join the fray`);
        }
        register(id.toString(), socket);
        const tickets = await TicketService.handleTicketOnline(user);
        const conversations = tickets.map(({ conversationId }) => conversationId);
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

export const getSocketByUser = (user) => {
  const { socketId } = user;
  const { connected } = socketIO.sockets;
  return connected[socketId];
};

export default SocketIOServer;
