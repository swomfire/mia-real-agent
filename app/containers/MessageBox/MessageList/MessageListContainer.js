import { connect } from 'react-redux';
import { getUserId, getUserRole } from 'reducers/auth';
import MessageList from 'components/MessageBox/MessageList';
import {
  getReplyMessagesByConversationId,
  getSendingMessages,
} from 'reducers/replies';
import {
  getTicketById, getCurrentTicket,
} from 'selectors/ticket';
import {
  getCurrentConveration,
  getConversationById,
  getOtherUserTyping,
  getSolution,
} from 'reducers/conversations';
import {
  findAgentRequest,
  isFindingAgent,
} from 'reducers/requests';

const mapStateToProps = (state) => {
  const conversationId = getCurrentConveration(state);
  const solutionFound = getSolution(state).includes(conversationId);
  return ({
    conversationId,
    conversation: getConversationById(state, conversationId),
    userId: getUserId(state),
    currentTicket: getTicketById(state, getCurrentTicket(state)),
    replyMessages: getReplyMessagesByConversationId(state, conversationId),
    sendingMessages: getSendingMessages(state, conversationId),
    isFindingAgent: isFindingAgent(state, conversationId),
    userRole: getUserRole(state),
    otherUserTyping: getOtherUserTyping(state),
    solutionFound,
  });
};

const mapDispatchToProps = {
  findAgentRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
