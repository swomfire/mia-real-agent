import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';

export const BILLING_SORTING = 'billing/BILLING_SORTING';
export const BILLING_FILTER = 'billing/BILLING_FILTER';
export const BILLING_FETCH = 'billing/BILLING_FETCH';

export const BILLING_FETCH_SINGLE = 'billing/BILLING_FETCH_SINGLE';
export const BILLING_FETCH_SINGLE_SUCCESS = 'billing/BILLING_FETCH_SINGLE_SUCCESS';
export const BILLING_FETCH_SINGLE_FAIL = 'billing/BILLING_FETCH_SINGLE_FAIL';

export const BILLING_CHANGE_PAGE = 'billing/BILLING_CHANGE_PAGE';
export const BILLING_ADMIN_CHANGE_PAGE = 'billing/BILLING_ADMIN_CHANGE_PAGE';
export const BILLING_ADMIN_GET_ALL = 'billing/BILLING_ADMIN_GET_ALL';
export const BILLING_GET_ALL = 'billing/BILLING_GET_ALL';
export const BILLING_GET_ALL_SUCCESS = 'billing/BILLING_GET_ALL_SUCCESS';
export const BILLING_GET_ALL_FAIL = 'billing/BILLING_GET_ALL_FAIL';

// action creator

const billingAdminGetAll = payload => ({
  type: BILLING_ADMIN_GET_ALL,
  payload,
});

const billingGetAll = payload => ({
  type: BILLING_GET_ALL,
  payload,
});


const billingGetAllComplete = (data, totalRecord) => ({
  type: BILLING_GET_ALL_SUCCESS,
  data,
  totalRecord,
});

const billingGetAllFail = errorMsg => ({
  type: BILLING_GET_ALL_FAIL,
  errorMsg,
});

const sortBilling = payload => ({
  type: BILLING_SORTING,
  payload,
});

const filterBilling = payload => ({
  type: BILLING_FILTER,
  payload,
});

const changePage = (pageIndex, sizePerPage) => ({
  type: BILLING_CHANGE_PAGE,
  pageIndex,
  sizePerPage,
});

const changeAdminPage = (pageIndex, sizePerPage) => ({
  type: BILLING_ADMIN_CHANGE_PAGE,
  pageIndex,
  sizePerPage,
});

function fetchBillingSingle(id) {
  return {
    type: BILLING_FETCH_SINGLE,
    id,
  };
}

function fetchBillingSingleFail(id, errorMsg) {
  return {
    type: BILLING_FETCH_SINGLE_FAIL,
    errorMsg,
    id,
  };
}

function fetchBillingSingleSuccess(payload) {
  return {
    type: BILLING_FETCH_SINGLE_SUCCESS,
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

  billing: {},

  billings: {},
  totalRecord: 0,
  pagination: fromJS({
    selectedPage: 1,
    sizePerPage: 20,
  }),
  visibleBillingIds: [],
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),

  // processing value
  isGetting: false,
  fetching: fetchingObj,
  currentBilling: null,
});

function billingReducer(state = initialState, action) {
  switch (action.type) {
    case BILLING_GET_ALL:
      return state.set('fetching', fromJS({ isFetching: true, errorMsg: '' }));

    case BILLING_GET_ALL_SUCCESS: {
      const { data, totalRecord } = action;
      const newTickets = state
        .get('billings')
        .merge(fromJS(_keyBy(data, ({ _id }) => _id)));
      const visibleTicketIds = data.map(({ _id }) => _id);

      return state
        .set('visibleBillingIds', fromJS(visibleTicketIds))
        .set('billings', newTickets)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case BILLING_GET_ALL_FAIL:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));

    case BILLING_CHANGE_PAGE:
    case BILLING_ADMIN_CHANGE_PAGE:
      return state
        .set('fetching', fromJS({ isFetching: true, errorMsg: '' }))
        .setIn(['pagination', 'selectedPage'], action.pageIndex);

    case BILLING_FETCH_SINGLE:
      return state.setIn(['billing', action.id, 'isLoading'], true);

    case BILLING_FETCH_SINGLE_SUCCESS: {
      const { payload } = action;
      const { _id } = payload;
      const tmpBilling = state.get('billings').get(_id) || fromJS({});
      return state
        .setIn(['billings', _id], fromJS({ ...tmpBilling.toJS(), ...payload }));
    }

    case BILLING_FETCH_SINGLE_FAIL: {
      const { id, errorMsg } = action;
      return state.setIn(['billing', id], fromJS({ error: errorMsg }));
    }
    default: return state;
  }
}

export default billingReducer;

export const actions = {
  billingAdminGetAll,
  billingGetAll,
  billingGetAllComplete,
  billingGetAllFail,

  sortBilling,
  filterBilling,

  fetchBillingSingle,
  fetchBillingSingleFail,
  fetchBillingSingleSuccess,

  changePage,
  changeAdminPage,
};
