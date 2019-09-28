import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import 'bootstrap-css-only/css/bootstrap.css';
import Projects from './Components/Projects/index.js';
import Workspace from './Components/Workspace';
import TranscriptEditor from './Components/Workspace/Transcripts/TranscriptEditor.js';
import PaperEditor from './Components/PaperEditor';
import CustomAlert from '@bbc/digital-paper-edit-react-components/CustomAlert';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { StateProvider } from './State';
import reducers from './State/reducers';

const demoWarningMessage = (<><p> This is a demo version of the app <Alert.Link href="https://github.com/bbc/digital-paper-edit-client" target="_blank" rel="noopener noreferrer"
>see project Github repository for more info</Alert.Link>. </p><p>This is a read-only demo you can only play around with existing projects!</p></>);

const NoMatch = () => {
  return <h1>There was an error loading the page you requested</h1>;
};

const App = () => {

  // if log user data
  const initialState = {
    name: 'Tania',
    loggedIn: true,
    projects: null,
    transcripts: null,
    paperEdits: null
  };

  // TODO: remove unused rootes
  let envWarning = null;
  let offlineWarning = null;

  if (process.env.REACT_APP_NODE_ENV === 'demo') {
    envWarning = (
      <Container>
        <CustomAlert
          variant={ 'warning' }
          heading={ 'Demo mode' }
          message={ demoWarningMessage }/>
      </Container>
    );
  }

  if (!navigator.onLine) {
    offlineWarning = (
      <>
        <br/>
        <Container>
          <CustomAlert
            variant={ 'warning' }
            heading={ 'Offline warning' }
            message={ 'You don\'t seem to be connected to the internet ' }/>
        </Container>
      </>);
  }

  return (
    <StateProvider initialState={ initialState } reducer={ reducers }>

      {envWarning}
      {offlineWarning}

      <HashRouter>
        <Switch>
          <Route exact path="/" component={ Projects } />
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
      </HashRouter>
    </StateProvider>
  );
};

export default App;
