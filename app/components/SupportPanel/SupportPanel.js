import React, { Component } from 'react';
import { Icon } from 'antd';
import SupportChat from 'containers/SupportChat';
import {
  SupportPanelWrapper, ToggleSupportPanel, SupportNotiWrapper,
  SupportChatWrapper, MessageInputContent, ChatContentWrapper,
  SupporterWrapper, SupporterName, SupportPanelActionGroup,
} from './styles';
import MessageInputForm from '../MessageInputForm';

class SupportPanel extends Component {
  state = {
    visiable: true,
    chatVisiable: true,
  }

  toggleChatVisibility = (isOpen) => {
    this.setState({
      chatVisiable: isOpen,
    });
  }

  toggleVisibility = (isOpen) => {
    this.setState({
      visiable: isOpen,
    });
  }

  renderSupportChat = () => {
    const { chatVisiable } = this.state;
    return (
      <SupportChatWrapper visiable={chatVisiable}>
        <SupporterWrapper>
          <SupporterName>
            ABC XYZ
          </SupporterName>
          <SupportPanelActionGroup>
            <Icon type={chatVisiable ? 'down' : 'up'} onClick={() => this.toggleChatVisibility(!chatVisiable)} />
          </SupportPanelActionGroup>
        </SupporterWrapper>
        <ChatContentWrapper>
          <SupportChat />
        </ChatContentWrapper>
        <MessageInputContent>
          <MessageInputForm />
        </MessageInputContent>
      </SupportChatWrapper>
    );
  }

  render() {
    const { visiable } = this.state;
    const hasSupporter = true;
    return (
      <SupportPanelWrapper visiable={visiable}>
        {hasSupporter ? this.renderSupportChat() : (
          <ToggleSupportPanel
            onClick={() => this.toggleVisibility(!visiable)}
          >
            <Icon type="search" />
            <SupportNotiWrapper>
              <span>Having trouble?</span>
              <a href>
                Find Support
              </a>
            </SupportNotiWrapper>
          </ToggleSupportPanel>
        )}
      </SupportPanelWrapper>
    );
  }
}

export default SupportPanel;
