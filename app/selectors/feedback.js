import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
const emptyMap = fromJS({});

const getSelectedPage = ({ feedbacks }) => feedbacks.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ feedbacks }) => feedbacks.getIn(['pagination', 'sizePerPage']);

const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());
const getSorting = ({ feedbacks }) => feedbacks.get('sorting', emptyMap);
export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
};
