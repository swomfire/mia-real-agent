import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Row, Col, Form,
} from 'antd';
import FormInput from '../FormInput/FormInput';
import {
  LoginWrapper,
  TemplateLoginPage,
  LogoSite,
} from './styles';
import {
  LoginBtn,
  LoginFBBtn,
  LoginFooter,
  LoginFooterText,
  LoginFooterLink,
  LoginSpinner,
  LoginErrorMessage,
} from '../../stylesheets/Button.style';

import { toI18n } from '../../utils/func-utils';

const initialValues = {
  usernameOrEmail: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  password: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
});

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    errorMessage: '',
  }

  handleInputChanged = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  login = (values) => {
    const { usernameOrEmail, password } = values;
    const { login } = this.props;
    login({ ...values, usernameOrEmail: usernameOrEmail.trim(), password });
  }

  renderLoginBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <LoginBtn>
          <LoginSpinner />
          {toI18n('LOGIN_LOGGING_IN')}
        </LoginBtn>
      );
    }
    return (
      <LoginBtn
        type="submit"
      >
        {toI18n('LOGIN_LOGIN')}
      </LoginBtn>
    );
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <LoginWrapper>
        <TemplateLoginPage>
          <LogoSite>
            <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
          </LogoSite>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.login}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={32}>
                  <Col>
                    <FormInput
                      type="text"
                      name="usernameOrEmail"
                      label={toI18n('LOGIN_USERNAME_OR_EMAIL')}
                      login={1}
                    />
                  </Col>
                  <Col>
                    <FormInput
                      type="password"
                      name="password"
                      label={toI18n('LOGIN_PASSWORD')}
                      login={1}
                    />
                  </Col>
                </Row>
                {this.renderLoginBtn()}
                {errorMessage && (
                  <LoginErrorMessage>
                    {errorMessage}
                  </LoginErrorMessage>
                )}
                <LoginFBBtn href="api/auth/login/facebook">
                  <i className="mia-facebook" />
                  {toI18n('LOGIN_LOGIN_WITH_FB')}
                </LoginFBBtn>
              </Form>
            )}
          </Formik>
          <LoginFooter>
            <LoginFooterText>
              {toI18n('LOGIN_DONT_HAVE_AN_ACCOUNT')}
            </LoginFooterText>
            <LoginFooterLink href="/register">
              {toI18n('LOGIN_REGISTER_NOW')}
            </LoginFooterLink>
          </LoginFooter>
          <LoginFooter>
            <LoginFooterText>
              {toI18n('LOGIN_WANT_TO_BE_AN_AGENT')}
            </LoginFooterText>
            <LoginFooterLink href="/application">
              {toI18n('LOGIN_CLICK_HERE')}
            </LoginFooterLink>
          </LoginFooter>
        </TemplateLoginPage>
      </LoginWrapper>
    );
  }
}

export default Login;
