import React from 'react';
import {
  sortableHandle
} from 'react-sortable-hoc';

import {
  faGripLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SortableHandle = sortableHandle(() => (
  <span>
    <FontAwesomeIcon icon={ faGripLines } />
  </span>)
);

export default SortableHandle;