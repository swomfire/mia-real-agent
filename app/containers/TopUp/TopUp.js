import { connect } from 'react-redux';
import TopUp from '../../components/TopUp';
import { actions, selectors } from '../../reducers/profile';
import { getSystem } from '../../reducers/system';

const mapStateToProps = state => ({
  user: selectors.getProfileFetchedProfile(state),
  isUpdating: selectors.getProfileIsUpdating(state),
  updateError: selectors.getProfileUpdateError(state),
  system: getSystem(state),
});

const mapDispatchToProps = {
  addCreditCard: actions.addCreditCard,
  removeCreditCard: actions.removeCreditCard,
  topUp: actions.topUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
