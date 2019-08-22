import TableManagement from 'components/TableManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/intent';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
import {
  getIntentList,
  getIsFetching,
  getIntentTotalRecord,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/intent';
import { COLUMN_TYPE } from 'utils/constants';
import { toI18n } from '../../utils/func-utils';

const ticketColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'displayName',
    columnAttr: {
      value: toI18n('ADMIN_INTENT_TABLE_DISPLAY_NAME'),
      percent: 100,
    },
  },
];

const mapDispatchToProps = {
  fetchList: actions.intentAdminGetAll,
  changePage: actions.changePage,
};

const structureSelectorFunc = createStructuredSelector({
  items: getIntentList,
  isLoading: getIsFetching,
  totalCount: getIntentTotalRecord,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);
  return {
    ...structureSelector,
    columns: ticketColumns,
<<<<<<< HEAD
    onClick: ({ _id }) => { history.push(`/admin/intents/${_id}`); },
    endpoint: 'admin/intents',
=======
    onClick: ({ _id }) => { history.push(`/admin/tickets/${_id}`); },
    endpoint: 'admin/tickets',
>>>>>>> Basic UI List
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
