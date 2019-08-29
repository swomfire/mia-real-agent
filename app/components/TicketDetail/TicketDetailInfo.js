/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Scrollbar from 'components/Scrollbar';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { ItemDetailInfoWrapper } from 'components/Generals/ItemDetail.styled';
import ErrorContent from 'components/ErrorContent';
import TicketDetailInfoContent from './TicketDetailInfoContent';
import TicketDetailInfoHeader from './TicketDetailInfoHeader';
import { conversationTranscript } from './TicketDetailConversationLog';
import { ConversationLogWrapper } from './styles';

const scrollStyle = {
  height: 'calc(100vh - 120px)',
  width: '100%',
};

class TicketDetailInfo extends PureComponent {
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
        <ItemDetailInfoWrapper>
          <SpinnerLoading />
        </ItemDetailInfoWrapper>
      );
    }

    if (ticketDetail.error) {
      return (
        <ItemDetailInfoWrapper>
          <ErrorContent error={ticketDetail.error} />
        </ItemDetailInfoWrapper>
      );
    }

    const { title, status } = ticketDetail;

    return (
      <ItemDetailInfoWrapper>
        <TicketDetailInfoHeader title={title} status={status} />
        <Scrollbar autoHide style={scrollStyle}>
          <TicketDetailInfoContent ticketDetail={ticketDetail} />
          <ConversationLogWrapper>
            <p>Conversation log:</p>
            {conversationTranscript(conversationLog)}
          </ConversationLogWrapper>
        </Scrollbar>
      </ItemDetailInfoWrapper>
    );
  }
}

TicketDetailInfo.propTypes = {
  ticketId: PropTypes.string.isRequired,
  fetchTicketSingle: PropTypes.func.isRequired,
  fetchConversationLog: PropTypes.func.isRequired,
  ticketDetail: PropTypes.object.isRequired,
  conversationLog: PropTypes.arrayOf(PropTypes.shape()),
};

export default TicketDetailInfo;
