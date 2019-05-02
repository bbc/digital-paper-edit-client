import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

class CustomAnnotationPopover extends Component {
  render() {

    return (
      <Popover id="popover-basic">
        {/* title="Default label" */}
        <Row>
          {/* TODO: should/could have a select to change the label + listener to save
          As well as cross to delete it */}
          <Col md={ 1 } style={ { backgroundColor: 'orange', marginLeft:'1em' } }></Col>
          <Col >
            Default label
          </Col>
          <Col md={ 1 } style={ { marginRight:'1em' } }>
            <FontAwesomeIcon icon={ faTrashAlt } />
          </Col>
        </Row>
        <hr/>
        A user note about this annotaiton, optional
        <br/>
        <FontAwesomeIcon icon={ faPen } />
      </Popover>
    );
  }
};

export default CustomAnnotationPopover;