import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt, faStickyNote, faHeading } from '@fortawesome/free-solid-svg-icons';

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Row>
        <Col sm={ 12 } md={ 4 } ld={ 4 } xl={ 4 }>
          <Button variant="outline-secondary" size="sm" block>
            <FontAwesomeIcon icon={ faHeading } /> Heading
          </Button>
        </Col>
        <Col sm={ 12 } md={ 4 } ld={ 4 } xl={ 4 }>
          <Button variant="outline-secondary" size="sm" block>
            <FontAwesomeIcon icon={ faMicrophoneAlt } /> Voice Over
          </Button>
        </Col>
        <Col sm={ 12 } md={ 4 } ld={ 4 } xl={ 4 }>
          <Button variant="outline-secondary" size="sm" block>
            <FontAwesomeIcon icon={ faStickyNote } /> Note
          </Button>
        </Col>
      </Row>
    );
  }
}

export default ToolBar;
