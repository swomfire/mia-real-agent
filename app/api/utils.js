export const handleError = (error) => {
  const { response, request, message } = error;
  if (response) {
    const { data, status } = response;
    // Request made and server responded
    return { error: `[${status}] ${data}`, data };
  }
  if (request) {
    // The request was made but no response was received
    return { error: request };
  }
  // Something happened in setting up the request that triggered an Error
  return { error: message };
};
