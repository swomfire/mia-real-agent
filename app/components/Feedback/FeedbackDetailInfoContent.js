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

class FeedbackDetailInfoContent extends PureComponent {
  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <OverviewLabel>{label}</OverviewLabel>
      <OverviewValue>{value instanceof Array ? value.join(', ') || '-' : (value || '-')}</OverviewValue>
    </OverviewProduct>
  );

  renderItemOverview = () => {
    const {
      feedbackDetail: {
        title, status, feedbacks, createdAt,
        ticketId: ticket,
      },
    } = this.props;
    const {
      _id: ticketId,
      title: ticketTitle, status: renderTicketStatusUpdateMessages, category,
      description, createdAt: ticketCreateAt,
      owner, assignee,
    } = ticket;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>{toI18n('ADMIN_FEEDBACK_DETAIL_TICKET_DETAILS')}</OverviewTitle>
        {this.renderOverviewInfo(toI18n('ADMIN_FEEDBACK_DETAIL_TICKET_ID'), ticketId, true)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_TITLE'), ticketTitle)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_STATUS'), renderTicketStatusUpdateMessages)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_CATEGORY'), category)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_DESCRIPTION'), description)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_CREATED_AT'), moment(ticketCreateAt).format(DATE_TIME_FORMAT.DATE))}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_OWNER'), owner.username)}
        {assignee && this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_ASSIGNEE'), assignee.username)}
        <OverviewTitle>{toI18n('ADMIN_FEEDBACK_DETAIL_PRIMARY_DETAILS')}</OverviewTitle>
        {this.renderOverviewInfo(toI18n('ADMIN_FEEDBACK_DETAIL_TITLE'), title, true)}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_CREATED_AT'), moment(createdAt).format(DATE_TIME_FORMAT.DATE))}
        {this.renderOverviewInfo(toI18n('ADMIN_TICKET_DETAIL_STATUS'), status)}
        {this.renderOverviewInfo(toI18n('ADMIN_FEEDBACK_DETAIL_FEEDBACKS'), feedbacks)}
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

FeedbackDetailInfoContent.propTypes = {
  feedbackDetail: PropTypes.object.isRequired,
};

export default FeedbackDetailInfoContent;
