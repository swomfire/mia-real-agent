/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Scrollbar from 'components/Scrollbar';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { AdminDetailsContainer } from 'components/Generals/ItemDetail.styled';
import ErrorContent from 'components/ErrorContent';
import UserDetailInfoContent from './UserDetailInfoContent';
import UserDetailInfoHeader from './UserDetailInfoHeader';

const scrollStyle = {
  height: 'calc(100vh - 90px)',
  width: '100%',
};

class UserDetailInfo extends PureComponent {
  componentDidMount() {
    const { userId, fetchUserSingle } = this.props;

    fetchUserSingle(userId);
  }

  componentDidUpdate(prevProps) {
    const { userId, fetchUserSingle } = this.props;
    const { userId: prevUserId } = prevProps;

    if (prevUserId !== userId && userId) {
      fetchUserSingle(userId);
    }
  }

  render() {
    const { userDetail, removeUser } = this.props;

    if (_isEmpty(userDetail) || userDetail.isLoading) {
      return (
        <AdminDetailsContainer>
          <SpinnerLoading />
        </AdminDetailsContainer>
      );
    }

    if (userDetail.error) {
      return (
        <AdminDetailsContainer>
          <ErrorContent error={userDetail.error} />
        </AdminDetailsContainer>
      );
    }

    const { _id, username } = userDetail;

    return (
      <AdminDetailsContainer>
        <UserDetailInfoHeader userId={_id} username={username} removeUser={removeUser} />
        <Scrollbar autoHide style={scrollStyle}>
          <UserDetailInfoContent userDetail={userDetail} />
        </Scrollbar>
      </AdminDetailsContainer>
    );
  }
}

UserDetailInfo.propTypes = {
  userId: PropTypes.string.isRequired,
  fetchUserSingle: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  userDetail: PropTypes.object.isRequired,
};

export default UserDetailInfo;
