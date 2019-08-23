import { connect } from 'react-redux';
import ResponseList from '../../components/ResponseList';
import {
  actions,
} from '../../reducers/response';
import {
  selectConversation,
} from '../../reducers/conversations';
import {
  getResponsesList,
  getIsFetching,
} from '../../selectors/response';

import { getIntentDetailFromRoute } from '../../selectors/intent';

const mapStateToProps = state => ({
  isFetchingList: getIsFetching(state),
  currentIntent: getIntentDetailFromRoute(state),
  responseList: getResponsesList(state),
});

const mapDispatchToProps = {
  selectConversation,
  getAllTicketAction: actions.getAllTicketAction,
  closeAction: actions.closeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseList);
