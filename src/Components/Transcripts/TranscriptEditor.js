import React, { useState, useRef, useEffect, } from 'react';
import { TranscriptEditor as ReactTranscriptEditor } from '@bbc/react-transcript-editor';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import ApiWrapper from '../../ApiWrapper/index.js';
import CustomAlert from '../lib/CustomAlert/index.js';
import PropTypes from 'prop-types';

const TranscriptEditor = (props) => {
  const transcriptEditorRef = useRef(null);
  const projectId = props.match.params.projectId;
  const transcriptId = props.match.params.transcriptId;
  const [ transcript, setTranscript ] = useState();
  const [ updateAlert, setUpdateAlert ] = useState(null);
  const [ redirect, setRedirect ] = useState();

  useEffect(() => {
    ApiWrapper.getTranscript(this.state.projectId, this.state.transcriptId)
      .then(tr => {
        setTranscript(tr);
      }).catch(e => {
        console.log(e);
      });
  }, []);

  const Alert = (alertVariant, alertHeading, alertMessage) => {
    return (<CustomAlert
      dismissable={ true }
      variant={ alertVariant }
      heading={ alertHeading }
      message={ alertMessage }
    />);
  };

  const OKAlert = () => {
    const msg = <p>Transcript: <b>{ transcript.transcriptTitle}</b> has been saved</p>;

    return Alert('success', 'Transcript saved', msg);

  };

  const ErrorAlert = () => {
    const msg = <p>There was an error trying to save this transcript: <b>{ transcript.transcriptTitle}</b></p>;

    return Alert('danger', 'Error saving transcript', msg);

  };

  const getEditorContentWithTitle = () => {
    const { data } = transcriptEditorRef.current.getEditorContent('digitalpaperedit');
    const title = transcript.transcriptTitle;
    data.title = title;
    data.transcriptTitle = title;

    return data;
  };

  const updateTranscriptApi = () => {
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
    const editorContent = getEditorContentWithTitle();
    const queryParamsOptions = false;

    return ApiWrapper.updateTranscript(projectId, transcriptId, queryParamsOptions, editorContent);

  };

  const getUpdateAlert = () => {
    alert('Saving Transcript');

    return updateTranscriptApi()
      .then((response) => {
        if (response.ok) {
          return OKAlert();
        };
      }).catch((e) => {
        console.error('error saving transcript:: ', e);

        return ErrorAlert();
      });
  };

  const handleClick = () => {
    const alert = getUpdateAlert();
    setUpdateAlert(alert);
  };

  const handleSave = () => {
    // handleSave localStorage
  };

  const redirectToAnnotatePage = () => {
    setRedirect(true);
  };

  const renderRedirect = () => {
    if (redirect) {
      return (
        <Redirect to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.newTranscriptId }/annotate` } />
      );
    }
  };

  return (
    <>
      {renderRedirect()}
      <Container style={ { marginBottom: '5em' } } fluid>
        <br/>
        <Row>
          <Col sm={ 12 } md={ 11 } ld={ 11 } xl={ 11 }>
            <CustomBreadcrumb
              items={ [ {
                name: 'Projects',
                link: '/projects'
              },
              {
                name: `Project: ${ transcript.projectTitle }`,
                link: `/projects/${ projectId }`
              },
              {
                name: 'Transcripts',
              },
              {
                name: `${ transcript.transcriptTitle }`
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
            <Button variant="outline-secondary" onClick={ handleClick } size="lg" block>
              Save
            </Button>
            <br/>
          </Col>
        </Row>
        {updateAlert}
        {transcript.transcript !== null &&
          <ReactTranscriptEditor
            transcriptData={ transcript.transcript }// Transcript json
            // TODO: move url server side
            mediaUrl={ transcript.url }// string url to media file - audio or video
            isEditable={ true }// se to true if you want to be able to edit the text
            sttJsonType={ 'digitalpaperedit' }// the type of STT Json transcript supported.
            //  TODO: check if name has changed in latest version
            title={ transcript.transcriptTitle }
            // fileName={ this.state.projectTitle }// optional*
            ref={ transcriptEditorRef }
            handleSave = { handleSave }
          />}
      </Container>
    </>
  );
};

// class TranscriptEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       projectId: this.props.match.params.projectId,
//       transcriptId: this.props.match.params.transcriptId,
//       transcriptJson: null,
//       url: null,
//       projectTitle: '',
//       transcriptTitle: '',
//       savedNotification: null
//     };
//     this.transcriptEditorRef = React.createRef();
//   }

//   componentDidMount = () => {
//     ApiWrapper.getTranscript(this.state.projectId, this.state.transcriptId)
//       // TODO: add error handling
//       .then(json => {
//         this.setState({
//           projectTitle: json.projectTitle,
//           transcriptTitle: json.transcriptTitle,
//           transcriptJson: json.transcript,
//           url: json.url
//         });
//       });
//   }

//   saveToServer = () => {
//     // TODO: add Api call to save content of
//     alert('save to server');

//     // TODO: decide how to deal with transcript corrections
//     // exporting digitalpaperedit in @bbc/react-transcript-editor@latest doesn't give you
//     // corrected text with timecodes, only "original" uncorrected text even if transcript might
//     // have been corrected, because of outstandin PR in bbc/react-transcript-editor
//     // https://github.com/bbc/react-transcript-editor/pull/144
//     // which should be addressed after https://github.com/bbc/react-transcript-editor/pull/160
//     //
//     // Other option is to export as `txtspeakertimecodes` or `txt` and reallign server side using Aeneas
//     //
//     // TranscriptEditor - export options: txtspeakertimecodes - draftjs - txt - digitalpaperedit
//     const { data } = this.transcriptEditorRef.current.getEditorContent('digitalpaperedit');
//     data.title = this.state.transcriptTitle;
//     data.transcriptTitle = this.state.transcriptTitle;
//     const queryParamsOptions = false;
//     ApiWrapper.updateTranscript(this.state.projectId, this.state.transcriptId, queryParamsOptions, data).then((response) => {
//       console.log('ApiWrapper.updateTranscript', response );
//       if (response.ok) {
//       // show message or redirect
//         console.log('updated');
//         // this.setState({ redirect: true, newProjectId: response.projectId });
//         this.setState({
//           savedNotification: <CustomAlert
//             dismissable={ true }
//             variant={ 'success' }
//             heading={ 'Transcript saved' }
//             message={ <p>Transcript: <b>{this.state.transcriptTitle}</b> has been saved</p> }
//           />
//         });
//       }
//     }).catch((e) => {
//       console.error('error saving transcript:: ', e);
//       this.setState({
//         savedNotification: <CustomAlert
//           dismissable={ true }
//           variant={ 'danger' }
//           heading={ 'Error saving transcript' }
//           message={ <p>There was an error trying to save this transcript: <b>{this.state.transcriptTitle}</b></p> }
//         />
//       });
//     });
//   }

//   redirectToAnnotatePage = () => {
//     // this.state.projectId this.state.transcriptId
//     this.setState({
//       redirect: true
//     });
//   }

//   renderRedirect = () => {
//     if (this.state.redirect) {
//       return <Redirect to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.newTranscriptId }/annotate` } />;
//     }
//   }

//   render() {
//     return (
//       <>
//         {this.renderRedirect()}
//         <Container style={ { marginBottom: '5em' } } fluid>
//           <br/>
//           <Row>
//             <Col sm={ 12 } md={ 11 } ld={ 11 } xl={ 11 }>
//               <CustomBreadcrumb
//                 items={ [ {
//                   name: 'Projects',
//                   link: '/projects'
//                 },
//                 {
//                   name: `Project: ${ this.state.projectTitle }`,
//                   link: `/projects/${ this.state.projectId }`
//                 },
//                 {
//                   name: 'Transcripts',
//                 },
//                 {
//                   name: `${ this.state.transcriptTitle }`
//                 },
//                 {
//                   name: 'Correct'
//                 }
//                 ] }
//               />
//             </Col>
//             {/* <Col xs={ 12 } sm={ 2 } md={ 2 } ld={ 2 } xl={ 2 }>
//               <Button variant="outline-secondary" onClick={ this.redirectToAnnotatePage } size="lg" block>
//               Annotate
//               </Button>
//               <br/>
//             </Col> */}
//             <Col xs={ 12 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
//               <Button variant="outline-secondary" onClick={ this.saveToServer } size="lg" block>
//               Save
//               </Button>
//               <br/>
//             </Col>
//           </Row>
//           {this.state.savedNotification}
//           {this.state.transcriptJson !== null &&
//           <ReactTranscriptEditor
//             transcriptData={ this.state.transcriptJson }// Transcript json
//             // TODO: move url server side
//             mediaUrl={ this.state.url }// string url to media file - audio or video
//             isEditable={ true }// se to true if you want to be able to edit the text
//             sttJsonType={ 'digitalpaperedit' }// the type of STT Json transcript supported.
//             //  TODO: check if name has changed in latest version
//             title={ this.state.transcriptTitle }
//             // fileName={ this.state.projectTitle }// optional*
//             ref={ this.transcriptEditorRef }
//           />}
//         </Container>
//       </>
//     );
//   }
// }

TranscriptEditor.propTypes = {
  match: PropTypes.any
};

export default TranscriptEditor;
