import { connect } from 'react-redux';
import { selectors, actions } from '../../reducers/supports';
import SupportList from '../../components/SupportTab/SupportList';

const mapStateToProps = state => ({
  supportList: selectors.getSupportList(state),
});

const mapDispatchToProps = {
  onAccept: ticketId => actions.agentConfirmAction(ticketId, true),
  onCancel: ticketId => actions.agentConfirmAction(ticketId, false),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportList);
