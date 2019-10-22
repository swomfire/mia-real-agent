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
import { ActionWrapper } from './styles';

class SupportItem extends PureComponent {
  static propTypes = {
    support: shape().isRequired,
    onAccept: func.isRequired,
    onCancel: func.isRequired,
    index: number,
  }

  handleAccept = () => {
    const { support, onAccept } = this.props;
    const {
      _id: ticketId,
    } = support;
    onAccept(ticketId);
  }

  handleCancel = () => {
    const { support, onCancel } = this.props;
    const {
      _id: ticketId,
    } = support;
    onCancel(ticketId);
  }


  renderSubtitle = () => {
    const { support } = this.props;
    const {
      createdAt,
    } = support;
    const timeFromNow = moment(createdAt).fromNow();

    return (
      <DashboardSubActivity>
        {`Opened ${timeFromNow}`}
      </DashboardSubActivity>
    );
  }

  renderSupportContent = () => {
    const { support } = this.props;
    const { title, category = [] } = support;
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

  renderSupportAction = () => (
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
          {this.renderSupportContent()}
        </TableContent>
        <TableContent {...columnSizeContent[2]}>
          {this.renderSupportAction()}
        </TableContent>
      </TableContentItem>
    );
  }

  static propTypes = {
  }
}

export default SupportItem;
