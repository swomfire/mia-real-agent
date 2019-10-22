import _isEmpty from 'lodash/isEmpty';
import { SOCKET_EMIT } from '../../../common/enums';

// Dump data
// [conversationId]: {
//  [userId1]: socket1,
//  [userId2]: socket2,
// }

/* eslint-disable no-underscore-dangle */
class ConversationRoomQueue {
  _queue = {}

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  getRoom = conversationId => this.queue[conversationId];

  observeUserTypingMessage = (conversationId, userId, messages) => {
    const room = this.getRoom(conversationId) || {};
    if (!_isEmpty(room)) {
      const { [userId]: _, ...otherUser } = room;
      if (otherUser) {
        Object.keys(otherUser).forEach((otherUserId) => {
          const otherSocket = room[otherUserId];
          otherSocket.emit(SOCKET_EMIT.RECEIVE_USER_TYPING, { conversationId, userId, messages });
        });
      }
    }
  }

  newUser = (conversationId, userId, socket) => {
    const room = this.getRoom(conversationId) || {};
    this.queue = {
      ...this.queue,
      [conversationId]: {
        ...room,
        [userId]: socket,
      },
    };
  }

  removeUser = (userId) => {
    Object.keys(this.queue).forEach(
      (conversationId) => {
        const room = this.getRoom(conversationId);
        if (!_isEmpty(room[userId])) {
          const { [userId]: _, ...otherUser } = room;
          if (!_isEmpty(otherUser)) {
            this.queue[conversationId] = otherUser;
            Object.keys(room).forEach((otherUserId) => {
              const otherSocket = room[otherUserId];
              otherSocket.emit(SOCKET_EMIT.OTHER_LEFT_ROOM, { conversationId, userId });
            });
          } else {
            const { [conversationId]: removeConversation, ...rest } = this.queue;
            this.queue = rest;
          }
        }
      }
    );
  }

  userOnline = (userId, conversations = []) => {
    conversations.forEach(
      (conversationId) => {
        const room = this.getRoom(conversationId);
        if (!_isEmpty(room)) {
          const { [userId]: _, ...otherUser } = room;
          if (!_isEmpty(otherUser)) {
            Object.keys(room).forEach((otherUserId) => {
              const otherSocket = room[otherUserId];
              otherSocket.emit(SOCKET_EMIT.USER_ONLINE, { conversationId, userId });
            });
          }
        }
      }
    );
  }

  userDisconnect = (userId) => {
    Object.keys(this.queue).forEach(
      (conversationId) => {
        const room = this.getRoom(conversationId);
        if (!_isEmpty(room[userId])) {
          const { [userId]: _, ...otherUser } = room;
          if (!_isEmpty(otherUser)) {
            this.queue[conversationId] = otherUser;
            Object.keys(room).forEach((otherUserId) => {
              const otherSocket = room[otherUserId];
              otherSocket.emit(SOCKET_EMIT.USER_OFFLINE, { conversationId, userId });
            });
          } else {
            const { [conversationId]: removeConversation, ...rest } = this.queue;
            this.queue = rest;
          }
        }
      }
    );
  }

  removeConversationById = (conversationId) => {
    const room = this.getRoom(conversationId);
    if (_isEmpty(room)) {
      return;
    }
    const { [conversationId]: removeConversation, ...rest } = this.queue;
    this.queue = rest;
  }

  sendConfirmEndSupportRequest = (conversationId, userId, status) => {
    const room = this.getRoom(conversationId);
    if (_isEmpty(room)) {
      return;
    }
    const socket = room[userId];
    if (socket) {
      socket.emit(SOCKET_EMIT.REQUEST_SUPPORT_END, { conversationId, status });
    }
  }

  sendEndSupport = (conversationId, status) => {
    const room = this.getRoom(conversationId);
    if (_isEmpty(room)) {
      return;
    }
    Object.keys(room).forEach((userId) => {
      const socket = room[userId];
      if (socket) {
        socket.emit(SOCKET_EMIT.CONFIRM_END_SUPPORT, { conversationId, status });
      }
    });
  }

  removeUserFromConversation = (conversationId, userId) => {
    const room = this.getRoom(conversationId);
    if (_isEmpty(room)) {
      return;
    }
    const { [userId]: _, ...otherUser } = room;
    if (_isEmpty(otherUser)) {
      const { [conversationId]: removeConversation, ...rest } = this.queue;
      this.queue = rest;
    }
  }

  ticketUpdateNotification = (conversationId, ticketId) => {
    const room = this.getRoom(conversationId) || {};
    if (!_isEmpty(room)) {
      Object.keys(room).forEach((userId) => {
        const otherSocket = room[userId];
        otherSocket.emit(SOCKET_EMIT.TICKET_UPDATE, { ticketId });
      });
    }
  }

  conversationNewMessage = (conversationId, reply) => {
    const room = this.getRoom(conversationId) || {};
    if (!_isEmpty(room)) {
      Object.keys(room).forEach((userId) => {
        const otherSocket = room[userId];
        otherSocket.emit(SOCKET_EMIT.NEW_MESSAGE, { conversationId, reply });
      });
    }
  }
}

// eslint-disable-next-line import/no-mutable-exports
let conversationRoomQueue = null;

if (!conversationRoomQueue) {
  conversationRoomQueue = new ConversationRoomQueue();
}

export default conversationRoomQueue;
