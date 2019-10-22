import ShadowScrollbars from 'components/Scrollbar';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toI18n, isAgent, combineChat } from '../../utils/func-utils';
import { EmptyMessageNotify, ChatMessageWrapper } from './styles';
import { REPLY_TYPE } from '../../../common/enums';
import { userAction, userChat, otherChat, otherAction } from '../ChatItem';

const scrollStyle = {
  flex: 'auto',
  width: '100%',
};

class ChatMessages extends Component {
  state = {
    needToScrollDown: true,
  }

  messagesAnchor = React.createRef();

  static propTypes = {
    userId: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape()),
    userRole: PropTypes.string.isRequired,
  }

  scrollChatToBottom = () => {
    const { current } = this.messagesAnchor || {};
    if (current) {
      current.scrollIntoView();
    }
    this.setState({
      needToScrollDown: false,
    });
  }

  componentDidUpdate = (prevProps) => {
    const { messages } = this.props;
    const { needToScrollDown } = this.state;
    if (needToScrollDown) {
      this.scrollChatToBottom();
      return;
    }
    if (prevProps.messages.length !== messages.length) {
      this.setState({
        needToScrollDown: true,
      });
    }
  }

  renderOtherUserMessageContent = (msgId, contents) => otherChat(msgId, contents);

  renderMessageContent() {
    const {
      messages, userId, userRole,
    } = this.props;
    const refinedMessages = combineChat(messages);
    return [refinedMessages.map(({
      from, _id: msgId, contents, type, params, sentAt,
    }) => {
      const id = `message[${msgId}]`;
      switch (type) {
        case REPLY_TYPE.USER_ACTION:
          return userAction(id, from, params, sentAt);
        case REPLY_TYPE.USER_ACTION_BUTTON:
          return otherAction(id, contents, params);
        case REPLY_TYPE.USER_NORMAL:
          if (from._id === userId) {
            return userChat(id, contents, false, isAgent(userRole));
          }
          return this.renderOtherUserMessageContent(id, contents);
        default: return null;
      }
    }),
    ];
  }

  render = () => {
    const {
      messages,
    } = this.props;
    return (
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
        {_isEmpty(messages)
          ? <EmptyMessageNotify>{toI18n('CONV_MESSAGE_BOX_NO_CHAT_DATA')}</EmptyMessageNotify>
          : (
            <ChatMessageWrapper>
              {this.renderMessageContent()}
            </ChatMessageWrapper>
          )
        }
        <div ref={this.messagesAnchor} />
      </ShadowScrollbars>
    );
  }
}

export default ChatMessages;
