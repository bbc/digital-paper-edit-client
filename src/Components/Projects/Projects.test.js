// import React from 'react';
// import { render, fireEvent, waitForElement } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Projects from './';
// import ApiContext from '../../Context/ApiContext';
// import DemoApiWrapper from '../../ApiWrapper/DemoApiWrapper';

// // https://stackoverflow.com/questions/48033841/test-process-env-with-jest

// const renderWithApi = (api) => {
//   return render(
//     <ApiContext.Provider value={ api }>
//       <ApiContext.Consumer>
//         {() => (
//           <Projects />
//         )}
//       </ApiContext.Consumer>
//     </ApiContext.Provider>

//   );
// };

// describe('Projects component', () => {

//   beforeEach(() => {
//     jest.resetModules(); // this is important - it clears the cache
//   });

//   afterEach(() => {
//   });

//   it('renders without items', async () => {
//     const message = 'There are no Projects, create a new one to get started.';
//     const breadcrumbText = 'Projects';
//     const { queryByText, getByLabelText, getByText } = await renderWithApi(DemoApiWrapper);
//     // expect(getByText(message)).toBeInTheDocument();
//     // await waitForElement(() => expect(getByText(breadcrumbText)).toBeInTheDocument());
//   });

// });
