/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  ProfileUserInfoWrapper,
  ProfileUserAction,
  ProfileUserHead,
  AdditionalInformationWrapper,
  AdditionalInformationTitle,
  AdditionalInformationValue,
} from './ProfileUser.styled';
import { toI18n } from '../../../utils/func-utils';
import { ROLES } from '../../../../common/enums';

class ProfileUser extends React.PureComponent {
  renderAdditionalInformation = () => {
    const { creditTime } = this.props;
    return (
      <AdditionalInformationWrapper>
        <AdditionalInformationTitle>
          {toI18n('NAVBAR_PROFILE_CREDIT_TIME')}
        </AdditionalInformationTitle>
        <AdditionalInformationValue>
          {numeral(creditTime).format('00:00:00')}
        </AdditionalInformationValue>
      </AdditionalInformationWrapper>
    );
  }

  render() {
    const {
      onLogout,
      role,
    } = this.props;
    return (
      <ProfileUserInfoWrapper>
        <ProfileUserHead>
          <ProfileUserAction>
            {role !== ROLES.ADMIN && this.renderAdditionalInformation()}
            <Link to="/profile" className="my-account">{toI18n('DB_PROFILE_MY_ACCOUNT')}</Link>
            <button className="sign-out" onClick={onLogout}>
              {toI18n('DB_PROFILE_SIGN_OUT')}
            </button>
          </ProfileUserAction>
        </ProfileUserHead>
      </ProfileUserInfoWrapper>
    );
  }
}

ProfileUser.propTypes = {
  onLogout: PropTypes.func,
  role: PropTypes.string,
  creditTime: PropTypes.number,
};

export default ProfileUser;
