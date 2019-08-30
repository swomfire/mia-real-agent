/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Scrollbar from 'components/Scrollbar';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { AdminDetailsContainer } from 'components/Generals/ItemDetail.styled';
import ErrorContent from 'components/ErrorContent';
import TicketDetailInfoHeader from './TicketWarningInfoHeader';
import { conversationTranscript } from './TicketWarningConversationLog';
import { ConversationLogWrapper } from './styles';

const conversationScrollStyle = {
  height: 'calc(100vh - 220px)',
  width: '100%',
};

class TicketWarningInfo extends PureComponent {
  componentDidMount() {
    const { ticketId, fetchTicketSingle } = this.props;

    fetchTicketSingle(ticketId);
  }

  componentDidUpdate(prevProps) {
    const {
      ticketId, ticketDetail,
      fetchTicketSingle, fetchConversationLog,
    } = this.props;
    const { ticketId: prevticketId, ticketDetail: prevTicketDetail } = prevProps;

    if (prevticketId !== ticketId) {
      fetchTicketSingle(ticketId);
      const { conversationId } = ticketDetail || {};
      fetchConversationLog(conversationId);
      return;
    }
    const { conversationId } = ticketDetail || {};
    const { conversationId: prevConversationId } = prevTicketDetail || {};
    if (conversationId !== prevConversationId) {
      fetchConversationLog(conversationId);
    }
  }

  render() {
    const { ticketDetail, conversationLog } = this.props;
    if (_isEmpty(ticketDetail) || ticketDetail.isLoading) {
      return (
        <AdminDetailsContainer>
          <SpinnerLoading />
        </AdminDetailsContainer>
      );
    }

    if (ticketDetail.error) {
      return (
        <AdminDetailsContainer>
          <ErrorContent error={ticketDetail.error} />
        </AdminDetailsContainer>
      );
    }

    const { title, status } = ticketDetail;

    return (
      <AdminDetailsContainer>
        <TicketDetailInfoHeader title={title} status={status} />
        <ConversationLogWrapper>
          <Scrollbar autoHide style={conversationScrollStyle}>
            {conversationTranscript(conversationLog)}
          </Scrollbar>
        </ConversationLogWrapper>
      </AdminDetailsContainer>
    );
  }
}

TicketWarningInfo.propTypes = {
  ticketId: PropTypes.string.isRequired,
  fetchTicketSingle: PropTypes.func.isRequired,
  fetchConversationLog: PropTypes.func.isRequired,
  ticketDetail: PropTypes.object.isRequired,
  conversationLog: PropTypes.arrayOf(PropTypes.shape()),
};

export default TicketWarningInfo;
