import axios from 'axios';
import { handleError } from './utils';

export const getAllFeedback = () => axios
  .get('feedbacks')
  .then(response => ({ response }))
  .catch(handleError);

export const createFeedback = data => axios
  .post('feedbacks', data)
  .then(response => ({ response }))
  .catch(handleError);

export const getFeedback = id => axios
  .get(`feedbacks/${id}`)
  .then(response => ({ response }))
  .catch(handleError);
