import { connect } from 'react-redux';
import Avatar from '../../components/Profile/Avatar';
import { actions, selectors } from '../../reducers/profile';

const mapStateToProps = state => ({
  isLoading: selectors.getProfileIsUpdating(state),
});

const mapDispatchToProps = {
  updateAvatar: actions.updateAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
