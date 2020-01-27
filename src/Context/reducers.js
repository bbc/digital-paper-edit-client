const updateItem = (id, newItem, items) => {
  const newItems = items;
  const index = items.findIndex(item => item.id === id);
  Object.assign(newItems[index], newItem);

  return newItems;
};

const deleteItem = (id, items) => {
  const newItems = items.filter(item => item.id !== id);

  return newItems;
};

const addItem = (item, items) => {
  return [ ...items, item ];
};

const itemsReducer = (state, action) => {
  switch (action.type) {
  case 'update':
    return {
      ...state,
      items: action.items
    };
  case 'updateItem':
    return {
      ...state,
      items: updateItem(action.id, action.item, state.items)
    };
  case 'add':
    return {
      ...state,
      items: [ ...state.items, action.newItem ]
    };
  case 'delete':
    return {
      ...state,
      items: deleteItem(action.id, state.items)
    };
  default:
    return state;
  }
};

const reducers = ({ projects }, action) => {
  return {
    projects: itemsReducer(projects, action)
  };
};

export { reducers, updateItem, deleteItem, addItem };