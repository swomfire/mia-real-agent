import ApplicationReview from 'components/ApplicationReview';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/application';
import { getApplicationDetailFromRoute, getApplicationIdFromRoute, getIsFetching } from 'selectors/application';

const mapStateToProps = createStructuredSelector({
  applicationDetail: getApplicationDetailFromRoute,
  applicationId: getApplicationIdFromRoute,
  isFetching: getIsFetching,
});

const mapDispatchToProps = {
  applicationApprove: actions.applicationApprove,
  applicationReject: actions.applicationReject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationReview);
