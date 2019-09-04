import React, { Component } from 'react';
import _get from 'lodash/get';
import TableDetail from 'components/Generals/TableDetail';
import { ROLES } from '../../../common/enums';
import { toI18n } from '../../utils/func-utils';
import { COLUMN_TYPE, DATE_TIME_FORMAT } from '../../utils/constants';

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
  renderTicketsTable = () => {
    const { tickets = [] } = this.props;
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
    return <TableDetail columns={columns} items={tickets} emptyMsg="No tickets available" />;
  }

  render() {
    return (
      <div>
        {this.renderTicketsTable()}
      </div>
    );
  }
}

export default ApplicationDetailTicketTable;
