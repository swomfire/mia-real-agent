import { connect } from 'react-redux';
import ResponseList from '../../components/ResponseList';
import {
  actions,
} from '../../reducers/response';
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
  removeAction: actions.removeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseList);
