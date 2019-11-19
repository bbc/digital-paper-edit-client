import React, { useState, useEffect } from 'react';
import 'bootstrap-css-only/css/bootstrap.css';
import CustomAlert from '@bbc/digital-paper-edit-react-components/CustomAlert';
import Container from 'react-bootstrap/Container';
import Routes from './Routes';
import SignOutButton from './Components/SignOut';
import { withAuthentication } from './Components/Session';

const App = props => {
  let offlineWarning = null;
  const [ authUser, setAuthUser ] = useState();

  useEffect(() => {
    const authListener = props.firebase.auth.onAuthStateChanged(user =>
      setAuthUser(user)
    );

    return () => {
      authListener();
    };
  }, [ props.firebase.auth ]);

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
      {authUser ? (
        <p>Signed in as: {authUser.email}</p>
      ) : (
        <a href="#/signin">Please sign in </a>
      )}
      {authUser ? <SignOutButton /> : null}
      <Routes />
    </>
  );
};

export default withAuthentication(App);
