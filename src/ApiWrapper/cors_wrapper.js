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

const getCorsConfig = (method, data = {}, applicationType) => {
  let corsConfig;

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
      // TODO: commenting all of these settings out as with those on file upload doesn't work :man-shrugging: . Needs further investigation.
      // mode: 'no-cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // redirect: 'follow',
      // referrer: 'no-referrer',
      // NOTE: Form data contains a file, so should not be stringified
      // body: data
    };
    // if sending data as a json file
    if (applicationType === 'json') {
      corsConfig.headers = {
        'Content-Type': 'application/json'
      };
      corsConfig.body = JSON.stringify(data);
    }
    // if sending something else like a video or audio file in form body
    else {
      corsConfig.body = data;
    }
  }
  else {
    corsConfig = {
      method: method,
      mode: 'cors'
    };
  }

  return corsConfig;
};

async function corsFetch(url, method = 'GET', data = {}, applicationType) {
  validateRESTMethod(method);
  const corsConfig = getCorsConfig(method, data, applicationType);

  return await fetch(url, corsConfig);
}

export default corsFetch;
