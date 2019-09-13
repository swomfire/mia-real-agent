import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import {
  actions, DASHBOARD_GET_TICKET_ACTIVITY, DASHBOARD_GET_APPLICATION_SUMMARY,
  DASHBOARD_GET_USER_SUMMARY,
} from 'reducers/admin';
import { getToken } from 'reducers/auth';
import * as TicketApi from '../../api/ticket';
import * as ApplicationApi from '../../api/application';
import * as UserApi from '../../api/user';
import { configToken } from '../../api/config';

function* getDashboardTicketActivity() {
  const { response, error } = yield call(TicketApi.getActivity);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.dashboardGetTicketActivityFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.dashboardGetTicketActivitySuccess(data));
}

function* getDashboardApplicationSummary() {
  const { response, error } = yield call(ApplicationApi.getApplicationSummary);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.dashboardGetApplicationSummaryFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.dashboardGetApplicationSummarySuccess(data));
}

function* getDashboardUserSummary() {
  const { response, error } = yield call(UserApi.getUserSummary);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.dashboardGetUserSummaryFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.dashboardGetUserSummarySuccess(data));
}

export function* configAxiosForAdmin() {
  const token = yield select(getToken);
  configToken(token);
}

function* ticketFlow() {
  yield takeEvery(DASHBOARD_GET_TICKET_ACTIVITY, getDashboardTicketActivity);
  yield takeEvery(DASHBOARD_GET_APPLICATION_SUMMARY, getDashboardApplicationSummary);
  yield takeEvery(DASHBOARD_GET_USER_SUMMARY, getDashboardUserSummary);
}

export default ticketFlow;
