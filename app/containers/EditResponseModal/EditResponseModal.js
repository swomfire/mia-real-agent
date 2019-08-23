import { connect } from 'react-redux';
import { getIntentDetailFromRoute } from '../../selectors/intent';
import { actions } from '../../reducers/response';
import ResponseFormModal from '../../components/ResponseFormModal';
import { getResponseById, getResponseIsUpdating, getResponseUpdateError } from '../../selectors/response';
import { toI18n } from '../../utils/func-utils';

const mapStateToProps = (state, props) => {
  const { responseId } = props;
  return {
    currentIntent: getIntentDetailFromRoute(state),
    isSubmitting: getResponseIsUpdating(state),
    submitError: getResponseUpdateError(state),
    title: toI18n('ADMIN_RESPONSE_EDIT_TITLE'),
    initialValues: getResponseById(state, responseId) || null,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  submitAction: values => dispatch(actions.updateAction({ ...values, responseId: props.responseId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormModal);
