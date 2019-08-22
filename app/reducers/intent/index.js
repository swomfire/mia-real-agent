import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';

export const INTENT_SORTING = 'intent/INTENT_SORTING';
export const INTENT_FILTER = 'intent/INTENT_FILTER';
export const INTENT_FETCH = 'intent/INTENT_FETCH';

export const INTENT_CHANGE_PAGE = 'intent/INTENT_CHANGE_PAGE';

export const INTENT_ADMIN_GET_ALL = 'intent/ADMIN_GET_ALL';

export const GET_ALL = 'intent/GET_ALL';
export const GET_ALL_SUCCESS = 'intent/GET_ALL_SUCCESS';
export const GET_ALL_FAIL = 'intent/GET_ALL_FAIL';

export const INTENT_FETCH_SINGLE = 'intent/INTENT_FETCH_SINGLE';
export const INTENT_FETCH_SINGLE_COMPLETE = 'intent/INTENT_FETCH_SINGLE_COMPLETE';
export const INTENT_FETCH_SINGLE_FAIL = 'intent/INTENT_FETCH_SINGLE_FAIL';

// action creator
const intentAdminGetAll = payload => ({
  type: INTENT_ADMIN_GET_ALL,
  payload,
});

const getAllIntentAction = payload => ({
  type: GET_ALL,
  payload,
});

const getAllIntentCompleteAction = (data, totalRecord) => ({
  type: GET_ALL_SUCCESS,
  data,
  totalRecord,
});

const getAllIntentFailAction = errorMsg => ({
  type: GET_ALL_FAIL,
  errorMsg,
});


const sortIntent = payload => ({
  type: INTENT_SORTING,
  payload,
});

const filterIntent = payload => ({
  type: INTENT_FILTER,
  payload,
});

const changePage = (pageIndex, sizePerPage) => ({
  type: INTENT_CHANGE_PAGE,
  pageIndex,
  sizePerPage,
});

function fetchIntentSingle(id) {
  return {
    type: INTENT_FETCH_SINGLE,
    id,
  };
}

function fetchIntentSingleFail(id, errorMsg) {
  return {
    type: INTENT_FETCH_SINGLE_FAIL,
    errorMsg,
    id,
  };
}

function fetchIntentSingleComplete(payload) {
  return {
    type: INTENT_FETCH_SINGLE_COMPLETE,
    payload,
  };
}

// selector

export const fetchingObj = {
  isFetching: false,
  errorMsg: '',
};

const initialState = fromJS({
  intent: {},

  isSubmitting: false,
  submitError: '',

  intents: {},
  totalRecord: 0,
  pagination: fromJS({
    selectedPage: 1,
    sizePerPage: 20,
  }),
  visibleIntentIds: [],
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),
  fetching: fetchingObj,
});

function intentReducer(state = initialState, action) {
  switch (action.type) {
    case INTENT_ADMIN_GET_ALL:
    case GET_ALL:
      return state.set('fetching', fromJS({ isFetching: true, errorMsg: '' }));
    case GET_ALL_SUCCESS: {
      const { data, totalRecord } = action;
      const newTickets = state
        .get('intents')
        .merge(fromJS(_keyBy(data, ({ _id }) => _id)));

      const visibleTicketIds = data.map(({ _id }) => _id);

      return state
        .set('visibleIntentIds', fromJS(visibleTicketIds))
        .set('intents', newTickets)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case GET_ALL_FAIL:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));
    case INTENT_CHANGE_PAGE:
      return state
        .set('fetching', fromJS({ isFetching: true, errorMsg: '' }))
        .setIn(['pagination', 'selectedPage'], action.pageIndex);

    case INTENT_FETCH_SINGLE:
      return state.setIn(['intent', action.id, 'isLoading'], true);
    case INTENT_FETCH_SINGLE_COMPLETE: {
      const { payload } = action;
      const { _id } = payload;
      return state.setIn(['intent', _id], fromJS(payload));
    }
    case INTENT_FETCH_SINGLE_FAIL: {
      const { id, errorMsg } = action;
      return state.setIn(['intent', id], fromJS({ error: errorMsg }));
    }
    default: return state;
  }
}

export default intentReducer;

export const actions = {
  intentAdminGetAll,
  sortIntent,
  filterIntent,
  changePage,

  getAllIntentAction,
  getAllIntentCompleteAction,
  getAllIntentFailAction,

  fetchIntentSingle,
  fetchIntentSingleComplete,
  fetchIntentSingleFail,
};
