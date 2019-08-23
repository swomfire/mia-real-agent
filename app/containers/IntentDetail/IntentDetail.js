import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from 'reducers/response';
import IntentDetail from '../../components/IntentDetail/IntentDetail';
import { getTotalCount } from '../../selectors/response';

const mapStateToProps = state => ({
  total: getTotalCount(state),
});

const mapDispatchToProps = {
  getResponseList: actions.getAllResponseAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntentDetail));
