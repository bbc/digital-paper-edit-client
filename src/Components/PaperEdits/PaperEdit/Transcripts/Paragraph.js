import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
class Paragraph extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Row >
        <Col sm={ 3 }>
          <strong>Speaker New </strong>
        </Col>
        <Col sm={ 9 }>
          <p>New Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p>
          <p>reminding one of the bulwarks of some condemned old craft.</p>
        </Col>
      </Row>
    );
  }
}

export default Paragraph;
