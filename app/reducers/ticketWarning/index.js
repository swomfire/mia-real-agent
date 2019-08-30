import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';

export const TICKET_WARNING_SORTING = 'ticketWarning/TICKET_WARNING_SORTING';
export const TICKET_WARNING_FILTER = 'ticketWarning/TICKET_WARNING_FILTER';
export const TICKET_WARNING_FETCH = 'ticketWarning/TICKET_WARNING_FETCH';

export const TICKET_WARNING_FETCH_SINGLE = 'ticketWarning/TICKET_WARNING_FETCH_SINGLE';
export const TICKET_WARNING_FETCH_SINGLE_SUCCESS = 'ticketWarning/TICKET_WARNING_FETCH_SINGLE_SUCCESS';
export const TICKET_WARNING_FETCH_SINGLE_FAIL = 'ticketWarning/TICKET_WARNING_FETCH_SINGLE_FAIL';

export const TICKET_WARNING_CHANGE_PAGE = 'ticketWarning/TICKET_WARNING_CHANGE_PAGE';
export const TICKET_WARNING_ADMIN_GET_ALL = 'ticketWarning/ADMIN_GET_ALL';
export const TICKET_WARNING_ADMIN_GET_ALL_SUCCESS = 'ticketWarning/TICKET_WARNING_ADMIN_GET_ALL_SUCCESS';
export const TICKET_WARNING_ADMIN_GET_ALL_FAIL = 'ticketWarning/TICKET_WARNING_ADMIN_GET_ALL_FAIL';

// action creator

const ticketWarningAdminGetAll = payload => ({
  type: TICKET_WARNING_ADMIN_GET_ALL,
  payload,
});


const ticketWarningAdminGetAllComplete = (data, totalRecord) => ({
  type: TICKET_WARNING_ADMIN_GET_ALL_SUCCESS,
  data,
  totalRecord,
});

const ticketWarningAdminGetAllFail = errorMsg => ({
  type: TICKET_WARNING_ADMIN_GET_ALL_FAIL,
  errorMsg,
});

const sortTicketWarning = payload => ({
  type: TICKET_WARNING_SORTING,
  payload,
});

const filterTicketWarning = payload => ({
  type: TICKET_WARNING_FILTER,
  payload,
});

const changePage = (pageIndex, sizePerPage) => ({
  type: TICKET_WARNING_CHANGE_PAGE,
  pageIndex,
  sizePerPage,
});

function fetchTicketWarningSingle(id) {
  return {
    type: TICKET_WARNING_FETCH_SINGLE,
    id,
  };
}

function fetchTicketWarningSingleFail(id, errorMsg) {
  return {
    type: TICKET_WARNING_FETCH_SINGLE_FAIL,
    errorMsg,
    id,
  };
}

function fetchTicketWarningSingleSuccess(payload) {
  return {
    type: TICKET_WARNING_FETCH_SINGLE_SUCCESS,
    payload,
  };
}

export const fetchingObj = {
  isFetching: false,
  errorMsg: '',
};

export const initialState = fromJS({
  // error value
  getError: '',

  ticketWarning: {},

  ticketWarnings: {},
  totalRecord: 0,
  pagination: fromJS({
    selectedPage: 1,
    sizePerPage: 20,
  }),
  visibleTicketWarningIds: [],
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),

  // processing value
  isGetting: false,
  fetching: fetchingObj,
  currentTicketWarning: null,
});

function ticketWarningReducer(state = initialState, action) {
  switch (action.type) {
    case TICKET_WARNING_ADMIN_GET_ALL:
      return state.set('fetching', fromJS({ isFetching: true, errorMsg: '' }));

    case TICKET_WARNING_ADMIN_GET_ALL_SUCCESS: {
      const { data, totalRecord } = action;
      const newTickets = state
        .get('ticketWarnings')
        .merge(fromJS(_keyBy(data, ({ _id }) => _id)));
      const visibleTicketIds = data.map(({ _id }) => _id);

      return state
        .set('visibleTicketWarningIds', fromJS(visibleTicketIds))
        .set('ticketWarnings', newTickets)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case TICKET_WARNING_ADMIN_GET_ALL_FAIL:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));

    case TICKET_WARNING_CHANGE_PAGE:
      return state
        .set('fetching', fromJS({ isFetching: true, errorMsg: '' }))
        .setIn(['pagination', 'selectedPage'], action.pageIndex);

    case TICKET_WARNING_FETCH_SINGLE:
      return state.setIn(['ticketWarning', action.id, 'isLoading'], true);

    case TICKET_WARNING_FETCH_SINGLE_SUCCESS: {
      const { payload } = action;
      const { _id } = payload;
      const tmpTicketWarning = state.get('ticketWarnings').get(_id) || fromJS({});
      return state
        .setIn(['ticketWarnings', _id], fromJS({ ...tmpTicketWarning.toJS(), ...payload }));
    }

    case TICKET_WARNING_FETCH_SINGLE_FAIL: {
      const { id, errorMsg } = action;
      return state.setIn(['ticketWarning', id], fromJS({ error: errorMsg }));
    }
    default: return state;
  }
}

export default ticketWarningReducer;

export const actions = {
  ticketWarningAdminGetAll,
  ticketWarningAdminGetAllComplete,
  ticketWarningAdminGetAllFail,

  sortTicketWarning,
  filterTicketWarning,

  fetchTicketWarningSingle,
  fetchTicketWarningSingleFail,
  fetchTicketWarningSingleSuccess,

  changePage,
};
