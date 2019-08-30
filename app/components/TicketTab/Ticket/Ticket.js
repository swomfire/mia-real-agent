/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinnerLoading from 'components/PageLoading';
import ShadowScrollbars from 'components/Scrollbar';
import TicketItem from './TicketItem/TicketItem';
import { TicketFrontWrapper } from '../TicketTab.styles';
import {
  TableContentWrapper,
  TableEmptyContent,
  TicketItemGroup,
} from '../../TableComponent/TableComponent.styled';
import { toI18n } from '../../../utils/func-utils';

const scrollStyle = {
  height: '100%',
  width: '100%',
};

class Ticket extends Component {
  renderTicketItem = (ticket, index) => {
    const { _id } = ticket;
    return (
      <TicketItem
        key={_id}
        ticket={ticket}
        index={index}
      // eslint-disable-next-line no-underscore-dangle
      />
    );
  };

  renderTicketTableContent = () => {
    const { ticketList, fetchingContext } = this.props;
    const { isFetching = false } = fetchingContext;

    if (isFetching) {
      return (
        <TableContentWrapper>
          <SpinnerLoading />
        </TableContentWrapper>
      );
    }

    const isNoTicket = ticketList.length === 0;
    return (
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
        <TicketItemGroup>

          {isNoTicket
            ? (
              <TableEmptyContent>
                {toI18n('DB_TICKET_NO_TICKET')}
              </TableEmptyContent>
            )
            : ticketList.map(this.renderTicketItem)
          }
        </TicketItemGroup>
      </ShadowScrollbars>
    );
  }

  render() {
    return (
      <TicketFrontWrapper className="ticket-user">
        {this.renderTicketTableContent()}
      </TicketFrontWrapper>
    );
  }
}

Ticket.propTypes = {
  ticketList: PropTypes.array,
  fetchingContext: PropTypes.object,
};

export default Ticket;
