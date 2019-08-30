import TicketWarningInfo from 'components/TicketWarning/TicketWarningInfo';
import { connect } from 'react-redux';
import { actions } from 'reducers/ticket';
import { actions as REPLY_ACTIONS, getReplyMessagesByConversationId } from 'reducers/replies';
import { getTicketWarningFromRoute, getTicketIdFromWarningRoute } from 'selectors/ticket';

const mapStateToProps = (state) => {
  const ticketDetail = getTicketWarningFromRoute(state);
  const { conversationId } = ticketDetail || {};
  return {
    conversationLog: getReplyMessagesByConversationId(state, conversationId),
    ticketDetail,
    ticketId: getTicketIdFromWarningRoute(state),
  };
};

const mapDispatchToProps = {
  fetchTicketSingle: actions.fetchTicketSingle,
  fetchConversationLog: REPLY_ACTIONS.fetchReplyMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketWarningInfo);
