import React, { useState } from 'react';
import 'bootstrap-css-only/css/bootstrap.css';
import CustomAlert from '@bbc/digital-paper-edit-react-components/CustomAlert';
import Container from 'react-bootstrap/Container';
import Routes from './Routes';
import { withAuth } from '../Session';
const App = () => {
  let offlineWarning = null;

  if (!navigator.onLine) {
    offlineWarning = (
      <>
        <br />
        <Container>
          <CustomAlert
            variant={ 'warning' }
            heading={ 'Offline warning' }
            message={ "You don't seem to be connected to the internet " }
          />
        </Container>
      </>
    );
  }

  return (
    <>
      {offlineWarning}
      <Routes />
    </>
  );
};

export default withAuth(App);
