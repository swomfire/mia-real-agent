import { connect } from 'react-redux';
import AddCreditCard from '../../components/Profile/AddCreditCard';
import { actions, selectors } from '../../reducers/profile';

const mapStateToProps = state => ({
  isUpdating: selectors.getProfileIsUpdating(state),
  updateError: selectors.getProfileUpdateError(state),
});

const mapDispatchToProps = {
  addCreditCard: actions.addCreditCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCreditCard);
