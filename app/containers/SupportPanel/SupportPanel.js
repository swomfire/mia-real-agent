import { connect } from 'react-redux';
import { findAgentSupport, isFindingAgent } from 'reducers/supports';
import { actions as cannedResponseActions } from 'reducers/cannedResponse';
import {
  getTicketById, getCurrentTicket,
} from '../../selectors/ticket';
import {
  actions as CONVERSATION_ACTIONS, getConverationById, getConfirmMessagesById,
} from '../../reducers/conversations';
import SupportPanel from '../../components/SupportPanel/SupportPanel';
import { getUserId } from '../../reducers/auth';
import { actions as REPLY_ACTIONS, getReplyMessagesByConversationId } from '../../reducers/replies';
import { actions as SUPPORT_ACTIONS } from '../../reducers/supports';
import { getCannedResponsesForUser } from '../../selectors/cannedResponse';

const mapStateToProps = (state) => {
  const currentTicket = getTicketById(state, getCurrentTicket(state));
  const { supportConversationId } = currentTicket || {};
  return {
    userId: getUserId(state),
    isLoading: isFindingAgent(state),
    conversationId: supportConversationId,
    confirmMessage: getConfirmMessagesById(state, supportConversationId),
    conversation: getConverationById(state, supportConversationId),
    messages: getReplyMessagesByConversationId(state, supportConversationId),
    cannedResponses: getCannedResponsesForUser(state),
  };
};

const mapDispatchToProps = {
  findAgentSupport,
  fetchConversation: CONVERSATION_ACTIONS.fetchConversation,
  fetchReply: REPLY_ACTIONS.fetchReplyMessages,
  sendReplyMessage: REPLY_ACTIONS.sendReplyMessage,
  joinConversation: CONVERSATION_ACTIONS.userJoinConversation,
  leftConversation: CONVERSATION_ACTIONS.userLeftConversation,
  confirmRequested: SUPPORT_ACTIONS.confirmEndSupport,
  fetchCannedResponseForUser: cannedResponseActions.fetchCannedResponseForUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportPanel);
