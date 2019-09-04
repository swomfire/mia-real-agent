import { connect } from 'react-redux';
import * as Yup from 'yup';
import history from 'utils/history';
import {
  getIsEditting, getEditError,
  getApplicationDetailFromRoute, getApplicationIdFromRoute,
} from 'selectors/application';
import EditDetail from '../../components/Generals/EditDetail';
import { toI18n } from '../../utils/func-utils';
import { actions } from '../../reducers/application';

const validateSchema = {
  billingRate: Yup.number().required(toI18n('FORM_REQUIRED')),
};

const fields = [{
  name: 'billingRate',
  type: 'number',
  label: toI18n('ADMIN_APPLICATION_DETAIL_EDIT_RATE'),
  login: 1,
}];

const mapStateToProps = (state) => {
  const applicationId = getApplicationIdFromRoute(state);
  const { billingRate = 0 } = getApplicationDetailFromRoute(state);
  return {
    isLoading: getIsEditting(state),
    submitError: getEditError(state),
    initialValues: {
      billingRate,
    },
    validateSchema,
    fields,
    title: toI18n('ADMIN_APPLICATION_DETAIL_EDIT_TITLE'),
    additionalSubmitValues: {
      applicationId,
    },
    onCancel: () => history.push(`/admin/applications/${applicationId}`),
    onComplete: () => history.push(`/admin/applications/${applicationId}`),
  };
};

const mapDispatchToProps = {
  onSubmit: actions.applicationDetailEditAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDetail);
