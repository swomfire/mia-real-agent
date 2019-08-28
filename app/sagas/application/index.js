import {
  takeEvery, call, put, select, takeLatest, take,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import { notification } from 'antd';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import {
  SUBMIT, actions, APPLICATION_CHANGE_PAGE,
  APPLICATION_ADMIN_GET_ALL, APPLICATION_SORTING,
  APPLICATION_APPROVE, APPLICATION_REJECT, APPLICATION_REVIEW,
  APPLICATION_FETCH_SINGLE,
} from 'reducers/application';
import { getSkipLimit } from 'utils/func-utils';
import { getSelectedPage, getSizePerPage, reselectSorting } from 'selectors/application';
import * as ApplicationApi from '../../api/application';
import * as UploadApi from '../../api/upload';
import { APPLICATION_CHECK_NICKNAME, APPLICATION_FORM_VALIDATE_STEP } from '../../reducers/application';

function* uploadApplicationFile(file) {
  const { error, response } = yield call(UploadApi.uploadFile, file);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.submitFailAction(message));
    return null;
  }
  const { fileUrl } = response;
  return {
    url: fileUrl,
  };
}

function* handleExperienceCertificate(educations) {
  const mappedEducations = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const education of educations) {
    const { certificate, ...rest } = education;
    const certificateUrls = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const certificateFile of certificate) {
      const { url } = yield uploadApplicationFile(certificateFile);
      certificateUrls.push(url);
    }
    mappedEducations.push({ ...rest, certificate: certificateUrls });
  }
  return mappedEducations;
}

function* submitApplication({ payload }) {
  const { application } = payload;
  const { cv, educations, ...rest } = application;
  const cvUrls = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const cvFile of cv) {
    const { url } = yield uploadApplicationFile(cvFile);
    cvUrls.push(url);
  }

  const mappedEducations = yield handleExperienceCertificate(educations);
  const { error, response } = yield call(ApplicationApi.createApplication, {
    ...rest,
    cv: cvUrls,
    educations: mappedEducations,
  });
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.submitFailAction(message));
    return;
  }

  const { data } = response;
  yield put(actions.submitCompleteAction(data));
}

function* queryTickets(action) {
  const applicationPayload = {};
  const { type } = action;
  switch (type) {
    case APPLICATION_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(applicationPayload, { sort: { [field]: order } });
      }
      break;
    case APPLICATION_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(applicationPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.applicationAdminGetAll(applicationPayload));
}

function* adminGetAllApplication({ payload }) {
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

  const { response, error } = yield call(ApplicationApi.adminGetAllApplication, params);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.getAllApplicationFailAction(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.getAllApplicationCompleteAction(result, totalRecord));
}


function* approveApplication(action) {
  const { applicationId } = action;
  const { response, error } = yield call(ApplicationApi.approveApplication, applicationId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.applicationApproveFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.applicationApproveComplete(data));
}

function* rejectApplication(action) {
  const { applicationId } = action;
  const { response, error } = yield call(ApplicationApi.rejectApplication, applicationId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.applicationRejectFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.applicationRejectComplete(data));
}

function* reviewApplication(action) {
  const { applicationId } = action;
  const { response, error } = yield call(ApplicationApi.reviewApplication, applicationId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.applicationReviewFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.applicationReviewComplete(data));
}

function* applicationFetchSingle({ id }) {
  const { response } = yield call(ApplicationApi.get, id);
  const error = _get(response, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(actions.fetchApplicationSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(actions.fetchApplicationSingleComplete(data));
  }
}

function* checkNickname({ payload }) {
  const { nickname } = payload;
  try {
    const { response } = yield call(ApplicationApi.checkNicknameExisted, nickname);
    const data = _get(response, 'data', {});
    const { result } = data;
    if (result === 0) {
      yield put(actions.checkNicknameCompleteAction(data));
    } else {
      throw new Error('nickname existed');
    }
  } catch (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(actions.checkNicknameFailAction(errMsg));
    notification.error({ message: errMsg });
  }
}

function* validateFormStep({
  payload: data,
}) {
  const {
    validateFuncAction,
    payload,
    completeActionType,
    failActionType,
  } = data;
  yield put(validateFuncAction(payload));
  const { payload: response } = yield take([completeActionType, failActionType]);
  const { errorMessage } = response;
  if (errorMessage) {
    yield put(actions.applicationFormValidateStepFailAction(errorMessage));
  } else {
    yield put(actions.applicationFormValidateStepCompleteAction());
  }
}

function* ticketFlow() {
  yield takeEvery(SUBMIT, submitApplication);
  yield takeLatest([APPLICATION_CHANGE_PAGE, APPLICATION_SORTING], queryTickets);
  yield takeLatest(APPLICATION_ADMIN_GET_ALL, adminGetAllApplication);
  yield takeEvery(APPLICATION_APPROVE, approveApplication);
  yield takeEvery(APPLICATION_REJECT, rejectApplication);
  yield takeEvery(APPLICATION_REVIEW, reviewApplication);
  yield takeEvery(APPLICATION_FETCH_SINGLE, applicationFetchSingle);
  yield takeEvery(APPLICATION_CHECK_NICKNAME, checkNickname);
  yield takeEvery(APPLICATION_FORM_VALIDATE_STEP, validateFormStep);
}

export default ticketFlow;
