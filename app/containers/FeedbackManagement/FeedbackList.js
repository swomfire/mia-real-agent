import itemDetailListHoc from 'hoc/ItemDetailHoc/ItemDetailListHoc';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/feedbacks';
import {
  reselectSorting,
  getIsFetching,
  reselectFeedbacks,
  getFeedbackIdFromRoute,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/feedback';
import { SORT } from 'utils/constants';
import FeedbackListItem from 'components/Feedback/FeedbackListItem';
import { toI18n } from '../../utils/func-utils';
const { USER_SORT } = SORT;

const structureSelectorFunc = createStructuredSelector({
  currentSorting: reselectSorting,
  isLoading: getIsFetching,
  selectedId: getFeedbackIdFromRoute,
  items: reselectFeedbacks,
  totalCount: getTotalCount,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);

  return {
    ...structureSelector,
    sortItems: USER_SORT,
    title: toI18n('ADMIN_TICKET_DETAIL_ALL_FEEDBACKS'),
  };
};

const mapDispatchToProps = {
  handleSort: actions.ticketSorting,
  fetchList: actions.fetchFeedback,
  changePage: actions.changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemDetailListHoc(FeedbackListItem));
