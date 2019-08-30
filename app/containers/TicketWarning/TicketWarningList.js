import itemDetailListHoc from 'hoc/ItemDetailHoc/ItemDetailListHoc';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/ticketWarning';
import {
  reselectSorting,
  getIsFetching,
  reselectTickets,
  getTicketIdFromWarningRoute,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/ticketWarning';
import { SORT } from 'utils/constants';
import TicketWarningListItem from 'components/TicketWarning/TicketWarningListItem';
import { toI18n } from '../../utils/func-utils';
const { USER_SORT } = SORT;

const structureSelectorFunc = createStructuredSelector({
  currentSorting: reselectSorting,
  isLoading: getIsFetching,
  selectedId: getTicketIdFromWarningRoute,
  items: reselectTickets,
  totalCount: getTotalCount,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);

  return {
    ...structureSelector,
    sortItems: USER_SORT,
    title: toI18n('ADMIN_TICKET_DETAIL_ALL_TICKETS'),
  };
};

const mapDispatchToProps = {
  handleSort: actions.ticketSorting,
  fetchList: actions.ticketWarningAdminGetAll,
  changePage: actions.changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemDetailListHoc(TicketWarningListItem));
