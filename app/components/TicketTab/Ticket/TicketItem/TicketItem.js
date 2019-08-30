/* eslint-disable default-case */
import React, { Component } from 'react';
import moment from 'moment/min/moment-with-locales';
import { object, number } from 'prop-types';
import {
  DashboardTitle,
  DashboardStatus,
  DashboardRightBlock,
  DashboardSubTitle,
  DashboardLinkTitle,
  DashboardSubActivity,
} from 'components/ActivityTab/ActivityTab.styled';
import {
  TableContentItem,
} from '../../../TableComponent/TableComponent.styled';
import { TableContent } from '../../../TableComponent/TableComponent';
import { columnSizeContent } from '../ColumnSize';
import { TicketStatus } from './TicketItem.styled';
import { toI18n } from '../../../../utils/func-utils';

class TicketItem extends Component {
  static propTypes = {
    ticket: object.isRequired,
    index: number,
  }

  renderSubtitle = () => {
    const { ticket } = this.props;
    const {
      ticketId,
      createdAt,
    } = ticket;
    const timeFromNow = moment(createdAt).fromNow();
    return (
      <DashboardSubActivity>
        {`#${ticketId} `}
        {toI18n('DB_TICKET_OPENED')}
        {' '}
        {(timeFromNow)}
      </DashboardSubActivity>
    );
  }

  renderTicketContent = () => {
    const { ticket } = this.props;
    const { conversationId } = ticket;
    const url = `/conversation/${conversationId}`;
    return (
      <DashboardTitle>
        <DashboardRightBlock>
          <DashboardSubTitle>
            <DashboardLinkTitle to={url}>
              {ticket.title}
            </DashboardLinkTitle>
          </DashboardSubTitle>
          {this.renderSubtitle()}
        </DashboardRightBlock>
      </DashboardTitle>
    );
  }

  renderTicketStatus = status => (
    <DashboardStatus>
      <TicketStatus status={status} />
    </DashboardStatus>
  )


  render() {
    const { index, ticket } = this.props;
    const { status } = ticket;
    return (
      <TableContentItem key={index} ticket>
        <TableContent {...columnSizeContent[0]}>
          {this.renderTicketStatus(status)}
        </TableContent>
        <TableContent {...columnSizeContent[1]}>
          {this.renderTicketContent()}
        </TableContent>
      </TableContentItem>
    );
  }
}

export default TicketItem;
