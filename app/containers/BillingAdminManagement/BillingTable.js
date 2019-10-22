import TableManagement from 'components/BillingManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/billing';
import { createStructuredSelector } from 'reselect';
import {
  getBillingsList,
  getIsFetching,
  getBillingTotalRecord,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/billing';
import { COLUMN_TYPE, DATE_TIME_FORMAT } from 'utils/constants';
import { toI18n } from '../../utils/func-utils';

const billingColumns = [
  {
    type: COLUMN_TYPE.BILLING_TITLE,
    dataKey: 'title',
    columnAttr: {
      value: toI18n('BILLING_INFO_ROW_BILLING'),
      percent: 40,
      className: 'text-bold billing-Id',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'userId.username',
    columnAttr: {
      value: toI18n('ADMIN_TICKET_TABLE_USERNAME'),
      percent: 20,
      className: 'text-bold billing-Id',
    },
  },
  {
    type: COLUMN_TYPE.DATE,
    dataKey: 'createdAt',
    format: DATE_TIME_FORMAT.DATE_TIME,
    columnAttr: {
      value: toI18n('BILLING_INFO_ROW_CREATE_AT'),
      percent: 15,
      className: 'text-bold billing-Id',
    },
  },
  {
    type: COLUMN_TYPE.BILLING_AMOUNT,
    dataKey: 'total.amount',
    columnAttr: {
      value: toI18n('BILLING_INFO_ROW_VALUE'),
      percent: 15,
      className: 'text-bold billing-Id',
      justify: 'flex-end',
    },
  },
];

const mapDispatchToProps = {
  fetchList: actions.billingAdminGetAll,
  changePage: actions.changeAdminPage,
};

const structureSelectorFunc = createStructuredSelector({
  items: getBillingsList,
  isLoading: getIsFetching,
  totalCount: getBillingTotalRecord,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);
  return {
    ...structureSelector,
    columns: billingColumns,
    shouldOpenDetail: false,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
