import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import labsLogo from '../../../img/labsLogo.png';

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
      <small>
        <img src={ labsLogo } style={ { height: '2em' } } alt="Labs Logo" /> This is
        a prototype from{' '}
        <a href="http://bbcnewslabs.co.uk/" target="_blank" rel="noopener noreferrer">
          BBC News Labs
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
