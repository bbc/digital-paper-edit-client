import { isBrowser, isElectron, whichJsEnv } from '../Util/which-js-env/index.js';

class Api {
  /**
   * Projects URL
   */
  // Projects URL index
  getProjectsUrl() {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects`;
  }

  //  Projects URL show
  getProjectUrl(id) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ id }`;
  }
  // Projects URL create
  createProjectUrl() {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects`;
  }

  // Projects URL update

  // Projects URL  delete

  /**
   * Transcripts
   */
  getTranscripts(projectId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts`;
  }

  getTranscript(projectId, transcriptId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts/${ transcriptId }`;
  }

  getProjects() {
    if (isBrowser()) {
      return fetch(this.getProjectsUrl(), { mode: 'cors' })
        .then(res => res.json())
        .then((json) => {
          return json.projects;
        });
    }
    if (isElectron()) {
      // const electron = require('electron');
      // var currentWindow = electron.remote.getCurrentWindow();
      // const dataPath = currentWindow.dataPath;
      // console.log(dataPath);

      // return window.DB.getProjects().then((projects) => {
      // resolve(projects);
      // reject(false);
      // return projects;
      // });

      // if (window.process === undefined) {
      //   try {
      //   //  Block of code to try
      //   // const re
      //   // const DB = require('/Users/passap02/digital-paper-edit/packages/electron/db/db.js');
      //     window.DB.getProjects().then((res) => {
      //       console.log('res', res);

      //       return res.projects;
      //     });
      //   }
      //   catch ( e) {
      //   //  Block of code to handle errors
      //     console.log(e);
      //   }
      // }

      // TODO
      return new Promise((resolve, reject) => {
        resolve(false);
        reject(false);
      });
    }
    // TODO: CEP + error handling
  }

  createProject(data) {
    return postData(this.createProjectUrl(), data)
      .then((data) => {
        // console.log(JSON.stringify(data));
        return data;
      }) // JSON-string from `response.json()` call
      .catch((error) => {
        console.error(error);

        return error;
      });
  }
}

/**
 * Helper function tto wrap fetch post request
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
 * @param {string} url - API end point
 * @param {object} data - json data to send
 */
function postData(url = '', data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    }); // parses JSON response into native Javascript objects
}
// https://www.sitepoint.com/javascript-design-patterns-singleton/
const instance = new Api();
Object.freeze(instance);

export default instance;
