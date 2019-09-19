/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import {
  TitleDetailsHead,
  AdminHeadActionGroup,
  HeaderTextDetails,
  ItemStatus, ItemDescription,
} from 'components/Generals/ItemDetail.styled';
import {
  ButtonApprove,
  ButtonReject,
} from '../../stylesheets/Button.style';
import { APPLICATION_STATUS } from '../../../common/enums';
import { Icon } from 'antd';

class ApplicationDetailInfoHeader extends PureComponent {
  goToEditPage = () => {
    const { applicationId } = this.props;
    history.push(`/admin/applications/${applicationId}/edit`);
  };

  handleApprove = () => {
    const { applicationId, actions } = this.props;
    actions.applicationApprove({ _id: applicationId });
  }

  handleReject = () => {
    const { applicationId, actions } = this.props;
    actions.applicationReject({ _id: applicationId });
  }

  handlePreview = () => {
    const { applicationId, actions } = this.props;
    actions.applicationReview({ _id: applicationId });
  }

  handlePending = () => {
    const { applicationId, actions } = this.props;
    actions.applicationPending({ _id: applicationId });
  }

  render() {
    const {
      nickname, firstName, lastName, status,
    } = this.props;
    return (
      <TitleDetailsHead>
        <HeaderTextDetails>
          {status === APPLICATION_STATUS.REVIEWING && (
            <Icon onClick={this.handlePending} type="left" />
          )}
          <span>
            {nickname}
          </span>
          <ItemDescription>
            {' ('}
            {firstName}
            {' '}
            {lastName}
            {'). '}
          </ItemDescription>
          <ItemStatus status={status}>{status}</ItemStatus>
          {status === APPLICATION_STATUS.APPROVED && (<i className="mia-edit" onClick={this.goToEditPage} />)}
        </HeaderTextDetails>
        <AdminHeadActionGroup>
          {status === APPLICATION_STATUS.PENDING && [(
            <ButtonApprove
              onClick={this.handlePreview}
            >
              <i className="mia-check" />
              <span>Review</span>
            </ButtonApprove>),
          ]}

        </AdminHeadActionGroup>
      </TitleDetailsHead>
    );
  }
}

ApplicationDetailInfoHeader.propTypes = {
  applicationId: PropTypes.string.isRequired,
  actions: PropTypes.shape().isRequired,
  status: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default ApplicationDetailInfoHeader;
