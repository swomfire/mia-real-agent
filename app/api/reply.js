import axios from 'axios';
import { handleError } from './utils';

export const sendReplyMessage = (from, conversationId, messages) => axios
  .post('/reply', {
    from, conversationId, messages,
  })
  .then(response => ({ response }))
  .catch(handleError);

export const sendWarningMessage = (from, conversationId, messages) => axios
  .post('/reply/warning', {
    from, conversationId, messages,
  })
  .then(response => ({ response }))
  .catch(handleError);
