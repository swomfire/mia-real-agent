import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TitleDetailsHead,
  HeaderTextDetails,
  ItemStatus,
} from 'components/Generals/ItemDetail.styled';

class UserDetailInfoHeader extends PureComponent {
  render() {
    const { title, status } = this.props;
    return (
      <TitleDetailsHead>
        <HeaderTextDetails>
          <span>{title}</span>
          <ItemStatus status={status}>{`  - ${status}`}</ItemStatus>
        </HeaderTextDetails>
      </TitleDetailsHead>
    );
  }
}

UserDetailInfoHeader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default UserDetailInfoHeader;
