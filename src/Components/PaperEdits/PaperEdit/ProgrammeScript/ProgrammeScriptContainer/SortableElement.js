import React from 'react';
import {
  sortableElement,
} from 'react-sortable-hoc';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SortableHandle from './SortableHandle';

const SortableElement = sortableElement(({ value, index, handleDelete, handleEdit }) => {

  const EditIcon = (
    <FontAwesomeIcon
      className={ 'text-muted' }
      icon={ faPen }
      onClick={ () => { handleEdit(index); } }>

    </FontAwesomeIcon>
  );

  const DeleteIcon = (
    <FontAwesomeIcon
      className={ 'text-muted' }
      icon={ faTrash }
      onClick={ () => { handleDelete(index); } }>
    </FontAwesomeIcon>
  );

  return (
    <li>
      <Row>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } >
          <SortableHandle />
        </Col>
        <Col xs={ 8 } sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 } >
          {value}
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } >
          {handleEdit ? EditIcon : null}
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } >
          {handleDelete ? DeleteIcon : null}
        </Col>
      </Row>
    </li>
  );
});

export default SortableElement;