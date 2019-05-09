import querystring from 'querystring';
import corsFetch from './cors_wrapper.js';

class ApiWrapper {
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

  /**
   * Projects
   */

  async getAllProjects() {
    console.log(this.projectsUrl);
    const res = await corsFetch(this.projectsUrl);
    const json = await res.json();

    return json.projects;
  }

  async getProject(id) {
    const res = await corsFetch(this.projectsIdUrl(id));
    const json = await res.json();

    return json.project;
  }

  async createProject(data) {
    const res = await corsFetch(this.projectsUrl, 'POST', data, 'json');

    return await res.json();
  }

  async updateProject(id, data) {
    const res = await corsFetch(this.projectsIdUrl(id), 'PUT', data);
    const json = await res.json();

    return json;
  }

  async deleteProject(id) {
    const res = await corsFetch(this.projectsIdUrl(id), 'DELETE');
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
    const res = await corsFetch(this.transcriptsUrl(projectId), 'POST', data);
    const json = await res.json();
    console.log('createTranscript json', json);

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
    const res = await corsFetch(this.transcriptsIdUrl(projectId, transcriptId), 'DELETE');
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
const apiWrapper = new ApiWrapper();
Object.freeze(apiWrapper);
export default apiWrapper;
