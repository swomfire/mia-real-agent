import { connect } from 'react-redux';
import AddCreditCard from '../../components/Profile/AddCreditCard';
import { actions } from '../../reducers/user';

const mapDispatchToProps = {
  addCreditCard: actions.addCreditCard,
};

export default connect(null, mapDispatchToProps)(AddCreditCard);
