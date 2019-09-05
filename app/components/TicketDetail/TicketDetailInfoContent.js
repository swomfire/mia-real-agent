import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AdminInfoContentBlock,
} from 'components/Generals/ItemDetail.styled';
import TicketOverview from './TicketOverview';

class TicketDetailInfoContent extends PureComponent {
  render() {
    const { ticketDetail } = this.props;
    return (
      <AdminInfoContentBlock>
        <TicketOverview ticketDetail={ticketDetail} />
      </AdminInfoContentBlock>
    );
  }
}

TicketDetailInfoContent.propTypes = {
  ticketDetail: PropTypes.object.isRequired,
};

export default TicketDetailInfoContent;
