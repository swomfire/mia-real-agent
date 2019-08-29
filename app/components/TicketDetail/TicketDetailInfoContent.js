/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  OverviewLeftSectionWrapper,
  OverviewTitle,
  OverviewProduct,
  InfoContentBlock,
} from 'components/Generals/ItemDetail.styled';
import { DATE_TIME_FORMAT } from '../../utils/constants';
import { toI18n } from '../../utils/func-utils';

class TicketDetailInfoContent extends PureComponent {
  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <label>{label}</label>
      <span>{value instanceof Array ? value.join(', ') || '-' : (value || '-')}</span>
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
      </OverviewLeftSectionWrapper>
    );
  };

  render() {
    return (
      <InfoContentBlock>
        {this.renderItemOverview()}
      </InfoContentBlock>
    );
  }
}

TicketDetailInfoContent.propTypes = {
  ticketDetail: PropTypes.object.isRequired,
};

export default TicketDetailInfoContent;
