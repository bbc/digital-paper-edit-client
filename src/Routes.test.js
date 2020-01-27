import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement, fireEvent, waitForDomChange } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Routes from './Routes';
import ApiContext from './Context/ApiContext';
import DemoApiWrapper from './ApiWrapper/DemoApiWrapper';
import fetchMock from 'fetch-mock';
import projects from '../public/db/projects.json';
import transcripts from '../public/db/transcripts.json';
import paperEdits from '../public/db/paperEdits.json';

// https://stackoverflow.com/questions/48033841/test-process-env-with-jest

const renderRoutes = (history, api) => {
  return render(
    <Router history={ history }>
      <ApiContext.Provider value={ api }>
        <Routes />
      </ApiContext.Provider>
    </Router>
  );
};

const awaitForDomChange = (container) => waitForDomChange({ container })
  .then(() => console.log('DOM changed!'))
  .catch(err => console.log(`Error you need to deal with: ${ err }`));

describe('App component', () => {

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    fetchMock.get('db/projects.json', projects);
    fetchMock.get('db/transcripts.json', transcripts);
    fetchMock.get('db/paperedits.json', paperEdits);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('renders with projects', async () => {
    const history = createMemoryHistory();
    const api = new DemoApiWrapper();
    const breadCrumb = 'Projects';
    const newProjects = 'New Project';

    const { container, getByTestId } = renderRoutes(history, api);
    const emptyMessage = 'There are no Projects, create a new one to get started.';

    let projectsContainer = getByTestId('projectsContainer');

    expect(projectsContainer.textContent).toMatch(emptyMessage);
    expect(projectsContainer.textContent).toMatch(breadCrumb);
    expect(projectsContainer.textContent).toMatch(newProjects);

    const title = 'PBS Frontline - The Facebook Dilemma';
    const description = 'Interviews from PBS Frontline documentary, The Facebook Dilemma - sample project.';

    await awaitForDomChange(container);

    projectsContainer = getByTestId('projectsContainer');

    expect(projectsContainer.textContent).toMatch(breadCrumb);
    expect(projectsContainer.textContent).toMatch(title);
    expect(projectsContainer.textContent).toMatch(description);

  });

  it('can edit projects', async () => {
    const history = createMemoryHistory();
    const api = new DemoApiWrapper();

    const { container } = renderRoutes(history, api);

    const breadCrumb = 'Projects';
    const title = 'PBS Frontline - The Facebook Dilemma';
    const description = 'Interviews from PBS Frontline documentary, The Facebook Dilemma - sample project.';

    await awaitForDomChange(container);

    expect(container.innerHTML).toMatch(breadCrumb);
    expect(container.innerHTML).toMatch(title);
    expect(container.innerHTML).toMatch(description);

  });

  it('renders with transcripts and paper edits', async () => {
    const history = createMemoryHistory();
    const api = new DemoApiWrapper();

    const { container, getByText } = renderRoutes(history, api);

    const title = 'PBS Frontline - The Facebook Dilemma';
    await awaitForDomChange(container);

    fireEvent.click(getByText(title));

    await awaitForDomChange(container);

    await waitForElement(() => getByText('Transcripts'));
    await waitForElement(() => getByText('Paper Edits'));
    await waitForElement(() => getByText(title));

  });
});