import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import {
  AGENTS_FIND,
  AGENT_CONFIRM,
  findAgentRequestFailed,
  findAgentRequestSuccess,
  agentConfirmSuccessAction,
  agentConfirmFailAction,
  actions as REQUEST_ACTIONS,
} from '../../reducers/requests';
import {
  AGENT_CONFIRM as AGENT_CONFIRM_SUPPORT,
  actions as SUPPORT_ACTIONS,
  AGENTS_FIND_SUPPORT,
} from '../../reducers/supports';
import {
  getConversationById,
  actions as CONVERSATION_ACTIONS,
  selectConversation,
} from '../../reducers/conversations';
import {
  actions,
} from '../../reducers/ticket';
import { findAgent, findSupportAgent } from '../../api/ticket';
import { acceptAgent, acceptSupportAgent } from '../../api/agent';

export function* findAvailableAgent({ payload }) {
  const { conversationId } = payload;
  const conversation = yield select(getConversationById, conversationId);
  const { error } = yield call(findAgent, conversation.ticketId);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(findAgentRequestFailed(conversationId, message));
    return;
  }
  notification.success({ message: 'Agent found' });
  yield put(findAgentRequestSuccess(conversationId));
}

export function* findAvailableSupportAgent({ payload }) {
  const { ticketId } = payload;
  const { error } = yield call(findSupportAgent, ticketId);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(findAgentRequestFailed(ticketId, message));
    return;
  }
  notification.success({ message: 'Agent found' });
  yield put(findAgentRequestSuccess(ticketId));
}

export function* confirmRequest({ payload }) {
  const {
    conversationId,
    ticketId,
    isConfirm,
  } = payload;
  const { error } = yield call(acceptAgent, conversationId, ticketId, isConfirm);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(agentConfirmFailAction(message));
    return;
  }
  yield put(agentConfirmSuccessAction());
  yield put(actions.getAllTicketAction());
  yield put(selectConversation(conversationId));
  yield put(CONVERSATION_ACTIONS.userJoinConversation(conversationId));
  if (isConfirm) {
    yield put(push(`/conversation/${conversationId}`));
  }
  yield put(REQUEST_ACTIONS.removeRequest(ticketId));
}

export function* confirmSupportRequest({ payload }) {
  const {
    ticketId,
    isConfirm,
  } = payload;
  const { error } = yield call(acceptSupportAgent, ticketId, isConfirm);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(SUPPORT_ACTIONS.agentConfirmFailAction(message));
    return;
  }
  yield put(SUPPORT_ACTIONS.agentConfirmSuccessAction());
  yield put(CONVERSATION_ACTIONS.fetchOpenSupportConversation());
  // Handle confirm ticket
  yield put(SUPPORT_ACTIONS.removeSupport(ticketId));
}

function* agentFlow() {
  yield takeLatest(AGENTS_FIND, findAvailableAgent);
  yield takeLatest(AGENTS_FIND_SUPPORT, findAvailableSupportAgent);
  yield takeLatest(AGENT_CONFIRM, confirmRequest);
  yield takeLatest(AGENT_CONFIRM_SUPPORT, confirmSupportRequest);
}

export default agentFlow;
