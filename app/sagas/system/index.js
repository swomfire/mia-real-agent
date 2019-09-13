import {
  takeEvery,
  call, put, select,
} from 'redux-saga/effects';
import * as SystemAPI from '../../api/system';
import { FETCH_CURRENT_VERSION, fetchCurrentVersionFail, fetchCurrentVersionComplete, getSystem, updateSystemComplete, updateSystemFail, UPDATE_SYSTEM } from '../../reducers/system';
import { notification } from 'antd';
import { toI18n } from '../../utils/func-utils';

function* fetchCurrentVersion() {
  try {
    const { response, error } = yield call(SystemAPI.getCurrentSystem);
    if (error) throw new Error(error);
    const { data } = response;
    yield put(fetchCurrentVersionComplete(data));
  } catch (error) {
    yield put(fetchCurrentVersionFail(error.message || error));
  }
}

function* updateSystem({ payload }) {
  try {
    const { system } = payload;
    const { _id } = yield select(getSystem);
    const { response, error } = yield call(SystemAPI.updateSystem, _id, system);
    if (error) throw new Error(error);
    const { data } = response;
    notification.success({ message: toI18n('SYSTEM_UPDATE_SUCCESS') });
    yield put(updateSystemComplete(data));
  } catch (error) {
    yield put(updateSystemFail(error.message || error));
  }
}

function* repliesSaga() {
  yield takeEvery(FETCH_CURRENT_VERSION, fetchCurrentVersion);
  yield takeEvery(UPDATE_SYSTEM, updateSystem);
}

export default repliesSaga;
