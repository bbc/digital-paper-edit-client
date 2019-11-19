import React from 'react';
import Projects from './Components/Projects/index.js';
import Workspace from './Components/Workspace';
import TranscriptEditor from './Components/Workspace/Transcripts/TranscriptEditor.js';
import PaperEditor from './Components/PaperEditor';
import { Switch, Route, HashRouter } from 'react-router-dom';
import SignIn from './Components/SignIn';
import * as ROUTES from './constants/routes';

const PageNotFound = () => {
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <p>There was an error loading the page you requested!</p>
    </div>
  );
};

const Routes = () => {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path={ ROUTES.LANDING }></Route>
        <Route exact path={ ROUTES.SIGN_IN } component={ SignIn } />
        <Route exact path={ ROUTES.PROJECTS } component={ Projects } />
        <Route exact path={ ROUTES.WORKSPACE } component={ Workspace } />

        <Route exact path={ ROUTES.PAPER_EDITOR } component={ PaperEditor } />

        <Route
          exact
          path={ ROUTES.TRANSCRIPT_EDITOR }
          component={ TranscriptEditor }
        />

        <Route component={ PageNotFound } />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
