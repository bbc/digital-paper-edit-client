import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
  </div>
);

const SignInFormBase = props => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState();

  // TODO: IF signed in, forward always to somewhere else
  const onSubmit = async event => {
    try {
      await props.firebase.doSignInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError(null);
      props.history.push(ROUTES.PROJECTS);
    } catch (err) {
      setError(err);
    }
    event.preventDefault();
  };

  const onChange = event => {
    console.log(event.target);
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    } else {
      setEmail(event.target.value);
    }
  };

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={ onSubmit }>
      <input
        name="email"
        value={ email }
        onChange={ onChange }
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={ password }
        onChange={ onChange }
        type="password"
        placeholder="Password"
      />
      <button disabled={ isInvalid } type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
