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

  paperEditsUrl = (projectId) => `${ this.projectsIdUrl(projectId) }/paperedits`;

  paperEditsIdUrl = (projectId, paperEditId) => `${ this.projectsIdUrl(projectId) }/paperedits/${ paperEditId }`;

  annotationsUrl = (projectId, transcriptId) => `${ this.transcriptsIdUrl(projectId, transcriptId) }/annotations`;

  annotationsIdUrl = (projectId, transcriptId, annotationId) => `${ this.transcriptsIdUrl(projectId, transcriptId) }/annotations/${ annotationId }`;

  labelsUrl = (projectId) => `${ this.projectsIdUrl(projectId) }/labels`;

  labelsIdUrl = (projectId, labelsId) => `${ this.projectsIdUrl(projectId) }/labels/${ labelsId }`;

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
  async getAllAnnotations(projectId, transcriptId) {
    const res = await fetch(this.annotationsUrl(projectId, transcriptId));
    const json = await res.json();

    return json;
  }

  // not used
  async getAnnotation(projectId, transcriptId, annotationId) {
    const res = await corsFetch(this.annotationsIdUrl(projectId, transcriptId, annotationId));
    const json = await res.json();

    return json;
  }

  async createAnnotation(projectId, transcriptId, data) {
    const res = await corsFetch(this.annotationsUrl(projectId, transcriptId), 'POST', data, 'json');

    return await res.json();
  }

  async updateAnnotation(projectId, transcriptId, annotationId, data) {
    const res = await corsFetch(this.annotationsIdUrl(projectId, transcriptId, annotationId), 'PUT', data);
    const json = await res.json();

    return json;
  }

  async deleteAnnotation(projectId, transcriptId, annotationId) {
    const res = await corsFetch(this.annotationsIdUrl(projectId, transcriptId, annotationId), 'DELETE');
    const json = await res.json();

    return json;
  }

  /**
   * Labels
   */

  // Get All Labels
  async getAllLabels(projectId) {
    const res = await fetch(this.labelsUrl(projectId));
    const json = await res.json();

    return json;
  }
  // Get Label - not used
  async getLabel(projectId, labelId) {
    const res = await corsFetch(this.labelsIdUrl(projectId, labelId));
    const json = await res.json();

    return json;
  }

  // Create Label
  async createLabel(projectId, data) {
    const res = await corsFetch(this.labelsUrl(projectId), 'POST', data, 'json');
    const json = await res.json();

    return json;
  }
  // Update Label
  async updateLabel(projectId, labelId, data) {
    const res = await corsFetch(this.labelsIdUrl(projectId, labelId), 'PUT', data);
    const json = await res.json();

    return json;
  }
  // Delete Label
  async deleteLabel(projectId, labelId) {
    const res = await corsFetch(this.labelsIdUrl(projectId, labelId), 'DELETE');
    const json = await res.json();

    return json;
  }
  /**
   * PaperEdits
   */

  async getAllPaperEdits(projectId) {
    console.log(this.paperEditsUrl(projectId));
    const res = await corsFetch(this.paperEditsUrl(projectId));
    const json = await res.json();
    console.log(json);

    return json.paperedits;
  }

  async getPaperEdit(projectId, id) {
    const res = await corsFetch(this.paperEditsIdUrl(projectId, id));
    const json = await res.json();

    return json;
  }

  async createPaperEdit(projectId, data) {
    const res = await corsFetch(this.paperEditsUrl(projectId), 'POST', data, 'json');

    return await res.json();
  }

  async updatePaperEdit(projectId, id, data) {
    const res = await corsFetch(this.paperEditsIdUrl(projectId, id), 'PUT', data);
    const json = await res.json();

    return json;
  }

  async deletePaperEdit(projectId, id) {
    const res = await corsFetch(this.paperEditsIdUrl(projectId, id), 'DELETE');
    const json = await res.json();

    return json;
  }

  /**
   * Helper SDK function to avoid making multiple calls client side when in Annotated Transcript view
   * Transcript + Annotations for that transcript + Labels for the project
   */
  async get_TranscriptLabelsAnnotations(projectId, transcriptId) {
    // GET Transcripts
    const transcriptResult = await this.getTranscript(projectId, transcriptId);
    // GET Labels for Project <-- or separate request in label component
    const labelsResults = await this.getAllLabels(projectId, transcriptId);
    // GET Annotation for Transcript
    const annotationsResult = await this.getAllAnnotations(projectId, transcriptId);

    // Combine results
    const results = {
      // TODO: add a call to project to get title
      projectTitle: transcriptResult.projectTitle,
      transcriptTitle: transcriptResult.transcriptTitle,
      url: transcriptResult.url,
      labels: labelsResults.labels,
      transcript:  transcriptResult.transcript,
      annotations: annotationsResult.annotations
    };

    return results;
  }

}

// https://www.sitepoint.com/javascript-design-patterns-singleton/
const apiWrapper = new ApiWrapper();
Object.freeze(apiWrapper);
export default apiWrapper;
