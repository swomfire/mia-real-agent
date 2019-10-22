import ShadowScrollbars from 'components/Scrollbar';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toI18n, combineChat } from '../../utils/func-utils';
import { EmptyMessageNotify, ChatMessageWrapper } from './styles';
import { REPLY_TYPE } from '../../../common/enums';
import {
  UserActionMessages,
  SenderMessages, ReceiverMessages,
} from '../ChatItem';

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

  renderMessageContent() {
    const {
      messages, userId,
    } = this.props;
    const refinedMessages = combineChat(messages);
    return [refinedMessages.map(({
      from, _id: msgId, contents, type, params, sentAt,
    }) => {
      const id = `message[${msgId}]`;
      switch (type) {
        case REPLY_TYPE.USER_ACTION:
          return <UserActionMessages msgId={id} user={from} params={params} sentAt={sentAt} />;
        case REPLY_TYPE.USER_NORMAL:
          if (from._id === userId) {
            return <SenderMessages msgId={id} contents={contents} />;
          }
          return <ReceiverMessages msgId={id} contents={contents} user={from} />;
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
