import axios from 'axios';
import { handleError } from './utils';

export const sendReplyMessage = (from, to, conversationId, messages) => axios
  .post('/reply', {
    from, to, conversationId, messages,
  })
  .then(response => ({ response }))
  .catch(handleError);

export const sendWarningMessage = (from, conversationId) => axios
  .post('/reply/warning', {
    from, conversationId,
  })
  .then(response => ({ response }))
  .catch(handleError);
