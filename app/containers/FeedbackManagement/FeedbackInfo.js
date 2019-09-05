import FeedbackInfo from 'components/Feedback/FeedbackInfo';
import { connect } from 'react-redux';
import { actions } from 'reducers/feedbacks';
import { getFeedbackFromRoute, getFeedbackIdFromRoute } from 'selectors/feedback';

const mapStateToProps = state => ({
  feedbackDetail: getFeedbackFromRoute(state),
  feedbackId: getFeedbackIdFromRoute(state),
});

const mapDispatchToProps = {
  fetchSingle: actions.fetchFeedbackSingle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedbackInfo);
