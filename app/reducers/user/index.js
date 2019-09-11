import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';

export const USER_FETCH_LIST = 'user/FETCH_LIST';
export const USER_FETCH_LIST_SUCCESS = 'user/FETCH_LIST_SUCCESS';
export const USER_FETCH_LIST_FAIL = 'user/FETCH_LIST_FAIL';

export const USER_SORTING = 'user/SORTING';

// add user
export const USER_ADD_NEW = 'user/ADD_NEW';
export const USER_ADD_NEW_SUCCESS = 'user/ADD_NEW_SUCCESS';
export const USER_ADD_NEW_FAILED = 'user/ADD_NEW_FAILED';

// fetch single user
export const USER_FETCH_SINGLE = 'user/FETCH_SINGLE';
export const USER_FETCH_SINGLE_SUCCESS = 'user/FETCH_SINGLE_SUCCESS';
export const USER_FETCH_SINGLE_FAIL = 'user/FETCH_SINGLE_FAIL';

// update user
export const USER_UPDATE = 'user/UPDATE';
export const USER_UPDATE_SUCCESS = 'user/UPDATE_SUCCESS';
export const USER_UPDATE_FAIL = 'user/UPDATE_FAIL';

// remove user
export const USER_REMOVE = 'user/USER_REMOVE';
export const USER_REMOVE_SUCCESS = 'user/USER_REMOVE_SUCCESS';
export const USER_REMOVE_FAIL = 'user/USER_REMOVE_FAIL';


// change page
export const USER_CHANGE_PAGE = 'user/CHANGE_PAGE';

// send Mail
export const USER_SEND_MAIL = 'user/USER_SEND_MAIL';

function sendMail() {
  return {
    type: USER_SEND_MAIL,
  };
}

function addCreditCard(card) {
  return {
    type: USER_ADD_CREDIT_CARD,
    payload: {
      card,
    },
  };
}

function addCreditCardSuccess(data) {
  return {
    type: USER_ADD_CREDIT_CARD_SUCCESS,
    data,
  };
}

function addCreditCardFail(errorMsg) {
  return {
    type: USER_ADD_CREDIT_CARD_FAIL,
    errorMsg,
  };
}

function updateUser(payload) {
  return {
    type: USER_UPDATE,
    payload,
  };
}

function updateUserSuccess(data) {
  return {
    type: USER_UPDATE_SUCCESS,
    data,
  };
}

function updateUserFail(errorMsg) {
  return {
    type: USER_UPDATE_FAIL,
    errorMsg,
  };
}

function fetchUserSingle(id) {
  return {
    type: USER_FETCH_SINGLE,
    id,
  };
}

function fetchUserSingleFail(id, errorMsg) {
  return {
    type: USER_FETCH_SINGLE_FAIL,
    errorMsg,
    id,
  };
}

function fetchUserSingleSuccess(payload) {
  return {
    type: USER_FETCH_SINGLE_SUCCESS,
    payload,
  };
}

function fetchListUser(payload) {
  return {
    type: USER_FETCH_LIST,
    payload,
  };
}

function fetchListUserSuccess(data, totalCount) {
  return {
    type: USER_FETCH_LIST_SUCCESS,
    data,
    totalCount,
  };
}

function fetchListUserFail(errMsg) {
  return {
    type: USER_FETCH_LIST_FAIL,
    errorMsg: errMsg,
  };
}

function userSorting(payload) {
  return {
    type: USER_SORTING,
    payload,
  };
}

function addNewUser(payload) {
  return {
    type: USER_ADD_NEW,
    payload,
  };
}

function addNewUserSuccess(data) {
  return {
    type: USER_ADD_NEW_SUCCESS,
    data,
  };
}

function addNewUserFail(errMsg) {
  return {
    type: USER_ADD_NEW_FAILED,
    message: errMsg,
  };
}

function removeUser(userId) {
  return {
    type: USER_REMOVE,
    userId,
  };
}

function removeUserSuccess(userId) {
  return {
    type: USER_REMOVE_SUCCESS,
    userId,
  };
}

