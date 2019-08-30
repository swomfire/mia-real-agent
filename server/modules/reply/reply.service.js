/* eslint-disable import/no-cycle */
import ReplyCollection from './reply.model';
import BaseService from '../base/base.service';
import { REPLY_TYPE } from '../../../common/enums';
import ConversationRoomQueue from '../queue/conversationRoomQueue';
import AdminQueue from '../queue/adminQueue';
import TicketService from '../ticket/ticket.service';

class ReplyService extends BaseService {
  constructor() {
    super(ReplyCollection);
    this.handleReplyInsert(ReplyCollection);
  }

  getByConversation(conversationId) {
    const replies = this.collection.find({
      conversationId,
    })
      .populate({ path: 'from', select: ['_id', 'profile', 'role', 'username'] })
      .exec();
    return replies;
  }


  getByConversationForTranscript(conversationId) {
    const replies = this.collection.find({
      conversationId,
    }).populate({
      path: 'from', select: ['profile'],
    }).sort({ createdAt: 1 }).exec();
    return replies;
  }

  async logUserAction(conversationId, userId, action) {
    const reply = {
      type: REPLY_TYPE.USER_ACTION,
      conversationId,
      from: userId,
      messages: 'User Action', // miaReply.message
      params: {
        action,
      },
    };
    this.insert(reply);
  }

  handleReplyInsert(collection) {
    collection.watch([
      { $match: { operationType: 'insert' } },
    ]).on('change', async (data) => {
      const { fullDocument } = data;
      const { _id, conversationId, type } = fullDocument;
      if (type === REPLY_TYPE.WARNING_ACTION) {
        const { _id: ticketId } = await TicketService.getByCondition({
          conversationId,
        });
        AdminQueue.sendWarningMessage(ticketId);
      } else {
        const reply = await this.collection.findOne({
          _id,
        })
          .populate({ path: 'from', select: ['_id', 'profile', 'role', 'username'] });
        ConversationRoomQueue.conversationNewMessage(conversationId, reply);
      }
    });
  }
}

export default new ReplyService();
