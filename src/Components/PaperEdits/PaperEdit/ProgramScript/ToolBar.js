import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophoneAlt,
  faStickyNote,
  faHeading,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Row>
        <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
          <Button variant="outline-secondary"
            onClick={ this.props.handleAddTranscriptSelectionToProgrammeScript }
            title="select text in the transcript, then click this button to add it to the programme script"
            size="sm"
            block
          >
            <FontAwesomeIcon icon={ faPlus } /> selection
          </Button>
        </Col>
        <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
          <Button variant="outline-secondary" size="sm" block>
            <FontAwesomeIcon icon={ faHeading } /> Heading
          </Button>
        </Col>
        <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
          <Button variant="outline-secondary" size="sm" block>
            <FontAwesomeIcon icon={ faMicrophoneAlt } /> Voice Over
          </Button>
        </Col>
        <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
          <Button variant="outline-secondary" size="sm" block>
            <FontAwesomeIcon icon={ faStickyNote } /> Note
          </Button>
        </Col>
      </Row>
    );
  }
}

export default ToolBar;
