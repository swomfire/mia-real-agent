import { createSelector } from 'reselect';
import _get from 'lodash/get';
import { fromJS } from 'immutable';
import { getRouteMatch } from './router';
import { ROUTE_DETAIL } from '../utils/constants';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getIntentTotalRecord = ({ intent }) => intent.get('totalRecord');

const getSelectedPage = ({ intent }) => intent.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ intent }) => intent.getIn(['pagination', 'sizePerPage']);

const getIntentsById = ({ intent }) => intent.get('intents');
const getVisibleIntentIds = ({ intent }) => intent.get('visibleIntentIds', emptyList);


const getIntentList = createSelector(getIntentsById, getVisibleIntentIds, (intentByIds, visibleIntentIds) => {
  const plainIntentById = intentByIds.toJS();
  const plainVisibleIntentIds = visibleIntentIds.toJS();
  const sortIntents = plainVisibleIntentIds.map(itemId => plainIntentById[itemId]);

  return sortIntents;
});

const getSorting = ({ intent }) => intent.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());


const getIsFetching = ({ intent }) => intent.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ intent }) => intent.getIn(['fetching', 'errorMsg'], '');

const getIntents = ({ intent }) => intent.get('intents', emptyMap);


const reselectIntents = createSelector(
  getIntents,
  getVisibleIntentIds,
  (intents, visibleIntentIds) => {
    const plainIntentById = intents.toJS();
    const plainVisibleIntentIds = visibleIntentIds.toJS();
    return plainVisibleIntentIds.map(id => plainIntentById[id]);
  },
);

const getIntentIdFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.INTENT_DETAIL_ROUTER),
  match => _get(match, 'params.id', null),
);

const getIntentDetailFromRoute = createSelector(
  getIntentIdFromRoute,
  getIntents,
  (selectedId, intents) => intents.get(selectedId, emptyMap).toJS(),
);


const getTotalCount = ({ intent }) => intent.get('totalRecord', 0);


export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
  getIntentTotalRecord,
  getIntentList,

  getIsFetching,
  getFetchingError,

  getTotalCount,
  getIntentIdFromRoute,
  reselectIntents,
  getIntentDetailFromRoute,
};
