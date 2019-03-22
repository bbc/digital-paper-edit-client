import React, { Component } from 'react';
import './index.module.css';

// TODO: perhaps import TranscriptEditor on componentDidMount(?) to defer the load for later
// https://facebook.github.io/create-react-app/docs/code-splitting
import { TranscriptEditor } from '@bbc/react-transcript-editor';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
// import CustomFooter from '../lib/CustomFooter/index.js';

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      transcriptJson: null,
      title:null,
      url: null
    };

  }

  componentDidMount = () => {
    // TODO get id from props match
    fetch('http://localhost:5000/api/projects/1/transcripts/1', { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        this.setState({ transcriptJson: json.transcript, title: json.title, url: json.url });
      });
  }

  render() {
    return (
      <Container fluid={ true }>

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
          ]

          }
        />
        <br/>

        {/* <CustomBreadcrumb /> */}

        <CustomBreadcrumb
          items={ [ {
            name: 'Projects',
            link: '/projects'
          },
          {
            // TODO: need to get project name?
            // TODO: is this needed?
            name: 'Project Name',
            // link: `/projects/${ this.state.projectId }`
          },
          {
            name: 'Transcripts',
            link:`/projects/${ this.state.projectId }/transcripts`
          },
          {
            // TODO: transcript name
            name: `${ this.state.title }`//'Transcript'
          },
          {
            name: 'Edit'
          }
          ] }
        />
        {/* <Row> */}
        {this.state.transcriptJson !== null &&
          <TranscriptEditor
            transcriptData={ this.state.transcriptJson }// Transcript json
            // TODO: move url server side
            mediaUrl={ this.state.url }// string url to media file - audio or video
            isEditable={ true }// se to true if you want to be able to edit the text
            sttJsonType={ 'bbckaldi' }// the type of STT Json transcript supported.
            //  TODO: check if name has changed in latest version
            title={ this.state.title }
            fileName={ this.state.title }// optional*
          />}
        {/* </Row> */}

        {/* <CustomFooter /> */}
      </Container>
    );
  }
}

export default Transcript;
