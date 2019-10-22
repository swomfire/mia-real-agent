import React, { PureComponent } from 'react';
import { shape, number, func } from 'prop-types';
import { Button } from 'antd';
import moment from 'moment';
import { DefaultButton } from 'components/Generals/General.styled';
import {
  DashboardTitle,
  DashboardRightBlock,
  DashboardLeftBlock,
  DashboardSubTitle,
  DashboardLinkTitle,
  DashboardSubActivity,
} from 'components/ActivityTab/ActivityTab.styled';

import {
  TableContentItem,
} from 'components/TableComponent/TableComponent.styled';
import { TableContent } from 'components/TableComponent/TableComponent';
import { columnSizeContent } from './ColumnSize';
import { ActionWrapper } from './RequestItem.styled';

class RequestItem extends PureComponent {
  static propTypes = {
    request: shape().isRequired,
    onAccept: func.isRequired,
    onCancel: func.isRequired,
    index: number,
  }

  handleAccept = () => {
    const { request, onAccept } = this.props;
    const {
      _id: ticketId,
      conversationId,
    } = request;
    onAccept(conversationId, ticketId);
  }

  handleCancel = () => {
    const { request, onCancel } = this.props;
    const {
      _id: ticketId,
      conversationId,
    } = request;
    onCancel(conversationId, ticketId);
  }


  renderSubtitle = () => {
    const { request } = this.props;
    const {
      createdAt,
    } = request;
    const timeFromNow = moment(createdAt).fromNow();

    return (
      <DashboardSubActivity>
        {`Opened ${timeFromNow}`}
      </DashboardSubActivity>
    );
  }

  renderRequestContent = () => {
    const { request } = this.props;
    const { title, category = [] } = request;
    const categoriesDisplay = category.join(', ');
    return (
      <DashboardTitle>
        <DashboardRightBlock>
          <DashboardSubTitle>
            <DashboardLinkTitle to="">
              {`${title} [ ${categoriesDisplay} ]`}
            </DashboardLinkTitle>
          </DashboardSubTitle>
          {this.renderSubtitle()}
        </DashboardRightBlock>
      </DashboardTitle>
    );
  }

  renderRequestAction = () => (
    <DashboardTitle>
      <DashboardLeftBlock>
        <ActionWrapper>
          <DefaultButton onClick={this.handleAccept}>Accept</DefaultButton>
          <Button onClick={this.handleCancel}>Cancel</Button>
        </ActionWrapper>
      </DashboardLeftBlock>
    </DashboardTitle>
  )


  render() {
    const { index } = this.props;
    return (
      <TableContentItem key={index} ticket>
        <TableContent {...columnSizeContent[0]} />
        <TableContent style={{ flex: 'auto' }}>
          {this.renderRequestContent()}
        </TableContent>
        <TableContent {...columnSizeContent[2]}>
          {this.renderRequestAction()}
        </TableContent>
      </TableContentItem>
    );
  }

  static propTypes = {
  }
}

export default RequestItem;
