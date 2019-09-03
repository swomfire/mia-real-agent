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
} from 'selectors/feedback';
import {
  actions, FEEDBACK_SUBMIT, FEEDBACK_GET_ALL,
  FEEDBACK_SORTING, FEEDBACK_CHANGE_PAGE,
  // FEEDBACK_FETCH_SINGLE,
} from '../../reducers/feedbacks';
import {
  AUTH_LOGIN_SUCCESS,
} from '../../reducers/auth';
import * as FeedbackApi from '../../api/feedback';

function* queryFeedbacks(action) {
  const feedbackPayload = {};
  const { type } = action;
  switch (type) {
    case FEEDBACK_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(feedbackPayload, { sort: { [field]: order } });
      }
      break;
    case FEEDBACK_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(feedbackPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.feedbackAdminGetAll(feedbackPayload));
}

function* createFeedback({ payload }) {
  const { error, response } = yield call(FeedbackApi.createFeedback, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.submitFeedbackFailed(message));
    return;
  }

  const { data } = response;
  yield put(actions.submitFeedbackSuccess(data));
}

function* getAllFeedback({ payload }) {
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

  const { response, error } = yield call(FeedbackApi.adminGetAllFeedback, params);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.getAllFeedbackFailAction(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.getAllFeedbackCompleteAction(result, totalRecord));
}

function* feedbackFetchSingle({ id }) {
  try {
    const { response, error } = yield call(FeedbackApi.get, id);
    const data = _get(response, 'data', {});
    if (error) {
      throw new Error(error);
    }
    yield put(actions.fetchFeedbackSingleSuccess(data));
  } catch (error) {
    const errMsg = error.message || error;
    yield put(actions.fetchFeedbackSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  }
}

function* feedbackFlow() {
  yield take(AUTH_LOGIN_SUCCESS);
  yield all([
    takeLatest(FEEDBACK_SUBMIT, createFeedback),
    takeLatest(FEEDBACK_GET_ALL, getAllFeedback),
    takeLatest([FEEDBACK_CHANGE_PAGE, FEEDBACK_SORTING], queryFeedbacks),
    // takeLatest(FEEDBACK_FETCH_SINGLE, feedbackFetchSingle),
  ]);
}

export default feedbackFlow;
