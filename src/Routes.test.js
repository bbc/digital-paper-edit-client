import React, { useContext } from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Routes from './Routes';
import DemoApiWrapper from './ApiWrapper/DemoApiWrapper';

// https://stackoverflow.com/questions/48033841/test-process-env-with-jest

const DummyApiWrapper = ({ children }) => {
  const ApiContext = useContext(DemoApiWrapper);

  return (
    <ApiContext.Provider value={ DemoApiWrapper }>
      <ApiContext.Consumer>
        {() => (
          { children }
        )}
      </ApiContext.Consumer>
    </ApiContext.Provider>
  );
};

describe('App component', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('renders without crashing even without node_env', async () => {
    const message = 'There are no Projects, create a new one to get started.';
    const breadcrumbText = 'Projects';
    const { getByText } = render(
      <DummyApiWrapper>
        <Routes />
      </DummyApiWrapper>
    );
    expect(getByText(message)).toBeInTheDocument();
    expect(getByText(breadcrumbText)).toBeInTheDocument();
    await waitForElement(() => getByText(breadcrumbText));
    await waitForElement(() => getByText(message));
  });

  //   it('renders without projects', async () => {
  //     const message = 'Projects asdf';
  //     const breadcrumbText = 'Projects';
  //     const { getByText } = render(<App/>);
  //     await waitForElement(() => getByText(breadcrumbText));
  //     await waitForElement(() => getByText(message));
  //   });

//   it('goes to routes to project or /', async () => {
//     process.env.REACT_APP_NODE_ENV = 'browser';
//     const { getByText } = render(<App/>);
//     const breadcrumbText = 'Projects';
//     fireEvent.click(getByText(breadcrumbText));
//     await waitForElement(() => getByText(breadcrumbText));
//   });
});
