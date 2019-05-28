import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

function CustomNavbar () {

  return (
    <Navbar
      collapseOnSelect
      expand={ 'md' }
      bg="light"
      variant="light"
      fixed="top"
    >
      <LinkContainer to="/projects">
        <Navbar.Brand>
          <FontAwesomeIcon icon={ faFlask } />
          {'  '}{process.env.REACT_APP_NAME}
        </Navbar.Brand>
      </LinkContainer>
    </Navbar>
  );
}

export default CustomNavbar;
