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
import { Icon, Popconfirm } from 'antd';
import { toI18n } from '../../utils/func-utils';

class ApplicationDetailInfoHeader extends PureComponent {
  state = {
    visible: false,
  }

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

  handleVisibleChange = (visible) => {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    const { isReviewing } = this.props;
    if (!isReviewing) {
      this.handlePending();
    } else {
      this.setState({ visible });
    }
  };


  render() {
    const { visible } = this.state;
    const {
      nickname, firstName, lastName, status,
    } = this.props;
    return (
      <TitleDetailsHead>
        <HeaderTextDetails>
          {status === APPLICATION_STATUS.REVIEWING && (
            <Popconfirm
              title={toI18n('APPLICATION_REVIEW_FORM_PENDING_CHANGE')}
              onVisibleChange={this.handleVisibleChange}
              visible={visible}
              onConfirm={this.handlePending}
              okText={toI18n('FORM_YES')}
              cancelText={toI18n('FORM_NO')}
            >
              <Icon type="left" />
            </Popconfirm>
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
  isReviewing: PropTypes.bool.isRequired,
};

export default ApplicationDetailInfoHeader;
