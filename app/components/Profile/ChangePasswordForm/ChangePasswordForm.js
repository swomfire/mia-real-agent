import React, { PureComponent } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Modal, Row, Col,
  Form,
} from 'antd';
import { func, bool, string } from 'prop-types';
import FormInput from '../../FormInput/FormInput';
import { ActionBar } from '../styles';
import LoadingSpin from '../../Loading';
import { ButtonPrimary, ButtonCancel } from '../../../stylesheets/Button.style';
import { toI18n } from '../../../utils/func-utils';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  newPassword: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  confirmNewPassword: Yup.string().trim().required(toI18n('FORM_REQUIRED'))
    .oneOf([Yup.ref('newPassword'), null], toI18n('FORM_PASSWORD_MUST_MATCH')),
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
      if (!changePasswordError) {
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
    this.changePasswordForm.getFormikContext().resetForm();
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
            ref={(changePasswordForm) => { this.changePasswordForm = changePasswordForm; }}
            validationSchema={validationSchema}
            initialValues={initialValues}
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
                    <ButtonPrimary type="submit">
                      {toI18n('FORM_SUBMIT')}
                    </ButtonPrimary>
                    <ButtonCancel type="button" onClick={this.handleCancel}>
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
