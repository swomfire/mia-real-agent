import {
  call, put, select,
  takeLatest, all,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import * as AuthApi from '../../api/auth';
import { getUserProfile } from '../../api/user';
import { configToken } from '../../api/config';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_CREATE_PASSWORD,
  AUTH_SEND_VERICATION_EMAIL,
  actions as authActions,
  getToken,
  getUserId,
  getVerifyingEmail,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
} from '../../reducers/auth';

// login handler
function* login({ payload }) {
  const { usernameOrEmail: loginEmail, password } = payload;
  const { response, error } = yield call(AuthApi.login, loginEmail, password);

  // login error
  if (error) {
    yield put(authActions.setVerifyingEmail(null));
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.loginFail(message));
    return;
  }

  const { data = {} } = response;
  const {
    email,
    role,
    token,
    userId,
    verifiedAt,
  } = data;

  // unverified account
  // if (!verifiedAt) {
  //   yield put(authActions.loginFail('Please verify your account'));
  //   yield put(authActions.setVerifyingEmail(email));
  //   return;
  // }

  // dispatch authInfo
  yield put(
    authActions.loginSuccess({
      email,
      role,
      token,
      userId,
      verifiedAt,
    })
  );
}

// registration handler
function* register({ payload }) {
  const { email, password } = payload;
  const { error } = yield call(AuthApi.register, payload);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.registerFail(message));
    return;
  }
  yield put(authActions.registerSucces());
  yield put(authActions.setVerifyingEmail(email));
  yield put(authActions.login({ usernameOrEmail: email, password }));
}

// create new password handler
// this function will handle when user update his/her password
function* createPassword({ payload }) {
  const { newPassword } = payload;
  const { error } = yield call(AuthApi.createPassword, newPassword);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.createPasswordFail(message));
    return;
  }

  yield put(authActions.createPasswordSuccess());
  yield put(authActions.logout());
}

function* sendVericationEmail() {
  const verifyingEmail = yield select(getVerifyingEmail);
  const { error } = yield call(
    AuthApi.sendVericationEmail,
    verifyingEmail,
  );
  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.sendVericationEmailFail(message));
    return;
  }

  yield put(authActions.sendVericationEmailSuccess());
}

export function* configAxiosForAuthenticate() {
  const token = yield select(getToken);

  configToken(token);
}

export function* checkToken() {
  const token = yield select(getToken);
  if (!token) {
    yield put(authActions.logout());
    return;
  }
  const userId = yield select(getUserId);
  if (!userId) {
    yield put(authActions.logout());
    return;
  }
  const { response, error } = yield call(getUserProfile, userId);
  if (error || !response) {
    yield put(authActions.logout());
    return;
  }
  const { data } = response;
  configAxiosForAuthenticate();
  yield put(authActions.loginSuccess({
    ...data,
    /* eslint-disable no-underscore-dangle */
    userId: data._id,
  }));
}


function* sendForgotPassword({ payload }) {
  const { email } = payload;
  const { error } = yield call(
    AuthApi.forgotPassword,
    email,
  );
  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.forgotPasswordFailAction(message));
    return;
  }

  yield put(authActions.forgotPasswordSuccessAction());
}


function* sendResetPassword({ payload }) {
  const { newPassword, token } = payload;
  const { error } = yield call(
    AuthApi.resetPassword,
    newPassword, token,
  );
  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.resetPasswordFailAction(message));
    return;
  }

  yield put(authActions.resetPasswordSuccessAction());
}

function* authFlow() {
  yield all([
    call(checkToken),
    takeLatest(AUTH_LOGIN, login),
    takeLatest(
      [AUTH_LOGIN_SUCCESS, AUTH_LOGOUT],
      configAxiosForAuthenticate,
    ),
    takeLatest(AUTH_REGISTER, register),
    takeLatest(AUTH_CREATE_PASSWORD, createPassword),
    takeLatest(AUTH_SEND_VERICATION_EMAIL, sendVericationEmail),
    takeLatest(AUTH_FORGOT_PASSWORD, sendForgotPassword),
    takeLatest(AUTH_RESET_PASSWORD, sendResetPassword),
  ]);
}

export default authFlow;
