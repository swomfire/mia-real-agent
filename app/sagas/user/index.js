import {
  call, put, take, takeEvery, select,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
// lodash
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import _assign from 'lodash/assign';

// utils
import { getSkipLimit } from 'utils/func-utils';

// selector
import {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/user';
// actions
import {
  USER_FETCH_LIST,
  USER_SORTING,
  USER_ADD_NEW,
  USER_CHANGE_PAGE,
  USER_FETCH_SINGLE,
  USER_UPDATE,
  USER_REMOVE,
  USER_SEND_MAIL,
  actions as userActions,
} from 'reducers/user';
import * as UserAPI from 'api/user';

function* queryUsers(action) {
  const userPayload = {};
  const { type } = action;
  switch (type) {
    case USER_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(userPayload, { sort: { [field]: order } });
      }
      break;
    case USER_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(userPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(userActions.fetchListUser(userPayload));
}

function* fetchList({ payload }) {
  const selectedPage = yield select(getSelectedPage);
  const sizePerPage = yield select(getSizePerPage);
  const { skip, limit } = getSkipLimit(selectedPage, sizePerPage);

  const actionParam = _pickBy(
    _pick(payload, ['skip', 'limit', 'sort']),
    v => v !== null && v !== undefined,
  );
  const sorting = yield select(reselectSorting);
  const { field, order } = sorting;
  const sort = { [field]: order };

  const params = {
    sort,
    skip,
    limit,
    ...actionParam,
  };

  const result = yield call(UserAPI.list, params);
  const response = _get(result, 'response', {});
  const error = _get(result, 'error');
  const data = _get(response, 'data.result', []);
  const totalCount = _get(response, 'data.totalRecord', 0);
  if (error || response.status !== 200) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(userActions.fetchListUserFail(errMsg));
  } else {
    yield put(userActions.fetchListUserSuccess(data, totalCount));
  }
}

function* addNewUser({ payload }) {
  const userResult = yield call(UserAPI.insert, payload);
  const response = _get(userResult, 'response', {});
  const error = _get(userResult, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(userActions.addNewUserFail(errMsg));
    notification.error({ message: errMsg });
  } else {
    const { _id } = data;
    yield put(userActions.addNewUserSuccess(data));
    notification.success({ message: 'New user has been added' });
    yield put(push(`admin/user/${_id}`));
  }
}

function* userFetchSingle({ id }) {
  const userResult = yield call(UserAPI.get, id);
  const response = _get(userResult, 'response', {});
  const error = _get(userResult, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(userActions.fetchUserSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(userActions.fetchUserSingleSuccess(data));
  }
}

function* userUpdate({ payload }) {
  const { _id: id } = payload;
  const userResult = yield call(UserAPI.update, id, payload);
  const response = _get(userResult, 'response', {});
  const error = _get(userResult, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(userActions.updateUserFail(errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(userActions.updateUserSuccess(data));
    notification.success({ message: 'User update success' });
    yield put(push(`/user/${id}`));
  }
}

function* userRemove({ userId }) {
  const { response, error } = yield call(UserAPI.remove, userId);
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(userActions.removeUserFail(errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(userActions.removeUserSuccess(data));
    notification.success({ message: 'User remove success' });
    yield put(push('/admin/user'));
  }
}

function* sendMail() {
  const { error } = yield call(UserAPI.sendMail);
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    notification.error({ message: errMsg });
  } else {
    notification.success({ message: 'Send Mail success' });
  }
}


function* userFlow() {
  yield takeEvery([USER_SORTING, USER_CHANGE_PAGE], queryUsers);
  yield takeEvery(USER_ADD_NEW, addNewUser);
  yield takeEvery(USER_FETCH_SINGLE, userFetchSingle);
  yield takeEvery(USER_UPDATE, userUpdate);
  yield takeEvery(USER_REMOVE, userRemove);
  yield takeEvery(USER_SEND_MAIL, sendMail);
  while (1) {
    const action = yield take(USER_FETCH_LIST);
    yield call(fetchList, action);
  }
}

export default userFlow;
