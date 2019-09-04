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
  ItemStatus,
} from 'components/Generals/ItemDetail.styled';
import {
  ButtonApprove,
  ButtonReject,
} from '../../stylesheets/Button.style';
import { APPLICATION_STATUS } from '../../../common/enums';
import { ItemDescription } from '../Generals/ItemDetail.styled';

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

  render() {
    const {
      nickname, firstName, lastName, status,
    } = this.props;
    return (
      <TitleDetailsHead>
        <HeaderTextDetails>
          <span>
            {nickname}
            {' - '}
          </span>
          <ItemDescription>
            {firstName}
            {' '}
            {lastName}
          </ItemDescription>
          <ItemStatus status={status}>{`  - ${status} `}</ItemStatus>
          {status === APPLICATION_STATUS.APPROVED && (<i className="mia-edit" onClick={this.goToEditPage} />)}
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
  nickname: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default ApplicationDetailInfoHeader;
