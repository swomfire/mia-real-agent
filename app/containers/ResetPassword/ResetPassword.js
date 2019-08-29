import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ResetPassword from '../../components/ResetPassword';
import { resetPasswordAction, getIsResetting, getResetError } from '../../reducers/auth';

const mapStateToProps = state => ({
  isLoading: getIsResetting(state),
  errorMessage: getResetError(state),
});

const mapDispatchToProps = {
  onSubmit: resetPasswordAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));
