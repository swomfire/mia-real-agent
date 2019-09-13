import axios from 'axios';
import { handleError } from './utils';

export const getCurrentSystem = () => axios
  .get('system/version/current')
  .then(response => ({ response }))
  .catch(handleError);

export const updateSystem = (id, data) => axios
  .put(`system/${id}`, data)
  .then(response => ({ response }))
  .catch(handleError);
