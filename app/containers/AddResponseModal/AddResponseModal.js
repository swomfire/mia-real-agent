import { connect } from 'react-redux';
import { getIntentDetailFromRoute } from '../../selectors/intent';
import { actions } from '../../reducers/response';
import AddResponseModal from '../../components/AddResponseModal';
import { getResponseIsCreating, getResponseCreateError } from '../../selectors/response';

const mapStateToProps = state => ({
  currentIntent: getIntentDetailFromRoute(state),
  isCreating: getResponseIsCreating(state),
  createError: getResponseCreateError(state),
});

const mapDispatchToProps = {
  createResponse: actions.createAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddResponseModal);
