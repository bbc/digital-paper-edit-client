import React from 'react';
import ExportMenu from './ExportMenu';
import AddElementMenu from './AddElementMenu';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShare,
  faPlus,
  faSync,
  faSave
} from '@fortawesome/free-solid-svg-icons';

const Menu = (props) => {
  return (
    <Row noGutters>
      <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
        <Button
          // block
          variant="outline-secondary"
          onClick={ props.handleAddTranscriptSelection }
          title="Add a text selection, select text in the transcript, then click this button to add it to the programme script"
        >
          <FontAwesomeIcon icon={ faPlus } /> Selection
        </Button>
      </Col>
      <Col sm={ 12 } md={ 2 } ld={ 2 } xl={ 2 }>
        <AddElementMenu handleAddElement={ props.handleAddElement } />
      </Col>
      <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
        <Button variant="outline-secondary"
          onClick={ props.handleUpdatePreview }
          // size="sm"
          title="update preview"
          // block
        >
          <FontAwesomeIcon icon={ faSync } /> Preview
        </Button>
      </Col>
      <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            <FontAwesomeIcon icon={ faShare } /> Export
          </Dropdown.Toggle>
          <ExportMenu programmeScript={ props.programme } transcripts={ props.transcripts } ></ExportMenu>

        </Dropdown>
      </Col>
      <Col sm={ 12 } md={ 1 } ld={ 1 } xl={ 1 }>
        <Button variant="outline-secondary"
          onClick={ props.handleSave }
          // size="sm"
          title="save programme script"
          block
        >
          <FontAwesomeIcon icon={ faSave } />
          {/* Save */}
        </Button>
      </Col>
    </Row>);
};

export default Menu;