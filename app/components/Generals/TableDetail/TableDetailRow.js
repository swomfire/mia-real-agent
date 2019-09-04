import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import moment from 'moment';
import {
  TableContentItem,
  TableStatusContent,
} from 'components/TableComponent/TableComponent.styled';
import { TableContent } from 'components/TableComponent/TableComponent';
import { COLUMN_TYPE } from 'utils/constants';

class TableDetailRow extends React.PureComponent {
  renderTextColumn = (column) => {
    const { item } = this.props;
    const { dataKey } = column;
    if (dataKey instanceof (Array)) {
      return dataKey.map((key) => {
        const value = _get(item, key);
        if (Array.isArray(value)) {
          return value.length > 1 ? value.join(' , ') : value;
        }
        return `${value} ` || '-';
      });
    }
    const value = _get(item, dataKey);
    if (Array.isArray(value)) {
      return value.length > 1 ? value.join(' , ') : value;
    }
    return value || '-';
  }

  renderStatusColumn = (column) => {
    const { item } = this.props;
    const { dataKey } = column;

    const status = _get(item, dataKey);

    return <TableStatusContent status={status}>{status}</TableStatusContent>;
  }

  renderDateColumn = (column) => {
    const { item } = this.props;
    const { dataKey, format } = column;

    const value = _get(item, dataKey);

    return moment(value).format(format);
  };

  renderColumnContent = (column) => {
    const { type } = column;

    switch (type) {
      case COLUMN_TYPE.DATE:
        return this.renderDateColumn(column);
      case COLUMN_TYPE.STATUS:
        return this.renderStatusColumn(column);
      case COLUMN_TYPE.TEXT:
      default:
        return this.renderTextColumn(column);
    }
  }

  renderColumn = (column) => {
    const { contentPropertise } = column;

    return (
      <TableContent {...contentPropertise}>
        {this.renderColumnContent(column)}
      </TableContent>
    );
  }

  render() {
    const { columns } = this.props;

    return (
      <TableContentItem>
        {columns.map(this.renderColumn)}
      </TableContentItem>
    );
  }
}

TableDetailRow.propTypes = {
  columns: PropTypes.array,
  item: PropTypes.object,
};

export default TableDetailRow;
