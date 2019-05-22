import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Home from './Components/Home';

import Projects from './Components/Projects/index.js';
import Project from './Components/Projects/Project.js';
import newProject from './Components/Projects/ProjectForm.js';
import Users from './Components/Users/index.js';

import Transcripts from './Components/Transcripts/index.js';
import Transcript from './Components/Transcripts/Transcript.js';
import TranscriptForm from './Components/Transcripts/TranscriptForm.js';
import TranscriptAnnotate from './Components/Transcripts/TranscriptAnnotate/index.js';
import TranscriptCorrect from './Components/Transcripts/TranscriptCorrect.js';

import PaperEdits from './Components/PaperEdits/index.js';
import PaperEdit from './Components/PaperEdits/PaperEdit';
import PaperEditForm from './Components/PaperEdits/NewPaperEdit.js';
import CustomAlert from './Components/lib/CustomAlert';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Row from 'react-bootstrap/Row';
// import UserManual from './Components/UserManual';

import './App.css';
// import Transcript from './Components/PaperEdits/PaperEdit.js';

const demoWarningMessage = (<p> This is Demo version of the app <Alert.Link href="https://github.com/bbc/digital-paper-edit-client" target="_blank" rel="noopener noreferrer"
>see project Github repository for more info</Alert.Link>.</p>);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptJson: null
    };
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    let envWarning = null;
    if (process.env.REACT_APP_NODE_ENV === 'demo') {
      envWarning = (
        <Container>
          <CustomAlert
            variant={ 'warning' }
            heading={ 'Demo mode' }
            message={ demoWarningMessage }/>
        </Container>);
    }

    return (<>

      {envWarning}

      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/projects/new" component={ newProject } />
          <Route exact path="/projects" component={ Projects } />
          <Route exact path="/projects/:projectId" component={ Project } />
          <Route
            exact
            path="/projects/:projectId/edit"
            component={ newProject }
          />
          <Route exact path="/projects/:projectId/users" component={ Users } />
          <Route
            exact
            path="/projects/:projectId/transcripts/new"
            component={ TranscriptForm }
          />
          <Route
            exact
            path="/projects/:projectId/transcripts"
            component={ Transcripts }
          />
          <Route
            exact
            path="/projects/:projectId/transcripts/:transcriptId"
            component={ Transcript }
          />
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
            path="/projects/:projectId/paperedits/new"
            component={ PaperEditForm }
          />
          <Route
            exact
            path="/projects/:projectId/paperedits"
            component={ PaperEdits }
          />
          <Route
            exact
            path="/projects/:projectId/paperedits/:papereditId"
            component={ PaperEdit }
          />
          {/* <Route exact path="/user-manual" component={ UserManual } /> */}
          {/* Guide route --> user manual  */}
          {/* Help route  */}
        </Switch>
      </HashRouter>
    </>
    );
  }
}

export default App;
