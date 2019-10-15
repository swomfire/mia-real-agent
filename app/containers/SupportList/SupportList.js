import { connect } from 'react-redux';
import { selectors, actions } from '../../reducers/supports';
import SupportList from '../../components/SupportTab/SupportList';

const mapStateToProps = state => ({
  supportList: selectors.getSupportList(state),
});

const mapDispatchToProps = {
  onAccept: (conversationId, ticketId) => actions.agentConfirmAction(conversationId, ticketId, true),
  onCancel: (conversationId, ticketId) => actions.agentConfirmAction(conversationId, ticketId, false),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportList);
