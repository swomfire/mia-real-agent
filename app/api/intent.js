import axios from 'axios';
import { handleError } from './utils';

export const adminGetAllIntent = params => axios
  .get('intents', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const get = id => axios
  .get(`intents/${id}`)
  .then(response => ({ response }))
  .catch(handleError);
