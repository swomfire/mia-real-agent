import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions } from 'reducers/intent';
import {
  reselectSorting,
  getFetchingError,
} from 'selectors/ticket';
import { SORT } from 'utils/constants';
import TicketTable from './IntentTable';
import { toI18n } from '../../utils/func-utils';

const { TICKET_SORT } = SORT;

const mapStateToProps = state => ({
  errorMsg: getFetchingError(state),
  currentSorting: reselectSorting(state),
  createEndpoint: 'admin/ticket/create',
  title: toI18n('ADMIN_TICKET_TABLE_ALL_TICKETS'),
  sortItems: TICKET_SORT,
});

const mapDispatchToProps = {
  handleSort: actions.sortTicket,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(TicketTable));
