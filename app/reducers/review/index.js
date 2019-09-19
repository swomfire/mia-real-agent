import { fromJS } from 'immutable';

export const SUBMIT = 'review/SUBMIT';
export const SUBMIT_SUCCESS = 'review/SUBMIT_SUCCESS';
export const SUBMIT_FAIL = 'review/SUBMIT_FAIL';
// action creator

const submitAction = (review, applicationId) => ({
  type: SUBMIT,
  payload: {
    review,
    applicationId,
  },
});

const submitCompleteAction = payload => ({
  type: SUBMIT_SUCCESS,
  payload,
});

const submitFailAction = errorMessage => ({
  type: SUBMIT_FAIL,
  payload: {
    errorMessage,
  },
});


// selector
const getReviewIsSubmitting = ({ review }) => review.get('isSubmitting');
const getReviewSubmitError = ({ review }) => review.get('submitError');

const initialState = fromJS({
  isSubmitting: false,
  submitError: '',
});

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT:
      return state.set('isSubmitting', true)
        .set('submitError', '');
    case SUBMIT_SUCCESS:
      return state.set('isSubmitting', false);
    case SUBMIT_FAIL:
      return state.set('isSubmitting', false)
        .set('submitError', action.errorMessage);

    default: return state;
  }
}

export default reviewReducer;

export const actions = {
  submitAction,
  submitCompleteAction,
  submitFailAction,
};

export const selectors = {
  getReviewIsSubmitting,
  getReviewSubmitError,
};
