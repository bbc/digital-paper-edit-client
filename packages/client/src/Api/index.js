import { isBrowser, isElectron, whichJsEnv } from '../Util/which-js-env/index.js';
import postData from './post-data.js';

window.DB = () => {console.log('in react test ');};
class Api {
  /**
   * Projects URL
   */
  // Projects URL create
  // eslint-disable-next-line class-methods-use-this
  createProjectUrl() {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects`;
  }
  // Projects URL index
  getProjectsUrl() {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects`;
  }
  //  Projects URL show
  // eslint-disable-next-line class-methods-use-this
  getProjectUrl(id) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ id }`;
  }
  // Projects URL update
  // eslint-disable-next-line class-methods-use-this
  updateProjectUrl(id) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ id }/edit`;
  }
  // Projects URL  delete
  // eslint-disable-next-line class-methods-use-this
  deleteProjectUrl(id) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ id }`;
  }

  /**
   * Transcripts URL
   */
  // eslint-disable-next-line class-methods-use-this
  // get transcripts index
  getTranscriptsUrl(projectId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts`;
  }

  // get Transcript show
  // eslint-disable-next-line class-methods-use-this
  getTranscriptUrl(projectId, transcriptId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts/${ transcriptId }`;
  }

  // delete Transcript
  // eslint-disable-next-line class-methods-use-this
  deleteTranscriptUrl(projectId, transcriptId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts/${ transcriptId }`;
  }

  /**
   * Annotations URL
   */
  getAnnotationsUrl(projectId, transcriptId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts/${ transcriptId }/annotations`;
  }

  /**
   * Projects
   */
  getProjects() {
    // if (isBrowser()) {
    return fetch(this.getProjectsUrl(), { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        return json.projects;
      });
    // }
    // TODO: to call electron, call the window.DB functions implemented in `/packages/electron/db/db.js`
    // if (isElectron()) {
    // TODO:
    // return new Promise((resolve, reject) => {
    //   resolve(false);
    //   reject(false);
    // });
    // }
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

  updateProject(id) {
    return fetch(this.getProjectUrl(id), { mode: 'cors', method: 'PUT' })
      .then(res => res.json())
      .then((json) => {
        return json.project;
      });
  }

  deleteProject(id) {
    return fetch(this.getProjectUrl(id), { mode: 'cors', method: 'DELETE' })
      .then(res => res.json())
      .then((json) => {
        return json;
      });
  }
  /**
   * Transcripts
   */

  // index
  getTranscripts(projectId) {
    return fetch(this.getTranscriptsUrl(projectId), { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        return json;
      });
  }

  //new

  // show
  getTranscript(projectId, transcriptId) {
    return fetch(this.getTranscriptUrl(projectId, transcriptId), { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        return json;
      });
  }

  /**
  * Annotations
  */
  getAnnotations(projectId, transcriptId) {
    return fetch(this.getAnnotationsUrl(projectId, transcriptId), { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        return json;
      });
  }
}

// https://www.sitepoint.com/javascript-design-patterns-singleton/
const instance = new Api();
Object.freeze(instance);

export default instance;
