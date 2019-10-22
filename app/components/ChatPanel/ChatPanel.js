import React, { Component } from 'react';
import { Icon, Popover } from 'antd';
import ChatMessages from 'containers/ChatMessages';
import {
  func, string, shape, arrayOf,
} from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import {
  ChatWrapper, MessageInputContent, ChatContentWrapper,
  SupporterWrapper, SupporterName, SupportPanelActionGroup, ActionPanelWrapper,
} from './styles';
import MessageInputForm from '../MessageInputForm';
import { ButtonTransparent } from '../../stylesheets/Button.style';

class ChatPanel extends Component {
  state = {
    chatVisiable: true,
  }

  static propTypes = {
    sendReplyMessage: func.isRequired,
    conversationId: string,
    userId: string,
    conversation: shape(),
    additionalMessage: shape(),
    actions: shape(),
    messages: arrayOf(shape()),
    cannedResponses: arrayOf(shape()),
  }

  toggleChatVisibility = (isOpen) => {
    this.setState({
      chatVisiable: isOpen,
    });
  }

  handleChatSubmit = (content) => {
    const {
      sendReplyMessage, conversationId,
    } = this.props;
    sendReplyMessage(conversationId, content);
  }

  renderActionBar = () => {
    const { actions } = this.props;
    return (
      <ActionPanelWrapper>
        {Object.keys(actions).map((key) => {
          const action = actions[key];
          const { label, onClick } = action;
          return (
            <ButtonTransparent key={key} type="button" onClick={onClick}>
              {label}
            </ButtonTransparent>
          );
        })}
      </ActionPanelWrapper>
    );
  }

  renderSupportChat = () => {
    const { actions, additionalMessage } = this.props;
    const { chatVisiable } = this.state;
    const {
      conversation, userId, messages, cannedResponses,
    } = this.props;
    let nickname = '';
    if (conversation) {
      const { members } = conversation;
      // eslint-disable-next-line no-underscore-dangle
      const others = members.filter(({ member }) => member._id.toString() !== userId.toString());
      if (!_isEmpty(others)) {
        const { application = {} } = others[0].member || {};
        // eslint-disable-next-line prefer-destructuring
        nickname = application.nickname;
      }
    }
    return (
      <ChatWrapper visiable={chatVisiable}>
        <SupporterWrapper>
          <SupporterName>
            {nickname}
          </SupporterName>
          <SupportPanelActionGroup>
            {!_isEmpty(actions)
              && (
                <Popover content={this.renderActionBar()} trigger="click">
                  <Icon type="ellipsis" />
                </Popover>
              )}
            <Icon type={chatVisiable ? 'down' : 'up'} onClick={() => this.toggleChatVisibility(!chatVisiable)} />
          </SupportPanelActionGroup>
        </SupporterWrapper>
        <ChatContentWrapper>
          <ChatMessages messages={additionalMessage ? messages.concat(additionalMessage) : messages} />
        </ChatContentWrapper>
        <MessageInputContent>
          <MessageInputForm
            cannedResponses={cannedResponses}
            onSubmit={this.handleChatSubmit}
          />
        </MessageInputContent>
      </ChatWrapper>
    );
  }


  render() {
    return this.renderSupportChat();
  }
}

export default ChatPanel;
