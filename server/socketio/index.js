import createSocketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import Logger from '../logger';
import AgentQueue from '../modules/queue/agentQueue';
import { ROLES } from '../../common/enums';
import { register, unregister } from '../modules/chat/chat.socket';

const ACTION_MESSAGE = 'ACTION_MESSAGE';

class SocketIOServer {
  constructor(authenticate) {
    this.authenticate = authenticate;
  }

  connect(server) {
    const socketIO = createSocketIO(server, {
      path: '/chat',
    });
    socketIO
      .on('connection',
        socketioJwt.authorize({
          secret: process.env.SECRET_KEY_JWT,
          timeout: 15000, // 15 seconds to send the authentication message
        }))
      .on('authenticated', async (socket) => {
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
          Logger.info('[Socket.io]: The foul has exit the fray');
          unregister(id.toString(), socket);
          AgentQueue.remove(user);
        });

        Logger.info(`[Socket.io]: The foul [${email}] has join the fray`);
        register(id.toString(), socket);
        connected[socketId] = socket;
        if (role === ROLES.AGENT) {
          Logger.info(`[Socket.io]: The foul [${email}] has upgraded to a magical agent`);
          AgentQueue.add(user);
        }
      });
    this.socketIO = socketIO;
    return socketIO;
  }

  emitActionMessage(action) {
    this.socketIO.emit(ACTION_MESSAGE, action);
  }
}

export default SocketIOServer;
