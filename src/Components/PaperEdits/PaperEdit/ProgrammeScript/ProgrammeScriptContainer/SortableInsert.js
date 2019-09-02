import React from 'react';
import {
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  sortableElement,
} from 'react-sortable-hoc';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import SortableHandle from './SortableHandle';

const SortableInsert = sortableElement(({ value }) => {
  return (
    <li>
      <Row>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor: 'orange' } }>
          <SortableHandle />
        </Col>
        <Col xs={ 8 } sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 } style={ { backgroundColor: 'orange' } }>
          {value}
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor:  'orange' } }>
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor: 'orange' } }>
          <FontAwesomeIcon style={ { color: 'white' } } icon={ faArrowAltCircleLeft } />
        </Col>
      </Row>
    </li>
  );
});

export default SortableInsert;