function removeUserFail(errMsg) {
  return {
    type: USER_REMOVE_FAIL,
    message: errMsg,
  };
}

function changePage(pageIndex, sizePerPage) {
  return {
    type: USER_CHANGE_PAGE,
    pageIndex,
    sizePerPage,
  };
}

export const actions = {
  fetchListUser,
  fetchListUserSuccess,
  fetchListUserFail,
  userSorting,
  addNewUser,
  addNewUserSuccess,
  addNewUserFail,
  changePage,
  fetchUserSingle,
  fetchUserSingleSuccess,
  fetchUserSingleFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  removeUser,
  removeUserSuccess,
  removeUserFail,

  sendMail,

  addCreditCard,
  addCreditCardFail,
  addCreditCardSuccess,
};

// initialState
export const initialState = fromJS({
  user: {},
  visibleUserIds: [],
  isLoading: false,
  totalCount: 0,
  errorMsg: '',
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),
  pagination: fromJS({
    sizePerPage: 20,
    selectedPage: 1,
  }),
  addNew: fromJS({
    inProgress: false,
    message: '',
  }),
  update: fromJS({
    inProgress: false,
    message: '',
  }),
  detail: fromJS({
    inProgress: false,
    message: '',
  }),
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH_LIST:
      return state.set('isLoading', true);

    case USER_FETCH_LIST_SUCCESS: {
      const { data, totalCount } = action;
      const visibleUserIds = data.map(({ _id }) => _id);
      const newUsers = state.get('user').mergeDeep(fromJS(_keyBy(data, '_id')));

      return state
        .set('isLoading', false)
        .set('user', newUsers)
        .set('message', '')
        .set('visibleUserIds', fromJS(visibleUserIds))
        .set('totalCount', totalCount);
    }

    case USER_FETCH_LIST_FAIL:
      return state.set('isLoading', false).set('errorMsg', action.message);

    case USER_SORTING:
      return state
        .setIn(['pagination', 'selectedPage'], 1)
        .set('isLoading', true)
        .set('sorting', fromJS(action.payload));

    case USER_ADD_NEW: {
      return state
        .setIn(['addNew', 'inProgress'], true)
        .setIn(['addNew', 'message'], '');
    }

    case USER_ADD_NEW_SUCCESS: {
      const { _id } = action.data;
      const visibleUserIds = state.get('visibleUserIds').toJS();
      const newVisibleUserIds = [_id, ...visibleUserIds];

      return state
        .setIn(['addNew', 'inProgress'], false)
        .setIn(['user', _id], fromJS(action.data))
        .set('visibleUserIds', fromJS(newVisibleUserIds));
    }
    case USER_ADD_NEW_FAILED: {
      const { message } = action;
      return state
        .setIn(['addNew', 'inProgress'], false)
        .setIn(['addNew', 'message'], message);
    }

    case USER_CHANGE_PAGE:
      return state
        .set('isLoading', true)
        .setIn(['pagination', 'selectedPage'], action.pageIndex);

    case USER_FETCH_SINGLE:
      return state.setIn(['user', action.id, 'isLoading'], true);

    case USER_FETCH_SINGLE_SUCCESS: {
      const { payload } = action;
      const { _id } = payload;

      return state.setIn(['user', _id], fromJS(payload));
    }

    case USER_FETCH_SINGLE_FAIL: {
      const { id, errorMsg } = action;

      return state.setIn(['user', id], fromJS({ error: errorMsg }));
    }

    case USER_UPDATE: {
      return state
        .setIn(['update', 'inProgress'], true)
        .setIn(['update', 'message'], '');
    }

    case USER_UPDATE_SUCCESS: {
      const { _id } = action.data;

      return state
        .setIn(['update', 'inProgress'], false)
        .setIn(['user', _id], fromJS(action.data));
    }

    case USER_UPDATE_FAIL: {
      const { errorMsg } = action;

      return state
        .setIn(['update', 'inProgress'], false)
        .setIn(['update', 'message'], errorMsg);
    }

    default:
      return state;
  }
}

export default userReducer;
