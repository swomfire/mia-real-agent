import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import ShadowScrollbars from 'components/Scrollbar';
import { Icon } from 'antd';
import {
  MessageEmpty,
  MessageBoxBlock,
  MessageBoxItem,
  FindAgentWrapper,
  FindAgentButton,
} from './styles';
import {
  CLOSED_TICKET_STATUSES,
  TICKET_STATUS, REPLY_TYPE, BOT_AVATAR,
} from '../../../common/enums';
import {
  isAgent, toI18n, combineChat,
} from '../../utils/func-utils';
import {
  ticketStatus, userAction, botChat, ticketRating, userChat, otherChat, otherTyping,
} from '../ChatItem';
import { ProfileImageStyled } from '../ChatItem/styles';

const scrollStyle = {
  flex: 'auto',
  width: '100%',
};

class MessageList extends Component {
  state = {
    needScroll: false,
  }

  messagesAnchor = React.createRef();

  static propTypes = {
    userId: PropTypes.string.isRequired,
    currentTicket: PropTypes.shape(),
    conversation: PropTypes.shape(),
    conversationId: PropTypes.string,
    findAgentRequest: PropTypes.func.isRequired,
    replyMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessages: PropTypes.arrayOf(PropTypes.shape()),
    otherUserTyping: PropTypes.object,
    userRole: PropTypes.string.isRequired,
    solutionFound: PropTypes.bool,
  }

  scrollChatToBottom = () => {
    const { current } = this.messagesAnchor || {};
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  componentDidMount = () => {
    this.scrollChatToBottom();
  }

  componentDidUpdate = (prevProps) => {
    const {
      replyMessages, sendingMessages,
    } = this.props;
    const { needScroll } = this.state;
    if (needScroll) {
      this.scrollChatToBottom();
    }
    if (prevProps.replyMessages.length !== replyMessages.length
      || prevProps.sendingMessages.length !== sendingMessages.length) {
      this.setState({ needScroll: true });
    }
  }

  handleFindAgent = () => {
    const { findAgentRequest, conversationId } = this.props;

    findAgentRequest(conversationId);
  }

  renderFindAgentForSolution = () => (
    <MessageBoxItem left key="solution">
      <ProfileImageStyled
        src={BOT_AVATAR}
      />
      <FindAgentWrapper>
        <p key="solution">
          {toI18n('CONV_MESSAGE_BOX_NOT_SATISFY')}
        </p>
        <FindAgentButton
          key="button"
          type="primary"
          onClick={this.handleFindAgent}
        >
          <Icon type="search" />
          {toI18n('CONV_MESSAGE_BOX_FIND_AGENT')}
        </FindAgentButton>
      </FindAgentWrapper>
    </MessageBoxItem>
  )

  renderOtherUserMessageContent = (msgId, contents, from) => otherChat(msgId, contents, from.profile);

  renderOtherUserTypingContent = () => {
    const { otherUserTyping, conversationId, conversation } = this.props;
    const { conversationId: _id, messages = '' } = otherUserTyping || {};
    const { onwer } = conversation || {};
    const { profile } = onwer || {};
    if (!_isEmpty(otherUserTyping)
      && _id === conversationId
      && !_isEmpty(messages.trim())
    ) {
      this.scrollChatToBottom();
      return otherTyping(messages, profile);
    }
    return false;
  }

  renderPendingMessageContent = () => {
    const { sendingMessages } = this.props;
    if (!sendingMessages || !sendingMessages.length) return null;

    return combineChat(sendingMessages).map(({ id: msgId, contents }) => userChat(msgId, contents, true));
  }

  renderMessageContent() {
    const {
      replyMessages, userId, userRole,
    } = this.props;
    const refinedMessages = combineChat(replyMessages);
    return [refinedMessages.map(({
      from, _id: msgId, contents, type, params, sentAt,
    }) => {
      const id = `message[${msgId}]`;
      switch (type) {
        case REPLY_TYPE.TICKET_STATUS:
          return ticketStatus(id, params, sentAt);
        case REPLY_TYPE.USER_ACTION:
          return userAction(id, from, params, sentAt);
        case REPLY_TYPE.BOT_RESPONSE:
          return botChat(id, contents);
        case REPLY_TYPE.RATING_ACTION:
          return ticketRating(id, from, params, sentAt);
        case REPLY_TYPE.USER_NORMAL:
          if (from._id === userId) {
            return userChat(id, contents, false, isAgent(userRole));
          }
          return this.renderOtherUserMessageContent(id, contents, from);
        default: return null;
      }
    }),
    this.renderOtherUserTypingContent(),
    ];
  }

  render = () => {
    const {
      otherUserTyping,
      replyMessages, currentTicket,
      solutionFound, userRole,
    } = this.props;
    const hasChatData = !_isEmpty(replyMessages)
      || !_isEmpty(otherUserTyping);
    const { assignee, status, rating } = currentTicket || {};
    return (
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
        {!hasChatData
          ? <MessageEmpty>{toI18n('CONV_MESSAGE_BOX_NO_CHAT_DATA')}</MessageEmpty>
          : this.renderMessageContent()
        }
        {solutionFound
          && status === TICKET_STATUS.OPEN
          && !isAgent(userRole)
          && _isEmpty(assignee)
          && this.renderFindAgentForSolution()}
        {this.renderPendingMessageContent()}
        <MessageBoxBlock />
        {CLOSED_TICKET_STATUSES.includes(status) && !rating
          && [
            (<MessageBoxBlock />),
            (<MessageBoxBlock />),
            (<MessageBoxBlock />),
          ]
        }
        <div ref={this.messagesAnchor} />
      </ShadowScrollbars>
    );
  }
}

export default MessageList;
