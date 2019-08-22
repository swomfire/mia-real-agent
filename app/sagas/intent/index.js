import {
  takeEvery, call, put, select, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import { notification } from 'antd';
import {
  actions, INTENT_CHANGE_PAGE,
  INTENT_ADMIN_GET_ALL, INTENT_SORTING,
  INTENT_FETCH_SINGLE,
} from 'reducers/intent';
import { getSkipLimit } from 'utils/func-utils';
import { getSelectedPage, getSizePerPage, reselectSorting } from 'selectors/intent';
import * as IntentApi from '../../api/intent';

function* adminGetAllIntent({ payload }) {
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

  const { response, error } = yield call(IntentApi.adminGetAllIntent, params);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.getAllIntentFailAction(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.getAllIntentCompleteAction(result, totalRecord));
}

function* queryIntents(action) {
  const intentPayload = {};
  const { type } = action;
  switch (type) {
    case INTENT_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(intentPayload, { sort: { [field]: order } });
      }
      break;
    case INTENT_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(intentPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.intentAdminGetAll(intentPayload));
}

function* intentFetchSingle({ id }) {
  const { response } = yield call(IntentApi.get, id);
  const error = _get(response, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(actions.fetchIntentSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(actions.fetchIntentSingleComplete(data));
  }
}

function* ticketFlow() {
  yield takeLatest([INTENT_CHANGE_PAGE, INTENT_SORTING], queryIntents);
  yield takeLatest(INTENT_ADMIN_GET_ALL, adminGetAllIntent);
  yield takeEvery(INTENT_FETCH_SINGLE, intentFetchSingle);
}

export default ticketFlow;
