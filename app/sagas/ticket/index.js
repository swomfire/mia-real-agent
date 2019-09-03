import {
  call, put, select,
  takeLatest, take, all,
} from 'redux-saga/effects';
// lodash
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import _isEmpty from 'lodash/isEmpty';
// utils
import { getSkipLimit } from 'utils/func-utils';
import history from 'utils/history';

import { notification } from 'antd';
import {
  getSelectedPage, getSizePerPage, reselectSorting, getTicketById,
} from 'selectors/ticket';
import {
  actions, TICKET_CREATE, TICKET_GET_ALL,
  TICKET_GET_DETAIL, TICKET_UPDATE, TICKET_ARCHIVE,
  TICKET_ADMIN_GET_ALL, TICKET_SORTING, TICKET_CHANGE_PAGE,
  TICKET_FETCH_SINGLE, TICKET_SET_CURRENT, TICKET_CLOSE, GET_TIKCET_PROFILE, TIKCET_RATING_SUBMIT,
} from '../../reducers/ticket';
import { actions as CONVERSATION_ACTIONS } from '../../reducers/conversations';
import {
  AUTH_LOGIN_SUCCESS,
} from '../../reducers/auth';
import * as TicketApi from '../../api/ticket';

function* queryTickets(action) {
  const ticketPayload = {};
  const { type } = action;
  switch (type) {
    case TICKET_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(ticketPayload, { sort: { [field]: order } });
      }
      break;
    case TICKET_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(ticketPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.ticketAdminGetAll(ticketPayload));
}

function* createTicket({ payload }) {
  const { error, response } = yield call(TicketApi.createTicket, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.createFailAction(message));
    return;
  }

  const { data } = response;
  yield put(actions.createCompleteAction(data));
  const { conversationId } = data;
  yield put(CONVERSATION_ACTIONS.userJoinConversation(conversationId));
  yield put(CONVERSATION_ACTIONS.selectConversation(conversationId));
  history.push(`/conversation/${conversationId}`);
}

function* getAllTicket({ payload }) {
  const { response, error } = yield call(TicketApi.getAllTicket, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.getAllTicketFailAction(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.getAllTicketCompleteAction(result, totalRecord));
}

function* adminGetAllTicket({ payload }) {
  const selectedPage = yield select(getSelectedPage);
  const sizePerPage = yield select(getSizePerPage);
  const sorting = yield select(reselectSorting);

  const { skip, limit } = getSkipLimit(selectedPage, sizePerPage);
  const { field, order } = sorting;
  const sort = { [field]: order };

  const actionParam = _pickBy(
    _pick(payload, ['skip', 'limit', 'sort']),
    v => v !== null && v !== undefined,
  );

  const params = {
    sort,
    skip,
    limit,
    ...actionParam,
  };

  const { response, error } = yield call(TicketApi.adminGetAllTicket, params);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.getAllTicketFailAction(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.getAllTicketCompleteAction(result, totalRecord));
}

function* getTicket({ payload }) {
  const { ticketId } = payload;
  try {
    const { response, error } = yield call(TicketApi.getTicket, ticketId);
    if (error) {
      throw new Error(_get(
        error, 'response.data.message', error.message
      ));
    }
    const { data } = response;
    yield put(actions.getCompleteAction(data));
  } catch (error) {
    const message = error.message || error;
    notification.error({ message });
    yield put(actions.getFailAction(message));
  }
}

function* archiveTicket({ payload }) {
  const { ticketId } = payload;
  try {
    const { response } = yield call(TicketApi.updateTicket, { ticketId, archived: true });
    const { data } = response;
    yield put(actions.archiveCompleteAction(data));
    notification.success({ message: 'Ticket archived' });
  } catch (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(actions.archiveFailAction(message));
  }
}

function* updateTicket({ payload }) {
  const { ticket } = payload;
  const { response, error } = yield call(TicketApi.updateTicket, ticket);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.updateFailAction(message));
    return;
  }
  const { data } = response;
  yield put(actions.updateCompleteAction(data));
}

function* closeTicket({ payload }) {
  const { ticketId, status, unsolvedReason } = payload;
  const { response, error } = yield call(TicketApi.closeTicket, ticketId, status, unsolvedReason);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.closeFailAction(message));
    notification.error({ message });
    return;
  }
  const { data } = response;
  yield put(actions.closeCompleteAction(data));
  notification.success({ message: 'Ticket closed' });
}

function* ticketFetchSingle({ id }) {
  try {
    const { response, error } = yield call(TicketApi.get, id);
    const data = _get(response, 'data', {});
    if (error) {
      throw new Error(error);
    }
    yield put(actions.fetchTicketSingleSuccess(data));
  } catch (error) {
    const errMsg = error.message || error;
    yield put(actions.fetchTicketSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  }
}

function* setCurrentTicket({ payload }) {
  const { ticketId } = payload;
  const ticket = yield select(getTicketById, ticketId);
  if (_isEmpty(ticket)) {
    yield put(actions.getAction(ticketId));
  }
}

function* getTicketProfile({ payload }) {
  const { ticketId } = payload;
  try {
    const { response, error } = yield call(TicketApi.getProfile, ticketId);
    const data = _get(response, 'data', {});
    if (error) {
      throw new Error(error);
    }
    const { ownerProfile, assigneeProfile } = data;
    yield put(actions.getTicketProfileSuccess(ticketId, ownerProfile, assigneeProfile));
  } catch (error) {
    const errMsg = error.message || error;
    yield put(actions.getTicketProfileFail(errMsg));
    notification.error({ message: errMsg });
  }
}

function* submitTicketRating({ payload }) {
  const { conversationId, rating } = payload;
  try {
    const { response, error } = yield call(TicketApi.submitRating, conversationId, rating);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});
    notification.success({ message: 'Rating submitted' });
    yield put(actions.submitTicketRatingSuccess(data));
  } catch (error) {
    const errorMessage = error.message || error;
    notification.error({ message: errorMessage });
    yield put(actions.submitTicketRatingFailed(errorMessage));
  }
}

function* ticketFlow() {
  yield take(AUTH_LOGIN_SUCCESS);
  yield all([
    takeLatest(TICKET_CREATE, createTicket),
    takeLatest(TICKET_GET_ALL, getAllTicket),
    takeLatest(TICKET_GET_DETAIL, getTicket),
    takeLatest(TICKET_UPDATE, updateTicket),
    takeLatest(TICKET_CLOSE, closeTicket),
    takeLatest(TICKET_ARCHIVE, archiveTicket),
    takeLatest([TICKET_CHANGE_PAGE, TICKET_SORTING], queryTickets),
    takeLatest(TICKET_ADMIN_GET_ALL, adminGetAllTicket),
    takeLatest(TICKET_FETCH_SINGLE, ticketFetchSingle),
    takeLatest(TICKET_SET_CURRENT, setCurrentTicket),
    takeLatest(GET_TIKCET_PROFILE, getTicketProfile),
    takeLatest(TIKCET_RATING_SUBMIT, submitTicketRating),
  ]);
}

export default ticketFlow;
