import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  OverviewLeftSectionWrapper,
  OverviewTitle,
  OverviewProduct,
  AdminInfoContentBlock,
  OverviewLabel,
  OverviewValue,
} from 'components/Generals/ItemDetail.styled';
import { DATE_TIME_FORMAT } from '../../utils/constants';
import { toI18n } from '../../utils/func-utils';

class TicketDetailInfoContent extends PureComponent {
  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <OverviewLabel>{label}</OverviewLabel>
      <OverviewValue>{value instanceof Array ? value.join(', ') || '-' : (value || '-')}</OverviewValue>
    </OverviewProduct>
  );

  renderItemOverview = () => {
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
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_TITLE'), title, true)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_STATUS'), status)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_CATEGORY'), category)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_DESCRIPTION'), description)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_CREATED_AT'), moment(createdAt).format(DATE_TIME_FORMAT.DATE))}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_OWNER'), owner.username)}
        {assignee && this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_ASSIGNEE'), assignee.username)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_CONVERSATION_LOG'), ' ')}
      </OverviewLeftSectionWrapper>
    );
  };

  render() {
    return (
      <AdminInfoContentBlock>
        {this.renderItemOverview()}
      </AdminInfoContentBlock>
    );
  }
}

TicketDetailInfoContent.propTypes = {
  ticketDetail: PropTypes.object.isRequired,
};

export default TicketDetailInfoContent;
