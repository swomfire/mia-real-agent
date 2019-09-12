import React, { PureComponent } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Modal, Row, Col,
  Form, notification,
} from 'antd';
import { func, bool, string } from 'prop-types';
import FormInput from '../../FormInput/FormInput';
import { ActionBar } from '../styles';
import LoadingSpin from '../../Loading';
import { ButtonPrimary, ButtonCancel } from '../../../stylesheets/Button.style';
import { toI18n } from '../../../utils/func-utils';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required('Required'),
  newPassword: Yup.string().trim().required('Required'),
  confirmNewPassword: Yup.string().trim().required('Required')
    .oneOf([Yup.ref('newPassword'), null], 'Confirm password not match'),
});

export default class ChangePasswordForm extends PureComponent {
  static propTypes = {
    handleCancel: func.isRequired,
    handleSubmit: func.isRequired,
    isOpen: bool.isRequired,
    isChangingPassword: bool.isRequired,
    changePasswordError: string.isRequired,
  }

  componentDidUpdate = (prevProps) => {
    const { isChangingPassword, changePasswordError } = this.props;
    if (prevProps.isChangingPassword && !isChangingPassword) {
      if (changePasswordError) {
        notification.error({ message: changePasswordError });
      } else {
        notification.success({ message: 'Password changed' });
        this.handleCancel();
      }
    }
  }

  handleSubmit = (values) => {
    const { handleSubmit } = this.props;
    const { currentPassword, newPassword } = values;
    handleSubmit(currentPassword, newPassword);
  }

  handleCancel = () => {
    const { handleCancel } = this.props;
    handleCancel();
  }

  render() {
    const { isOpen, isChangingPassword } = this.props;
    return (
      <Modal
        title={toI18n('PROFILE_CHANGE_PASSWORD_FORM_TITLE')}
        visible={isOpen}
        onCancel={this.handleCancel}
        footer={null}
      >
        <LoadingSpin loading={isChangingPassword}>
          <Formik
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <FormInput
                      name="currentPassword"
                      type="password"
                      label={toI18n('PROFILE_CHANGE_PASSWORD_FORM_CURRENT_PASSWORD')}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <FormInput
                      name="newPassword"
                      type="password"
                      label={toI18n('PROFILE_CHANGE_PASSWORD_FORM_NEW_PASSWORD')}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <FormInput
                      name="confirmNewPassword"
                      type="password"
                      label={toI18n('PROFILE_CHANGE_PASSWORD_FORM_CONFIRM_NEW_PASSWORD')}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <ActionBar>
                    <ButtonPrimary onClick={handleSubmit}>
                      {toI18n('FORM_SUBMIT')}
                    </ButtonPrimary>
                    <ButtonCancel onClick={this.handleCancel}>
                      {toI18n('FORM_RETURN')}
                    </ButtonCancel>
                  </ActionBar>
                </Row>
              </Form>
            )}
          </Formik>
        </LoadingSpin>
      </Modal>
    );
  }
}
