import React from 'react';
import Projects from './Components/Projects/index.js';
import Workspace from './Components/Workspace';
import TranscriptEditor from './Components/Workspace/Transcripts/TranscriptEditor.js';
import PaperEditor from './Components/PaperEditor';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

const NoMatch = () => {
  return <h1>There was an error loading the page you requested</h1>;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/projects" />
        <Route exact path="/projects" component={ Projects } />
        <Route exact path="/projects/:projectId" component={ Workspace } />
        <Route
          exact
          path="/projects/:projectId/transcripts/:transcriptId/correct"
          component={ TranscriptEditor }
        />
        <Route
          exact
          path="/projects/:projectId/paperedits/:papereditId"
          component={ PaperEditor }
        />
        <Route component={ NoMatch } />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;