import { connect } from 'react-redux';
import ProfileUser from 'components/AdminTopNavBar/ProfileUser/ProfileUser';
import {
  actions,
} from '../../reducers/auth';
import { selectors } from '../../reducers/profile';
import { changeLanguage, getSystemLanguage } from '../../reducers/system';

const mapStateToProps = state => ({
  profile: selectors.getProfileFetchedProfile(state),
  lngCode: getSystemLanguage(state),
});

const mapDispatchToProps = {
  onLogout: actions.logout,
  changeLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
