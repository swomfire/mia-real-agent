import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import {
  SUBMIT, actions,
} from 'reducers/review';
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
}

function* reviewFlow() {
  yield takeEvery(SUBMIT, submitReview);
}

export default reviewFlow;
