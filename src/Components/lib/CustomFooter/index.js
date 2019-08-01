import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

function CustomFooter() {
  const footer = (
    <Navbar
      collapseOnSelect
      expand={ 'md' }
      bg="light"
      variant="light"
      fixed="bottom"
      className="justify-content-center"
    >
      <FontAwesomeIcon icon={ faFlask } /> <small>
        This is a prototype by {' '}
        <a href={ process.env.REACT_APP_PROTOTYPE_BY_LINK } target="_blank" rel="noopener noreferrer">
          {process.env.REACT_APP_PROTOTYPE_BY}
        </a>
      </small>
    </Navbar>
  );

  return (
    <Row>
      <Col className="d-none d-sm-block">{footer}</Col>
      <Col className="d-lg-block d-md-block">{footer}</Col>
    </Row>
  );
}

export default CustomFooter;
