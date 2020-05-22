import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import 'bootstrap-css-only/css/bootstrap.css';
// TODO: Note: Replace ^[theme]^ (examples: materia, darkly, slate, cosmo, spacelab, and superhero. See https://bootswatch.com for current theme names.)
// https://www.npmjs.com/package/react-bootstrap-theme-switcher
// import 'bootswatch/dist/litera/bootstrap.min.css';

import CustomAlert from './Components/lib/CustomAlert';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
const Projects = lazy(() => import('./Components/Projects/index.js'));
const Project = lazy(() => import('./Components/Projects/Project.js'));
const TranscriptCorrect = lazy(() => import('./Components/Transcripts/TranscriptCorrect.js'));
const PaperEdit = lazy(() => import('./Components/PaperEdits/PaperEdit'));

const demoWarningMessage = (
  <>
    <p>
      {' '}
      This is a demo version of the app{' '}
      <Alert.Link href="https://github.com/pietrop/digital-paper-edit-client" target="_blank" rel="noopener noreferrer">
        see project Github repository for more info
      </Alert.Link>
      .{' '}
    </p>
    <p>This is a read-only demo you can only play around with existing projects!</p>
  </>
);

const NoMatch = () => {
  return <h1>There was an error loading the page you requested</h1>;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcriptJson: null,
    };
  }
  // TODO: remove unused rootes

  // eslint-disable-next-line class-methods-use-this
  render() {
    let envWarning = null;
    let offlineWarning = null;

    if (process.env.REACT_APP_NODE_ENV === 'demo') {
      envWarning = (
        <Container>
          <CustomAlert variant={'warning'} heading={'Demo mode'} message={demoWarningMessage} />
        </Container>
      );
    }

    if (!navigator.onLine) {
      offlineWarning = (
        <>
          <br />
          <Container>
            <CustomAlert variant={'warning'} heading={'Offline warning'} message={"You don't seem to be connected to the internet "} />
          </Container>
        </>
      );
    }

    return (
      <>
        {envWarning}

        {offlineWarning}

        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Projects} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/projects/:projectId" component={Project} />
              <Route exact path="/projects/:projectId/transcripts/:transcriptId/correct" component={TranscriptCorrect} />
              <Route exact path="/projects/:projectId/paperedits/:papereditId" component={PaperEdit} />
              <Route component={NoMatch} />
            </Switch>
          </Suspense>
        </HashRouter>
      </>
    );
  }
}

export default App;
