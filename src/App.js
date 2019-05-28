import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Projects from './Components/Projects/index.js';
import Project from './Components/Projects/Project.js';
import TranscriptAnnotate from './Components/Transcripts/TranscriptAnnotate/index.js';
import TranscriptCorrect from './Components/Transcripts/TranscriptCorrect.js';
import PaperEdit from './Components/PaperEdits/PaperEdit';
import CustomAlert from './Components/lib/CustomAlert';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import './App.css';

const demoWarningMessage = (<p> This is Demo version of the app <Alert.Link href="https://github.com/bbc/digital-paper-edit-client" target="_blank" rel="noopener noreferrer"
>see project Github repository for more info</Alert.Link>.</p>);

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
    </>
    );
  }
}

export default App;
