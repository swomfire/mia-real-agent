import axios from 'axios';
import { handleError } from './utils';

export const getAllBilling = params => axios
  .get('/billing', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const get = id => axios
  .get(`billing/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const adminGetAllBilling = params => axios
  .get('admin/billings', { params })
  .then(response => ({ response }))
  .catch(handleError);
