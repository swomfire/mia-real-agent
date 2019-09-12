import React, { Component } from 'react';
import {
  Modal, Row, Col,
} from 'antd';
import {
  func, bool,
  shape,
} from 'prop-types';
import { InputLabelStyled, ActionBar } from '../styles';
import { InputStyled } from '../../FormInput/styles';
import LoadingSpin from '../../Loading';
import { ROLES } from '../../../../common/enums';
import { ErrorMessage } from './styles';
import ProfileFormIndividual from './ProfileFormIndividual';
import ProfileFormBusiness from './ProfileFormBusiness';
import { ButtonPrimary, ButtonCancel } from '../../../stylesheets/Button.style';
import { toI18n } from '../../../utils/func-utils';

export default class ProfileForm extends Component {
  static propTypes = {
    handleCancel: func.isRequired,
    checkPassword: func.isRequired,
    updateProfile: func.isRequired,
    isOpen: bool.isRequired,
    isCheckingPassword: bool.isRequired,
    isUpdating: bool.isRequired,
    passwordConfirmed: bool.isRequired,
    user: shape().isRequired,
  }

  state = {
    password: '',
    errorMessage: '',
  }

  componentDidUpdate = (prevProps) => {
    const { passwordConfirmed, isCheckingPassword, isUpdating } = this.props;
    if (prevProps.passwordConfirmed !== passwordConfirmed) {
      this.setState({
        password: '',
      });
    }
    if (prevProps.isCheckingPassword && !isCheckingPassword && !passwordConfirmed) {
      this.setState({
        password: '',
        errorMessage: toI18n('PROFILE_EDIT_PASSWORD_NOT_MATCH'),
      });
    }
    if (prevProps.isUpdating && !isUpdating) {
      this.handleCancel();
    }
  }

  handleChangePassword = (e) => {
    const { value } = e.target;
    this.setState({
      password: value,
    });
  }

  handleCancel = () => {
    const { handleCancel } = this.props;
    handleCancel();
  }

  handlePasswordSubmit = () => {
    const { checkPassword } = this.props;
    const { password } = this.state;
    checkPassword(password);
  }

  handleProfileUpdate = (values) => {
    const { updateProfile } = this.props;
    updateProfile(values);
  }

  renderProfileEditForm = () => {
    const { user } = this.props;
    const { profile, role } = user;
    if (role === ROLES.INDIVIDUAL) {
      return (
        <ProfileFormIndividual
          initialValues={profile}
          onSubmit={this.handleProfileUpdate}
          onCancel={this.handleCancel}
        />
      );
    }
    return (
      <ProfileFormBusiness
        initialValues={profile}
        onSubmit={this.handleProfileUpdate}
        onCancel={this.handleCancel}
      />
    );
  };

  render() {
    const {
      isOpen, isCheckingPassword, passwordConfirmed,
      isUpdating,
    } = this.props;
    const { password, errorMessage } = this.state;
    const loading = isCheckingPassword || isUpdating;
    return (
      <Modal
        title={toI18n('PROFILE_EDIT_TITLE')}
        visible={isOpen}
        onCancel={this.handleCancel}
        footer={null}
        width="800px"
      >
        <LoadingSpin loading={loading}>
          {!passwordConfirmed
            ? (
              <div>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <InputLabelStyled>
                      {toI18n('PROFILE_EDIT_CONFIRM_PASSWORD')}
                    </InputLabelStyled>
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <InputStyled
                      type="password"
                      value={password}
                      onChange={this.handleChangePassword}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                  </Col>
                </Row>
                <Row gutter={32}>
                  <ActionBar>
                    <ButtonPrimary key="submit" type="primary" onClick={this.handlePasswordSubmit}>
                      {toI18n('FORM_SUBMIT')}
                    </ButtonPrimary>
                    <ButtonCancel key="back" onClick={this.handleCancel}>
                      {toI18n('FORM_RETURN')}
                    </ButtonCancel>
                  </ActionBar>
                </Row>
              </div>
            )
            : this.renderProfileEditForm()
          }
        </LoadingSpin>
      </Modal>
    );
  }
}
