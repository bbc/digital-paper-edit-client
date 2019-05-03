import React, { Component } from 'react';
// import './index.module.css';
// import styles from './Transcript.module.css';
// TODO: perhaps import TranscriptEditor on componentDidMount(?) to defer the load for later
// https://facebook.github.io/create-react-app/docs/code-splitting
import { TranscriptEditor } from '@bbc/react-transcript-editor';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
// import CustomFooter from '../lib/CustomFooter/index.js';
import ApiWrapper from '../../ApiWrapper/index.js';
import navbarLinks from '../lib/custom-navbar-links';
import CustomFooter from '../lib/CustomFooter/index.js';
import CustomAlert from '../lib/CustomAlert/index.js';

class TranscriptCorrect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      transcriptId: this.props.match.params.transcriptId,
      transcriptJson: null,
      url: null,
      projectTitle: '',
      transcriptTitle: '',
      savedNotification: null
    };
    this.transcriptEditorRef = React.createRef();
  }

  componentDidMount = () => {
    ApiWrapper.getTranscript(this.state.projectId, this.state.transcriptId)
      // TODO: add error handling
      .then(json => {
        this.setState({
          projectTitle: json.projectTitle,
          transcriptTitle: json.transcriptTitle,
          transcriptJson: json.transcript,
          url: json.url
        });
      });
  }

  saveToServer = () => {
    // TODO: add Api call to save content of
    alert('save to server');

    const { data } = this.transcriptEditorRef.current.getEditorContent('digitalpaperedit');
    const queryParamsOptions = false;
    ApiWrapper.updateTranscript(this.state.projectId, this.state.transcriptId, queryParamsOptions, data).then((response) => {
      if (response.status === 'ok') {
      // show message or redirect
        console.log('updated');
        // this.setState({ redirect: true, newProjectId: response.projectId });
        this.setState({
          savedNotification: <CustomAlert
            dismissable={ true }
            variant={ 'success' }
            heading={ 'Transcript saved' }
            message={ <p>Transcript: <b>{this.state.transcriptTitle}</b> has been saved</p> }
          />
        });
      }
    }).catch((e) => {
      console.error('error saving transcript:: ', e);
      this.setState({
        savedNotification: <CustomAlert
          dismissable={ true }
          variant={ 'danger' }
          heading={ 'Error saving transcript' }
          message={ <p>There was an error trying to save this transcript: <b>{this.state.transcriptTitle}</b></p> }
        />
      });
    });
  }

  render() {
    return (
      <Container style={ { marginBottom: '5em' } } fluid>

        <CustomNavbar
          links={ navbarLinks(this.state.projectId) }
        />
        <br/>

        <Row>
          <Col sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 }>
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
                link:`/projects/${ this.state.projectId }/transcripts/${ this.state.transcriptId }`,
                name: `${ this.state.transcriptTitle }`//'Transcript'
              },
              {
                name: 'Correct'
              }
              ] }
            />
          </Col>
          <Col xs={ 12 } sm={ 3 } md={ 3 } ld={ 3 } xl={ 3 }>
            <Button variant="outline-secondary" onClick={ this.saveToServer } size="lg" block>
            Save
            </Button>
            <br/>
          </Col>
        </Row>
        {this.state.savedNotification}
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
            ref={ this.transcriptEditorRef }
          />}
        {/* </Row> */}

        <CustomFooter />
      </Container>
    );
  }
}

export default TranscriptCorrect;
