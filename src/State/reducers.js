const projectsReducer = (state, action) => {
  switch (action.type) {
  case 'update':
    return {
      ...state,
      projects: action.projects
    };
  case 'add':
    return {
      ...state,
      projects: [ ...state.projects, action.newItem ]
    };
  default:
    return state;
  }
};

const transcriptsReducer = (state, action) => {
  switch (action.type) {
  case 'update':
    return {
      ...state,
      transcripts: action.transcripts
    };
  case 'add':
    return {
      ...state,
      projects: [ ...state.transcripts, action.newItem ]
    };
  default:
    return state;
  }
};

export {
  projectsReducer,
  transcriptsReducer
};
