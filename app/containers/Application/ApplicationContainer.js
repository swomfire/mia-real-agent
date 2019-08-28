import { connect } from 'react-redux';
import {
  selectors, actions,
  APPLICATION_CHECK_INFO_COMPLETE, APPLICATION_CHECK_INFO_FAIL,
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
  checkInfoAction: (nickname, email) => dispatch(
    actions.applicationFormValidateStepAction(
      actions.checkInfoAction,
      { nickname, email },
      APPLICATION_CHECK_INFO_COMPLETE,
      APPLICATION_CHECK_INFO_FAIL
    )
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm);
