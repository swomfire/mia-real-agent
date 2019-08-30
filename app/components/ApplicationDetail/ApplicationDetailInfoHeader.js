/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TitleDetailsHead,
  AdminHeadActionGroup,
  HeaderTextDetails,
  ItemStatus,
} from 'components/Generals/ItemDetail.styled';
import {
  ButtonApprove,
  ButtonReject,
} from '../../stylesheets/Button.style';
import { APPLICATION_STATUS } from '../../../common/enums';

class ApplicationDetailInfoHeader extends PureComponent {
  handleApprove = () => {
    const { applicationId, actions } = this.props;
    actions.applicationApprove({ _id: applicationId });
  }

  handleReject = () => {
    const { applicationId, actions } = this.props;
    actions.applicationReject({ _id: applicationId });
  }

  render() {
    const { firstName, lastName, status } = this.props;
    return (
      <TitleDetailsHead>
        <HeaderTextDetails>
          <span>
            {firstName}
            {' '}
            {lastName}
          </span>
          <ItemStatus status={status}>{`  - ${status}`}</ItemStatus>
        </HeaderTextDetails>
        <AdminHeadActionGroup>
          {status === APPLICATION_STATUS.PENDING && [(
            <ButtonApprove
              onClick={this.handleApprove}
            >
              <i className="mia-check" />
              <span>Approve</span>
            </ButtonApprove>),
          (<ButtonReject onClick={this.handleReject}>
            <i className="mia-close" />
            <span>Reject</span>
          </ButtonReject>)]}

        </AdminHeadActionGroup>
      </TitleDetailsHead>
    );
  }
}

ApplicationDetailInfoHeader.propTypes = {
  applicationId: PropTypes.string.isRequired,
  actions: PropTypes.shape().isRequired,
  status: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default ApplicationDetailInfoHeader;
