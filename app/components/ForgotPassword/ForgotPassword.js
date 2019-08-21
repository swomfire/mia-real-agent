import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { func, bool, string } from 'prop-types';
import { Form, Row, Col } from 'antd';
import FormInput from '../FormInput/FormInput';
import {
  ForgotBtn, ForgotSpinner, ForgotWrapper,
  ForgotItem, ForgotLogo, ForgotErrorMessage, ForgotFooterText, ForgotFooterLink, ForgotFooter,
} from './styles';
import { toI18n } from '../../utils/func-utils';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email(toI18n('FORM_INVALID_MAIL')).trim().required(toI18n('FORM_REQUIRED')),
});


export class ForgotPassword extends Component {
  state = {
    submitted: false,
  }

  static propTypes = {
    onSubmit: func.isRequired,
    isLoading: bool.isRequired,
    errorMessage: string.isRequired,
  }

  handleForgotPassword = (values) => {
    const { onSubmit } = this.props;
    const { email } = values;
    onSubmit(email);
    this.setState({
      submitted: true,
    });
  }

  renderForgotBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <ForgotBtn>
          <ForgotSpinner />
          {toI18n('FORM_SUBMITTING')}
        </ForgotBtn>
      );
    }
    return (
      <ForgotBtn
        type="submit"
      >
        {toI18n('FORM_SUBMIT')}
      </ForgotBtn>
    );
  }


  render() {
    const { submitted } = this.state;
    const { errorMessage } = this.props;
    if (!errorMessage && submitted) {
      return (
        <div>cc</div>
      );
    }
    return (
      <ForgotWrapper>
        <ForgotItem>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.handleForgotPassword}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ForgotLogo>
                  <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
                </ForgotLogo>
                <Row gutter={32}>
                  <Col>
                    <FormInput
                      type="text"
                      name="email"
                      label={toI18n('FORGOT_PASSWORD_EMAIL')}
                      login={1}
                    />
                  </Col>
                </Row>
                {this.renderForgotBtn()}
                {errorMessage && (
                  <ForgotErrorMessage>
                    {errorMessage}
                  </ForgotErrorMessage>
                )}

              </Form>
            )}
          </Formik>
          <ForgotFooter>
            <ForgotFooterText>
              {toI18n('FORGOT_PASSWORD_TO_LOGIN')}
            </ForgotFooterText>
            <ForgotFooterLink to="/login">
              {toI18n('CLICK_HERE')}
            </ForgotFooterLink>
          </ForgotFooter>
        </ForgotItem>
      </ForgotWrapper>
    );
  }
}

export default ForgotPassword;
