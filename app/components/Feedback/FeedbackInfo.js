/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Scrollbar from 'components/Scrollbar';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { AdminDetailsContainer, PleaseSelect } from 'components/Generals/ItemDetail.styled';
import ErrorContent from 'components/ErrorContent';
import FeedbackDetailInfoHeader from './FeedbackInfoHeader';
import FeedbackDetailInfoContent from './FeedbackDetailInfoContent';
import { toI18n } from '../../utils/func-utils';

const scrollStyle = {
  height: 'calc(100vh - 220px)',
  width: '100%',
};

class FeedbackWarningInfo extends PureComponent {
  componentDidMount() {
    const { feedbackId, fetchSingle } = this.props;
    if (feedbackId) {
      fetchSingle(feedbackId);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      feedbackId, fetchSingle,
    } = this.props;
    const { feedbackId: prevfeedbackId } = prevProps;

    if (prevfeedbackId !== feedbackId && feedbackId) {
      fetchSingle(feedbackId);
    }
  }

  render() {
    const { feedbackDetail } = this.props;
    if (feedbackDetail.isLoading) {
      return (
        <AdminDetailsContainer>
          <SpinnerLoading />
        </AdminDetailsContainer>
      );
    }
    if (_isEmpty(feedbackDetail)) {
      return (
        <AdminDetailsContainer>
          <PleaseSelect>{toI18n('ADMIN_FEEDBACK_DETAIL_PLEASE_SELECT_FEEDBACKS')}</PleaseSelect>
        </AdminDetailsContainer>
      );
    }

    if (feedbackDetail.error) {
      return (
        <AdminDetailsContainer>
          <ErrorContent error={feedbackDetail.error} />
        </AdminDetailsContainer>
      );
    }

    const { title, status } = feedbackDetail;

    return (
      <AdminDetailsContainer>
        <FeedbackDetailInfoHeader title={title} status={status} />
        <Scrollbar autoHide style={scrollStyle}>
          <FeedbackDetailInfoContent feedbackDetail={feedbackDetail} />
        </Scrollbar>
      </AdminDetailsContainer>
    );
  }
}

FeedbackWarningInfo.propTypes = {
  feedbackId: PropTypes.string,
  fetchSingle: PropTypes.func.isRequired,
  feedbackDetail: PropTypes.object.isRequired,
};

export default FeedbackWarningInfo;
