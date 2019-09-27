import React, { createContext, useContext, useReducer } from 'react';
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  // pass useReducer to make it accessible from any component
  <StateContext.Provider value={ useReducer(reducer, initialState) }>
    {children}
  </StateContext.Provider>
);

//custom hook to access state in any component of application
export const useStateValue = () => useContext(StateContext);

//https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c