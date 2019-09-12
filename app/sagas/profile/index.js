import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import { notification } from 'antd';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import {
  FETCH_DETAIL, actions, CHECK_PASSWORD,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  USER_ADD_CREDIT_CARD,
} from '../../reducers/profile';
import {
  getUserId,
  updateToken,
} from '../../reducers/auth';
import * as UserApi from '../../api/user';
import { handleEmailCensor } from './utils';

function* fetchDetail() {
  const userId = yield select(getUserId);
  const { response: { data }, error } = yield call(UserApi.getUserProfile, userId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.fetchDetailFailAction(message));
    return;
  }
  const { email } = data;
  yield put(actions.fetchDetailCompleteAction({
    ...data,
    email: handleEmailCensor(email),
  }));
}

function* checkPassword({ payload }) {
  const { password } = payload;
  const userId = yield select(getUserId);
  const { response, error } = yield call(UserApi.checkPassword, userId, password);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.checkPasswordFailAction(message));
  }
  const { data } = response;
  const { confirmed } = data;
  yield put(actions.checkPasswordCompleteAction(confirmed));
}

function* updateProfile({ payload }) {
  const userId = yield select(getUserId);
  const { profile } = payload;
  const { response, error } = yield call(UserApi.updateUserProfile, userId, profile);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.updateProfileFailAction(message));
  }
  const { data } = response;
  yield put(actions.updateProfileCompleteAction(data));
}

function* changePassword({ payload }) {
  try {
    const userId = yield select(getUserId);
    const { currentPassword, newPassword } = payload;
    const { response } = yield call(UserApi.changePassword, userId, currentPassword, newPassword);
    const { data } = response;
    const { token } = data;
    yield put(actions.changePasswordCompleteAction());
    yield put(updateToken(token));
  } catch (error) {
    yield put(actions.changePasswordFailAction(error));
  }
}

function* addCreditCard({ payload }) {
  const { card } = payload;
  const userId = yield select(getUserId);
  try {
    const { data } = yield call(UserApi.addCreditCard, userId, card);
    notification.success({ message: 'Card Added to account' });
    yield put(actions.addCreditCardSuccess(data));
  } catch (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    notification.error({ message: errMsg });
    yield put(actions.addCreditCardFail(errMsg));
  }
}

function* profileFlow() {
  yield takeEvery(FETCH_DETAIL, fetchDetail);
  yield takeEvery(UPDATE_PROFILE, updateProfile);
  yield takeEvery(CHECK_PASSWORD, checkPassword);
  yield takeEvery(CHANGE_PASSWORD, changePassword);
  yield takeEvery(USER_ADD_CREDIT_CARD, addCreditCard);
}

export default profileFlow;
