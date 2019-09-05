import { connect } from 'react-redux';
import {
  submitFeedback,
} from '../../reducers/feedbacks';
import CreateFeedbackForm from '../../components/CreateFeedback';
import { getIsCreating, getCreateError } from '../../selectors/feedback';

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  createError: getCreateError(state),
});

const mapDispatchToProps = {
  submitFeedback,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeedbackForm);
