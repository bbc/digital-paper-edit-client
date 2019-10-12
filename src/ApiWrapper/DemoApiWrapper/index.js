class DemoApiWrapper {
  constructor() {
    this.url = 'http://localhost:3000/db/';
    this.projects = this.url + 'projects.json';
    this.paperEdits = this.url + 'paperedits.json';
    this.transcripts = this.url + 'transcripts.json';
    this.labels = this.url + 'labels.json';
    this.annotations = this.url + 'annotations.json';
  }

  /**
   * Projects
   */
  async getAllProjects() {
    const response = await fetch(this.projects);
    const projects = await response.json();
    let results = 0;
    if (projects.length !== 0) {
      results = projects.map((project) => {
        project.id = project._id;

        return project;
      });

      return results;
    }
  }

  async getProject(id) {
    const response = await fetch(this.projects);
    const projects = await response.json();
    const project = projects.find((p) => {
      return p._id === id;
    });

    return { status: 'ok', project: project };
  }

  static async createProject(data) {
    alert('Not implemented in demo mode');
    console.log(data);

    return { status: 'false' };
  }

  static async updateProject(id, data) {
    alert('Not implemented in demo mode');
    console.log(id, data);

    return { status: 'false' };
  }

  static async deleteProject(id) {
    alert('Not implemented in demo mode');
    console.log(id);

    return { ok: false, status: 'false', project: { } };
  }

  /**
   * Transcripts
   */

  async getTranscripts(projectId) {
    const response = await fetch(this.transcripts);
    const transcriptsData = await response.json();

    const transcripts = transcriptsData.filter((transcript) => {
      return transcript.projectId === projectId;
    }).map((transcript) => {
      transcript.id = transcript._id;

      return transcript;
    });

    return { transcripts: transcripts };
  }

  static async createTranscript(projectId, formData, data) {
    alert('Not implemented in demo mode');

    console.log(projectId, formData, data);

    return { status: 'false' };
  }

  async getTranscript(projectId, transcriptId, queryParamsOptions) {
    const response = await fetch(this.transcripts);
    const transcripts = await response.json();
    const transcript = transcripts.find((tr) => {
      return tr._id === transcriptId;
    });

    transcript.id = transcript._id;
    const resProject = await this.getProject(projectId);
    transcript.projectTitle = resProject.project.title;
    transcript.transcriptTitle = transcript.title;

    return transcript;
  }

  static async updateTranscript(projectId, transcriptId, queryParamsOptions, data) {
    alert('Not implemented in demo mode');
    console.log(projectId, transcriptId, queryParamsOptions, data);

    return { ok: false };
  }

  static async deleteTranscript(projectId, transcriptId) {
    alert('Not implemented in demo mode');
    console.log(projectId, transcriptId);

    return { ok: false, status: 'false' };
  }

  /**
   * Annotations
   */

  async getAllAnnotations(projectId, transcriptId) {

    const response = await fetch(this.annotations);
    let annotations = await response.json();

    annotations = annotations.filter((annotation) => {
      return annotation.transcriptId === transcriptId;
    });

    if (annotations) {
      annotations = annotations
        .map((annotation) => {
          annotation.id = annotation._id;

          return annotation;
        });
    } else {
      annotations = [];
    }

    return { annotations };
  }

  // not used
  async getAnnotation(projectId, transcriptId, annotationId) {
    const response = await fetch(this.annotations);
    const annotations = await response.json();
    const annotation = annotations[0];

    return { annotation };
  }

  static async createAnnotation(projectId, transcriptId, data) {
    alert('Not implemented in demo mode');
    console.log(projectId, transcriptId, data);

    return { 'ok': false, status: 'false', annotation: [] };
  }

  static async deleteAnnotation(projectId, transcriptId, annotationId) {
    alert('Not implemented in demo mode');
    console.log(projectId, transcriptId, annotationId);

    return { 'ok': false, status: 'false' };
  }

  /**
   * Labels
   */

  // Get All Labels

  async getAllLabels(projectId) {
    const response = await fetch(this.labels);
    let labels = await response.json();
    const defaultLabel = labels[0];
    labels = labels.filter((label) => {
      return label.projectId === projectId;
    });
    labels.unshift(defaultLabel);

    if (!labels) {
      labels = [];
    }

    return { ok: true, status: 'ok', labels };
  }

  // Get Label - not used
  async getLabel(projectId, labelId) {
    const response = await fetch(this.labels);
    const labels = await response.json();
    const label = labels[0];

    return { ok: true, status: 'ok', label };
  }

  // Create Label
  static async createLabel(projectId, data) {
    alert('Not implemented in demo mode');
    console.log(projectId, data);

    return ({ ok: false, status: 'false' });
  }

  // Update Label
  static async updateLabel(projectId, labelId, data) {
    alert('Not implemented in demo mode');
    console.log(projectId, labelId, data);

    return { ok: false, status: 'false' };
  }
  // Delete Label
  static async deleteLabel(projectId, labelId) {
    alert('Not implemented in demo mode');
    console.log(projectId, labelId);

    return { status: 'false' };
  }
  /**
   * PaperEdits
   */

  async getAllPaperEdits(projectId) {
    const response = await fetch(this.paperEdits);
    let paperedits = await response.json();
    paperedits = paperedits.filter((pe) => {
      return pe.projectId === projectId;
    });

    const data = {};
    data.paperedits = [];
    data.paperedits = paperedits;
    if (data.paperedits) {
      data.paperedits = data.paperedits
        .map((pe) => {
          pe.id = pe._id;

          return pe;
        });
    }

    return data.paperedits;
  }

  async getPaperEdit(projectId, id) {
    const paperEditId = id;
    const response = await fetch(this.paperEdits);
    const paperedits = await response.json();
    const paperEdit = paperedits.find((pe) => {
      return pe.id === paperEditId;
    });

    if (!paperEdit) {
      const err = new Error('No paper edit found');
      err.statusCode = 404;
    }

    return { ok: true, status: 'ok', programmeScript: paperEdit };
  }

  static async createPaperEdit(projectId, data) {
    alert('Not implemented in demo mode');
    console.log(projectId, data);

    return { ok: false, status: 'false' };
  }

  static async updatePaperEdit(projectId, id, data) {
    alert('Not implemented in demo mode');
    console.log(projectId, id, data);

    return { ok:true, status: 'false' };
  }

  static async deletePaperEdit(projectId, id) {
    alert('Not implemented in demo mode');
    console.log(projectId, id);

    return { ok: false, status: 'false' };
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
  async getProgrammeScriptAndTranscripts(projectId, papereditId) { // // get transcripts list, this contain id, title, description only
    const transcriptsResult = await this.getTranscripts(projectId);
    // use that list of ids to loop through and get json payload for each individual transcript
    // as separate request

    const transcriptsJson = await Promise.all(transcriptsResult.transcripts.map((transcript) => {
      const transcriptTmp = this.getTranscript(projectId, transcript.id);

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
}

// module.exports = DemoApiWrapper;
export default DemoApiWrapper;