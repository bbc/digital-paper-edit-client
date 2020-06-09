import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApiWrapper from '../../ApiWrapper/index.js';
import CustomAlert from '../lib/CustomAlert/index.js';
import NoNeedToConvertNotice from '../lib/NoNeedToConvertNotice/index.js';
import './index.module.css';
import whichJsEnv from '../../Util/which-js-env';

import path from 'path';
// setOriginalFetch(window.fetch);
// window.fetch = progressBarFetch;

class BatchTranscriptForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      validated: false,
      redirect: false,
      newTranscriptId: null,
      uploading: false,
      uploadCompleted: false,
      mediaFileSelected: false,
      title: this.props.title,
      description: this.props.description,
      id: this.props.id,
      formData: null,
      adobeCepFilePath: null,
      savedNotification: null,
    };
    // console.log(process.env);
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  // This is used in Aobe CEP Panel integration only
  handleAdobeCepSetFilePath = () => {
    window.__adobe_cep__.evalScript(`$._PPP.get_current_project_panel_selection_absolute_path()`, response => {
      console.log('handleAdobeCepSetFilePath');
      if (response !== '') {
        console.log('handleAdobeCepSetFilePath', response);
        //  const newFilePath = response;
        //  fileName = path.basename(newFilePath);
        // TODO: add some visual quee that this worked (eg alert box at top? or file name/path somewhere)
        this.setState({
          title: path.basename(response),
          adobeCepFilePath: response,
        });
      } else {
        // TODO: review logic for edge case
        alert('select a clip');
      }
    });
  };
  // https://codeburst.io/react-image-upload-with-kittens-cc96430eaece
  handleFileUpload = e => {
    const files = Array.from(e.target.files);
    console.log('files', files);
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file`, file);
      formData.append(`type`, file.type);
      if (file.path) {
        formData.append(`path`, file.path);
      }
    });
    // const file = files[0];
    // more on formData https://thoughtbot.com/blog/ridiculously-simple-ajax-uploads-with-formdata

    // formData.append('file', file);
    // formData.append('type', file.type);
    // in electron file upload provides a path to the file
    // if (file.path) {
    //   formData.append('path', file.path);
    // }
    // console.log("formData.get('path')", formData.get('path'));
    this.setState({ mediaFileSelected: true, formData: formData });

    // if (this.state.title === '') {
    //   this.setState({ title: file.name });
    // }
  };

  sendRequest = () => {
    this.setState({ uploading: true });
    const formData = this.state.formData;
    const listOfFilesPath = formData.getAll('path');
    let data = {};
    if (whichJsEnv() === 'electron') {
      listOfFilesPath.forEach(filePath => {
        data = {
          title: path.basename(filePath),
          description: `${path.basename(filePath)}`,
          path: filePath,
        };

        // if client run inside of electron
        // is easier to pass another object with title, description
        // as well as the additional path to the file
        // rather then parsing a formData object in node etc..
        try {
          ApiWrapper.createTranscript(this.state.projectId, this.state.formData, data)
            .then(response => {
              console.log('ApiWrapper.createTranscript-response ', response);
              // show message or redirect
              this.setState({
                uploading: false,
                uploadCompleted: true,
                redirect: true,
                newTranscriptId: response.transcriptId,
              });
              this.props.handleSaveForm(response.transcript);
              // this.props.handleCloseModal();
            })
            .catch(e => {
              console.log('error:::: ', e);
              this.setState({
                uploading: false,
                redirect: false,
                savedNotification: (
                  <CustomAlert
                    dismissable={true}
                    variant={'danger'}
                    heading={'Error could not contact the server'}
                    message={<p>There was an error trying to create this transcript on the server</p>}
                  />
                ),
              });
            });
        } catch (e) {
          console.error('error submitting:::', e);
        }
      });
    }
    if (whichJsEnv() === 'browser') {
      const formData = this.state.formData;
      const listOfFiles = formData.getAll('file');
      const listOfFileTypes = formData.getAll('type');
      listOfFiles.forEach((individualFile, index) => {
        const individualFileFormData = new FormData();
        individualFileFormData.append('file', individualFile);
        individualFileFormData.append('type', listOfFileTypes[index]);
        individualFileFormData.append('title', individualFile.name);
        individualFileFormData.append('description', '');
        // individualFileFormData.append('type', file.type);
        const data = {
          title: individualFile.name,
          description: '',
          // path:
        };

        try {
          ApiWrapper.createTranscript(this.state.projectId, individualFileFormData, data)
            .then(response => {
              console.log('ApiWrapper.createTranscript-response ', response);
              // show message or redirect
              this.setState({
                uploading: false,
                uploadCompleted: true,
                redirect: true,
                newTranscriptId: response.transcriptId,
              });
              this.props.handleSaveForm(response.transcript);
              // this.props.handleCloseModal();
            })
            .catch(e => {
              console.log('error:::: ', e);
              this.setState({
                uploading: false,
                redirect: false,
                savedNotification: (
                  <CustomAlert
                    dismissable={true}
                    variant={'danger'}
                    heading={'Error could not contact the server'}
                    message={<p>There was an error trying to create this transcript on the server</p>}
                  />
                ),
              });
            });
        } catch (e) {
          console.error('error submitting:::', e);
        }
      });
    }
    if (whichJsEnv() === 'cep') {
      alert('not implemented in adobe CEP');
    }
  };

  handleSubmit(event) {
    const form = event.currentTarget;
    console.log('form.checkValidity()', form.checkValidity());
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true });
    }

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.sendRequest();
    }
  }

  render() {
    return (
      <>
        {this.state.savedNotification}

        {whichJsEnv() === 'electron' && <NoNeedToConvertNotice />}

        <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
          <Form.Group controlId="formTranscriptMediaFile">
            <Form.Label>Select Files </Form.Label>
            <Form.Control required type="file" label="Upload" accept="audio/*,video/*,.mxf" multiple="multiple" onChange={this.handleFileUpload} />
            <Form.Text className="text-muted">Select multiple audio or video file to transcribe.</Form.Text>
            <Form.Text className="text-muted">
              This allows you to batch transcribe multiple files, the transcript name will default to the clip name.
            </Form.Text>
            <Form.Text className="text-muted">You can change the default transcript name after you've clicked save.</Form.Text>
            <Form.Text className="text-muted">
              Use command <code>⌘</code> + click or shift <code>⇧</code> + click to select multiple files.
            </Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please chose a audio or video file to transcribe</Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </>
    );
  }
}

export default BatchTranscriptForm;
