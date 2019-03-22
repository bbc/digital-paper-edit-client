class Api {

  // index
  getProjectsUrl() {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects`;
  }

  // show
  getProjectUrl(id) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ id }`;
  }

  // create

  // update

  // delete

  /**
   * Transcripts
   */

  getTranscripts(projectId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts`;
  }

  getTranscript(projectId, transcriptId) {
    return `${ process.env.REACT_APP_SERVER_URL }/api/projects/${ projectId }/transcripts/${ transcriptId }`;
  }
}

// https://www.sitepoint.com/javascript-design-patterns-singleton/
const instance = new Api();
Object.freeze(instance);

export default instance;

// export default Api;
