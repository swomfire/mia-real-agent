import React, { Component } from 'react';
import {
  Row, Col, Form,
} from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import { toI18n } from '../../utils/func-utils';
import { ButtonCancel, ButtonSubmit } from '../../stylesheets/Button.style';
import { ActionFormRegister } from './styles';

const initialValues = {
  nickname: '',
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  postcode: '',
  address: '',
  phoneNumber: '',
};

const matchString = (string, match) => {
  if (string.includes(match) || match.includes(string)) {
    return true;
  }
  return false;
};

// eslint-disable-next-line func-names
Yup.addMethod(Yup.string, 'checkNickname', function (firstNameRef, lastNameRef) {
  const message = toI18n('APPLICATION_BASIC_INFO_FORM_NICKNAME_CANNOT_MATCH');
  // eslint-disable-next-line func-names
  return this.test('test-checkNickname', message, function (value) {
    const { path, createError } = this;
    const firstName = this.resolve(firstNameRef);
    const lastName = this.resolve(lastNameRef);
    if (firstName && lastName && value) {
      const upFN = firstName.toUpperCase();
      const upLN = lastName.toUpperCase();
      const upValue = value.toUpperCase();
      if (matchString(upValue, upFN) || matchString(upValue, upLN)) {
        return createError({ path, message });
      }
    }
    return true;
  });
});

const validationSchema = Yup.object().shape({
  nickname: Yup
    .string().trim().required(toI18n('FORM_REQUIRED'))
    .checkNickname(Yup.ref('firstName'), Yup.ref('lastName')),
  firstName: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  lastName: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  email: Yup.string().email(toI18n('FORM_INVALID_MAIL')).trim().required(toI18n('FORM_REQUIRED')),
  country: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  postcode: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  address: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  phoneNumber: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
});

export class BasicInfoForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }

  renderRegisterBtn = () => (
    <ActionFormRegister>
      <ButtonCancel
        onClick={this.handleCancel}
      >
        <i className="mia-chevron-left" />
        <span>{toI18n('FORM_BACK')}</span>
      </ButtonCancel>
      <ButtonSubmit>
        <span>{toI18n('FORM_NEXT')}</span>
        <i className="mia-chevron-right" />
      </ButtonSubmit>
    </ActionFormRegister>
  )

  handleCancel = () => {
    const { onCancel } = this.props;
    console.log('ad');
    onCancel();
  }

  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row gutter={32}>
              <Col sm={24} xs={24}>
                <FormInput
                  name="nickname"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_NICKNAME')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="firstName"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_FIRST_NAME')}
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="lastName"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_LASTNAME')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="email"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_EMAIL')}
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="phoneNumber"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_PHONE')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="country"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_COUNTRY')}
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="postcode"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_POSTCODE')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={24} xs={24}>
                <FormInput
                  name="address"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_ADDRESS')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={24} xs={24}>
                {this.renderRegisterBtn()}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default BasicInfoForm;
