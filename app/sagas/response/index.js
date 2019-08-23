import {
  call, put,
  takeLatest, take, all,
} from 'redux-saga/effects';
// lodash
import _get from 'lodash/get';
import _assign from 'lodash/assign';

// utils
import { getSkipLimit } from 'utils/func-utils';

import {
  actions, RESPONSE_CREATE, RESPONSE_GET_ALL,
  RESPONSE_UPDATE, RESPONSE_SORTING, RESPONSE_CHANGE_PAGE,
} from '../../reducers/response';
import {
  AUTH_LOGIN_SUCCESS,
} from '../../reducers/auth';
import * as ResponseApi from '../../api/response';
import { notification } from 'antd';
import { toI18n } from '../../utils/func-utils';

function* queryResponses(action) {
  const responsePayload = {};
  const { type } = action;
  switch (type) {
    case RESPONSE_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(responsePayload, { sort: { [field]: order } });
      }
      break;
    case RESPONSE_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(responsePayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.responseAdminGetAll(responsePayload));
}

function* createResponse({ payload }) {
  const { error, response } = yield call(ResponseApi.createResponse, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.createFailAction(message));
    return;
  }

  const { data } = response;
  notification.success({ message: toI18n('ADMIN_RESPONSE_ADD_SUCCESS') });
  yield put(actions.createCompleteAction(data));
}

function* getAllResponse({ payload }) {
  const { response, error } = yield call(ResponseApi.adminGetAllResponse, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.getAllResponseFailAction(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.getAllResponseCompleteAction(result, totalRecord));
}


function* updateResponse({ payload }) {
  const { response } = payload;
  const { response: result, error } = yield call(ResponseApi.updateResponse, response);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.updateFailAction(message));
    return;
  }
  const { data } = result;
  notification.success({ message: toI18n('ADMIN_RESPONSE_EDIT_SUCCESS') });
  yield put(actions.updateCompleteAction(data));
}

function* responseFlow() {
  yield take(AUTH_LOGIN_SUCCESS);
  yield all([
    takeLatest(RESPONSE_CREATE, createResponse),
    takeLatest(RESPONSE_GET_ALL, getAllResponse),
    takeLatest(RESPONSE_UPDATE, updateResponse),
    takeLatest([RESPONSE_CHANGE_PAGE, RESPONSE_SORTING], queryResponses),
  ]);
}

export default responseFlow;
