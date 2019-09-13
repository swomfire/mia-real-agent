import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import _get from 'lodash/get';
import { fetchingObj } from 'reducers/billing';
import { ROUTE_DETAIL } from '../utils/constants';
import { getRouteMatch } from './router';

const emptyMap = fromJS({});
const emptyList = fromJS([]);
const getBillingTotalRecord = ({ billing }) => billing.get('totalRecord');
const getBillingGetBillingDetail = ({ billing }, _id) => billing.getIn(['billings', _id], emptyMap).toJS();
const getBillingGetBillingIsGetting = ({ billing }) => billing.get('isGetting');
const getBillingGetBillingError = ({ billing }) => billing.get('getError');
const getBillingsById = ({ billing }) => billing.get('billings').toJS();
const getVisibleBillingIds = ({ billing }) => billing.get('visibleBillingIds', emptyList).toJS();
const getBillingsList = createSelector(
  getBillingsById,
  getVisibleBillingIds,
  (billingByIds, visibleBillingIds) => visibleBillingIds.map(itemId => billingByIds[itemId])
);
const getBillingIdList = createSelector(
  getBillingsList,
  // eslint-disable-next-line no-underscore-dangle
  billingList => billingList.map(billing => billing._id)
);

const getBillingById = ({ billing }, _id) => (billing.get('billings').get(_id) || fromJS({})).toJS();

const getFetchingContext = ({ billing }) => billing.get('fetching', fetchingObj).toJS();

const getSelectedPage = ({ billing }) => billing.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ billing }) => billing.getIn(['pagination', 'sizePerPage']);

const getSorting = ({ billing }) => billing.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());

const getIsFetching = ({ billing }) => billing.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ billing }) => billing.getIn(['fetching', 'errorMsg'], '');

const getBillings = ({ billing }) => billing.get('billings', emptyMap);

const getTotalCount = ({ billing }) => billing.get('totalRecord', 0);

const reselectBillings = createSelector(
  getBillings,
  getVisibleBillingIds,
  (billings, visibleBillingIds) => {
    const plainBillingById = billings.toJS();
    return visibleBillingIds.map(id => plainBillingById[id]);
  },
);

const getBillingIdFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.BILLING_DETAIL_ROUTER),
  match => _get(match, 'params.id', null),
);


const getBillingFromRoute = createSelector(
  getBillingIdFromRoute,
  getBillings,
  (path, billings) => billings.get(path, emptyMap).toJS(),
);

export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
  getBillingTotalRecord,
  getBillingGetBillingDetail,
  getBillingGetBillingIsGetting,
  getBillingGetBillingError,
  getBillingsList,
  getFetchingContext,
  getIsFetching,
  getFetchingError,
  getBillingIdList,

  reselectBillings,
  getTotalCount,
  getBillingById,
  getBillingIdFromRoute,
  getBillingFromRoute,
};
