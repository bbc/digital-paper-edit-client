import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

import labsLogo from '../../../img/labsLogo.png';

// import './index.module.css';

class CustomFooter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       transcriptJson: null
//     }

  //   }

  render() {
    return (
      <Navbar collapseOnSelect expand={ 'md' } bg="light" variant="light" fixed="bottom" >
        <small><img src={ labsLogo } style={ { height: '2em' } } alt="Labs Logo" /> This is a prototype from <a href="http://bbcnewslabs.co.uk/" target="_blank">BBC News Labs</a></small>
      </Navbar>

    );
  }
}

export default CustomFooter;
