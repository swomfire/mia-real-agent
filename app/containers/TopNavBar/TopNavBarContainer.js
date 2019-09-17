import { connect } from 'react-redux';
import TopNavBar from 'components/TopNavBar';
import { actions } from '../../reducers/auth';
import { selectors } from '../../reducers/profile';

const mapStateToProps = state => ({
  user: selectors.getProfileFetchedProfile(state),
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
