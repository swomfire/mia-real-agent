import {
  call, put, select,
  takeLatest, take, all,
} from 'redux-saga/effects';
// lodash
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
// utils
import { getSkipLimit } from 'utils/func-utils';

import { notification } from 'antd';
import {
  getSelectedPage, getSizePerPage, reselectSorting,
} from 'selectors/ticketWarning';
import {
  actions, TICKET_WARNING_ADMIN_GET_ALL, TICKET_WARNING_SORTING, TICKET_WARNING_CHANGE_PAGE,
  TICKET_WARNING_FETCH_SINGLE,
} from '../../reducers/ticketWarning';
import {
  AUTH_LOGIN_SUCCESS,
} from '../../reducers/auth';
import * as TicketApi from '../../api/ticket';

function* queryTickets(action) {
  const ticketWarningPayload = {};
  const { type } = action;
  switch (type) {
    case TICKET_WARNING_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(ticketWarningPayload, { sort: { [field]: order } });
      }
      break;
    case TICKET_WARNING_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(ticketWarningPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.ticketWarningAdminGetAll(ticketWarningPayload));
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

  const { response, error } = yield call(TicketApi.adminGetAllTicketWarning, params);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.ticketWarningAdminGetAllFail(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.ticketWarningAdminGetAllComplete(result, totalRecord));
}

function* ticketWarningFetchSingle({ id }) {
  try {
    const { response, error } = yield call(TicketApi.getWarning, id);
    const data = _get(response, 'data', {});
    if (error) {
      throw new Error(error);
    }
    yield put(actions.fetchTicketWarningSingleSuccess(data));
  } catch (error) {
    const errMsg = error.message || error;
    yield put(actions.fetchTicketWarningSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  }
}

function* ticketWarningFlow() {
  yield take(AUTH_LOGIN_SUCCESS);
  yield all([
    takeLatest([TICKET_WARNING_CHANGE_PAGE, TICKET_WARNING_SORTING], queryTickets),
    takeLatest(TICKET_WARNING_ADMIN_GET_ALL, adminGetAllTicket),
    takeLatest(TICKET_WARNING_FETCH_SINGLE, ticketWarningFetchSingle),
  ]);
}

export default ticketWarningFlow;
