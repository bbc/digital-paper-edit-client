import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Projects from './Components/Projects/index.js';
import Project from './Components/Projects/Project.js';
import TranscriptAnnotate from './Components/Transcripts/TranscriptAnnotate/index.js';
import TranscriptCorrect from './Components/Transcripts/TranscriptCorrect.js';
import PaperEdit from './Components/PaperEdits/PaperEdit';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptJson: null
    };
  }
  // TODO: remove unused rootes

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Projects } />
          <Route exact path="/projects" component={ Projects } />
          <Route exact path="/projects/:projectId" component={ Project } />
          <Route
            exact
            path="/projects/:projectId/transcripts/:transcriptId/correct"
            component={ TranscriptCorrect }
          />
          <Route
            exact
            path="/projects/:projectId/transcripts/:transcriptId/annotate"
            component={ TranscriptAnnotate }
          />
          <Route
            exact
            path="/projects/:projectId/paperedits/:papereditId"
            component={ PaperEdit }
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
