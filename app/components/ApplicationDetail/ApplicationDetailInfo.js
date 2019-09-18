/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import Scrollbar from 'components/Scrollbar';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { AdminDetailsContainer } from 'components/Generals/ItemDetail.styled';
import ErrorContent from 'components/ErrorContent';
import ApplicationDetailInfoContent from './ApplicationDetailInfoContent';
import ApplicationDetailInfoHeader from './ApplicationDetailInfoHeader';
import { APPLICATION_STATUS } from '../../../common/enums';
import ApplicationDetailTicketTable from './ApplicationDetailTicketTable';
import ApplicationReview from '../../containers/ApplicationReview';

const { TabPane } = Tabs;

const scrollStyle = {
  height: 'calc(100vh - 90px)',
  width: '100%',
};

class applicationDetailInfo extends PureComponent {
  componentDidMount() {
    const { applicationId, fetchApplicationSingle } = this.props;

    fetchApplicationSingle(applicationId);
  }

  componentDidUpdate(prevProps) {
    const { applicationId, fetchApplicationSingle } = this.props;
    const { applicationId: prevapplicationId } = prevProps;

    if (prevapplicationId !== applicationId) {
      fetchApplicationSingle(applicationId);
    }
  }

  render() {
    const {
      applicationDetail,
      applicationApprove,
      applicationReject,
      applicationReview,
    } = this.props;

    if (_isEmpty(applicationDetail) || applicationDetail.isLoading) {
      return (
        <AdminDetailsContainer>
          <SpinnerLoading />
        </AdminDetailsContainer>
      );
    }

    if (applicationDetail.error) {
      return (
        <AdminDetailsContainer>
          <ErrorContent error={applicationDetail.error} />
        </AdminDetailsContainer>
      );
    }

    const {
      _id, firstName, lastName, status, tickets, nickname,
    } = applicationDetail;
    const actions = {
      applicationApprove,
      applicationReject,
      applicationReview,
    };
    return (
      <AdminDetailsContainer>
        <ApplicationDetailInfoHeader
          applicationId={_id}
          nickname={nickname}
          firstName={firstName}
          lastName={lastName}
          status={status}
          actions={actions}
        />
        {status === APPLICATION_STATUS.REVIEWING ? (<ApplicationReview />) : (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Detail" key="1">
              <Scrollbar autoHide style={scrollStyle}>
                <ApplicationDetailInfoContent applicationDetail={applicationDetail} />
              </Scrollbar>
            </TabPane>
            {status === APPLICATION_STATUS.APPROVED && [
              (
                <TabPane tab="Ticket" key="2">
                  <Scrollbar autoHide style={scrollStyle}>
                    <ApplicationDetailTicketTable tickets={tickets} />
                  </Scrollbar>
                </TabPane>
              ),
              (<TabPane tab="Billing history" key="3">
                <h2>Billing history</h2>
              </TabPane>),
            ]}
          </Tabs>
        )}
      </AdminDetailsContainer>
    );
  }
}

applicationDetailInfo.propTypes = {
  applicationId: PropTypes.string.isRequired,
  fetchApplicationSingle: PropTypes.func.isRequired,
  applicationApprove: PropTypes.func.isRequired,
  applicationReject: PropTypes.func.isRequired,
  applicationReview: PropTypes.func.isRequired,
  applicationDetail: PropTypes.object.isRequired,
};

export default applicationDetailInfo;
