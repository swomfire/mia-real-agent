import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import {
  Form, Row, Col,
} from 'antd';
import * as Yup from 'yup';
import { shape, func } from 'prop-types';
import FormInput from '../../../FormInput/FormInput';
import { POSITION_OPTIONS } from '../../../../../common/enums';
import { ActionBar } from '../../styles';
import { toI18n } from '../../../../utils/func-utils';
import { ButtonPrimary, ButtonCancel } from '../../../../stylesheets/Button.style';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Required'),
  lastName: Yup.string().trim().required('Required'),
  dateOfBirth: Yup.date().required('Required'),
  position: Yup.string().trim().required('Required'),
  address: Yup.string().trim(),
  phone: Yup.string().trim(),
});

export class ProfileFormIndividual extends PureComponent {
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
                  name="firstName"
                  type="text"
                  label={toI18n('PROFILE_INDIVIDIAL_FORM_FIRST_NAME')}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="lastName"
                  type="text"
                  label={toI18n('PROFILE_INDIVIDIAL_FORM_LAST_NAME')}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="dateOfBirth"
                  type="date"
                  label={toI18n('PROFILE_INDIVIDIAL_FORM_DOB')}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="position"
                  type="select"
                  options={POSITION_OPTIONS}
                  label={toI18n('PROFILE_INDIVIDIAL_FORM_POSITION')}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="address"
                  type="text"
                  label={toI18n('PROFILE_INDIVIDIAL_FORM_ADDRESS')}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="phone"
                  type="text"
                  label={toI18n('PROFILE_INDIVIDIAL_FORM_PHONE')}
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

export default ProfileFormIndividual;
