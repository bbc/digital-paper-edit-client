import React, { Component } from 'react';
// import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';
// import CustomNavbar from '../lib/CustomNavbar/index.js';

// import './index.module.css';

class CustomBreadcrumb extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       transcriptJson: null
  //     }
  //   }

  render() {
    const breadcrumbs = this.props.items.map((item, index) => {
      if (item.link) {
        return (
          <LinkContainer key={ index } to={ item.link }>
            <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
          </LinkContainer>
        );
      } else {
        return (
          <Breadcrumb.Item key={ index } active>
            {item.name}
          </Breadcrumb.Item>
        );
      }
    });

    return (
      <div className="d-none d-sm-block">
        <Breadcrumb>
          {/* <LinkContainer to="/projects">
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
          </LinkContainer>

          <LinkContainer to="/projects">
            <Breadcrumb.Item>Transcripts</Breadcrumb.Item>
          </LinkContainer>

          <Breadcrumb.Item active>Transcript name</Breadcrumb.Item> */}

          {breadcrumbs}
        </Breadcrumb>
      </div>
    );
  }
}

export default CustomBreadcrumb;
