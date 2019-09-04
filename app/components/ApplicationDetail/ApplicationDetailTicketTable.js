import React, { Component } from 'react';
import { shape } from 'prop-types';
import TableDetail from 'components/Generals/TableDetail';
import { toI18n } from '../../utils/func-utils';
import { COLUMN_TYPE, DATE_TIME_FORMAT } from '../../utils/constants';
import { OverviewTitle, OverviewLeftSectionWrapper, AdminInfoContentBlock } from '../Generals/ItemDetail.styled';

const defaultColumns = [
  {
    headerPropertise: {
      value: toI18n('ADMIN_USERS_DETAIL_TICKET_TABLE_TICKET_ID'),
    },
    contentPropertise: {
    },
    dataKey: '_id',
    type: COLUMN_TYPE.TEXT,
  },
  {
    headerPropertise: {
      value: toI18n('ADMIN_USERS_DETAIL_TICKET_TABLE_CREATED_AT'),
    },
    contentPropertise: {
    },
    dataKey: 'createdAt',
    type: COLUMN_TYPE.DATE,
    format: DATE_TIME_FORMAT.DATE_TIME,
  },
  {
    headerPropertise: {
      value: toI18n('ADMIN_USERS_DETAIL_TICKET_TABLE_CATEGORY'),
    },
    contentPropertise: {
    },
    dataKey: 'category',
    type: COLUMN_TYPE.TEXT,
  },
  {
    headerPropertise: {
      value: toI18n('ADMIN_USERS_DETAIL_TICKET_TABLE_TITLE'),
    },
    contentPropertise: {},
    dataKey: 'title',
    type: COLUMN_TYPE.TEXT,
  },
];

class ApplicationDetailTicketTable extends Component {
  static propTypes = {
    tickets: shape(),
  }

  renderTicketsTable = () => {
    const { tickets } = this.props;
    const { result = [] } = tickets || {};
    let columns = [];
    columns = [
      ...defaultColumns,
      {
        headerPropertise: {
          value: toI18n('ADMIN_USERS_DETAIL_TICKET_TABLE_OWNER'),
        },
        contentPropertise: {
        },
        dataKey: 'owner.username',
        type: COLUMN_TYPE.TEXT,
      },
      {
        headerPropertise: {
          value: 'Status',
        },
        contentPropertise: {
          size: '100',
        },
        dataKey: 'status',
        type: COLUMN_TYPE.STATUS,
      },
    ];
    return <TableDetail columns={columns} items={result} emptyMsg="No tickets available" />;
  }

  render() {
    const { tickets } = this.props;
    const { totalRecord = 0 } = tickets || {};
    return (
      <AdminInfoContentBlock>
        <OverviewLeftSectionWrapper>
          <OverviewTitle>
            {`Total ticket: ${totalRecord}`}
          </OverviewTitle>
          {this.renderTicketsTable()}
        </OverviewLeftSectionWrapper>
      </AdminInfoContentBlock>
    );
  }
}

export default ApplicationDetailTicketTable;
