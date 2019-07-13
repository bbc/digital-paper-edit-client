import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApiWrapper from '../../ApiWrapper/index.js';
import CustomAlert from '../lib/CustomAlert/index.js';
import './index.module.css';

// setOriginalFetch(window.fetch);
// window.fetch = progressBarFetch;

class TranscriptForm extends Component {
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
      savedNotification: null
    };
    // console.log(process.env);
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  // https://codeburst.io/react-image-upload-with-kittens-cc96430eaece
  handleFileUpload = e => {
    const files = Array.from(e.target.files);
    const file = files[0];
    // more on formData https://thoughtbot.com/blog/ridiculously-simple-ajax-uploads-with-formdata
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', file.type);
    this.setState({ mediaFileSelected: true, formData: formData });

    if (this.state.title === '') {
      this.setState({ title: file.name });
    }
  };

  sendRequest = () => {
    this.setState({ uploading: true });

    const formData = this.state.formData;

    formData.append('title', this.state.title);
    formData.append('description', this.state.description);

    // TODO: do you need a try catch?
    try {
      ApiWrapper.createTranscript(this.state.projectId, this.state.formData)
        .then(response => {
          console.log('ApiWrapper.createTranscript-response ', response);
          // show message or redirect
          this.setState({
            uploading: false,
            uploadCompleted: true,
            redirect: true,
            newTranscriptId: response.transcriptId
          });
          this.props.handleSaveForm(response.transcript);
          // this.props.handleCloseModal();

        }).catch((e) => {
          console.log('error:::: ', e);
          this.setState({
            uploading: false,
            redirect: false,
            savedNotification: <CustomAlert
              dismissable={ true }
              variant={ 'danger' }
              heading={ 'Error could not contact the server' }
              message={ <p>There was an error trying to create this transcript on the server</p> }
            />
          });
        });

    } catch (e) {
      console.error('error submitting:::', e);
    }
  };

  handleSubmit(event) {
    const form = event.currentTarget;
    console.log('(form.checkValidity()', form.checkValidity());
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

        <Form
          noValidate
          validated={ this.state.validated }
          onSubmit={ e => this.handleSubmit(e) }
        >
          <Form.Group controlId="formTranscriptTitle">
            <Form.Label>Title </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter a transcript title"
              value={ this.state.title }
              onChange={ this.handleTitleChange }
            />
            <Form.Text className="text-muted">
                Chose a title for your Transcript
            </Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please chose a title for your transcript
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formTranscriptDescription">
            <Form.Label>Description </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Transcript description"
              value={ this.state.description }
              onChange={ this.handleDescriptionChange }
            />
            <Form.Text className="text-muted">
                Chose an optional description for your Transcript
            </Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please chose a description for your transcript
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formTranscriptMediaFile">
            <Form.Control
              required
              type="file"
              label="Upload"
              accept="audio/*,video/*"
              onChange={ this.handleFileUpload }
            />
            <Form.Text className="text-muted">
        Select an audio or video file to upload
            </Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
        Please chose a audio or video file to upload
            </Form.Control.Feedback>
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

export default TranscriptForm;
