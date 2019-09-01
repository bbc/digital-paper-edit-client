import React from 'react';
import {
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  faGripLines,
  faPen,
  faTrash,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DragHandle = sortableHandle(() => (
  <span>
    <FontAwesomeIcon icon={ faGripLines } />
  </span>)
);

const SortableElement = sortableElement(({ value, index, type, handleDelete, handleEdit }) => {
  let isEditable = false;
  let isDeletable = false;

  let element;

  switch (el.type) {
  case 'title':
    isEditable = true;
    isDeletable = true;
  case 'voice-over':
    isEditable = true;
    isDeletable = true;
  case 'paper-cut':
    isDeletable = true;
  case 'note':
    isEditable = true;
    isDeletable = true;
  default:
    console.error('invalid programme element type');
  }

  const Insert = () => {
    return (
      <>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor: 'orange' } }>
          <DragHandle />
        </Col>
        <Col xs={ 8 } sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 } style={ { backgroundColor: 'orange' } }>
          {value}
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor:  'orange' } }>
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor: 'orange' } }>
          <FontAwesomeIcon style={ { color: 'white' } } icon={ faArrowAltCircleLeft } />
        </Col>
      </>
    );
  };
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

  const getElement = () => {
    return (
      <>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } >
          <DragHandle />
        </Col>
        <Col xs={ 8 } sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 } >
          {value}
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } >
          {isEditable ? EditIcon : null}
        </Col>
        <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } >
          {isDeletable ? DeleteIcon : null}
        </Col>
      </>);
  };

  if (type === 'insert') {
    element = Insert();
  } else {
    element = getElement();
  }

  return (
    <li>
      <Row>
        { element }
      </Row>
    </li>
  );
});

export default SortableElement;