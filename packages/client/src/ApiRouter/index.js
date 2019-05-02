import querystring from 'querystring';
import corsFetch from './cors_wrapper.js';

window.DB = () => {
  console.log('in react test ');
};

class ApiRouter {
  projectsUrl = `${ process.env.REACT_APP_SERVER_URL }/api/projects`
  projectsIdUrl = (projectId) => `${ this.projectsUrl }/${ projectId }`;
  transcriptsUrl = (projectId) => `${ this.projectsIdUrl(projectId) }/transcripts`;

  transcriptsIdUrl = (projectId, transcriptId, queryParamsOptions) => {
    const queryParams = queryParamsOptions
      ? `?${ querystring.stringify(queryParamsOptions) }`
      : '';

    return `${ this.transcriptsUrl(projectId) }/${ transcriptId }${ queryParams }`.trim();
  };

  annotationsUrl = (projectId, transcriptId) => `${ this.transcriptsIdUrl(projectId, transcriptId) }/annotations`;

  async getAllProjects() {
    // if (isBrowser()) {
    console.log(this.projectsUrl);
    const res = await corsFetch(this.projectsUrl);
    const json = await res.json();

    return json.projects;
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

  /**
   * Projects
   */

  async getProject(id) {
    const res = await corsFetch(this.projectsIdUrl(id));
    const json = await res.json();

    return json.project;
  }

  async createProject(data) {
    const res = await corsFetch(this.projectsUrl, 'POST', data);

    return await res.json();
  }

  async updateProject(id, data) {
    const res = await corsFetch(this.projectsIdUrl(id), 'PUT', data);
    const json = await res.json();

    return json;
  }

  async deleteProject(id) {
    const res = await corsFetch(this.getProjectUrl(id), 'DELETE');
    const json = await res.json();

    return json;
  }

  /**
   * Transcripts
   */

  async getTranscripts(projectId) {
    const res = await corsFetch(this.transcriptsUrl(projectId));
    const json = await res.json();

    return json;
  }

  async createTranscript(projectId, data) {
    const res = await corsFetch(this.transcriptsUrl(projectId), data);
    const json = await res.json();

    return json;
  }
  async getTranscript(projectId, transcriptId, queryParamsOptions) {
    const res = await corsFetch(this.transcriptsIdUrl(projectId, transcriptId, queryParamsOptions));
    const json = await res.json();

    return json;
  }

  async updateTranscript(projectId, transcriptId, queryParamsOptions, data) {
    const res = await corsFetch(this.transcriptsIdUrl(projectId, transcriptId, queryParamsOptions), 'PUT', data);
    const json = await res.json();

    return json;
  }

  async deleteTranscript(projectId, transcriptId) {
    const res = await fetch(this.getTranscriptUrl(projectId, transcriptId), 'DELETE');
    const json = await res.json();

    return json;
  }

  /**
   * Annotations
   */
  async getAnnotations(projectId, transcriptId) {
    console.log('this.annotationsUrl(projectId, transcriptId)', this.annotationsUrl(projectId, transcriptId));
    const res = await fetch(this.annotationsUrl(projectId, transcriptId));
    const json = await res.json();

    return json;
  }
}

// https://www.sitepoint.com/javascript-design-patterns-singleton/
const apiRouter = new ApiRouter();

Object.freeze(apiRouter);
export default apiRouter;
