import { connect } from 'react-redux';
import { getUserId, getUserRole } from 'reducers/auth';
import SupportChat from '../../components/SupportChat/SupportChat';

const mapStateToProps = state => ({
  userId: getUserId(state),
  userRole: getUserRole(state),
});

export default connect(mapStateToProps)(SupportChat);
