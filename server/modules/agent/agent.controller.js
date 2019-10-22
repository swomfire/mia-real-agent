import httpStatus from 'http-status';
import { TICKET_STATUS, SOCKET_EMIT, REPLY_USER_ACTION, CONVERSATION_TYPE } from '../../../common/enums';
import TicketService from '../ticket/ticket.service';
import ConversationService from '../conversation/conversation.service';
import AgentQueue from '../queue/agentQueue';
import UserQueue from '../queue/userQueue';
import IdleQueue from '../queue/idleQueue';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import RequestQueue from '../queue/requestQueue';
import SupportQueue from '../queue/supportQueue';
import ReplyService from '../reply/reply.service';
import { getHistoryTicketUpdate } from '../../utils/utils';
import { getSocketByUser } from '../../socketio';
import BaseController from '../base/base.controller';

class AgentController extends BaseController {
  constructor() {
    super();
    this.acceptRequest = this.acceptRequest.bind(this);
  }

  async acceptRequest(req, res) {
    try {
      const { user: agent } = req;
      const { ticketId, conversationId, isConfirm } = req.body;
      const [ticket, conversation] = await Promise.all([
        TicketService.get(ticketId),
        ConversationService.get(conversationId),
      ]);
      // eslint-disable-next-line no-underscore-dangle
      const agentId = agent._id;

      if (
        !ticket
        || !conversation
      ) {
        throw new APIError(ERROR_MESSAGE.BAD_REQUEST, httpStatus.BAD_REQUEST);
      }

      if (ticket.status !== TICKET_STATUS.PENDING) {
        return res.status(httpStatus.BAD_REQUEST).send();
      }
      if (isConfirm) {
        AgentQueue.remove(agentId);
        // update assign and members for tickets and conversations
        ticket.assignee = agentId;
        ticket.status = TICKET_STATUS.PROCESSING;
        const { history } = ticket;
        const oldHistory = history.map(h => h.toJSON());
        const newHistory = getHistoryTicketUpdate(oldHistory, TICKET_STATUS.PROCESSING);
        ticket.history = newHistory;
        if (conversation.members) {
          const agentIdStr = agentId.toString();
          const shouldAdd = !conversation.members.some(member => member.toString() === agentIdStr);

          if (shouldAdd) conversation.members.push({ member: agentId });
        } else {
          conversation.members = [{ member: agentId }];
        }
        await Promise.all([
          ticket.save(),
          conversation.save(),
        ]);
        const { owner } = ticket;
        const ownerSocket = UserQueue.getUser(owner);
        if (ownerSocket) {
          ownerSocket.emit(SOCKET_EMIT.REQUEST_CONFIRM, {
            isConfirm,
            ticketId,
          });
        }
        RequestQueue.acceptRequest(ticketId);
        IdleQueue.addTimer(ticketId);
        ReplyService.logUserAction(conversationId, agentId, REPLY_USER_ACTION.ACCEPT_REQUEST);
      }
      return res.status(httpStatus.OK).send();
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async acceptSupportRequest(req, res) {
    try {
      const { user: agent } = req;
      const { ticketId, isConfirm } = req.body;
      const ticket = await TicketService.get(ticketId);
      // eslint-disable-next-line no-underscore-dangle
      const agentId = agent._id;
      if (
        !ticket
      ) {
        throw new APIError(ERROR_MESSAGE.BAD_REQUEST, httpStatus.BAD_REQUEST);
      }
      if (isConfirm) {
        // update assign and members for tickets and conversations
        const { assignee } = ticket;
        const conversation = await ConversationService.insert({
          type: CONVERSATION_TYPE.SUPPORT,
          ticketId,
          owner: assignee,
          members: [{ member: assignee }, { member: agentId }],
        });
        const { _id: conversationId } = conversation;
        ticket.supportConversationId = conversationId;
        await Promise.all([
          ticket.save(),
          conversation.save(),
        ]);
        const agentInQueue = AgentQueue.getAgent(assignee);
        const assigneeSocket = getSocketByUser(agentInQueue);
        if (assigneeSocket) {
          assigneeSocket.emit(SOCKET_EMIT.REQUEST_SUPPORT_CONFIRM, {
            ticketId,
            conversationId,
          });
        }
        SupportQueue.acceptRequest(ticketId);
      }
      return res.status(httpStatus.OK).send();
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new AgentController();
