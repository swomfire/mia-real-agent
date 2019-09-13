import { all, put, take } from 'redux-saga/effects';
import { configAxios } from '../api/config';
import { CLEAR_TRANSACTION, REHYDRATE_COMPLETE } from '../reducers';
import authSaga from './auth';
import socketioSaga from './socketio';
import profileSaga from './profile';
import ticketSaga from './ticket';
import ticketWarningSaga from './ticketWarning';
import userSaga from './user';
import adminSaga from './admin';
import applicationSaga from './application';
import intentSaga from './intent';
import conversationSaga from './conversations';
import feedbackSaga from './feedbacks';
import repliesSaga from './replies';
import responseSaga from './response';
import agentsSaga from './agents';
import cannedResponseSaga from './cannedResponse';
import systemSaga from './system';
import { FETCH_CURRENT_VERSION } from '../reducers/system';
import { FETCH_DETAIL } from '../reducers/profile';

export default function* rootSagas() {
  configAxios();
  yield all([
    put({
      type: CLEAR_TRANSACTION,
    }),
    take(REHYDRATE_COMPLETE),
  ]);

  yield all([
    authSaga(),
    socketioSaga(),
    profileSaga(),
    ticketSaga(),
    ticketWarningSaga(),
    userSaga(),
    applicationSaga(),
    adminSaga(),
    conversationSaga(),
    feedbackSaga(),
    repliesSaga(),
    agentsSaga(),
    intentSaga(),
    responseSaga(),
    cannedResponseSaga(),
    systemSaga(),
    put({
      type: FETCH_CURRENT_VERSION,
    }),
    put({
      type: FETCH_DETAIL,
    }),
  ]);
}
