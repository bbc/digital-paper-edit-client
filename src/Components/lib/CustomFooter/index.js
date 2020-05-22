import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

function CustomFooter() {
  const footer = (
    <Navbar collapseOnSelect expand={'md'} bg="light" variant="light" fixed="bottom" className="justify-content-center">
      <small>
        <a href={'https://www.autoedit.io'} target="_blank" rel="noopener noreferrer">
          {' '}
          autoEdit.io <FontAwesomeIcon icon={faFlask} />
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
