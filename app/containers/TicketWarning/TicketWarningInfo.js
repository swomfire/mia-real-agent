import TicketWarningInfo from 'components/TicketWarning/TicketWarningInfo';
import { connect } from 'react-redux';
import { actions } from 'reducers/ticketWarning';
import { actions as REPLY_ACTIONS, getReplyMessagesByConversationId, isFetchingReplies } from 'reducers/replies';
import { getTicketWarningFromRoute, getTicketIdFromWarningRoute } from 'selectors/ticketWarning';

const mapStateToProps = (state) => {
  const ticketDetail = getTicketWarningFromRoute(state);
  const { conversationId } = ticketDetail || {};
  return {
    conversationLog: getReplyMessagesByConversationId(state, conversationId),
    ticketDetail,
    ticketId: getTicketIdFromWarningRoute(state),
    isFetchingReplies: isFetchingReplies(state, conversationId),
  };
};

const mapDispatchToProps = {
  fetchTicketSingle: actions.fetchTicketWarningSingle,
  fetchConversationLog: REPLY_ACTIONS.fetchReplyMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketWarningInfo);
