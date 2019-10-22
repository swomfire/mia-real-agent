import httpStatus from 'http-status';
import _get from 'lodash/get';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import BaseController from '../base/base.controller';
import ConversationService from './conversation.service';
import ReplyService from '../reply/reply.service';
import { CONVERSATION_TYPE, CONVERSATION_STATUS, REPLY_USER_ACTION } from '../../../common/enums';

class ConversationController extends BaseController {
  constructor() {
    super(ConversationService);
    this.getAll = this.getAll.bind(this);
    this.getReplyMessages = this.getReplyMessages.bind(this);
    this.getAllOpenSupport = this.getAllOpenSupport.bind(this);
    this.requestEndSupport = this.requestEndSupport.bind(this);
    this.confirmEndSupport = this.confirmEndSupport.bind(this);
  }

  async getReplyMessages(req, res) {
    try {
      const { id } = req.params;
      const replyMessages = await ReplyService.getByConversation(id);

      return res.status(httpStatus.OK).send(replyMessages);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async requestEndSupport(req, res) {
    try {
      const {
        status,
      } = req.body;
      const { user, model: conversation } = req;
      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      if (!conversation) {
        throw new APIError(ERROR_MESSAGE.CONTENT_NOT_FOUND);
      }
      const { _id: conversationId } = conversation;
      const { _id: userId } = user;
      ReplyService.logUserAction(conversationId, userId, REPLY_USER_ACTION.REQUEST_END);

      await this.service.requestEndSupport(conversationId, status);
      return res.status(httpStatus.OK).send({
        conversationId,
      });
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async confirmEndSupport(req, res) {
    try {
      const {
        status,
      } = req.body;
      const { user, model: conversation } = req;
      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      if (!conversation) {
        throw new APIError(ERROR_MESSAGE.CONTENT_NOT_FOUND);
      }

      const { _id: conversationId } = conversation;
      const { _id: userId } = user;
      await this.service.confirmEndSupport(conversationId, status);
      ReplyService.logUserAction(conversationId, userId, REPLY_USER_ACTION.CONFIRM_REQUEST);
      return res.status(httpStatus.OK).send({
        conversationId,
      });
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async getAllOpenSupport(req, res) {
    try {
      const {
        user,
      } = req;

      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      const { _id: member } = user;
      const condition = {
        type: CONVERSATION_TYPE.SUPPORT,
        status: CONVERSATION_STATUS.OPEN,
        members: {
          $elemMatch: {
            member,
          },
        },
      };

      const { result } = await this.service.getAll(condition);
      const total = await this.service.countDocument(condition);

      return res.status(httpStatus.OK).send({
        result,
        total,
      });
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async getAll(req, res) {
    try {
      const {
        user,
        query: {
          skip, limit, sort, ...params
        },
      } = req;

      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      const { _id: owner } = user;
      const condition = { owner };

      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = sortObj;
      }

      const query = JSON.parse(_get(params, 'query', '{}'));
      const newQuery = {
        ...query,
        ...condition,
      };

      const { result } = await this.service.getAll(newQuery, option);
      const total = await this.service.countDocument(condition);

      return res.status(httpStatus.OK).send({
        result,
        total,
      });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new ConversationController();
