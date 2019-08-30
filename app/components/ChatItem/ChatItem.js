import React from 'react';
import moment from 'moment';
import { Tooltip, Icon } from 'antd';
import {
  MessageBoxItem, MessageText,
  UserMessage, ProfileImageStyled,
  MessageBoxSystemNotification, LineDivider,
  MessageBoxItemIsTyping, IsTypingWrapper,
  TicketActionStatus, UserAction, TicketActionStatusTitle,
  TicketRatingScore, CommentWrapper, UserWarning, UserLabelWarning,
} from './styles';
import { ROLES } from '../../../common/enums';
import { toI18n, isAgent } from '../../utils/func-utils';

const renderTime = (time) => {
  if (moment().diff(time, 'days') === 0) {
    return moment(time).format('hh:mm');
  }
  if (moment().diff(time, 'weeks') === 0) {
    return moment(time).format('dddd hh:mm');
  }
  if (moment().diff(time, 'months') === 0) {
    return moment(time).format('MMMM D hh:mm');
  }
  return moment(time).format('MMMM D hh:mm YYYY');
};


export const userChat = (msgId, contents, isPending = false) => (
  <MessageBoxItem right key={msgId}>
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="right" title={renderTime(sentAt)}>
          <UserMessage key={_id} pending={isPending}>
            {messages}
          </UserMessage>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const otherChat = (msgId, contents, avatar) => (
  <MessageBoxItem left key={msgId}>
    <ProfileImageStyled
      src={avatar}
    />
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="left" title={renderTime(sentAt)}>
          <p key={_id}>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const botChat = (msgId, contents) => (
  <MessageBoxItem left key={msgId}>
    <ProfileImageStyled
      src="/assets/images/mia-avatar.jpg"
    />
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="left" title={renderTime(sentAt)}>
          <p key={_id}>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const otherTyping = messages => (
  <MessageBoxItemIsTyping left key="UserTyping">
    <ProfileImageStyled
      src="/assets/images/user-live.jpeg"
    />
    <MessageText>
      <p>{messages.trim()}</p>
      <IsTypingWrapper />
    </MessageText>
  </MessageBoxItemIsTyping>
);

export const ticketStatus = (msgId, params, sentAt) => {
  const { status } = params;
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {toI18n('CONV_MESSAGE_BOX_TICKET_CHANGED_TO')}
        <TicketActionStatus status={status} />
        <TicketActionStatusTitle status={status}>{status}</TicketActionStatusTitle>
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};

export const userAction = (msgId, from, params, sentAt) => {
  const { action } = params;
  let messageOwner = '';
  // eslint-disable-next-line no-underscore-dangle
  const { role, profile = {} } = from;
  const { firstName, lastName, company = 'N/A' } = profile;
  switch (role) {
    case ROLES.INDIVIDUAL:
      messageOwner = `${firstName} ${lastName}`;
      break;
    case ROLES.BUSINESS:
      messageOwner = company;
      break;
    default:
      messageOwner = `${firstName} ${lastName}`;
      break;
  }
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {
          `${messageOwner} `
        }
        {toI18n('CONV_MESSAGE_BOX_USER_IS')}
        {' '}
        <UserAction action={action}>{action}</UserAction>
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};

export const warningAction = (msgId, from, contents, sentAt) => {
  let messageOwner = '';
  // eslint-disable-next-line no-underscore-dangle
  const { role, profile = {} } = from;
  console.log(from);
  const { firstName, lastName, company = 'N/A' } = profile;
  switch (role) {
    case ROLES.INDIVIDUAL:
      messageOwner = `${firstName} ${lastName}`;
      break;
    case ROLES.BUSINESS:
      messageOwner = company;
      break;
    default:
      messageOwner = `${firstName} ${lastName}`;
      break;
  }
  if (isAgent(from.role)) {
    return (
      <MessageBoxItem left key={msgId}>
        <MessageText>
          {
            contents.map(({ _id, messages }) => (
              <Tooltip placement="left" title={renderTime(sentAt)}>
                <UserLabelWarning>
                  {messageOwner}
                </UserLabelWarning>
                <p key={_id}>
                  {messages}
                </p>
              </Tooltip>
            ))
          }
        </MessageText>
      </MessageBoxItem>
    );
  }
  return (
    <MessageBoxItem right key={msgId}>
      <MessageText>
        {contents.map(({ _id, messages }) => (
          <Tooltip placement="right" title={renderTime(sentAt)}>
            <UserLabelWarning user>
              {messageOwner}
            </UserLabelWarning>
            <UserMessage key={_id}>
              {messages}
            </UserMessage>
          </Tooltip>
        ))
        }
      </MessageText>
    </MessageBoxItem>
  );
};

export const ticketRating = (msgId, from, params, sentAt) => {
  const { score, comment } = params;
  const { role, profile = {} } = from;
  const { firstName, lastName, company = 'N/A' } = profile;
  let messageOwner = '';
  switch (role) {
    case ROLES.INDIVIDUAL:
      messageOwner = `${firstName} ${lastName}`;
      break;
    default:
      messageOwner = company;
      break;
  }
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {
          `${messageOwner} `
        }
        {toI18n('CONV_MESSAGE_BOX_TICKET_RATING')}
        <TicketRatingScore>
          {Array(...Array(Math.floor(score))).map(() => (
            <Icon type="star" theme="filled" />
          ))}
        </TicketRatingScore>
        {toI18n('CONV_MESSAGE_BOX_TICKET_RATING_COMMENT')}
        {' '}
        <CommentWrapper>
          {comment}
        </CommentWrapper>
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};
