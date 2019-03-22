import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

// import './index.module.css';

class CustomNavbar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       transcriptJson: null
//     }

  //   }

  render() {
    let links;
    if (this.props.links !== undefined && this.props.links.length !== 0 ) {
      links = this.props.links.map((item, i) => {
        // if (item.nested !== undefined) {
        return ( <LinkContainer key={ i + '_id' } to={ item.link }>
          <Nav.Link>{item.name}</Nav.Link>
        </LinkContainer> );
        // }
        // else {
        //   // accomodate dropbod menues
        //   return ( <NavDropdown title={ item.name } id="basic-nav-dropdown">
        //     {item.nested.map((subItem, index) => {
        //       return (
        //         <LinkContainer key={ index } to={ subItem.link }>
        //           <NavDropdown.Item >{subItem.name}</NavDropdown.Item>
        //         </LinkContainer>
        //       );
        //     }
        //     )}

        //   </NavDropdown>);
        // }

      });
    }

    return (
      <Navbar collapseOnSelect expand={ 'md' } bg="light" variant="light" fixed="top" >
        <LinkContainer to="/">
          <Navbar.Brand >{process.env.REACT_APP_NAME}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/*
            <LinkContainer to="/projects">
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/projects/new">
              <Nav.Link>New Projects</Nav.Link>
            </LinkContainer> */}

            {/* <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">List</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">New</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Transcripts" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">List</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">New</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="PaperEdit" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">List</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">New</NavDropdown.Item>
            </NavDropdown> */}

            {/* <LinkContainer to="/projects/1/transcripts/new">
                <Nav.Link>New transcripts</Nav.Link>
              </LinkContainer> */}

            {/* <LinkContainer to="/projects/1/transcripts/new">
                <Nav.Link>New PaperEdit</Nav.Link>
              </LinkContainer> */}

            {links}
          </Nav>
          <Nav>

            {/* <LinkContainer to="/projects/1/transcripts/new">
              <Nav.Link>Users Group</Nav.Link>
            </LinkContainer> */}

            {/* <LinkContainer to="/guide">
              <Nav.Link>Guide</Nav.Link>
            </LinkContainer> */}

            {/* <NavDropdown title="Help" id="basic-nav-dropdown">
              <LinkContainer to="/user-manual">
                <NavDropdown.Item >User Manual</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item href="#action/3.2">Contact</NavDropdown.Item>
            </NavDropdown> */}

            {/* <LinkContainer to="/help">
              <Nav.Link>Help</Nav.Link>
            </LinkContainer> */}

            {/* <Nav.Link>Sign In</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

export default CustomNavbar;
