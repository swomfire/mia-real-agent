// eslint-disable-next-line import/no-cycle
import { getSocketByUser } from '../../socketio';
import { SOCKET_EMIT } from '../../../common/enums';

class AdminQueue {
  queue = []

  get = () => this.queue;

  getAdmin = adminId => this.queue.find(({ _id }) => adminId === _id);

  add = (admin) => {
    this.queue = this.queue.concat(admin);
  };

  remove = (admin) => {
    const { queue } = this;
    const { _id } = admin;
    this.queue = queue.filter(({ _id: removeAdminId }) => _id !== removeAdminId);
  };

  removeBySocket = (socketId) => {
    const { queue } = this;
    this.queue = queue.filter(({ socketId: removeSocketId }) => removeSocketId !== socketId);
  }

  sendWarningMessage = (ticketId, conversationId) => {
    this.queue.forEach(({ socketId }) => {
      const socket = getSocketByUser({ socketId });
      socket.emit(SOCKET_EMIT.TICKET_WARNING, { ticketId, conversationId });
    });
  }
}

// eslint-disable-next-line import/no-mutable-exports
let adminQueue = null;

if (!adminQueue) {
  adminQueue = new AdminQueue();
}

export default adminQueue;
