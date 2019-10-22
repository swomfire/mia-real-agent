import { connect } from 'react-redux';
import ChatPanel from '../../components/ChatPanel';
import { getUserId } from '../../reducers/auth';
import { actions as REPLY_ACTIONS, getReplyMessagesByConversationId } from '../../reducers/replies';
import { getCannedResponsesForUser } from '../../selectors/cannedResponse';
import { getConverationById } from '../../reducers/conversations';

const mapStateToProps = (state, { conversationId }) => ({
  userId: getUserId(state),
  conversation: getConverationById(state, conversationId),
  messages: getReplyMessagesByConversationId(state, conversationId),
  cannedResponses: getCannedResponsesForUser(state),
});

const mapDispatchToProps = {
  sendReplyMessage: REPLY_ACTIONS.sendReplyMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);
