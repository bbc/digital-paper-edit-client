import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Home from './Components/Home';

import Projects from './Components/Projects/index.js';
import Project from './Components/Projects/Project.js';
import newProject from './Components/Projects/NewProject.js';

import Transcripts from './Components/Transcripts/index.js';
import Transcript from './Components/Transcripts/Transcript.js';
import NewTranscript from './Components/Transcripts/NewTranscript.js';
import TranscriptAnnotate from './Components/Transcripts/TranscriptAnnotate.js';

import PaperEdits from './Components/PaperEdits/index.js';
import PaperEdit from './Components/PaperEdits/PaperEdit.js';
import NewPaperEdit from './Components/PaperEdits/NewPaperEdit.js';

// import UserManual from './Components/UserManual';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptJson: null
    };

  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/projects/new" component={ newProject } />
          <Route exact path="/projects" component={ Projects } />
          <Route exact path="/projects/:projectId" component={ Project } />

          <Route exact path="/projects/:projectId/transcripts/new" component={ NewTranscript } />
          <Route exact path="/projects/:projectId/transcripts" component={ Transcripts } />
          <Route exact path="/projects/:projectId/transcripts/:trascriptId" component={ Transcript } />

          <Route exact path="/projects/:projectId/transcripts/:trascriptId/annotate" component={ TranscriptAnnotate } />

          <Route exact path="/projects/:projectId/paperedits/new" component={ NewPaperEdit } />
          <Route exact path="/projects/:projectId/paperedits" component={ PaperEdits } />
          <Route exact path="/projects/:projectId/paperedits/:papereditId" component={ PaperEdit } />

          {/* <Route exact path="/user-manual" component={ UserManual } /> */}

          {/* Guide route --> user manual  */}

          {/* Help route  */}
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
