import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { progressBarFetch, setOriginalFetch, ProgressBar } from 'react-fetch-progressbar';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';
import Api from '../../Api/index.js';
import navbarLinks from '../lib/custom-navbar-links';
import './index.module.css';

// setOriginalFetch(window.fetch);
// window.fetch = progressBarFetch;

class NewTranscript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      validated: false,
      redirect: false,
      newTranscriptId: null,
      uploading: false,
      uploadCompleted: false,
      mediaFileSelected: false,
      title: '',
      description: '',
      formData: null
    };
    // console.log(process.env);
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  // https://codeburst.io/react-image-upload-with-kittens-cc96430eaece
  handleFileUpload = (e) => {
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
  }

  sendRequest = () => {
    this.setState({ uploading: true });

    const formData = this.state.formData;

    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    // TODO: probably restrict to just one file
    // files.forEach((file, i) => {
    //   formData.append(i, file);
    // });
    // formData.append(0, file);

    // formData.append('title', this.state.title);
    // formData.append('description', this.state.description);

    // Move to API.js
    fetch(`http://localhost:5000/api/projects/${ this.state.projectId }/transcripts`, {
      method: 'POST',
      body: this.state.formData
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          uploading: false,
          uploadCompleted: true,
          redirect: true,
          newTranscriptId: response.transcriptId
        });
      })
      .catch((e) => {console.error('error submitting:::', e);});
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    console.log('(form.checkValidity()', form.checkValidity());
    if (!form.checkValidity()) {
      this.setState({ validated: true });
    }

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.sendRequest();
    }
  }

  renderRedirect = () => {
    if (this.state.redirect
      && this.state.newTranscriptId
      && this.state.uploadCompleted) {
      // Transcript most likely to still being in progress when creating a new one, because of time it takes to transcribe STT
      // return <Redirect to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.newTranscriptId }` } />;
      return <Redirect to={ `/projects/${ this.state.projectId }/transcripts` } />;
    }
  }

  render() {
    return (
      <>
        {/* <Container style={ { marginBottom: '5em' } } fluid>
          <ProgressBar style={ {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '9000',
            backgroundColor: '#f0ad4e',
            height: '10px',
          } } />

        </Container> */}

        <Container>
          {this.renderRedirect()}
          {/* TODO: import navbar */}
          <CustomNavbar
            links={ navbarLinks(this.state.projectId) }
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
                name: 'Project:',
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
              <Form.Control.Feedback type="invalid">Please chose a title for your transcript</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">Please chose a description for your transcript</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">Please chose a audio or video file to upload</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
            Save
            </Button>
          </Form>
          <CustomFooter />
        </Container>
      </>
    );
  }
}

export default NewTranscript;
