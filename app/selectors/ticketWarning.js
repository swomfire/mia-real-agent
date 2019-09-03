import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import _get from 'lodash/get';
import { fetchingObj } from 'reducers/ticketWarning';
import { ROUTE_DETAIL } from '../utils/constants';
import { getRouteMatch } from './router';

const emptyMap = fromJS({});
const emptyList = fromJS([]);
const getTicketWarningTotalRecord = ({ ticketWarning }) => ticketWarning.get('totalRecord');
const getTicketWarningGetTicketWarningDetail = ({ ticketWarning }, _id) => ticketWarning.getIn(['ticketWarnings', _id], emptyMap).toJS();
const getTicketWarningGetTicketWarningIsGetting = ({ ticketWarning }) => ticketWarning.get('isGetting');
const getTicketWarningGetTicketWarningError = ({ ticketWarning }) => ticketWarning.get('getError');
const getTicketWarningsById = ({ ticketWarning }) => ticketWarning.get('ticketWarnings').toJS();
const getVisibleTicketWarningIds = ({ ticketWarning }) => ticketWarning.get('visibleTicketWarningIds', emptyList).toJS();
const getTicketWarningsList = createSelector(
  getTicketWarningsById,
  getVisibleTicketWarningIds,
  (ticketWarningByIds, visibleTicketWarningIds) => visibleTicketWarningIds.map(itemId => ticketWarningByIds[itemId])
);
const getTicketWarningIdList = createSelector(
  getTicketWarningsList,
  // eslint-disable-next-line no-underscore-dangle
  ticketWarningList => ticketWarningList.map(ticketWarning => ticketWarning._id)
);

const getTicketWarningById = ({ ticketWarning }, _id) => (ticketWarning.get('ticketWarnings').get(_id) || fromJS({})).toJS();

const getFetchingContext = ({ ticketWarning }) => ticketWarning.get('fetching', fetchingObj).toJS();

const getSelectedPage = ({ ticketWarning }) => ticketWarning.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ ticketWarning }) => ticketWarning.getIn(['pagination', 'sizePerPage']);

const getSorting = ({ ticketWarning }) => ticketWarning.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());

const getIsFetching = ({ ticketWarning }) => ticketWarning.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ ticketWarning }) => ticketWarning.getIn(['fetching', 'errorMsg'], '');

const getTicketWarnings = ({ ticketWarning }) => ticketWarning.get('ticketWarnings', emptyMap);

const getTotalCount = ({ ticketWarning }) => ticketWarning.get('totalRecord', 0);

const reselectTicketWarnings = createSelector(
  getTicketWarnings,
  getVisibleTicketWarningIds,
  (ticketWarnings, visibleTicketWarningIds) => {
    const plainTicketWarningById = ticketWarnings.toJS();
    return visibleTicketWarningIds.map(id => plainTicketWarningById[id]);
  },
);

const reselectTickets = createSelector(
  getTicketWarnings,
  getVisibleTicketWarningIds,
  (tickets, visibleTicketIds) => {
    const plainTicketById = tickets.toJS();
    return visibleTicketIds.map(id => plainTicketById[id]);
  },
);

const getTicketIdFromWarningRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.TICKET_WARNING_ROUTER),
  match => _get(match, 'params.id', null),
);


const getTicketWarningFromRoute = createSelector(
  getTicketIdFromWarningRoute,
  getTicketWarnings,
  (path, ticketWarnings) => ticketWarnings.get(path, emptyMap).toJS(),
);

export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
  getTicketWarningTotalRecord,
  getTicketWarningGetTicketWarningDetail,
  getTicketWarningGetTicketWarningIsGetting,
  getTicketWarningGetTicketWarningError,
  getTicketWarningsList,
  getFetchingContext,
  getIsFetching,
  getFetchingError,
  getTicketWarningIdList,

  reselectTicketWarnings,
  getTotalCount,
  getTicketWarningById,
  getTicketIdFromWarningRoute,
  getTicketWarningFromRoute,
  reselectTickets,
};
