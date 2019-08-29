import TicketDetailInfo from 'components/TicketDetail/TicketDetailInfo';
import { connect } from 'react-redux';
import { actions } from 'reducers/ticket';
import { actions as REPLY_ACTIONS, getReplyMessagesByConversationId } from 'reducers/replies';
import { getTicketDetailFromRoute, getTicketIdFromRoute } from 'selectors/ticket';

const mapStateToProps = (state) => {
  const ticketDetail = getTicketDetailFromRoute(state);
  const { conversationId } = ticketDetail || {};
  return {
    conversationLog: getReplyMessagesByConversationId(state, conversationId),
    ticketDetail,
    ticketId: getTicketIdFromRoute(state),
  };
};

const mapDispatchToProps = {
  fetchTicketSingle: actions.fetchTicketSingle,
  fetchConversationLog: REPLY_ACTIONS.fetchReplyMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketDetailInfo);
