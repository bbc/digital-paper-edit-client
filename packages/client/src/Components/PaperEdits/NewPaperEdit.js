import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';

import './index.module.css';

class NewPaperEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptJson: null,
      projectId: this.props.match.params.projectId
    };

  }

  //   componentDidMount = () =>{
  //     fetch('http://localhost:5000/api/1/transcripts/1', { mode: 'cors' })
  //     .then(res => res.json())
  //     .then((json)=>{
  //       this.setState({transcriptJson: json})
  //     })
  //   }

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
              name: 'New Projects',
              link: '/projects/new'
            },
            {
              name: 'Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts`
            },
            {
              name: 'New Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts/new`
            },
            {
              name: 'Paper Edits',
              link: `/projects/${ this.state.projectId }/paperedits`
            },
            {
              name: 'New Paper Edit',
              link: `/projects/${ this.state.projectId }/paperedits/new`
            },
            {
              name: 'Users',
              link: `/projects/${ this.state.projectId }/users`
            }
          ]
          }
        />

        <br/>
        <CustomBreadcrumb
          items={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              // TODO: need to get project name
              name: 'Project:',
              link: `/projects/${ this.state.projectId }`
            },
            {
              name: 'Paper Edits',
              link: `/projects/${ this.state.projectId }/paperEdits`
            },
            {
              name: 'New'
            }
          ] }
        />

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title </Form.Label>
            <Form.Control type="text" placeholder="Enter a Paper Edit title" />
            <Form.Text className="text-muted">
    Chose a title for your Paper Edit
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description </Form.Label>
            <Form.Control type="text" placeholder="Enter a Paper Edit description" />
            <Form.Text className="text-muted">
    Chose an optional description for your Paper Edit
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

export default NewPaperEdit;
