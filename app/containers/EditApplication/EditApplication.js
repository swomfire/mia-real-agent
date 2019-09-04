import { connect } from 'react-redux';
import * as Yup from 'yup';
import history from 'utils/history';
import {
  getIsEditting, getEditError, getIsLoading,
  getApplicationDetailFromRoute, getApplicationIdFromRoute,
} from 'selectors/application';
import EditDetail from '../../components/Generals/EditDetail';
import { toI18n } from '../../utils/func-utils';
import { actions } from '../../reducers/application';
import { CATEGORY_OPTIONS, AGENT_SKILL, APPLICATION_OPTION } from '../../../common/enums';

const validateSchema = {
  country: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  postcode: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  address: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  phoneNumber: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  categories: Yup.array().of(Yup.string()).required('Required'),
  billingRate: Yup.number().required(toI18n('FORM_REQUIRED')),
  skills: Yup.array().of(Yup.string()),
};

const fields = [
  {
    name: 'country',
    type: 'text',
    label: toI18n('APPLICATION_BASIC_INFO_FORM_COUNTRY'),
    login: 1,
  },
  {
    name: 'postcode',
    type: 'text',
    label: toI18n('APPLICATION_BASIC_INFO_FORM_POSTCODE'),
    login: 1,
  },
  {
    name: 'address',
    type: 'text',
    label: toI18n('APPLICATION_BASIC_INFO_FORM_ADDRESS'),
    login: 1,
  },
  {
    name: 'phoneNumber',
    type: 'text',
    label: toI18n('APPLICATION_BASIC_INFO_FORM_PHONE'),
    login: 1,
  },
  {
    name: 'role',
    type: 'select',
    options: APPLICATION_OPTION,
    label: toI18n('APPLICATION_FORM_ROLE_TAB'),
    login: 1,
  },
  {
    name: 'categories',
    type: 'select',
    mode: 'multiple',
    options: CATEGORY_OPTIONS,
    label: toI18n('APPLICATION_EXPERIENCE_FORM_CATEGORY'),
    login: 1,
  },
  {
    name: 'skills',
    type: 'select',
    mode: 'multiple',
    options: AGENT_SKILL,
    label: toI18n('APPLICATION_ADDTIONAL_FORM_SKILLS'),
    login: 1,
  },
  {
    name: 'billingRate',
    type: 'number',
    label: toI18n('ADMIN_APPLICATION_DETAIL_EDIT_RATE'),
    login: 1,
  },
];

const mapStateToProps = (state) => {
  const applicationId = getApplicationIdFromRoute(state);
  const application = getApplicationDetailFromRoute(state);
  const {
    billingRate = 0, categories, skills, role,
    country, postcode, address, phoneNumber,
  } = application;
  return {
    isIniting: getIsLoading(state, applicationId),
    isLoading: getIsEditting(state),
    submitError: getEditError(state),
    initParam: applicationId,
    initialValues: {
      billingRate,
      categories,
      role,
      skills,
      country,
      postcode,
      address,
      phoneNumber,
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
  onInit: actions.fetchApplicationSingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDetail);
