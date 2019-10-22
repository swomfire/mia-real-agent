import React from 'react';
import { REPLY_TYPE } from '../../../common/enums';
import {
  TicketStatusUpdateMessages, UserActionMessages, BotMessages,
  SenderMessages, TicketRatingMessages, ReceiverMessages, WarningMessages,
} from '../ChatItem';
import { combineChat, isAgent } from '../../utils/func-utils';

export const conversationTranscript = (messages) => {
  const textMessages = combineChat(messages).map((message) => {
    const {
      _id, type, params, sentAt,
      from: ownerMessage, contents,
    } = message;
    switch (type) {
      case REPLY_TYPE.TICKET_STATUS:
        return <TicketStatusUpdateMessages msgId={_id} params={params} sentAt={sentAt} />;

      case REPLY_TYPE.USER_ACTION:
        return <UserActionMessages msgId={_id} user={ownerMessage} params={params} sentAt={sentAt} />;
      case REPLY_TYPE.BOT_RESPONSE:
        return <BotMessages msgId={_id} contents={contents} />;
      case REPLY_TYPE.USER_NORMAL: {
        const { role } = ownerMessage;
        if (isAgent(role)) {
          return <SenderMessages msgId={_id} contents={contents} />;
        }
        return <ReceiverMessages msgId={_id} contents={contents} user={ownerMessage} />;
      }
      case REPLY_TYPE.RATING_ACTION:
        return <TicketRatingMessages msgId={_id} user={ownerMessage} params={params} sentAt={sentAt} />;
      case REPLY_TYPE.WARNING_ACTION:
        return <WarningMessages msgId={_id} user={ownerMessage} contents={contents} sentAt={sentAt} />;
      default: return null;
    }
  });
  return textMessages;
};
