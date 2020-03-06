import querystring from 'querystring';
import corsFetch from './cors_wrapper.js';

class ApiWrapper {
  constructor() {
    this.baseUrl = window.env.API_URL;
    window.env.API_URL = null;

    this.projectsUrl = `${ this.baseUrl }/api/projects`;
  }
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
    const res = await corsFetch(this.projectsUrl);
    const json = await res.json();

    return json.projects;
  }

  async getProject(id) {
    const res = await corsFetch(this.projectsIdUrl(id));
    const json = await res.json();

    return json;
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

    return res;
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

    return json;
  }
  async getTranscript(projectId, transcriptId, queryParamsOptions) {
    const res = await corsFetch(this.transcriptsIdUrl(projectId, transcriptId, queryParamsOptions));
    const json = await res.json();
    // get project title
    const resProject = await this.getProject(projectId);
    // console.log('resProject', resProject.project.title, json);
    json.projectTitle = resProject.project.title;
    json.transcriptTitle = json.title;
    delete json.title;

    return json;
  }

  async updateTranscript(projectId, transcriptId, queryParamsOptions, data) {
    const res = await corsFetch(this.transcriptsIdUrl(projectId, transcriptId, queryParamsOptions), 'PUT', data);

    return res;
  }

  async deleteTranscript(projectId, transcriptId) {
    const res = await corsFetch(this.transcriptsIdUrl(projectId, transcriptId), 'DELETE');

    return res;
  }

  /**
   * Annotations
   */
  async getAllAnnotations(projectId, transcriptId) {
    const res = await fetch(this.annotationsUrl(projectId, transcriptId));
    // console.log('getAllAnnotations', res);
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
    const res = await corsFetch(this.paperEditsUrl(projectId));
    const json = await res.json();

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

    return res;
  }

  /**
   * Helper SDK function to avoid making multiple calls client side when in Annotated Transcript view
   * Transcript + Annotations for that transcript + Labels for the project
   */
  async getTranscriptLabelsAnnotations(projectId, transcriptId) {
    // GET Transcripts
    const transcriptResult = await this.getTranscript(projectId, transcriptId);
    // GET Labels for Project <-- or separate request in label component
    const labelsResults = await this.getAllLabels(projectId, transcriptId);
    // GET Annotation for Transcript
    const annotationsResult = await this.getAllAnnotations(projectId, transcriptId);

    // Combine results
    const results = {
      transcriptId: transcriptId,
      projectId: projectId,
      projectTitle: transcriptResult.projectTitle,
      transcriptTitle: transcriptResult.transcriptTitle,
      url: transcriptResult.url,
      labels: labelsResults.labels,
      transcript:  transcriptResult.transcript,
      annotations: annotationsResult.annotations
    };

    return results;
  }

  // Helper function to get program script & associated transcript
  // https://flaviocopes.com/javascript-async-await-array-map/
  async getProgrammeScriptAndTranscripts(projectId, papereditId) {
    // get transcripts list, this contain id, title, description only
    const transcriptsResult = await this.getTranscripts(projectId);
    // use that list of ids to loop through and get json payload for each individual transcript
    // as separate request

    // TODO: also add annotations for each Transcripts
    const transcriptsJson = await Promise.all(transcriptsResult.transcripts.map((transcript) => {
      // const annotations = this.getAllAnnotations(projectId, transcript.id);
      const transcriptTmp = this.getTranscript(projectId, transcript.id);
      // transcriptTmp.annotations = annotations;

      return transcriptTmp;
    }));

    const annotationsJson = await Promise.all(transcriptsResult.transcripts.map((transcript) => {
      const annotations = this.getAllAnnotations(projectId, transcript.id);

      return annotations;
    }));

    // add annotations to transcript
    transcriptsJson.forEach((tr) => {
      // get annotations for transcript
      const currentAnnotationsSet = annotationsJson.find((a) => {

        return a.transcriptId === tr.id;
      });
      // if there are annotations for this transcript add them to it
      if (currentAnnotationsSet) {
        tr.annotations = currentAnnotationsSet.annotations;

        return;
      }
      else {
        tr.annotations = [];
      }
    });

    // getting program script for paperEdit
    const paperEditResult = await this.getPaperEdit(projectId, papereditId);
    // getting project info - eg to get tile and description
    const projectResult = await this.getProject(projectId);
    // Get labels
    const labelsResults = await this.getAllLabels(projectId);
    // package results
    const results = {
      programmeScript: paperEditResult.programmeScript,
      project: projectResult.project,
      // each transcript contains its annotations
      transcripts: transcriptsJson,
      labels: labelsResults.labels
    };

    return results;
  }

  async exportVideo(data){
    return new Promise((resolve, reject) => {
      // In electron prompt for file destination 
      // default to desktop on first pass 

      const ffmpegRemixData = {
        input: data, 
        output: '~/Desktop/test.mp4',
        ffmpegPath: ''//add electron ffmpeg bin 
      }
      resolve(ffmpegRemixData)
    })
  }

  async exportAudio(data){
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }
}

export default ApiWrapper;