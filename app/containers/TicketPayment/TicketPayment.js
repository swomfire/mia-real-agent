import { connect } from 'react-redux';
import TicketPayment from '../../components/TicketPayment/TicketPayment';
import { selectors, actions } from '../../reducers/profile';

const mapStateToProps = state => ({
  user: selectors.getProfileFetchedProfile(state),
  isFetching: selectors.getProfileIsFetching(state),
});

const mapDispatchToProps = {
  fetchUser: actions.fetchDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketPayment);
