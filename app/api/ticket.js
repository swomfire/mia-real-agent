import axios from 'axios';
import { handleError } from './utils';

export const createTicket = data => axios
  .post('tickets', data)
  .then(response => ({ response }))
  .catch(handleError);

export const getAllTicket = params => axios
  .get('tickets', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const getTicket = id => axios
  .get(`tickets/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const updateTicket = ({ ticketId, ...rest }) => axios
  .put(`tickets/${ticketId}`, rest)
  .then(response => ({ response }))
  .catch(handleError);

export const getConversationByTicketId = ticketId => axios
  .get(`tickets/${ticketId}/conversations`)
  .then(response => ({ response }))
  .catch(handleError);

export const findAgent = ticketId => axios
  .post(`tickets/${ticketId}/find_agent`)
  .then(response => ({ response }))
  .catch(handleError);

export const closeTicket = (id, status, unsolvedReason) => axios
  .post(`tickets/${id}/close`, { status, unsolvedReason })
  .then(response => ({ response }))
  .catch(handleError);

export const insertChat = (id, data) => axios
  .post(`tickets/chat/${id}`, data)
  .then(response => ({ response }))
  .catch(handleError);

export const adminGetAllTicket = params => axios
  .get('admin/tickets', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const get = id => axios
  .get(`admin/tickets/${id}`)
  .then(response => ({ response }))
  .catch(handleError);

export const getProfile = id => axios
  .get(`tickets/${id}/profile`)
  .then(response => ({ response }))
  .catch(handleError);

export const getActivity = () => axios
  .get('admin/tickets/dashboard/activity')
  .then(response => ({ response }))
  .catch(handleError);

export const submitRating = (id, rating) => axios
  .post(`tickets/${id}/rating`, rating)
  .then(response => ({ response }))
  .catch(handleError);

export const adminGetAllTicketWarning = params => axios
  .get('admin/tickets-warning', { params })
  .then(response => ({ response }))
  .catch(handleError);

export const getWarning = id => axios
  .get(`admin/tickets-warning/${id}`)
  .then(response => ({ response }))
  .catch(handleError);
