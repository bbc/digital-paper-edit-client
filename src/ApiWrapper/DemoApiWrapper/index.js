class DemoApiWrapper {
  /**
   * Projects
   */
  // eslint-disable-next-line class-methods-use-this
  async getAllProjects() {
    const response = await fetch('db/projects.json');
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

  // eslint-disable-next-line class-methods-use-this
  async getProject(id) {
    const response = await fetch('db/projects.json');
    const projects = await response.json();
    const project = projects.find((project) => {
      return project._id === id;
    });

    return { status: 'ok', project:project };
  }

  async createProject(data) {
    alert('Not implemented in demo mode');

    return { status: 'false' };
  }

  async updateProject(id, data) {
    alert('Not implemented in demo mode');

    return { status: 'false' };
  }

  async deleteProject(id) {
    alert('Not implemented in demo mode');

    return { ok: false, status: 'false', project: { } };
  }

  /**
   * Transcripts
   */
  // eslint-disable-next-line class-methods-use-this
  async getTranscripts(projectId) {
    const response = await fetch('db/transcripts.json');
    let transcripts = await response.json();
    transcripts = transcripts.filter((transcript) => {
      return transcript.projectId === projectId;
    });
    // Temporary workaround.
    transcripts = transcripts.map((transcript) => {
      transcript.id = transcript._id;

      return transcript;
    });

    return { transcripts: transcripts };
  }

  async createTranscript(projectId, formData, data) {
    alert('Not implemented in demo mode');

    return { status: 'false' };
  }

  async getTranscript(projectId, transcriptId, queryParamsOptions) {
    const response = await fetch('db/transcripts.json');
    const transcripts = await response.json();
    const transcript = transcripts.find((transcript) => {
      return transcript._id === transcriptId;
    });

    transcript.id = transcript._id;
    const resProject = await this.getProject(projectId);
    transcript.projectTitle = resProject.project.title;
    transcript.transcriptTitle = transcript.title;

    return transcript;
  }

  async updateTranscript(projectId, transcriptId, queryParamsOptions, data) {
    alert('Not implemented in demo mode');

    return { ok: false };
  }

  async deleteTranscript(projectId, transcriptId) {
    alert('Not implemented in demo mode');

    return { ok: false, status: 'false' };
  }

  /**
   * Annotations
   */
  // eslint-disable-next-line class-methods-use-this
  async getAllAnnotations(projectId, transcriptId) {

    const response = await fetch('db/annotations.json');
    let annotations = await response.json();

    annotations = annotations.filter((annotation) => {
      return annotation.transcriptId === transcriptId;
    });

    if (annotations) {
      annotations = annotations
      // Temporary workaround.
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
    const response = await fetch('db/annotations.json');
    const annotations = await response.json();
    const annotation = annotations[0];

    return { annotation };
  }

  async createAnnotation(projectId, transcriptId, data) {
    alert('Not implemented in demo mode');

    return { 'ok': false, status: 'false', annotation: [] };
  }

  async deleteAnnotation(projectId, transcriptId, annotationId) {
    alert('Not implemented in demo mode');

    return { 'ok': false, status: 'false' };
  }

  /**
   * Labels
   */

  // Get All Labels
  // eslint-disable-next-line class-methods-use-this
  async getAllLabels(projectId) {
    const response = await fetch('db/labels.json');
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
    const response = await fetch('db/labels.json');
    const labels = await response.json();
    const label = labels[0];

    return { ok: true, status: 'ok', label };
  }

  // Create Label
  async createLabel(projectId, data) {
    alert('Not implemented in demo mode');

    return ({ ok: false, status: 'false' });
  }

  // Update Label
  async updateLabel(projectId, labelId, data) {
    alert('Not implemented in demo mode');

    return { ok: false, status: 'false' };
  }
  // Delete Label
  async deleteLabel(projectId, labelId) {
    alert('Not implemented in demo mode');

    return { status: 'false' };
  }
  /**
   * PaperEdits
   */
  // eslint-disable-next-line class-methods-use-this
  async getAllPaperEdits(projectId) {
    const response = await fetch('db/paperedits.json');
    let paperedits = await response.json();
    paperedits = paperedits.filter((paperedit) => {
      return paperedit.projectId === projectId;
    });
    const data = {};
    data.paperedits = [];
    data.paperedits = paperedits;
    if (data.paperedits) {
      data.paperedits = data.paperedits
      // Temporary workaround.
        .map((paperedit) => {
          paperedit.id = paperedit._id;

          return paperedit;
        });
    }

    return data.paperedits;
  }

  // eslint-disable-next-line class-methods-use-this
  async getPaperEdit(projectId, id) {
    const paperEditId = id;
    const response = await fetch('db/paperedits.json');
    const paperedits = await response.json();
    const paperEdit = paperedits.find((paperedit) => {
      return paperedit.id === paperEditId;
    });
    if (!paperEdit) {
      const err = new Error('No paper edit found');
      err.statusCode = 404;
    }

    return { ok: true, status: 'ok', programmeScript: paperEdit };
  }

  async createPaperEdit(projectId, data) {
    alert('Not implemented in demo mode');

    return { ok: false, status: 'false' };
  }

  async updatePaperEdit(projectId, id, data) {
    alert('Not implemented in demo mode');

    return { ok:true, status: 'false' };
  }

  async deletePaperEdit(projectId, id) {
    alert('Not implemented in demo mode');

    return { ok: false, status: 'false' };
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
      transcriptId: transcriptId,
      projectId: projectId,
      projectTitle: transcriptResult.projectTitle,
      transcriptTitle: transcriptResult.transcriptTitle,
      url: transcriptResult.url,
      labels: labelsResults.labels,
      transcript:  transcriptResult.transcript,
      annotations: annotationsResult.annotations
    };

    console.log(results);

    return results;
  }

  // Helper function to get program script & associated transcript
  // https://flaviocopes.com/javascript-async-await-array-map/
  async get_ProgrammeScriptAndTranscripts(projectId, papereditId) { // // get transcripts list, this contain id, title, description only
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
    console.log('ApiWrapper transcriptsJson', transcriptsJson);

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
    console.log('ApiWrapper - results', results);

    return results;
  }
}

// module.exports = DemoApiWrapper;
export default DemoApiWrapper;