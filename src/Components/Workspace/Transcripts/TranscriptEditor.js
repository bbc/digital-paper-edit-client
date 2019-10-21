import React, { Component } from 'react';
// import './index.module.css';
// import styles from './Transcript.module.css';
// TODO: perhaps import TranscriptEditor on componentDidMount(?) to defer the load for later
// https://facebook.github.io/create-react-app/docs/code-splitting
import { TranscriptEditor as ReactTranscriptEditor } from '@bbc/react-transcript-editor';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { Redirect } from 'react-router-dom';
import ApiContext from '../../../Context/ApiContext';

import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import CustomAlert from '@bbc/digital-paper-edit-react-components/CustomAlert';

class TranscriptEditor extends Component {
  static contextType = ApiContext
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      transcriptId: this.props.match.params.transcriptId,
      transcriptJson: null,
      mediaUrl: null,
      projectTitle: '',
      transcriptTitle: '',
      savedNotification: null,
      mediaType: 'video'
    };
    this.transcriptEditorRef = React.createRef();
  }

  componentDidMount = () => {
    const api = this.context;
    api.getTranscript(this.state.projectId, this.state.transcriptId)
      // TODO: add error handling
      .then(json => {
        this.setState({
          projectTitle: json.projectTitle,
          transcriptTitle: json.transcriptTitle,
          transcriptJson: json.transcript,
          mediaUrl: json.url,
          mediaType: json.mediaType
        });
      });
  }

  saveToServer = () => {
    const api = this.context;
    // TODO: add Api call to save content of
    alert('save to server');

    // TODO: decide how to deal with transcript corrections
    // exporting digitalpaperedit in @bbc/react-transcript-editor@latest doesn't give you
    // corrected text with timecodes, only "original" uncorrected text even if transcript might
    // have been corrected, because of outstandin PR in bbc/react-transcript-editor
    // https://github.com/bbc/react-transcript-editor/pull/144
    // which should be addressed after https://github.com/bbc/react-transcript-editor/pull/160
    //
    // Other option is to export as `txtspeakertimecodes` or `txt` and reallign server side using Aeneas
    //
    // TranscriptEditor - export options: txtspeakertimecodes - draftjs - txt - digitalpaperedit
    const { data } = this.transcriptEditorRef.current.getEditorContent('digitalpaperedit');
    data.title = this.state.transcriptTitle;
    data.transcriptTitle = this.state.transcriptTitle;
    const queryParamsOptions = false;
    api.updateTranscript(this.state.projectId, this.state.transcriptId, queryParamsOptions, data).then((response) => {
      if (response.ok) {
      // show message or redirect
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

  // redirectToAnnotatePage = () => {
  //   // this.state.projectId this.state.transcriptId
  //   this.setState({
  //     redirect: true
  //   });
  // }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.newTranscriptId }/annotate` } />;
  //   }
  // }

  render() {
    return (
      <>
        {/* {this.renderRedirect()} */}
        <Container style={ { marginBottom: '5em' } } fluid>
          <br/>
          <Row>
            <Col sm={ 12 } md={ 11 } ld={ 11 } xl={ 11 }>
              <Breadcrumb
                items={ [ {
                  name: 'Projects',
                  link: '/projects'
                },
                {
                  name: `Project: ${ this.state.projectTitle }`,
                  link: `/projects/${ this.state.projectId }`
                },
                {
                  name: 'Transcripts',
                },
                {
                  name: `${ this.state.transcriptTitle }`
                },
                {
                  name: 'Correct'
                }
                ] }
              />
            </Col>
            {/* <Col xs={ 12 } sm={ 2 } md={ 2 } ld={ 2 } xl={ 2 }>
              <Button variant="outline-secondary" onClick={ this.redirectToAnnotatePage } size="lg" block>
              Annotate
              </Button>
              <br/>
            </Col> */}
            <Col xs={ 12 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
              <Button variant="outline-secondary" onClick={ this.saveToServer } size="lg" block>
              Save
              </Button>
              <br/>
            </Col>
          </Row>
          {this.state.savedNotification}
          {this.state.transcriptJson &&
          <ReactTranscriptEditor
            transcriptData={ this.state.transcriptJson }// Transcript json
            // TODO: move url server side
            mediaUrl={ this.state.mediaUrl }// string url to media file - audio or video
            isEditable={ true }// se to true if you want to be able to edit the text
            sttJsonType={ 'digitalpaperedit' }// the type of STT Json transcript supported.
            //  TODO: check if name has changed in latest version
            title={ this.state.transcriptTitle }
            // fileName={ this.state.projectTitle }// optional*
            ref={ this.transcriptEditorRef }
            mediaType={ this.state.mediaType }
          />}
        </Container>
      </>
    );
  }
}

export default TranscriptEditor;
