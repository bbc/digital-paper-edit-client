import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavOptions: false
    };
  }

  render() {
    let links;
    if (this.props.links !== undefined && this.props.links.length !== 0) {
      links = this.props.links.map((item, i) => {
        return (
          <LinkContainer key={ i + '_lid' } to={ item.link }>
            <Nav.Link>{item.name}</Nav.Link>
          </LinkContainer>
        );
      });
    }

    const popover = <Popover id="popover-basic">{links}</Popover>;

    return (
      <Navbar
        collapseOnSelect
        expand={ 'md' }
        bg="light"
        variant="light"
        fixed="top"
      >
        <FontAwesomeIcon icon={ faFlask } />
        &nbsp;&nbsp;
        <LinkContainer to="/">
          <Navbar.Brand>{process.env.REACT_APP_NAME}</Navbar.Brand>
        </LinkContainer>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="bottom"
          overlay={ popover }
        >
          <FontAwesomeIcon icon={ faEllipsisH } />
        </OverlayTrigger>
      </Navbar>
    );
  }
}

export default CustomNavbar;
