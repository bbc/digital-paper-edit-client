/**
 * Helper function tto wrap fetch post request
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
 * @param {string} url - API end point
 * @param {object} data - json data to send
 */

const METHODS = [ 'GET', 'POST', 'PUT', 'DELETE' ];

const validateRESTMethod = (method) => {
  if (!METHODS.includes(method)) {
    throw new Error(`Wrong method passed ${ method } - should be one of ${ METHODS }`);
  }

  return;

};

const getCorsConfig = (method, data = {}) => {
  let corsConfig = {
    method: method,
    mode: 'cors'
  };

  if (method === 'PUT') {
    corsConfig = {
      method: method,
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } else if (method === 'POST') {
    corsConfig = {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
    };
  }

  return corsConfig;
};

async function corsFetch(url, method = 'GET', data = {}) {
  validateRESTMethod(method);
  const corsConfig = getCorsConfig(method, data);

  return await fetch(url, corsConfig);
}

export default corsFetch;
