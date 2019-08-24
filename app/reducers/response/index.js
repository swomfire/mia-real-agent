import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';

export const RESPONSE_CREATE = 'response/CREATE';
export const RESPONSE_CREATE_SUCCESS = 'response/CREATE_SUCCESS';
export const RESPONSE_CREATE_FAIL = 'response/CREATE_FAIL';

export const RESPONSE_GET_ALL = 'response/GET_ALL';
export const RESPONSE_GET_ALL_SUCCESS = 'response/GET_ALL_SUCCESS';
export const RESPONSE_GET_ALL_FAIL = 'response/GET_ALL_FAIL';

export const RESPONSE_UPDATE = 'response/UPDATE';
export const RESPONSE_UPDATE_SUCCESS = 'response/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'response/UPDATE_FAIL';

export const RESPONSE_REMOVE = 'response/REMOVE';
export const RESPONSE_REMOVE_SUCCESS = 'response/REMOVE_SUCCESS';
export const RESPONSE_REMOVE_FAIL = 'response/REMOVE_FAIL';

export const RESPONSE_SORTING = 'response/RESPONSE_SORTING';
export const RESPONSE_CHANGE_PAGE = 'response/RESPONSE_CHANGE_PAGE';
export const RESPONSE_FILTER = 'response/RESPONSE_FILTER';
export const RESPONSE_FETCH = 'response/RESPONSE_FETCH';
// action creator
const createAction = payload => ({
  type: RESPONSE_CREATE,
  payload,
});


const createCompleteAction = payload => ({
  type: RESPONSE_CREATE_SUCCESS,
  payload,
});

const createFailAction = errorMessage => ({
  type: RESPONSE_CREATE_FAIL,
  payload: {
    errorMessage,
  },
});

const removeAction = responseId => ({
  type: RESPONSE_REMOVE,
  payload: {
    responseId,
  },
});


const removeCompleteAction = payload => ({
  type: RESPONSE_REMOVE_SUCCESS,
  payload,
});

const removeFailAction = errorMessage => ({
  type: RESPONSE_REMOVE_FAIL,
  payload: {
    errorMessage,
  },
});

export const getAllResponseAction = payload => ({
  type: RESPONSE_GET_ALL,
  payload,
});


const getAllResponseCompleteAction = (data, totalRecord) => ({
  type: RESPONSE_GET_ALL_SUCCESS,
  data,
  totalRecord,
});

const getAllResponseFailAction = errorMsg => ({
  type: RESPONSE_GET_ALL_FAIL,
  errorMsg,
});

const updateAction = response => ({
  type: RESPONSE_UPDATE,
  payload: { response },
});


const updateCompleteAction = response => ({
  type: RESPONSE_UPDATE_SUCCESS,
  payload: response,
});

const updateFailAction = errorMessage => ({
  type: UPDATE_FAIL,
  payload: {
    errorMessage,
  },
});

const sortResponse = payload => ({
  type: RESPONSE_SORTING,
  payload,
});

const filterResponse = payload => ({
  type: RESPONSE_FILTER,
  payload,
});

export const fetchingObj = {
  isFetching: false,
  errorMsg: '',
};

export const initialState = fromJS({
  // error value
  createError: '',
  updateError: '',

  responses: {},
  totalRecord: 0,
  pagination: fromJS({
    selectedPage: 1,
    sizePerPage: 20,
  }),
  visibleResponseIds: [],
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),

  // processing value
  isCreating: false,
  isUpdating: false,
  fetching: fetchingObj,
});

function responseReducer(state = initialState, action) {
  switch (action.type) {
    case RESPONSE_CREATE:
      return state.set('isCreating', true)
        .set('createError', '');

    case RESPONSE_CREATE_SUCCESS: {
      const { payload } = action;
      const { _id } = payload;
      const visibleResponseIds = state.get('visibleResponseIds').toJS();
      const totalRecord = state.get('totalRecord');
      const newVisibleResponseIds = [_id, ...visibleResponseIds];
      return state
        .set('isCreating', false)
        .set('totalRecord', totalRecord + 1)
        .setIn(['responses', _id], fromJS(payload))
        .set('visibleResponseIds', fromJS(newVisibleResponseIds));
    }
    case RESPONSE_CREATE_FAIL:
      return state.set('isCreating', false)
        .set('createError', action.errorMessage);

    case RESPONSE_REMOVE_SUCCESS: {
      const { payload } = action;
      const { _id } = payload;
      const visibleResponseIds = state.get('visibleResponseIds').toJS();
      const totalRecord = state.get('totalRecord');
      const newVisibleResponseIds = visibleResponseIds.filter(id => id !== _id);
      return state
        .set('isCreating', false)
        .set('totalRecord', totalRecord - 1)
        .setIn(['responses', _id], fromJS({}))
        .set('visibleResponseIds', fromJS(newVisibleResponseIds));
    }
    case RESPONSE_UPDATE:
      return state.set('isUpdating', true)
        .set('updateError', '');

    case RESPONSE_UPDATE_SUCCESS: {
      const { payload } = action;
      const { _id } = payload;
      const tmpResponse = state.get('responses').get(_id).toJS();
      return state.set('isUpdating', false)
        .setIn(['responses', _id], fromJS({ ...tmpResponse, ...payload }));
    }

    case UPDATE_FAIL:
      return state.set('isUpdating', false)
        .set('updateError', action.payload.errorMessage);

    case RESPONSE_GET_ALL: {
      return state
        .set('visibleResponseIds', fromJS([]))
        .set('responses', fromJS({}))
        .set('totalRecord', 0)
        .set('fetching', fromJS({ isFetching: true }));
    }

    case RESPONSE_GET_ALL_SUCCESS: {
      const { data, totalRecord } = action;
      const newResponses = state
        .get('responses')
        .merge(fromJS(_keyBy(data, ({ _id }) => _id)));
      const visibleResponseIds = data.map(({ _id }) => _id);

      return state
        .set('visibleResponseIds', fromJS(visibleResponseIds))
        .set('responses', newResponses)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case RESPONSE_GET_ALL_FAIL:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));

    default: return state;
  }
}

export default responseReducer;

export const actions = {
  createAction,
  createCompleteAction,
  createFailAction,

  removeAction,
  removeFailAction,
  removeCompleteAction,

  getAllResponseAction,
  getAllResponseCompleteAction,
  getAllResponseFailAction,

  updateAction,
  updateCompleteAction,
  updateFailAction,

  sortResponse,
  filterResponse,
};
