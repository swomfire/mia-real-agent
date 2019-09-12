import { connect } from 'react-redux';
import TopUp from '../../components/TopUp';
import { actions, selectors } from '../../reducers/profile';

const mapStateToProps = state => ({
  user: selectors.getProfileFetchedProfile(state),
  isUpdating: selectors.getProfileIsUpdating(state),
  updateError: selectors.getProfileUpdateError(state),
});

const mapDispatchToProps = {
  addCreditCard: actions.addCreditCard,
  removeCreditCard: actions.removeCreditCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
