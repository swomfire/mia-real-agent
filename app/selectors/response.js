import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import _get from 'lodash/get';
import { fetchingObj } from 'reducers/response';
import { ROUTE_DETAIL } from '../utils/constants';
import { getRouteMatch } from './router';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getResponseIsCreating = ({ response }) => response.get('isCreating');
const getResponseCreateError = ({ response }) => response.get('createError');
const getResponseIsUpdating = ({ response }) => response.get('isUpdating');
const getResponseUpdateError = ({ response }) => response.get('updateError');
const getResponseTotalRecord = ({ response }) => response.get('totalRecord');
const getResponseGetResponseDetail = ({ response }, _id) => response.getIn(['responses', _id], emptyMap).toJS();
const getResponseGetResponseIsGetting = ({ response }) => response.get('isGetting');
const getResponseGetResponseError = ({ response }) => response.get('getError');
const getResponsesById = ({ response }) => response.get('responses').toJS();
const getVisibleResponseIds = ({ response }) => response.get('visibleResponseIds', emptyList).toJS();
const getResponsesList = createSelector(
  getResponsesById,
  getVisibleResponseIds,
  (responseByIds, visibleResponseIds) => visibleResponseIds.map(itemId => responseByIds[itemId])
);
const getResponseIdList = createSelector(
  getResponsesList,
  // eslint-disable-next-line no-underscore-dangle
  responseList => responseList.map(response => response._id)
);

const getResponseById = ({ response }, _id) => (response.get('responses').get(_id) || fromJS({})).toJS();

const getResponseIsArchiving = ({ response }) => response.get('isArchiving');
const getResponseArchiveError = ({ response }) => response.get('archiveError');

const getFetchingContext = ({ response }) => response.get('fetching', fetchingObj).toJS();

const getSelectedPage = ({ response }) => response.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ response }) => response.getIn(['pagination', 'sizePerPage']);

const getSorting = ({ response }) => response.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());

const getIsFetching = ({ response }) => response.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ response }) => response.getIn(['fetching', 'errorMsg'], '');

const getResponses = ({ response }) => response.get('responses', emptyMap);

const getTotalCount = ({ response }) => response.get('totalRecord', 0);

const reselectResponses = createSelector(
  getResponses,
  getVisibleResponseIds,
  (responses, visibleResponseIds) => {
    const plainResponseById = responses.toJS();
    return visibleResponseIds.map(id => plainResponseById[id]);
  },
);

const getResponseIdFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.TICKET_DETAIL_ROUTER),
  match => _get(match, 'params.id', null),
);


const getResponseDetailFromRoute = createSelector(
  getResponseIdFromRoute,
  getResponses,
  (path, responses) => responses.get(path, emptyMap).toJS(),
);

const getCurrentResponse = ({ response }) => response.get('currentResponse');
// eslint-disable-next-line no-underscore-dangle

export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
  getResponseIsCreating,
  getResponseCreateError,
  getResponseIsUpdating,
  getResponseUpdateError,
  getResponseTotalRecord,
  getResponseGetResponseDetail,
  getResponseGetResponseIsGetting,
  getResponseGetResponseError,
  getResponsesList,
  getFetchingContext,
  getResponseIsArchiving,
  getResponseArchiveError,
  getIsFetching,
  getFetchingError,
  getResponseIdList,

  reselectResponses,
  getResponseIdFromRoute,
  getResponseDetailFromRoute,
  getTotalCount,
  getResponseById,
  getCurrentResponse,
};
