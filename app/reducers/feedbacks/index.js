/* eslint-disable no-underscore-dangle */
import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';

export const FEEDBACK_GET_ALL = 'feedbacks/FEEDBACK_GET_ALL';
export const FEEDBACK_GET_ALL_SUCCESS = 'feedbacks/FEEDBACK_GET_ALL_SUCCESS';
export const FEEDBACK_GET_ALL_FAILED = 'feedbacks/FEEDBACK_GET_ALL_FAILED';

export const FEEDBACK_FETCH_SINGLE = 'feedback/FEEDBACK_FETCH_SINGLE';
export const FEEDBACK_FETCH_SINGLE_SUCCESS = 'feedback/FEEDBACK_FETCH_SINGLE_SUCCESS';
export const FEEDBACK_FETCH_SINGLE_FAIL = 'feedback/FEEDBACK_FETCH_SINGLE_FAIL';

export const FEEDBACK_SUBMIT = 'feedbacks/FEEDBACK_SUBMIT';
export const FEEDBACK_SUBMIT_SUCCESS = 'feedbacks/FEEDBACK_SUBMIT_SUCCESS';
export const FEEDBACK_SUBMIT_FAILED = 'feedbacks/FEEDBACK_SUBMIT_FAILED';

export const FEEDBACK_SORTING = 'feedbacks/FEEDBACK_SORTING';
export const FEEDBACK_FILTER = 'feedbacks/FEEDBACK_FILTER';
export const FEEDBACK_CHANGE_PAGE = 'feedbacks/FEEDBACK_CHANGE_PAGE';
// action creator

// GET ALL FEEDBACK

export const fetchFeedback = payload => ({
  type: FEEDBACK_GET_ALL,
  payload,
});

export const fetchFeedbackSuccess = (result, totalRecord) => ({
  type: FEEDBACK_GET_ALL_SUCCESS,
  result,
  totalRecord,
});

export const fetchFeedbackFailed = error => ({
  type: FEEDBACK_GET_ALL_FAILED,
  payload: {
    error,
  },
});

// FETCH SINGLE FEEDBACK

function fetchFeedbackSingle(id) {
  return {
    type: FEEDBACK_FETCH_SINGLE,
    id,
  };
}

function fetchFeedbackSingleFail(id, errorMsg) {
  return {
    type: FEEDBACK_FETCH_SINGLE_FAIL,
    errorMsg,
    id,
  };
}

function fetchFeedbackSingleSuccess(payload) {
  return {
    type: FEEDBACK_FETCH_SINGLE_SUCCESS,
    payload,
  };
}

// SUBMIT FEEDBACK

export const submitFeedback = (ticketId, title, feedbacks) => ({
  type: FEEDBACK_SUBMIT,
  payload: {
    ticketId, title, feedbacks,
  },
});

export const submitFeedbackSuccess = feedback => ({
  type: FEEDBACK_SUBMIT_SUCCESS,
  payload: {
    feedback,
  },
});

export const submitFeedbackFailed = error => ({
  type: FEEDBACK_SUBMIT_FAILED,
  payload: {
    error,
  },
});

const sortFeedback = payload => ({
  type: FEEDBACK_SORTING,
  payload,
});

const filterFeedback = payload => ({
  type: FEEDBACK_FILTER,
  payload,
});

const changePage = (pageIndex, sizePerPage) => ({
  type: FEEDBACK_CHANGE_PAGE,
  pageIndex,
  sizePerPage,
});

// selector
export const getConverationList = ({ feedbacks }) => {
  const byId = feedbacks.get('byId').toJS();
  const allIds = feedbacks.get('allIds').toJS();
  return allIds.map(id => byId[id]);
};
export const getCurrentConveration = ({ feedbacks }) => feedbacks.get('currentFeedback');
export const getConverationById = ({ feedbacks }, _id) => feedbacks.get('byId').get(_id);
export const getTotalConverations = ({ feedbacks }) => feedbacks.get('total');
export const getErrorMessage = ({ feedbacks }) => feedbacks.get('errorMsg');
export const isFetchingList = ({ feedbacks }) => feedbacks.get('isFetchingAll');
export const isFetchingSingleItem = ({ feedbacks }) => feedbacks.get('isFetchingSingleItem');
export const getFeedbackListByFeedbackList = ({ feedbacks }, ticketIdList) => {
  const ticketIdSet = new Set(ticketIdList);
  const byId = feedbacks.get('byId').toJS();

  return feedbacks
    .get('allIds')
    .toJS()
    .filter(id => ticketIdSet.has(byId[id].ticketId))
    .reduce((acc, id) => {
      acc[byId[id].ticketId] = byId[id];
      return acc;
    }, {});
};
export const getFeedbackById = ({ feedbacks }, feedbackId) => feedbacks.getIn(['byId', feedbackId]);

export const fetchingObj = {
  isFetching: false,
  errorMsg: '',
};

const initialState = fromJS({
  createError: '',
  getError: '',

  feedbacks: {},
  totalRecord: 0,
  pagination: fromJS({
    selectedPage: 1,
    sizePerPage: 20,
  }),
  visibleFeedbackIds: [],
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),

  // processing value
  isCreating: false,
  isGetting: false,
  fetching: fetchingObj,
});

function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case FEEDBACK_SUBMIT:
      return state.set('isCreating', true)
        .set('createError', '');

    case FEEDBACK_SUBMIT_SUCCESS: {
      return state
        .set('isCreating', false);
    }
    case FEEDBACK_SUBMIT_FAILED:
      return state.set('isCreating', false)
        .set('createError', action.errorMessage);


    case FEEDBACK_GET_ALL:
      return state.set('fetching', fromJS({ isFetching: true, errorMsg: '' }));

    case FEEDBACK_GET_ALL_SUCCESS: {
      const { result, totalRecord } = action;
      const newFeedbacks = state
        .get('feedbacks')
        .merge(fromJS(_keyBy(result, ({ _id }) => _id)));
      const visibleFeedbackIds = result.map(({ _id }) => _id);

      return state
        .set('visibleFeedbackIds', fromJS(visibleFeedbackIds))
        .set('feedbacks', newFeedbacks)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case FEEDBACK_GET_ALL_FAILED:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));

    case FEEDBACK_FETCH_SINGLE:
      return state.setIn(['feedback', action.id, 'isLoading'], true);

    case FEEDBACK_FETCH_SINGLE_SUCCESS: {
      const { payload } = action;
      const { _id } = payload;
      const tmpFeedback = state.get('feedbacks').get(_id) || fromJS({});
      return state
        .setIn(['feedbacks', _id], fromJS({ ...tmpFeedback.toJS(), ...payload }));
    }

    case FEEDBACK_FETCH_SINGLE_FAIL: {
      const { id, errorMsg } = action;
      return state.setIn(['feedback', id], fromJS({ error: errorMsg }));
    }

    case FEEDBACK_CHANGE_PAGE:
      return state
        .set('fetching', fromJS({ isFetching: true, errorMsg: '' }))
        .setIn(['pagination', 'selectedPage'], action.pageIndex);

    default: {
      return state;
    }
  }
}

export default feedbackReducer;

export const actions = {
  fetchFeedback,
  fetchFeedbackSuccess,
  fetchFeedbackFailed,

  fetchFeedbackSingle,
  fetchFeedbackSingleSuccess,
  fetchFeedbackSingleFail,

  submitFeedbackSuccess,
  submitFeedbackFailed,

  sortFeedback,
  changePage,
  filterFeedback,
};

export const selectors = {
  getCurrentConveration,
  getTotalConverations,
  getErrorMessage,
  isFetchingList,
  isFetchingSingleItem,
};
