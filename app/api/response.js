import axios from 'axios';
import { handleError } from './utils';

export const adminGetAllResponse = params => axios
  .get('responses', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const get = id => axios
  .get(`responses/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const createResponse = data => axios
  .post('responses', data)
  .then(response => ({ response }))
  .catch(handleError);
