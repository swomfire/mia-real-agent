import axios from 'axios';
import { handleError } from './utils';

export const uploadFile = file => axios
  .post('http://localhost:3000/api/users/upload', {
    filename: file.name,
    filetype: file.type,
  })
  .then((result) => {
    const { urls, fileUrl } = result.data;
    const { originFileObj } = file;
    return {
      data: fetch(urls[0], {
        method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
        body: originFileObj, // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': file.type,
        }),
      }),
      fileUrl,
    };
  })
  .then(response => ({ response }))
  .catch(handleError);
