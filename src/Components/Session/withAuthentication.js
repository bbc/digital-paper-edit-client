import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = props => {
    return <Component { ...props } />;
  };

  return WithAuthentication;
};

export default withAuthentication;
