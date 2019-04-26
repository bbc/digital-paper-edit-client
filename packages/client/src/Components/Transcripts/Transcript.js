import React, { Component } from 'react';
// import './index.module.css';
// import styles from './Transcript.module.css';
// TODO: perhaps import TranscriptEditor on componentDidMount(?) to defer the load for later
// https://facebook.github.io/create-react-app/docs/code-splitting
import { TranscriptEditor } from '@bbc/react-transcript-editor';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
// import CustomFooter from '../lib/CustomFooter/index.js';
import Api from '../../Api/index.js';

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      transcriptJson: null,
      url: null,
      projectTitle: ''
    };

  }

  componentDidMount = () => {
    Api.getTranscript(this.state.projectId, this.state.transcriptId)
      // TODO: add error handling
      .then(json => {
        console.log('json', json);
        this.setState({
          projectTitle: json.projectTitle,
          transcriptJson: json.transcript,
          url: json.url
        });
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
            },
            {
              name: 'Users',
              link: `/projects/${ this.state.projectId }/users`
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
            name: `Project: ${ this.state.projectTitle }`,
            link: `/projects/${ this.state.projectId }`
          },
          {
            name: 'Transcripts',
            link:`/projects/${ this.state.projectId }/transcripts`
          },
          {
            // TODO: transcript name
            name: `${ this.state.projectTitle }`//'Transcript'
          },
          {
            name: 'Correct'
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
            sttJsonType={ 'digitalpaperedit' }// the type of STT Json transcript supported.
            //  TODO: check if name has changed in latest version
            title={ this.state.projectTitle }
            fileName={ this.state.projectTitle }// optional*
          />}
        {/* </Row> */}

        {/* <CustomFooter /> */}
      </Container>
    );
  }
}

export default Transcript;
