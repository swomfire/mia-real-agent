import React, { Component } from 'react';
import { func, bool, shape } from 'prop-types';
import {
  Row, Col, Divider, Tabs,
} from 'antd';
import {
  ProfileWrapper, ProfileCard, ProfileTitle,
  InputStyled,
  InputLabelStyled,
} from './styles';
import LoadingSpin from '../Loading';
import ProfileDetail from './ProfileDetail/ProfileDetail';

import { toI18n } from '../../utils/func-utils';
import ProfileBasicInfo from './ProfileBasicInfo';
import PaidMethods from './PaidMethods';
import AddCreditCard from './AddCreditCard';

const { TabPane } = Tabs;

export default class Profile extends Component {
  static propTypes = {
    fetchProfile: func.isRequired,
    isFetching: bool.isRequired,
    user: shape().isRequired,
  }

  componentDidMount = () => {
    this.handleFetchDetail();
  }

  handleFetchDetail = () => {
    const { fetchProfile } = this.props;
    fetchProfile();
  }

  renderProfile = () => {
    const {
      user: {
        role, username, email, profile,
      },
    } = this.props;
    return (
      <div>
        <Row gutter={32}>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_USERNAME')}
              :
            </InputLabelStyled>
            <InputStyled>{username}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>
              {toI18n('PROFILE_EMAIL')}
              :
            </InputLabelStyled>
            <InputStyled>{email}</InputStyled>
          </Col>
        </Row>
        <Divider />
        <ProfileDetail role={role} profile={profile} />
      </div>
    );
  }

  render() {
    const { isFetching, user } = this.props;
    return (
      <ProfileWrapper>
        <ProfileCard>
          <LoadingSpin loading={isFetching}>
            <ProfileTitle>{toI18n('PROFILE_PROFILE')}</ProfileTitle>
            <Tabs>
              <TabPane tab={toI18n('PROFILE_CHANGE_BASIC_INFO')} key="1">
                <ProfileBasicInfo user={user} />
              </TabPane>
              <TabPane tab={toI18n('PROFILE_PAYMENT_INFO_PAYMENT_INFO')} key="2">
                <PaidMethods user={user} />
              </TabPane>
              <TabPane tab={toI18n('PROFILE_CHANGE_ADD_CREDIT_CARD')} key="3">
                <AddCreditCard user={user} />
              </TabPane>
            </Tabs>
          </LoadingSpin>
        </ProfileCard>
      </ProfileWrapper>
    );
  }
}
