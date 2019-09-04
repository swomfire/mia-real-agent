import { createSelector } from 'reselect';
import _get from 'lodash/get';
import { fromJS } from 'immutable';
import { getRouteMatch } from './router';
import { ROUTE_DETAIL } from '../utils/constants';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getApplicationTotalRecord = ({ application }) => application.get('totalRecord');

const getSelectedPage = ({ application }) => application.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ application }) => application.getIn(['pagination', 'sizePerPage']);

const getApplicationsById = ({ application }) => application.get('applications');
const getVisibleApplicationIds = ({ application }) => application.get('visibleApplicationIds', emptyList);


const getApplicationList = createSelector(getApplicationsById, getVisibleApplicationIds, (applicationByIds, visibleApplicationIds) => {
  const plainApplicationById = applicationByIds.toJS();
  const plainVisibleApplicationIds = visibleApplicationIds.toJS();
  const sortApplications = plainVisibleApplicationIds.map(itemId => plainApplicationById[itemId]);

  return sortApplications;
});

const getSorting = ({ application }) => application.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());


const getIsFetching = ({ application }) => application.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ application }) => application.getIn(['fetching', 'errorMsg'], '');

const getIsLoading = ({ application }, applciationId) => application.getIn(['applications', applciationId], emptyMap).get('isLoading', false);

const getIsEditting = ({ application }) => application.get('isEditting', false);
const getEditError = ({ application }) => application.get('editError', '');

const getApplications = ({ application }) => application.get('applications', emptyMap);


const reselectApplications = createSelector(
  getApplications,
  getVisibleApplicationIds,
  (applications, visibleApplicationIds) => {
    const plainApplicationById = applications.toJS();
    const plainVisibleApplicationIds = visibleApplicationIds.toJS();
    return plainVisibleApplicationIds.map(id => plainApplicationById[id]);
  },
);

const getApplicationIdFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.APPLICATION_DETAIL_ROUTER),
  match => _get(match, 'params.id', null),
);

const getApplicationDetailFromRoute = createSelector(
  getApplicationIdFromRoute,
  getApplications,
  (selectedId, applications) => applications.get(selectedId, emptyMap).toJS(),
);


const getTotalCount = ({ application }) => application.get('totalRecord', 0);


export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
  getApplicationTotalRecord,
  getApplicationList,

  getIsLoading,

  getIsFetching,
  getFetchingError,

  getIsEditting,
  getEditError,

  getTotalCount,
  getApplicationIdFromRoute,
  reselectApplications,
  getApplicationDetailFromRoute,
};
