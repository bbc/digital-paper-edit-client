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

const DragHandle = sortableHandle(() => <span> <FontAwesomeIcon icon={ faGripLines } /> </span>);

const SortableElement = sortableElement(({ value, index, type, handleDelete, handleEdit }) => {
  return (<li>
    <Row>
      <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor: type === 'insert' ? 'orange' : '' } }>
        <DragHandle />
      </Col>
      <Col xs={ 8 } sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 } style={ { backgroundColor: type === 'insert' ? 'orange' : '' } }>
        {value}
      </Col>
      <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor: type === 'insert' ? 'orange' : '' } }>
        {/* TODO: if paper-cut  then don't show edit/pen icon */}
        {type !== 'paper-cut' && type !== 'insert' ? <FontAwesomeIcon className={ 'text-muted' } icon={ faPen } onClick={ () => { handleEdit(index); } } /> : null}

      </Col>
      <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 } style={ { backgroundColor: type === 'insert' ? 'orange' : '' } }>
        {/* TODO: pass a prop to remove element from list */}
        {type !== 'insert' ? <FontAwesomeIcon className={ 'text-muted' } icon={ faTrash } onClick={ () => {handleDelete(index);} } /> : null}
        {type === 'insert' ? <FontAwesomeIcon style={ { color: 'white' } } icon={ faArrowAltCircleLeft } /> : null}
      </Col>
    </Row>
  </li>);
});

export default SortableElement;