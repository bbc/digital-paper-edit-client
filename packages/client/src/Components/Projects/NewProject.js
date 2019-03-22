import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';

import './index.module.css';

class NewProject extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       transcriptJson: null
  //     }

  //   }

  //   componentDidMount = () =>{
  //     fetch('http://localhost:5000/api/1/transcripts/1', { mode: 'cors' })
  //     .then(res => res.json())
  //     .then((json)=>{
  //       this.setState({transcriptJson: json})
  //     })
  //   }

  handleSave = e => {
    e.preventDefault();
    alert('save');
  };

  render() {
    return (
      <Container>
        {/* TODO: import navbar */}
        <CustomNavbar
          links={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              name: 'New Project',
              link: '/projects/new'
            }
          ] }
        />

        <br />
        <CustomBreadcrumb
          items={ [
            {
              name: 'Project',
              link: '/projects'
            },
            {
              name: 'New'
            }
          ] }
        />

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title </Form.Label>
            <Form.Control type="text" placeholder="Enter a projec title" />
            <Form.Text className="text-muted">
              Chose a title for your project
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a projec description"
            />
            <Form.Text className="text-muted">
              Chose an optional description for your project
            </Form.Text>
          </Form.Group>

          {/* on change save - send to server as post + link to projects list? */}
          <Button onChange={ this.handleSave } variant="primary" type="submit">
            Save
          </Button>
        </Form>

        <CustomFooter />
      </Container>
    );
  }
}

export default NewProject;
