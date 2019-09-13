import { connect } from 'react-redux';
import ProfileUser from 'components/AdminTopNavBar/ProfileUser/ProfileUser';
import {
  getUserEmail, actions, getUsername, getCreditTime, getUserRole,
} from '../../reducers/auth';

const mapStateToProps = state => ({
  email: getUserEmail(state),
  username: getUsername(state),
  creditTime: getCreditTime(state),
  role: getUserRole(state),
});

const mapDispatchToProps = {
  onLogout: actions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
