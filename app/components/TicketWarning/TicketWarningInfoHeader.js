/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ItemDetailInfoHeaderWrapper,
  ItemDetailInfoActionGroup,
  ItemDetailInfoHeadTitle,
} from 'components/Generals/ItemDetail.styled';
import { IconStyled } from 'components/Generals/General.styled';

class UserDetailInfoHeader extends PureComponent {
  render() {
    const { title, status } = this.props;
    return (
      <ItemDetailInfoHeaderWrapper>
        <ItemDetailInfoHeadTitle>{`${title} [${status}]`}</ItemDetailInfoHeadTitle>
        <ItemDetailInfoActionGroup noTitle>
          <Link to="/admin/users" className="close-action">
            <IconStyled className="icon-close" />
          </Link>
        </ItemDetailInfoActionGroup>
      </ItemDetailInfoHeaderWrapper>
    );
  }
}

UserDetailInfoHeader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default UserDetailInfoHeader;
