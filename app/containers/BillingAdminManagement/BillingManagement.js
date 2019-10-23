import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions } from 'reducers/billing';
import {
  reselectSorting,
  getFetchingError,
} from 'selectors/billing';
import { SORT } from 'utils/constants';
import BillingTable from './BillingTable';
import { toI18n } from '../../utils/func-utils';
import { BILLING_TYPE } from '../../../common/enums';

const { TICKET_SORT } = SORT;

const defaultOptions = [
  {
    label: toI18n('BILLING_FILTER_TYPE'),
    key: 'type',
    values: [
      {
        label: toI18n('BILLING_FILTER_TYPE_TICKET_CHARGE'),
        value: BILLING_TYPE.TICKET_CHARGE,
      },
      {
        label: toI18n('BILLING_FILTER_TYPE_TICKET_SUPPORT'),
        value: BILLING_TYPE.TICKET_SUPPORT,
      },
      {
        label: toI18n('BILLING_FILTER_TYPE_TICKET_FULFILL'),
        value: BILLING_TYPE.TICKET_FULFILL,
      },
      {
        label: toI18n('BILLING_FILTER_TYPE_TOPUP'),
        value: BILLING_TYPE.TOPUP,
      },
    ],
  },
];

const mapStateToProps = state => ({
  errorMsg: getFetchingError(state),
  currentSorting: reselectSorting(state),
  title: toI18n('ADMIN_TICKET_TABLE_ALL_BILLINGS'),
  sortItems: TICKET_SORT,
  filterItems: defaultOptions,
});

const mapDispatchToProps = {
  handleSort: actions.sortBilling,
  handleFilter: actions.billingAdminGetAll,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(BillingTable));
