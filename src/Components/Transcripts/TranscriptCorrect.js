import React, { Component, Suspense } from 'react';
import path from 'path';
// import './index.module.css';
// import styles from './Transcript.module.css';
// TODO: perhaps import TranscriptEditor on componentDidMount(?) to defer the load for later
// https://facebook.github.io/create-react-app/docs/code-splitting
// import TranscriptEditor from 'slate-transcript-editor';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import ApiWrapper from '../../ApiWrapper/index.js';
import CustomAlert from '../lib/CustomAlert/index.js';
import Skeleton from '@material-ui/lab/Skeleton';

const TranscriptEditor = React.lazy(() => import('slate-transcript-editor'));

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
      savedNotification: null,
    };
    this.transcriptEditorRef = React.createRef();
  }

  componentDidMount = () => {
    ApiWrapper.getTranscript(this.state.projectId, this.state.transcriptId)
      // TODO: add error handling
      .then(json => {
        console.log('json', json);
        this.setState({
          projectTitle: json.projectTitle,
          transcriptTitle: json.transcriptTitle,
          transcriptJson: json.transcript,
          url: json.url,
          clipName: json.clipName,
        });
      });
  };

  handleSave = autoSaveData => {
    console.log('handleSave', autoSaveData);
    const data = autoSaveData;
    data.title = this.state.transcriptTitle;
    data.transcriptTitle = this.state.transcriptTitle;
    const queryParamsOptions = false;
    ApiWrapper.updateTranscript(this.state.projectId, this.state.transcriptId, queryParamsOptions, data)
      .then(response => {
        console.log('ApiWrapper.updateTranscript', response);
        if (response.ok) {
          // show message or redirect
          console.log('updated');
          // More discrete auto save notification
          this.setState({
            savedNotification: (
              <small className={'text-success'}>
                Transcript: <b>{this.state.transcriptTitle}</b> has been saved at <b>{new Date().toLocaleString()}</b>
              </small>
            ),
          });
        }
      })
      .catch(e => {
        console.error('error saving transcript:: ', e);
        this.setState({
          savedNotification: (
            <CustomAlert
              dismissable={true}
              variant={'danger'}
              heading={'Error saving transcript'}
              message={
                <p>
                  There was an error trying to save this transcript: <b>{this.state.transcriptTitle}</b>
                </p>
              }
            />
          ),
        });
      });
  };

  redirectToAnnotatePage = () => {
    // this.state.projectId this.state.transcriptId
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/projects/${this.state.projectId}/transcripts/${this.state.newTranscriptId}/annotate`} />;
    }
  };

  render() {
    // Workaround to change layout of TranscriptEditor for audio files.
    // For now only handling limited numnber of file extension that have more of a certainty of being audio
    // as opposed to more ambiguos extensions such as ogg or mp4 that could be either video or audio
    // there might be better ways to determine if a clip is audio or video, especially node/"server side" but
    // might also be more of a setup eg using ffprobe etc..
    let mediaType = 'video';
    if (
      path.extname(this.state.clipName) === '.wav' ||
      path.extname(this.state.clipName) === '.mp3' ||
      path.extname(this.state.clipName) === '.m4a' ||
      path.extname(this.state.clipName) === '.flac' ||
      path.extname(this.state.clipName) === '.aiff'
    ) {
      mediaType = 'audio';
    }
    return (
      <>
        {this.renderRedirect()}
        <Container
          style={{
            backgroundColor: '#eee',
          }}
          fluid
        >
          <br />
          <Row>
            <Col sm={12} md={12} ld={12} xl={12} style={{ marginBottom: '0' }}>
              <CustomBreadcrumb
                backgroundColor={'transparent'}
                items={[
                  {
                    name: 'Projects',
                    link: '/projects',
                  },
                  {
                    name: `Project: ${this.state.projectTitle}`,
                    link: `/projects/${this.state.projectId}`,
                  },
                  {
                    name: 'Transcripts',
                  },
                  {
                    name: `${this.state.transcriptTitle}`,
                  },
                ]}
              />
            </Col>
          </Row>
          {this.state.savedNotification}
          {this.state.transcriptJson !== null && (
            <Suspense
              fallback={
                <Container fluid>
                  <Row>
                    <Col xs={12} sm={3} md={3} lg={3} xl={3}>
                      <Skeleton variant="rect" width={'100%'} height={100} />
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                      <Skeleton variant="rect" width={'100%'} height={600} />
                    </Col>
                    <Col xs={12} sm={1} md={1} lg={1} xl={1}>
                      <Skeleton variant="rect" width={'100%'} height={350} />
                    </Col>
                  </Row>
                </Container>
              }
            >
              <TranscriptEditor
                transcriptData={this.state.transcriptJson} // Transcript json
                mediaUrl={this.state.url} // string url to media file - audio or video
                // showTitle={true}
                isEditable={true} // se to true if you want to be able to edit the text
                title={this.state.transcriptTitle}
                mediaType={mediaType}
                autoSaveContentType={'digitalpaperedit'}
                handleSaveEditor={this.handleSave}
                // handleAutoSaveChanges={ this.handleSave }
              />
            </Suspense>
          )}
        </Container>
      </>
    );
  }
}

export default TranscriptCorrect;
