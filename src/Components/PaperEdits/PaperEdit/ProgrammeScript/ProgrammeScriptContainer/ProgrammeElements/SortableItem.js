import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SortableHandle from './SortableHandle';

const SortableItem = SortableElement(({ value, handleFns, colourOpts }) => {

  const EditIcon = (
    <FontAwesomeIcon
      className={ 'text-muted' }
      icon={ faPen }
      onClick={ handleFns.edit }>
    </FontAwesomeIcon>
  );

  const DeleteIcon = (
    <FontAwesomeIcon
      className={ 'text-muted' }
      icon={ faTrash }
      onClick={ handleFns.delete }>
    </FontAwesomeIcon>
  );

  return (
    <li style={ { listStyle: 'none' } }>
      <Row style={ { backgroundColor: colourOpts.background } }>
        <Col xs={ 1 } >
          <SortableHandle />
        </Col>
        <Col xs={ 8 } sm={ 9 } >
          <span style={ { color: colourOpts.text } }>
            {value}
          </span>
        </Col>
        <Col xs={ 1 } >
          {handleFns.edit ? EditIcon : null}
        </Col>
        <Col xs={ 1 } >
          {handleFns.delete ? DeleteIcon : null}
        </Col>
      </Row>
    </li>
  );
});

SortableItem.defaultProps = {
  colourOpts: {},
  handleFns: {}
};

export default SortableItem;
