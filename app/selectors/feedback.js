import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import _get from 'lodash/get';
import { ROUTE_DETAIL } from '../utils/constants';
import { getRouteMatch } from './router';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getIsCreating = ({ feedbacks }) => feedbacks.get('isCreating', false);
const getCreateError = ({ feedbacks }) => feedbacks.get('createError', '');
const getSelectedPage = ({ feedbacks }) => feedbacks.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ feedbacks }) => feedbacks.getIn(['pagination', 'sizePerPage']);
const getSorting = ({ feedbacks }) => feedbacks.get('sorting', emptyMap);

const getIsFetching = ({ feedbacks }) => feedbacks.getIn(['fetching', 'isFetching'], false);
const getFeedbacks = ({ feedbacks }) => feedbacks.get('feedbacks', emptyMap);
const getVisibleFeedbackIds = ({ feedbacks }) => feedbacks.get('visibleFeedbackIds', emptyList).toJS();
const reselectFeedbacks = createSelector(
  getFeedbacks,
  getVisibleFeedbackIds,
  (feedbacks, visibleFeedbackIds) => {
    const plainFeedbackById = feedbacks.toJS();
    return visibleFeedbackIds.map(id => plainFeedbackById[id]);
  },
);

const getTotalCount = ({ feedbacks }) => feedbacks.get('totalRecord', 0);

const getFeedbackIdFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.FEEDBACK_DETAIL_ROUTER),
  match => _get(match, 'params.id', null),
);

const getFeedbackFromRoute = createSelector(
  getFeedbackIdFromRoute,
  getFeedbacks,
  (path, feedbacks) => feedbacks.get(path, emptyMap).toJS(),
);

const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());
export {
  reselectSorting,
  getSelectedPage,
  getIsCreating,
  getSizePerPage,
  getCreateError,
  getIsFetching,
  reselectFeedbacks,
  getTotalCount,
  getFeedbackIdFromRoute,
  getFeedbackFromRoute,
};
