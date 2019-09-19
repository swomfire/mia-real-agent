import ApplicationReview from 'components/ApplicationReview';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/application';
import {
  actions as REVIEW_ACTIONS,
  selectors as REVIEW_SELECTORS,
} from 'reducers/review';
import { getApplicationDetailFromRoute, getApplicationIdFromRoute } from 'selectors/application';

const mapStateToProps = createStructuredSelector({
  applicationDetail: getApplicationDetailFromRoute,
  applicationId: getApplicationIdFromRoute,
  isSubmitting: REVIEW_SELECTORS.getReviewIsSubmitting,
});

const mapDispatchToProps = {
  reviewSubmit: REVIEW_ACTIONS.submitAction,
  applicationApprove: actions.applicationApprove,
  applicationReject: actions.applicationReject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationReview);
