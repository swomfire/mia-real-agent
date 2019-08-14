import httpStatus from 'http-status';
import axios from 'axios';
import BaseController from '../base/base.controller';
import ReplyService from './reply.service';
import { emitNewMessage } from '../chat/chat.socket';
import Logger from '../../logger';
import IdleQueue from '../queue/idleQueue';
import ConversationService from '../conversation/conversation.service';
import TicketService from '../ticket/ticket.service';
import { TICKET_STATUS, SOCKET_EMIT } from '../../../common/enums';
import { checkContext } from './reply.utils';
import { getSocketByUser } from '../../socketio';
import userQueue from '../queue/userQueue';

class ReplyController extends BaseController {
  constructor() {
    super(ReplyService);
    this.insertReply = this.insertReply.bind(this);
    this.getResponseFromMia = this.getResponseFromMia.bind(this);
  }

  async getResponseFromMia(userReply, ticketId) {
    const { WEBHOOK_ENDPOINT } = process.env;
    if (!WEBHOOK_ENDPOINT) {
      Logger.error('WEBHOOK_ENDPOINT not found');
      return;
    }
    try {
      const { messages, conversationId, from } = userReply;
      const response = await axios.post(`${WEBHOOK_ENDPOINT}/api/chats/dialog`, { content: messages });
      const { data: miaReply } = response;

      // Get mia full fillment text
      const { data: { queryResult } } = miaReply;
      const { fulfillmentText, outputContexts } = queryResult;
      if (checkContext(outputContexts)) {
        const socket = userQueue.getUser(from);
        socket.emit(SOCKET_EMIT.FOUND_SOLUTION, { conversationId });
      }

      const reply = {
        conversationId,
        from: null,
        messages: `Mia: "${fulfillmentText}"`, // miaReply.message
      };

      const newReplyMetadata = {
        from: 'MIA',
        to: from,
        message: 'Message from mia', // miaReply.message
        conversation: conversationId,
      };

      const newReply = await this.service.insert(reply);
      emitNewMessage({ ...newReplyMetadata, ticketId }, newReply);
    } catch (error) {
      Logger.error('Error while trying to fetch response from mia', error);
    }
  }

  async insertReply(req, res) {
    try {
      const userReply = req.body;
      const { conversationId, from, messages } = userReply;
      const reply = {
        conversationId,
        from,
        messages,
      };
      const newReply = await this.service.insert(reply);
      const { ticketId } = await ConversationService.getOneByQuery({ _id: conversationId });
      IdleQueue.resetTimer(ticketId);
      if (userReply.to) {
        emitNewMessage({ ...userReply, ticketId }, newReply);
        TicketService.update(ticketId, { status: TICKET_STATUS.PROCESSING });
      } else {
        setTimeout(() => this.getResponseFromMia(userReply, ticketId), 0);
      }


      return res.status(httpStatus.OK).send({ reply: newReply });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new ReplyController();
