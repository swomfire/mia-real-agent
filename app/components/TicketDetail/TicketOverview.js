import React, { Component } from 'react';
import { shape } from 'prop-types';
import moment from 'moment';
import { toI18n } from '../../utils/func-utils';
import { OverviewLeftSectionWrapper, OverviewTitle } from '../Generals/ItemDetail.styled';
import { DATE_TIME_FORMAT } from '../../utils/constants';
import OverviewDetail from '../Generals/TableDetail/OverviewDetail';

// eslint-disable-next-line react/prefer-stateless-function
export class TicketOverview extends Component {
  static propTypes = {
    ticketDetail: shape().isRequired,
  }

  render() {
    const {
      ticketDetail: {
        title, status, category,
        description, createdAt,
        owner, assignee,
      },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>{toI18n('ADMIN_TICKET_DETAIL_PRIMARY_DETAILS')}</OverviewTitle>
        <OverviewDetail label={toI18n('ADMIN_TICKET_DETAIL_TITLE')} value={title} isLink />
        <OverviewDetail label={toI18n('ADMIN_TICKET_DETAIL_STATUS')} value={status} />
        <OverviewDetail label={toI18n('ADMIN_TICKET_DETAIL_CATEGORY')} value={category} />
        <OverviewDetail label={toI18n('ADMIN_TICKET_DETAIL_DESCRIPTION')} value={description} />
        <OverviewDetail label={toI18n('ADMIN_TICKET_DETAIL_CREATED_AT')} value={moment(createdAt).format(DATE_TIME_FORMAT.DATE)} />
        <OverviewDetail label={toI18n('ADMIN_TICKET_DETAIL_OWNER')} value={owner.username} />
        {assignee && <OverviewDetail label={toI18n('ADMIN_TICKET_DETAIL_ASSIGNEE')} value={assignee.username} />}
      </OverviewLeftSectionWrapper>
    );
  }
}

export default TicketOverview;
