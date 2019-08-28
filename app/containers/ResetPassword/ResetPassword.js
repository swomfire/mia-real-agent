import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ResetPassword from '../../components/ResetPassword';
import { resetPasswordAction } from '../../reducers/auth';

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  onSubmit: resetPasswordAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));
