import React, { useState } from 'react';
import 'bootstrap-css-only/css/bootstrap.css';
import ApiContext from './ApiContext';
import CustomAlert from '@bbc/digital-paper-edit-react-components/CustomAlert';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Routes from './Routes';
import ApiWrapper from './ApiWrapper';

const demoWarningMessage = (<><p> This is a demo version of the app <Alert.Link href="https://github.com/bbc/digital-paper-edit-client" target="_blank" rel="noopener noreferrer"
>see project Github repository for more info</Alert.Link>. </p><p>This is a read-only demo you can only play around with existing projects!</p></>);

const App = () => {

  const [ api, setApi ] = useState(ApiWrapper);
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
    <>
      {envWarning}
      {offlineWarning}
      <ApiContext.Provider value={ api }>
        <Routes />
      </ApiContext.Provider>
    </>
  );
};

export default App;
