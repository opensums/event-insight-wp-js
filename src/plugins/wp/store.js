// src/plugins/wp/store.js
import axios from 'axios';

const { nonce, root } = window.wpApiSettings;

var instance = axios.create({
  baseURL: `${root}event-insight/v1`,
  headers: { 'X-WP-Nonce': nonce },
  timeout: 5000,
});

function errorHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.status = error.response.status;
  } else if (error.request) {
    // The request was made but no response was received
    if (error.code === 'ECONNABORTED') {
      // There was a timeout.
      error.timeout = error.request.timeout;
    }
    error.status = null;
  } else {
    // Something happened in setting up the request that triggered an Error
    error.status = null;
  }
  // console.log('Config', error.config);
  throw error;
}

/*
function wpErrorHandler(error) {
  if (error.response && error.response.data && error.response.data.code) {
    // 404: error.response.data.code === rest_no_route - shouldn't happen
    // 401: error.response.data.code === rest_forbidden - no nonce header
    // 403: error.response.data.code === rest_cookie_invalid_nonce - invalid
  }
  throw error;
}
*/

async function request(context, options) {
  // Axios uses url not path.
  options.url = options.path;
  delete options.path;
  try {
    return await instance.request(options);
  } catch (err) {
    errorHandler(err);
  }
}

export const actions = { request };

export default { namespaced: true, actions };
