import {
  takeEvery, call, put, select, takeLatest, take,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import { notification } from 'antd';
import {
  SUBMIT, actions, APPLICATION_CHANGE_PAGE, APPLICATION_PENDING,
  APPLICATION_ADMIN_GET_ALL, APPLICATION_SORTING,
  APPLICATION_APPROVE, APPLICATION_REJECT, APPLICATION_REVIEW,
  APPLICATION_FETCH_SINGLE, APPLICATION_DETAIL_EDIT,
  APPLICATION_CHECK_INFO, APPLICATION_FORM_VALIDATE_STEP,
} from 'reducers/application';
import { getSkipLimit, toI18n } from 'utils/func-utils';
import { getSelectedPage, getSizePerPage, reselectSorting } from 'selectors/application';
import * as ApplicationApi from '../../api/application';
import * as UploadApi from '../../api/upload';

function* uploadApplicationFile(file) {
  const { error, response } = yield call(UploadApi.uploadFile, file);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
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
      error, 'response.data.message', error.message
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
      error, 'response.data.message', error.message
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
      error, 'response.data.message', error.message
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
      error, 'response.data.message', error.message
    );
    yield put(actions.applicationReviewFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.applicationReviewComplete(data));
}

function* pendingApplication(action) {
  const { applicationId } = action;
  const { response, error } = yield call(ApplicationApi.pendingApplication, applicationId);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.applicationPendingFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.applicationPendingComplete(data));
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

function* checkBasicInfomation({ payload }) {
  const { nickname, email } = payload;
  try {
    const { response } = yield call(ApplicationApi.checkBasicInfomationExisted, nickname, email);
    const data = _get(response, 'data', {});
    const { nicknameResult, emailResult } = data;
    if (nicknameResult !== 0) {
      throw new Error('APPLICATION_BASIC_INFO_FORM_NICKNAME_EXISTED');
    } else if (emailResult !== 0) {
      throw new Error('APPLICATION_BASIC_INFO_FORM_EMAIL_EXISTED');
    } else {
      yield put(actions.checkInfoCompleteAction(data));
    }
  } catch (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(actions.checkInfoFailAction(errMsg));
    notification.error({ message: toI18n(errMsg) });
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

function* editApplication({ payload }) {
  const { application } = payload;
  const { applicationId, ...data } = application;
  const { response, error } = yield call(ApplicationApi.editApplication, applicationId, data);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(actions.applicationDetailEditFailAction(message));
    return;
  }
  const { data: responseData } = response;
  notification.success({ message: toI18n('ADMIN_APPLICATION_DETAIL_EDIT_COMPLETE') });
  yield put(actions.applicationDetailEditCompleteAction(responseData));
}

function* ticketFlow() {
  yield takeEvery(SUBMIT, submitApplication);
  yield takeLatest([APPLICATION_CHANGE_PAGE, APPLICATION_SORTING], queryTickets);
  yield takeLatest(APPLICATION_ADMIN_GET_ALL, adminGetAllApplication);
  yield takeEvery(APPLICATION_APPROVE, approveApplication);
  yield takeEvery(APPLICATION_REJECT, rejectApplication);
  yield takeEvery(APPLICATION_REVIEW, reviewApplication);
  yield takeEvery(APPLICATION_PENDING, pendingApplication);
  yield takeEvery(APPLICATION_FETCH_SINGLE, applicationFetchSingle);
  yield takeEvery(APPLICATION_CHECK_INFO, checkBasicInfomation);
  yield takeEvery(APPLICATION_FORM_VALIDATE_STEP, validateFormStep);
  yield takeEvery(APPLICATION_DETAIL_EDIT, editApplication);
}

export default ticketFlow;
