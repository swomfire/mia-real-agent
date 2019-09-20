import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import {
  SUBMIT, actions, REVIEW_FETCH_SINGLE_BY_TOKEN,
} from 'reducers/review';
import { actions as APPLICATION_ACTIONS } from 'reducers/application';
import { notification } from 'antd';
import * as ReviewApi from '../../api/review';
import { getUserId } from '../../reducers/auth';


function* submitReview({ payload }) {
  const { review, applicationId } = payload;
  const userId = yield select(getUserId);
  const { error, response } = yield call(ReviewApi.createReview,
    {
      fields: { ...review },
      applicationId,
      createdBy: userId,
    });
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(actions.submitFailAction(message));
    return;
  }

  const { data } = response;
  notification.success({ message: 'Request change submitted' });
  yield put(actions.submitCompleteAction(data));
  yield put(APPLICATION_ACTIONS.fetchApplicationSingle(applicationId));
}

function* getByToken({ payload }) {
  const { token } = payload;
  const { error, response } = yield call(ReviewApi.getByToken, token);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(actions.fetchReviewSingleByTokenFail(message));
    return;
  }

  const { data } = response;
  yield put(actions.fetchReviewSingleByTokenComplete(data));
}

function* reviewFlow() {
  yield takeEvery(SUBMIT, submitReview);
  yield takeEvery(REVIEW_FETCH_SINGLE_BY_TOKEN, getByToken);
}

export default reviewFlow;
