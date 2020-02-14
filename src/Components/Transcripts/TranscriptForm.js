import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApiWrapper from '../../ApiWrapper/index.js';
import CustomAlert from '../lib/CustomAlert/index.js';
import './index.module.css';
import whichJsEnv from '../../Util/which-js-env';
import path from 'path'; 
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
      adobeCepFilePath: null,
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

  // This is used in Aobe CEP Panel integration only 
  handleAdobeCepSetFilePath = ()=>{
    window.__adobe_cep__.evalScript(`$._PPP.get_current_project_panel_selection_absolute_path()`,  (response)=>{
      console.log('handleAdobeCepSetFilePath');
      if(response !== ""){
        console.log('handleAdobeCepSetFilePath', response);
      //  const newFilePath = response;
      //  fileName = path.basename(newFilePath);
      // TODO: add some visual quee that this worked (eg alert box at top? or file name/path somewhere)
       this.setState({
         title: path.basename(response),
         adobeCepFilePath: response
       })
     }
     else{
       // TODO: review logic for edge case
       alert('select a clip')
     }
   })
  }
  // https://codeburst.io/react-image-upload-with-kittens-cc96430eaece
  handleFileUpload = e => {
    const files = Array.from(e.target.files);
    const file = files[0];
    // more on formData https://thoughtbot.com/blog/ridiculously-simple-ajax-uploads-with-formdata
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', file.type);
    // in electron file upload provides a path to the file
    if (file.path) {
      formData.append('path', file.path);
    }
    // console.log("formData.get('path')", formData.get('path'));
    this.setState({ mediaFileSelected: true, formData: formData });

    if (this.state.title === '') {
      this.setState({ title: file.name });
    }
  };

  sendRequest = () => {
    this.setState({ uploading: true });

    const formData = this.state.formData;
    if(whichJsEnv() !== 'cep'){
      formData.append('title', this.state.title);
      formData.append('description', this.state.description);
      console.log("formData.get('path')", formData.get('path'));
    }
    let data = {};
    if (whichJsEnv() === 'electron') {
      // if client run inside of electron
      // is easier to pass another object with title, description
      // as well as the additional path to the file
      // rather then parsing a formData object in node etc..
      data = {
        title: formData.get('title'),
        description: formData.get('description'),
        path: formData.get('path')
      };
    }

    if (whichJsEnv() === 'cep') {
      // if client run inside of Adobe CEP
      // is easier to pass another object with title, description
      // as well as the additional path to the file
      // rather then parsing a formData object in node etc..
      //   window.__adobe_cep__.evalScript(`$._PPP.get_current_project_panel_selection_absolute_path()`,  (response)=>{
      //     if(response !== ""){
      //     //  const newFilePath = response;
      //     //  fileName = path.basename(newFilePath);
      //      data.path = response;
      //    }
      //    else{
      //      // TODO: review logic for edge case
      //      alert('select a clip')
      //    }
      //  })

      data = {
        title: this.state.title,
        description: this.state.description,
        path: this.state.adobeCepFilePath
      };
     
      // data.title =this.state.title;
      // data.description = this.state.description;
      // data.path = this.state.adobeCepFilePath;
        // path: formData.get('path')
      // };
    }
    // TODO: do you need a try catch?
    try {
      ApiWrapper.createTranscript(this.state.projectId, this.state.formData, data)
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
          { (whichJsEnv() !== 'cep')?(
          <Form.Group controlId="formTranscriptMediaFile">
            <Form.Control
              required
              type="file"
              label="Upload"
              accept="audio/*,video/*,.mxf"
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
          ):null}
          
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
        <Button  variant="primary" onClick={this.handleAdobeCepSetFilePath}>Pick a file</Button>
      </>
    );
  }
}

export default TranscriptForm;
