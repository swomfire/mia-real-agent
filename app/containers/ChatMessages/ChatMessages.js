import { connect } from 'react-redux';
import { getUserId, getUserRole } from 'reducers/auth';
import ChatMessages from '../../components/ChatMessages';

const mapStateToProps = state => ({
  userId: getUserId(state),
  userRole: getUserRole(state),
});

export default connect(mapStateToProps)(ChatMessages);
