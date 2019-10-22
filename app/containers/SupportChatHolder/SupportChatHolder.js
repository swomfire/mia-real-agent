import { connect } from 'react-redux';
import SupportChatHolder from '../../components/SupportChatHolder';
import { actions, selectors } from '../../reducers/conversations';
import { actions as SUPPORT_ACTION } from '../../reducers/supports';
import { actions as REPLY_ACTIONS } from '../../reducers/replies';

const mapStateToProps = state => ({
  isFetching: selectors.getIsFetchingOpenSupport(state),
  conversations: selectors.getSupportConversations(state),
});

const mapDispatchToProps = {
  fetchConversationList: actions.fetchOpenSupportConversation,
  joinConversation: actions.userJoinConversation,
  requestEndSupport: SUPPORT_ACTION.requestEndSupport,
  fetchReplies: REPLY_ACTIONS.fetchReplyMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportChatHolder);
