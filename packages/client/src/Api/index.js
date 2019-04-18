import { isBrowser, isElectron, whichJsEnv } from '../Util/which-js-env/index.js';
import postData from './post-data.js';

class Api {
  /**
   * Projects URL
   */
  // Projects URL index
  getProjectsUrl() {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects`;
  }

  //  Projects URL show
  // eslint-disable-next-line class-methods-use-this
  getProjectUrl(id) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ id }`;
  }
  // Projects URL create
  // eslint-disable-next-line class-methods-use-this
  createProjectUrl() {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects`;
  }

  // Projects URL update

  // Projects URL  delete

  /**
   * Transcripts URL
   */
  // eslint-disable-next-line class-methods-use-this
  getTranscripts(projectId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts`;
  }

  // get Transcript show
  // eslint-disable-next-line class-methods-use-this
  getTranscript(projectId, transcriptId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts/${ transcriptId }`;
  }

  /**
   * Projects
   */
  getProjects() {
    if (isBrowser()) {
      return fetch(this.getProjectsUrl(), { mode: 'cors' })
        .then(res => res.json())
        .then((json) => {
          return json.projects;
        });
    }
    if (isElectron()) {
      // TODO:
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

  getProject(id) {
    return fetch(this.getProjectUrl(id), { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        return json.project;
      });
  }
  /**
   * Transcripts
   */
}

// https://www.sitepoint.com/javascript-design-patterns-singleton/
const instance = new Api();
Object.freeze(instance);

export default instance;
