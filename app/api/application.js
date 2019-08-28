import axios from 'axios';
import { handleError } from './utils';

export const createApplication = data => axios
  .post('applications', data)
  .then(response => ({ response }))
  .catch(handleError);

export const adminGetAllApplication = params => axios
  .get('admin/applications', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const approveApplication = id => axios
  .post(`applications/${id}/approve`)
  .then(response => ({ response }))
  .catch(handleError);

export const rejectApplication = id => axios
  .post(`applications/${id}/reject`)
  .then(response => ({ response }))
  .catch(handleError);

export const reviewApplication = id => axios
  .post(`applications/${id}/review`)
  .then(response => ({ response }))
  .catch(handleError);

export const get = id => axios
  .get(`admin/applications/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const getApplicationSummary = () => axios
  .get('admin/applications/dashboard/summary')
  .then(response => ({ response }))
  .catch(handleError);

export const checkBasicInfomationExisted = (nickname, email) => axios
  .get(`applications/info/check?nickname=${nickname}&email=${email}`)
  .then(response => ({ response }))
  .catch(handleError);
