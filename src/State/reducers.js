const itemsReducer = (state, action) => {
  switch (action.type) {
  case 'update':
    return {
      ...state,
      items: action.items
    };
  case 'add':
    return {
      ...state,
      items: [ ...state.items, action.newItem ]
    };
  default:
    return state;
  }
};

const reducers = ({ projects, transcripts, paperEdits }, action) => {
  return {
    projects: itemsReducer(projects, action),
    transcripts: itemsReducer(transcripts, action),
    paperEdits: itemsReducer(paperEdits, action)
  };
};

export default reducers;