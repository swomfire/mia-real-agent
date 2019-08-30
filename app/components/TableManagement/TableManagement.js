import React from 'react';
import PropTypes, { shape } from 'prop-types';
import history from 'utils/history';
import ShadowScrollbars from 'components/Scrollbar';
import TableBorder from 'components/TableBorder';
import TableHeaderComponent from './TableHeaderComponent';
import TableRow from './TableRow';

const scrollStyle = {
  height: 'calc(100vh - 150px)',
  width: '100%',
};

class TableManagement extends React.PureComponent {
  componentDidMount() {
    this.props.fetchList();
  }

  goToDetail = (item) => {
    const {
      endpoint, shouldOpenDetail = true, onClick, onClickRow,
    } = this.props;
    if (onClick) {
      onClick(item);
      return;
    }
    if (onClickRow) {
      onClickRow(item);
      return;
    }
    if (shouldOpenDetail) {
      const { _id } = item;
      history.push(`/${endpoint}/${_id}`);
    }
  };

  renderTableItem = (item) => {
    const { columns, shouldOpenDetail = true, ...rest } = this.props;
    const { _id } = item;
    return (
      <TableRow
        columns={columns}
        rest={rest}
        item={item}
        key={_id}
        onClick={this.goToDetail}
        isPointer={shouldOpenDetail}
      />
    );
  };

  render() {
    const {
      items,
      columns,
      // for TableBorder
      isLoading,
      totalCount,
      selectedPage,
      sizePerPage,
      changePage,
    } = this.props;

    const size = items.length;
    return (
      <TableBorder
        pageName="table-management"
        size={size}
        isLoading={isLoading}
        totalCount={totalCount}
        selectedPage={selectedPage}
        changePage={changePage}
        sizePerPage={sizePerPage}
      >
        <TableHeaderComponent columns={columns} />
        <ShadowScrollbars style={scrollStyle}>
          {items.map(this.renderTableItem)}
        </ShadowScrollbars>
      </TableBorder>
    );
  }
}

TableManagement.propTypes = {
  fetchList: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  endpoint: PropTypes.string,
  changePage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  shouldOpenDetail: PropTypes.bool,
  onClick: PropTypes.func,
  onClickRow: PropTypes.func,
  actions: shape(),
};

export default TableManagement;
