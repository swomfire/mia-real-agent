import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  func, bool, string, shape,
} from 'prop-types';
import { Form, Row, Col } from 'antd';
import FormInput from '../FormInput/FormInput';
import {
  ResetBtn, ResetSpinner, ResetWrapper,
  ResetItem, ResetLogo, ResetErrorMessage, ResetFooterText, ResetFooterLink, ResetFooter, SubmitSuccess,
} from './styles';
import { toI18n } from '../../utils/func-utils';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], toI18n('RESET_PASSWORD_CONFIRM_PASSWORD_ERROR')).trim().required(toI18n('FORM_REQUIRED')),
});


export class ResetPassword extends Component {
  state = {
    submitted: false,
  }

  static propTypes = {
    onSubmit: func.isRequired,
    isLoading: bool.isRequired,
    errorMessage: string,
    match: shape().isRequired,
  }

  handleResetPassword = (values) => {
    const { onSubmit, match } = this.props;
    const { params } = match;
    const { password } = values;
    onSubmit(password, params.token);
    this.setState({
      submitted: true,
    });
  }

  renderResetBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <ResetBtn>
          <ResetSpinner />
          {toI18n('FORM_SUBMITTING')}
        </ResetBtn>
      );
    }
    return (
      <ResetBtn
        type="submit"
      >
        {toI18n('FORM_SUBMIT')}
      </ResetBtn>
    );
  }


  render() {
    const { submitted } = this.state;
    const { errorMessage } = this.props;
    if (!errorMessage && submitted) {
      return (
        <ResetWrapper>
          <ResetItem>
            <ResetLogo>
              <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
            </ResetLogo>
            <Row gutter={32}>
              <Col>
                <SubmitSuccess>
                  <i className="mia-check" />
                  {toI18n('RESET_PASSWORD_COMPLETE')}
                </SubmitSuccess>
              </Col>
            </Row>
            <ResetFooter>
              <ResetFooterText>
                {toI18n('FORGOT_PASSWORD_TO_LOGIN')}
              </ResetFooterText>
              <ResetFooterLink to="/login">
                {toI18n('CLICK_HERE')}
              </ResetFooterLink>
            </ResetFooter>
          </ResetItem>
        </ResetWrapper>
      );
    }
    return (
      <ResetWrapper>
        <ResetItem>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.handleResetPassword}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ResetLogo>
                  <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
                </ResetLogo>
                <Row gutter={32}>
                  <Col>
                    <FormInput
                      type="password"
                      name="password"
                      label={toI18n('RESET_PASSWORD_NEW_PASSWORD')}
                      login={1}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col>
                    <FormInput
                      type="password"
                      name="confirmPassword"
                      label={toI18n('RESET_PASSWORD_CONFIRM_PASSWORD')}
                      login={1}
                    />
                  </Col>
                </Row>
                {this.renderResetBtn()}
                {errorMessage && (
                  <ResetErrorMessage>
                    {errorMessage}
                  </ResetErrorMessage>
                )}

              </Form>
            )}
          </Formik>
          <ResetFooter>
            <ResetFooterText>
              {toI18n('FORGOT_PASSWORD_TO_LOGIN')}
            </ResetFooterText>
            <ResetFooterLink to="/login">
              {toI18n('CLICK_HERE')}
            </ResetFooterLink>
          </ResetFooter>
        </ResetItem>
      </ResetWrapper>
    );
  }
}

export default ResetPassword;
