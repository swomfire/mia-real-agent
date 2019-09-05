import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TitleDetailsHead,
  HeaderTextDetails,
  ItemStatus, AdminHeadActionGroup,
} from 'components/Generals/ItemDetail.styled';
import { ButtonPrimary } from '../../stylesheets/Button.style';

class FeedbackDetailInfoHeader extends PureComponent {
  render() {
    const { title, status } = this.props;
    return (
      <TitleDetailsHead>
        <HeaderTextDetails>
          <span>{title}</span>
          <ItemStatus status={status}>{`  - ${status}`}</ItemStatus>
        </HeaderTextDetails>
        <AdminHeadActionGroup>
          <ButtonPrimary>
            <i className="mia-check" />
            <span>Handle</span>
          </ButtonPrimary>
        </AdminHeadActionGroup>
      </TitleDetailsHead>
    );
  }
}

FeedbackDetailInfoHeader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default FeedbackDetailInfoHeader;
