import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  RegistrationWrapper,
  RegistrationItem,
  RegistrationTitle,
  RegistrationBtn,
  RegistrationFooter,
  RegistrationFooterText,
  RegistrationFooterLink,
  RegistrationSpinner,
  RegistrationErrorMessage,
  InputWrapper,
} from './styles';
import FormInput from '../FormInput/FormInput';
import { FIELD_OPTIONS, SIZE_OPTIONS, ROLES } from '../../../common/enums';
import { toI18n } from '../../utils/func-utils';

const scrollStyle = {
  height: 'calc(100vh - 300px)',
  margin: '0 -20px 0 -10px',
};

const initialValues = {
  email: '',
  password: '',
  rePassword: '',
  username: '',
  company: '',
  companySize: '',
  companyFields: [],
  address: '',
  phone: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email(toI18n('FORM_INVALID_MAIL')).trim().required(toI18n('FORM_REQUIRED')),
  username: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  password: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], toI18n('FORM_PASSWORD_MUST_MATCH')).trim().required(toI18n('FORM_REQUIRED')),
  company: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  companySize: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  companyFields: Yup.array().of(Yup.string()).required(toI18n('FORM_REQUIRED')),
  address: Yup.string().trim(),
  phone: Yup.string().trim(),
});

class Registration extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  handleInputChanged = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  register = (values) => {
    const { register } = this.props;
    const { username, email, password } = values;
    register({
      username, email, password, role: ROLES.BUSINESS, profile: { ...values },
    });
  }

  renderRegisterBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <RegistrationBtn>
          <RegistrationSpinner />
          {toI18n('REGISTER_REGISTERING')}
        </RegistrationBtn>
      );
    }
    return (
      <RegistrationBtn
        type="submit"
      >
        {toI18n('REGISTER_REGISTER')}
      </RegistrationBtn>
    );
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <RegistrationWrapper>
        <RegistrationItem>
          <RegistrationTitle>
            <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
          </RegistrationTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.register}
            className="form-mik-vienpn"
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* <ShadowScrollbars autoHide style={scrollStyle}> */}
                <InputWrapper>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="username"
                        type="text"
                        label={toI18n('REGISTER_USERNAME')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="email"
                        type="text"
                        label={toI18n('REGISTER_EMAIL')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="password"
                        type="password"
                        label={toI18n('REGISTER_PASSWORD')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="rePassword"
                        type="password"
                        label={toI18n('REGISTER_RE_PASSWORD')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="company"
                        type="text"
                        label={toI18n('REGISTER_BUSINESS_COMPANY_NAME')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="companySize"
                        type="select"
                        options={SIZE_OPTIONS}
                        label={toI18n('REGISTER_BUSINESS_COMPANY_SIZE')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="companyFields"
                        type="select"
                        mode="multiple"
                        options={FIELD_OPTIONS}
                        label={toI18n('REGISTER_BUSINESS_WORKING_FIELDS')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="phone"
                        type="text"
                        label={toI18n('REGISTER_BUSINESS_PHONE')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={24} xs={24}>
                      <FormInput
                        name="address"
                        type="text"
                        label={toI18n('REGISTER_BUSINESS_ADDRESS')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={24} xs={24}>
                      {this.renderRegisterBtn()}
                    </Col>
                  </Row>
                  {errorMessage && (
                    <RegistrationErrorMessage>
                      {errorMessage}
                    </RegistrationErrorMessage>
                  )}
                </InputWrapper>
                {/* </ShadowScrollbars> */}
              </Form>
            )}
          </Formik>
          <RegistrationFooter>
            <RegistrationFooterText>
              {toI18n('REGISTER_ALREADY_HAD_AN_ACCOUNT')}
            </RegistrationFooterText>
            <RegistrationFooterLink href="/login">
              {toI18n('REGISTER_LOGIN_NOW')}
            </RegistrationFooterLink>
          </RegistrationFooter>
        </RegistrationItem>
      </RegistrationWrapper>
    );
  }
}

export default Registration;
