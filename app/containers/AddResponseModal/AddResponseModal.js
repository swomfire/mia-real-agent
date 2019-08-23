import { connect } from 'react-redux';
import { getIntentDetailFromRoute } from '../../selectors/intent';
import { actions } from '../../reducers/response';
import ResponseFormModal from '../../components/ResponseFormModal';
import { getResponseIsCreating, getResponseCreateError } from '../../selectors/response';
import { toI18n } from '../../utils/func-utils';

const mapStateToProps = state => ({
  currentIntent: getIntentDetailFromRoute(state),
  isCreating: getResponseIsCreating(state),
  createError: getResponseCreateError(state),
  title: toI18n('ADMIN_RESPONSE_ADD_TITLE'),
  initialValues: null,
});

const mapDispatchToProps = {
  submitAction: actions.createAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormModal);
