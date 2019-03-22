import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';
import './index.module.css';

class NewTranscript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptJson: null,
      projectId: this.props.match.params.projectId
    };
    console.log(process.env);
  }

  // //...

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
            }
          ] }
        />

        <br />
        <CustomBreadcrumb
          items={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              // TODO: need to get project name
              name: 'Project',
              link: `/projects/${ this.state.projectId }`
            },
            {
              name: 'Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts`
            },
            {
              name: 'New'
            }
          ] }
        />

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title </Form.Label>
            <Form.Control type="text" placeholder="Enter a Transcript title" />
            <Form.Text className="text-muted">
              Chose a title for your Transcript
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Transcript description"
            />
            <Form.Text className="text-muted">
              Chose an optional description for your Transcript
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <input
              type="file"
              label="Upload"
              accept="audio/*,video/*"
              // buttonAfter={ uploadFileButton }
              ref={ ref => (this.fileUpload = ref) }
            />
          </Form.Group>

          {/* <div className="customFile">
            <input type="file" className="customFileInput" id="customFile"/>
            <label className="customFileLabel" htmlFor="customFile">Choose file</label>
          </div> */}

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

export default NewTranscript;
