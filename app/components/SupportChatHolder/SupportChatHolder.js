import React, { Component } from 'react';
import {
  func, arrayOf, shape, bool,
} from 'prop-types';
import _differenceBy from 'lodash/differenceBy';
import ChatPanel from '../../containers/ChatPanel';
import LoadingSpin from '../Loading';
import { SupportWrapper, SupportWindowWrapper, SupportWindow } from './styles';
import { CONVERSATION_STATUS } from '../../../common/enums';
import { toI18n } from '../../utils/func-utils';

class SupportChatHolder extends Component {
  static propTypes = {
    fetchConversationList: func.isRequired,
    fetchReplies: func.isRequired,
    joinConversation: func.isRequired,
    requestEndSupport: func.isRequired,
    conversations: arrayOf(shape()),
    isFetching: bool,
  }

  componentDidMount() {
    const { fetchConversationList } = this.props;
    fetchConversationList();
  }

  componentDidUpdate(prevProps) {
    const { fetchReplies, conversations, joinConversation } = this.props;
    _differenceBy(conversations, prevProps.conversations, '_id').forEach(
      ({ _id }) => {
        fetchReplies(_id);
        joinConversation(_id);
      },
    );
  }

  renderConversations = () => {
    const { conversations, requestEndSupport } = this.props;
    return conversations.map(({ _id }) => {
      const actions = {
        findAnother: {
          label: toI18n('SOLVE'),
          onClick: () => { requestEndSupport(_id, CONVERSATION_STATUS.SUPPORT_FULLFIL); },
        },
        CLose: {
          label: toI18n('UNSOLVE'),
          onClick: () => { requestEndSupport(_id, CONVERSATION_STATUS.SUPPORT_UNFULLFIL); },
        },
      };
      return (
        <SupportWindow key={_id}>
          <ChatPanel conversationId={_id} actions={actions} />
        </SupportWindow>
      );
    });
  }

  render() {
    const { isFetching } = this.props;
    return (
      <LoadingSpin loading={isFetching}>
        <SupportWrapper>
          <SupportWindowWrapper>
            {this.renderConversations()}
          </SupportWindowWrapper>
        </SupportWrapper>
      </LoadingSpin>
    );
  }
}

export default SupportChatHolder;
