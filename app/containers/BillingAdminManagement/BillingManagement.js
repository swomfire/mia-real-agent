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

const { TICKET_SORT } = SORT;

const mapStateToProps = state => ({
  errorMsg: getFetchingError(state),
  currentSorting: reselectSorting(state),
  title: toI18n('ADMIN_TICKET_TABLE_ALL_BILLINGS'),
  sortItems: TICKET_SORT,
});

const mapDispatchToProps = {
  handleSort: actions.sortBilling,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(BillingTable));
