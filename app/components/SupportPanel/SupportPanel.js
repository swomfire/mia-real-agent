import React, { Component } from 'react';
import { Icon } from 'antd';
import {
  func, string, shape,
} from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import {
  SupportPanelWrapper, ToggleSupportPanel, SupportNotiWrapper,
} from './styles';
import ChatPanel from '../../containers/ChatPanel';
import { CONVERSATION_STATUS } from '../../../common/enums';
import { toI18n } from '../../utils/func-utils';

class SupportPanel extends Component {
  state = {
    visiable: true,
  }

  static propTypes = {
    findAgentSupport: func.isRequired,
    fetchCannedResponseForUser: func.isRequired,
    joinConversation: func.isRequired,
    leftConversation: func.isRequired,
    fetchConversation: func.isRequired,
    confirmRequested: func.isRequired,
    fetchReply: func.isRequired,
    conversationId: string,
    ticketId: string,
    confirmMessage: shape(),
    conversation: shape(),
  }


  componentDidMount() {
    const { fetchCannedResponseForUser } = this.props;
    fetchCannedResponseForUser({});
  }

  componentDidUpdate = (prevProps) => {
    const {
      conversationId, fetchConversation, fetchReply,
      joinConversation, leftConversation,
    } = this.props;
    const { conversationId: prevConversationId } = prevProps;
    if (!_isEmpty(conversationId)) {
      if (conversationId !== prevConversationId) {
        fetchConversation(conversationId);
        fetchReply(conversationId);
        joinConversation(conversationId);
        if (prevConversationId) {
          leftConversation(prevConversationId);
        }
      }
    }
  }

  toggleVisibility = (isOpen) => {
    this.setState({
      visiable: isOpen,
    });
  }

  findSupport = () => {
    const { findAgentSupport, ticketId } = this.props;
    findAgentSupport(ticketId);
  }

  render() {
    const { visiable } = this.state;
    const {
      conversationId, confirmMessage, confirmRequested, conversation,
    } = this.props;
    let additionalMessage = null;
    if (confirmMessage) {
      let messages = '';
      switch (confirmMessage) {
        case CONVERSATION_STATUS.SUPPORT_UNFULLFIL:
          messages = toI18n('SUPPORT_SUPPORTER_EXIT');
          break;
        case CONVERSATION_STATUS.SUPPORT_FULLFIL:
        default:
          messages = toI18n('SUPPORT_SUPPORTER_COMPLETE');
          break;
      }
      additionalMessage = {
        type: 'USER_ACTION_BUTTON',
        messages,
        params: {
          actions: [
            {
              label: toI18n('CONFIRM'),
              action: () => confirmRequested(conversationId, confirmMessage),
            },
          ],
        },
      };
    }
    const hasSupporter = !!conversationId;
    const { status } = conversation || {};
    return (
      <SupportPanelWrapper visiable={!hasSupporter || status === CONVERSATION_STATUS.OPEN}>
        {hasSupporter
          ? <ChatPanel conversationId={conversationId} additionalMessage={additionalMessage} />
          : (
            <ToggleSupportPanel
              onClick={() => this.toggleVisibility(!visiable)}
            >
              <Icon type="search" />
              <SupportNotiWrapper>
                <span>
                  {toI18n('SUPPORT_HAVING_TROUBLE')}
                </span>
                <a href="#" onClick={this.findSupport}>
                  {toI18n('SUPPORT_FIND_SUPPORT')}
                </a>
              </SupportNotiWrapper>
            </ToggleSupportPanel>
          )}
      </SupportPanelWrapper>
    );
  }
}

export default SupportPanel;
