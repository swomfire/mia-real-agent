import React from 'react';
import TableManagement from '../TableManagement/TableManagement';
import BillingRow from './BillingRow';

export class BillingManagement extends TableManagement {
  renderTableItem = (item) => {
    const { columns, shouldOpenDetail = true, ...rest } = this.props;
    const { _id } = item;
    return (
      <BillingRow
        columns={columns}
        rest={rest}
        item={item}
        key={_id}
        onClick={this.goToDetail}
        isPointer={shouldOpenDetail}
      />
    );
  };
}

export default BillingManagement;
