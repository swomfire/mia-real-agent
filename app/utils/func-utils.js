import moment from 'moment';
import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import _eq from 'lodash/eq';
import { Trans } from 'react-i18next';
import { ROLES, REPLY_TYPE } from '../../common/enums';

export const combineChat = (replyMessages = []) => {
  const combined = [];
  replyMessages.sort(({ sentAt: a }, { sentAt: b }) => compareDate(a, b)).forEach((message) => {
    const {
      _id, from, type, params,
      messages, sentAt,
    } = message;
    if (type === REPLY_TYPE.TICKET_STATUS
      || type === REPLY_TYPE.USER_ACTION
      || type === REPLY_TYPE.RATING_ACTION
    ) {
      combined.push({
        _id: combined.length, type, from, params, sentAt,
      });
      return;
    }
    if (combined.length > 0) {
      const lastCombined = combined[combined.length - 1];
      const { from: last, contents = [], type: lastType } = lastCombined;
      if (lastType === REPLY_TYPE.TICKET_STATUS || lastType === REPLY_TYPE.USER_ACTION) {
        combined.push({
          _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
        });
        return;
      }
      if (_eq(last, from)) {
        combined[combined.length - 1] = {
          ...lastCombined,
          contents: contents.concat({ _id, messages, sentAt }),
        };
      } else {
        combined.push({
          _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
        });
      }
    } else {
      combined.push({
        _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
      });
    }
  });
  return combined;
};

export function getSkipLimit(pageIndex, sizePerPage) {
  const skip = (pageIndex - 1) * sizePerPage;
  const limit = sizePerPage;
  return { skip, limit };
}

export function compareDate(a, b) {
  return moment(a).diff(moment(b));
}

export function isAgent(role) {
  return role === ROLES.FREELANCER || role === ROLES.DEDICATED;
}

export function shouldShowSystemMessage(systemMessage, currentConversationId) {
  if (_isEmpty(systemMessage)) {
    return false;
  }
  const { message, conversationId } = systemMessage;
  if (_isEmpty(message) || currentConversationId !== conversationId) {
    return false;
  }
  return true;
}

export const toI18n = key => (
  <Trans i18nKey={key} />
);
