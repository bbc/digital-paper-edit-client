import React from 'react';
import { sortableContainer, } from 'react-sortable-hoc';

const SortableContainer = ({ children }) => {
  const unoList = () => (
    <ul style={ { listStyle: 'none', padding: '0px' } }>
      {children}
    </ul>);

  return sortableContainer(unoList);
};

export default SortableContainer;