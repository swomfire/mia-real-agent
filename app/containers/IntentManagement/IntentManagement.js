import { connect } from 'react-redux';
import IntentManagement from '../../components/IntentManagement';
import { getIntentDetailFromRoute } from '../../selectors/intent';

const mapStateToProps = state => ({
  currentIntent: getIntentDetailFromRoute(state),
});

export default connect(
  mapStateToProps,
)(IntentManagement);
