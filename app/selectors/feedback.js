import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
const emptyMap = fromJS({});

const getIsCreating = ({ feedbacks }) => feedbacks.get('isCreating', false);
const getCreateError = ({ feedbacks }) => feedbacks.get('createError', '');
const getSelectedPage = ({ feedbacks }) => feedbacks.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ feedbacks }) => feedbacks.getIn(['pagination', 'sizePerPage']);
const getSorting = ({ feedbacks }) => feedbacks.get('sorting', emptyMap);

const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());
export {
  reselectSorting,
  getSelectedPage,
  getIsCreating,
  getSizePerPage,
  getCreateError,
};
