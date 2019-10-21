import React from 'react';
import Projects from './Components/Projects/index.js';
import Workspace from './Components/Workspace';
import TranscriptEditor from './Components/Workspace/Transcripts/TranscriptEditor.js';
import PaperEditor from './Components/PaperEditor';
import { Switch, Route, HashRouter } from 'react-router-dom';

// class DebugRouter extends HashRouter {
//   constructor(props) {
//     super(props);
//     console.log('initial history is: ', JSON.stringify(this.history, null, 2));
//     this.history.listen((location, action) => {
//       console.log(
//         `The current URL is ${ location.pathname }${ location.search }${ location.hash }`
//       );
//       console.log(`The last navigation action was ${ action }`, JSON.stringify(this.history, null, 2));
//     });
//   }
// }

const PageNotFound = () => {
  return (<div>
    <h1>404 Page Not Found</h1>
    <p>There was an error loading the page you requested!</p>
  </div>
  );
};

const Routes = () => {
  return (
    <HashRouter basename='/'>
      <Switch>
        <Route exact path="/" component={ Projects } />
        <Route exact path="/projects" component={ Projects } />
        <Route exact path="/projects/:projectId" component={ Workspace } />

        <Route
          exact
          path="/projects/:projectId/paperedits/:papereditId"
          component={ PaperEditor }
        />

        <Route
          exact
          path="/projects/:projectId/transcripts/:transcriptId/correct"
          component={ TranscriptEditor }
        />

        <Route component={ PageNotFound } />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
