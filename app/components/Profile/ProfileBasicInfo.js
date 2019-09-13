import React, { Component } from 'react';
import { shape } from 'prop-types';
import { Col, Row, Divider } from 'antd';
import ProfileFormContainer from '../../containers/Profile/ProfileForm';
import ChangePasswordFormContainer from '../../containers/Profile/ChangePasswordForm/ChangePasswordFormContainer';
import { InputLabelStyled, ActionBar, RowStyled } from './styles';
import { toI18n } from '../../utils/func-utils';
import { InputStyled } from '../FormInput/styles';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import { ButtonPrimary } from '../../stylesheets/Button.style';

class ProfileBasicInfo extends Component {
  state = {
    isOpenConfirmPasswordModal: false,
    isOpenChangePasswordModal: false,
  }

  static propTypes = {
    user: shape().isRequired,
  }

  handleOpenConfirmPasswordModal = () => {
    this.setState({
      isOpenConfirmPasswordModal: true,
    });
  }

  handleCloseConfirmPasswordModal = () => {
    this.setState({
      isOpenConfirmPasswordModal: false,
    });
  }

  handleOpenChangePasswordModal = () => {
    this.setState({
      isOpenChangePasswordModal: true,
    });
  }

  handleCloseChangePasswordModal = () => {
    this.setState({
      isOpenChangePasswordModal: false,
    });
  }


  renderBasicInfo = () => {
    const {
      user: {
        role, username, email, profile,
      },
    } = this.props;
    return (
      <div>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_USERNAME')}
              :
            </InputLabelStyled>
            <InputStyled value={username} />
          </Col>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_EMAIL')}
              :
            </InputLabelStyled>
            <InputStyled value={email} />
          </Col>
        </RowStyled>
        <ProfileDetail role={role} profile={profile} />
      </div>
    );
  }

  render() {
    const { isOpenConfirmPasswordModal, isOpenChangePasswordModal } = this.state;

    return (
      <div>
        {this.renderBasicInfo()}
        <ActionBar>
          <ButtonPrimary type="primary" onClick={this.handleOpenConfirmPasswordModal}>
            {toI18n('PROFILE_EDIT')}
          </ButtonPrimary>
          <ButtonPrimary type="primary" onClick={this.handleOpenChangePasswordModal}>
            {toI18n('PROFILE_CHANGE_PASSWORD')}
          </ButtonPrimary>
        </ActionBar>
        <ProfileFormContainer
          isOpen={isOpenConfirmPasswordModal}
          handleCancel={this.handleCloseConfirmPasswordModal}
        />
        <ChangePasswordFormContainer
          isOpen={isOpenChangePasswordModal}
          handleCancel={this.handleCloseChangePasswordModal}
        />
      </div>
    );
  }
}

export default ProfileBasicInfo;
