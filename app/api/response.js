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

export const updateResponse = ({ responseId, ...rest }) => axios
  .put(`responses/${responseId}`, rest)
  .then(response => ({ response }))
  .catch(handleError);

export const deleteResponse = responseId => axios
  .delete(`responses/${responseId}`)
  .then(response => ({ response }))
  .catch(handleError);
