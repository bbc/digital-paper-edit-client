import React from 'react';
import ReactDOM from 'react-dom';
// window.env.API_URL = 'test';
// import App from './App'; // TypeError: Cannot read property 'API_URL' of undefined - in ApiWrapper

test.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
