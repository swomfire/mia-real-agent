import { connect } from 'react-redux';
import ForgotPassword from '../../components/ForgotPassword';
import { forgotPasswordAction, getIsForgetting, getForgotError } from '../../reducers/auth';

const mapStateToProps = state => ({
  isLoading: getIsForgetting(state),
  errorMessage: getForgotError(state),
});

const mapDispatchToProps = {
  onSubmit: forgotPasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
