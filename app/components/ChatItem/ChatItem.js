/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment';
import { Tooltip, Icon } from 'antd';
import {
  string, arrayOf, shape, bool,
} from 'prop-types';
import {
  MessageBoxItem, MessageText,
  UserMessage, ProfileImageStyled,
  MessageBoxSystemNotification, LineDivider,
  MessageBoxItemIsTyping, IsTypingWrapper,
  TicketActionStatus, UserAction, TicketActionStatusTitle,
  TicketRatingScore, CommentWrapper, UserLabelWarning, MessageActionText,
} from './styles';
import { ROLES, BOT_AVATAR, DEFAULT_USER_AVATAR } from '../../../common/enums';
import { toI18n, isAgent } from '../../utils/func-utils';
import { ButtonTransparent } from '../../stylesheets/Button.style';

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

const defaultPropTypes = {
  msgId: string.isRequired,
  contents: arrayOf(shape()),
  params: shape(),
  user: shape(),
  sentAt: string,
};

export const SenderMessages = ({ msgId, contents, isPending = false }) => (
  <MessageBoxItem right key={msgId}>
    <MessageText>
      {contents.map(({ _id, messages, sentAt }, index) => (
        <Tooltip key={`${_id}[${index}]`} placement="right" title={renderTime(sentAt)}>
          <UserMessage pending={isPending}>
            {messages}
          </UserMessage>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);
SenderMessages.propTypes = {
  ...defaultPropTypes,
  isPending: bool,
};

export const ReceiverMessages = ({ msgId, contents, user }) => (
  <MessageBoxItem left key={msgId}>
    {user && (
      <ProfileImageStyled
        src={user.avatar || DEFAULT_USER_AVATAR}
      />
    )}
    <MessageText>
      {contents.map(({ _id, messages, sentAt }, index) => (
        <Tooltip key={`${_id}[${index}]`} placement="left" title={renderTime(sentAt)}>
          <p>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);
ReceiverMessages.propTypes = defaultPropTypes;

export const ActionMessages = ({
  msgId, contents, params, user,
}) => {
  const { actions = [] } = params;
  return (
    <MessageBoxItem left key={msgId}>
      {user && (
        <ProfileImageStyled
          src={user.avatar || DEFAULT_USER_AVATAR}
        />
      )}
      <MessageActionText>
        <Tooltip key={msgId} placement="left" title={renderTime(new Date())}>
          {contents.map(({ messages }) => (
            <p>
              {messages}
            </p>
          ))}
        </Tooltip>
        {
          actions.map(({ label, action }) => (
            <div className="message-action-button">
              <ButtonTransparent onClick={action}>{label}</ButtonTransparent>
            </div>
          ))
        }
      </MessageActionText>
    </MessageBoxItem>
  );
};
ActionMessages.propTypes = defaultPropTypes;

export const BotMessages = ({ msgId, contents }) => (
  <MessageBoxItem left key={msgId}>
    <ProfileImageStyled
      src={BOT_AVATAR}
    />
    <MessageText>
      {contents.map(({ _id, messages, sentAt }, index) => (
        <Tooltip key={`${_id}[${index}]`} placement="left" title={renderTime(sentAt)}>
          <p>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);
BotMessages.propTypes = defaultPropTypes;

export const ReceiverTypingMessages = ({ messages, profile = {} }) => (
  <MessageBoxItemIsTyping left key="UserTyping">
    <ProfileImageStyled
      src={profile.avatar || DEFAULT_USER_AVATAR}
    />
    <MessageText>
      <p>{messages.trim()}</p>
      <IsTypingWrapper />
    </MessageText>
  </MessageBoxItemIsTyping>
);
ReceiverTypingMessages.propTypes = {
  messages: string,
  profile: shape(),
};

export const TicketStatusUpdateMessages = ({ msgId, params, sentAt }) => {
  const { status } = params;
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip key={msgId} placement="top" title={renderTime(sentAt)}>
        {toI18n('CONV_MESSAGE_BOX_TICKET_CHANGED_TO')}
        <TicketActionStatus status={status} />
        <TicketActionStatusTitle status={status}>{status}</TicketActionStatusTitle>
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};
TicketStatusUpdateMessages.propTypes = defaultPropTypes;

export const UserActionMessages = ({
  msgId, user, params, sentAt,
}) => {
  const { action } = params;
  let messageOwner = '';
  // eslint-disable-next-line no-underscore-dangle
  const { role, username, application } = user;
  const { nickname } = application || {};
  messageOwner = isAgent(role) ? nickname : username;
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip key={`status${msgId}`} placement="top" title={renderTime(sentAt)}>
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
UserActionMessages.propTypes = defaultPropTypes;

export const WarningMessages = ({
  msgId, user, contents, sentAt,
}) => {
  const { username, role } = user;
  // eslint-disable-next-line no-underscore-dangle
  if (isAgent(role)) {
    return (
      <MessageBoxItem left key={msgId}>
        <MessageText>
          {
            contents.map(({ _id, messages }) => (
              <Tooltip key={msgId} placement="left" title={renderTime(sentAt)}>
                <UserLabelWarning>
                  {username}
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
          <Tooltip key={msgId} placement="right" title={renderTime(sentAt)}>
            <UserLabelWarning user>
              {username}
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
WarningMessages.propTypes = {
  ...defaultPropTypes,
  username: string,
  role: string,
};

export const TicketRatingMessages = ({
  msgId, user, params, sentAt,
}) => {
  const { profile = {}, role } = user;
  const { score, comment } = params;
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
      <Tooltip key={`status${msgId}`} placement="top" title={renderTime(sentAt)}>
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
TicketRatingMessages.propTypes = {
  ...defaultPropTypes,
  role: string,
};
