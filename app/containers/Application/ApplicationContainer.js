import { connect } from 'react-redux';
import {
  selectors, actions,
  APPLICATION_CHECK_NICKNAME_COMPLETE, APPLICATION_CHECK_NICKNAME_FAIL, APPLICATION_CHECK_NICKNAME,
} from '../../reducers/application';
import ApplicationForm from '../../components/Application';

const mapStateToProps = state => ({
  isSubmitting: selectors.getApplicationIsSubmitting(state),
  submitError: selectors.getApplicationSubmitError(state),
  isValidating: selectors.getApplicationIsValidating(state),
  validateError: selectors.getApplicationValidateError(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(actions.submitAction(data)),
  checkNicknameExist: nickname => dispatch(
    actions.applicationFormValidateStepAction(
      actions.checkNicknameAction,
      { nickname },
      APPLICATION_CHECK_NICKNAME_COMPLETE,
      APPLICATION_CHECK_NICKNAME_FAIL
    )
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm);
