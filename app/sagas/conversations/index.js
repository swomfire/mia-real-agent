import {
  takeLatest, call, put, select, takeEvery,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import {
  getConversation, getConversationMessage, getOpenSupportConversation,
  requestEndSupport, confirmEndSupport,
} from '../../api/conversation';
import {
  CONVERSATION_FETCH,
  actions,
  CONVERSATION_SET_CURRENT,
  getConverationById,
  fetchConversation as fetchConversationAction,
  CONVERSATION_FETCH_ALL_OPEN_SUPPORT,
} from '../../reducers/conversations';
import {
  REPLIES_FETCH,
  fetchReplyMessagesSuccess,
  fetchReplyMessagesFailed,
  getReplyMessagesByConversationId,
  fetchReplyMessages,
} from '../../reducers/replies';
import { REQUEST_END_SUPPORT, CONFIRM_END_SUPPORT, actions as SUPPORT_ACTION } from '../../reducers/supports';

function* fetchConversationMessages({ payload }) {
  const { conversationId } = payload;
  if (!conversationId) return;
  try {
    const { response, error } = yield call(getConversationMessage, conversationId);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(fetchReplyMessagesSuccess(conversationId, data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversationMessages] ERROR:', error.message);
    yield put(fetchReplyMessagesFailed(conversationId, error.message || error));
  }
}

function* setCurrentConversation({ payload }) {
  const { conversationId } = payload;
  const conversation = yield select(getConverationById, conversationId);
  const replies = yield select(getReplyMessagesByConversationId, conversationId);
  if (_isEmpty(conversation)) {
    yield put(fetchConversationAction(conversationId));
  }
  if (_isEmpty(replies)) {
    yield put(fetchReplyMessages(conversationId));
  }
}

function* fetchConversation({ payload }) {
  const { conversationId } = payload;
  try {
    const { response, error } = yield call(getConversation, conversationId);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(actions.fetchConversationSuccess(data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversation] ERROR:', error.message);
    yield put(actions.fetchConversationFailed(error.message || error));
  }
}

function* fetchAllOpenSupportConversation() {
  try {
    const { response, error } = yield call(getOpenSupportConversation);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(actions.fetchOpenSupportConversationSuccess(data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversation] ERROR:', error.message);
    yield put(actions.fetchOpenSupportConversationFailed(error.message || error));
  }
}

function* requestEndSupportFlow({ payload }) {
  const { conversationId, status } = payload;
  try {
    const { response, error } = yield call(requestEndSupport, conversationId, status);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(SUPPORT_ACTION.requestEndSupportSuccess(data));
  } catch (error) {
    yield put(SUPPORT_ACTION.requestEndSupportFailed(error.message || error));
  }
}

function* confirmEndSupportFlow({ payload }) {
  const { conversationId, status } = payload;
  try {
    const { response, error } = yield call(confirmEndSupport, conversationId, status);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(SUPPORT_ACTION.confirmEndSupportSuccess(data));
  } catch (error) {
    yield put(SUPPORT_ACTION.confirmEndSupportFailed(error.message || error));
  }
}

function* conversationFlow() {
  yield takeLatest(CONVERSATION_FETCH, fetchConversation);
  yield takeLatest(CONVERSATION_FETCH_ALL_OPEN_SUPPORT, fetchAllOpenSupportConversation);
  yield takeLatest(CONVERSATION_SET_CURRENT, setCurrentConversation);
  yield takeEvery(REPLIES_FETCH, fetchConversationMessages);
  yield takeLatest(REQUEST_END_SUPPORT, requestEndSupportFlow);
  yield takeLatest(CONFIRM_END_SUPPORT, confirmEndSupportFlow);
}

export default conversationFlow;
