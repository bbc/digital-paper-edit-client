import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockFetch from '@react-mock/fetch';
import Projects from './';

// https://stackoverflow.com/questions/48033841/test-process-env-with-jest

// describe('Projects component', () => {
//   const OLD_ENV = process.env;

//   beforeEach(() => {
//     jest.resetModules(); // this is important - it clears the cache
//     process.env = { ...OLD_ENV };
//     delete process.env.NODE_ENV;
//     process.env.REACT_APP_NODE_ENV = 'browser';
//   });

//   afterEach(() => {
//     process.env = OLD_ENV;
//   });

//   it('renders without items', async () => {
//     const message = 'There are no Projects, create a new one to get started.';
//     const breadcrumbText = 'Projects';
//     const { queryByText, getByLabelText, getByText } = render(<Projects />);
//     // expect(getByText(message)).toBeInTheDocument();
//     // await waitForElement(() => expect(getByText(breadcrumbText)).toBeInTheDocument());
//   });

// });
