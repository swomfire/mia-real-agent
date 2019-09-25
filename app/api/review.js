import axios from 'axios';
import { handleError } from './utils';

export const createReview = data => axios
  .post('review', data)
  .then(response => ({ response }))
  .catch(handleError);
