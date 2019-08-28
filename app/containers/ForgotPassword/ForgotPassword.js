import { connect } from 'react-redux';
import ForgotPassword from '../../components/ForgotPassword';
import { forgotPasswordAction } from '../../reducers/auth';

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  onSubmit: forgotPasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
