import TableManagement from 'components/BillingManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/billing';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
import {
  getBillingsList,
  getIsFetching,
  getBillingTotalRecord,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/billing';
import { COLUMN_TYPE } from 'utils/constants';
import { toI18n } from '../../utils/func-utils';

const billingColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'type',
    columnAttr: {
      value: toI18n('BILLING_INFO_ROW_BILLING'),
      percent: 60,
      className: 'text-bold billing-Id',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'type',
    columnAttr: {
      value: toI18n('BILLING_INFO_ROW_CREATE_AT'),
      percent: 15,
      className: 'text-bold billing-Id',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
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
  fetchList: actions.billingGetAll,
  changePage: actions.changePage,
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
    onClick: ({ _id }) => { history.push(`/admin/billings/${_id}`); },
    endpoint: 'admin/billings',
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
