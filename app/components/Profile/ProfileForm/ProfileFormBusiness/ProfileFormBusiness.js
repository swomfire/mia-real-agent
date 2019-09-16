import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import {
  Form, Row, Col,
} from 'antd';
import * as Yup from 'yup';
import { shape, func } from 'prop-types';
import FormInput from '../../../FormInput/FormInput';
import { SIZE_OPTIONS, FIELD_OPTIONS } from '../../../../../common/enums';
import { ActionBar } from '../../styles';
import { toI18n } from '../../../../utils/func-utils';
import { ButtonPrimary, ButtonCancel } from '../../../../stylesheets/Button.style';

const validationSchema = Yup.object().shape({
  companySize: Yup.string().trim().required('Required'),
  companyFields: Yup.array().of(Yup.string()).required('Required'),
  address: Yup.string().trim(),
  phone: Yup.string().trim(),
});

export default class ProfileFormBusiness extends PureComponent {
  static propTypes = {
    initialValues: shape().isRequired,
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }

  render() {
    const { initialValues, onSubmit, onCancel } = this.props;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="companySize"
                  type="select"
                  options={SIZE_OPTIONS}
                  label={toI18n('PROFILE_BUSINESS_FORM_COMPANY_SIZE')}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="phone"
                  type="text"
                  label={toI18n('PROFILE_BUSINESS_FORM_PHONE')}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={24} xs={24}>
                <FormInput
                  name="companyFields"
                  type="select"
                  mode="multiple"
                  options={FIELD_OPTIONS}
                  label={toI18n('PROFILE_BUSINESS_FORM_WORKING_FIELDS')}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={24} xs={24}>
                <FormInput
                  name="address"
                  type="text"
                  label={toI18n('PROFILE_BUSINESS_FORM_ADDRESS')}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <ActionBar>
                <ButtonPrimary type="submit">
                  {toI18n('FORM_SAVE')}
                </ButtonPrimary>
                <ButtonCancel type="button" onClick={onCancel}>
                  {toI18n('FORM_RETURN')}
                </ButtonCancel>
              </ActionBar>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}
