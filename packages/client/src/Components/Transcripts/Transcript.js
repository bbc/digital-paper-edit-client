import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,
  faSave } from '@fortawesome/free-solid-svg-icons';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';
import CustomAlert from '../lib/CustomAlert/index.js';
import ApiRouter from '../../ApiRouter/index.js';
import navbarLinks from '../lib/custom-navbar-links';

const queryParamsOptions = {
  transcriptJson: false
};

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      transcriptId: this.props.match.params.transcriptId,
      projectTitle: '',
      transcriptTitle: '',
      description: '',
      formDisabled: true,
      validated: false,
      savedNotification: null
    };

  }

  componentDidMount = () => {
    // Get Transcript Title
    // Get Project Title
    // TODO: get Transcript Title

    // get transcript resource but not transcript json to
    // reduce the payload for this page

    ApiRouter.getTranscript(this.state.projectId, this.state.transcriptId, queryParamsOptions).then((transcript) => {
      console.log(transcript);
      this.setState({
        projectTitle: transcript.projectTitle,
        transcriptTitle: transcript.transcriptTitle,
        description:  transcript.description
      });
    }).catch((e) => {
      console.log('error:::: ', e);
      this.setState({
        savedNotification: <CustomAlert
          dismissable={ true }
          variant={ 'danger' }
          heading={ 'Error could not contact the server' }
          message={ <p>There was an error trying to get this transcript from the server</p> }
        />
      });
    });
  }

  handleTitleChange = (event) => {
    this.setState({ transcriptTitle: event.target.value });
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      const tmpTranscript = {
        transcriptTitle: this.state.transcriptTitle,
        description: this.state.description,
        projectId: this.state.projectId
      };
      console.log(tmpTranscript);
      ApiRouter.updateTranscript(this.state.projectId, this.state.transcriptId, queryParamsOptions, tmpTranscript).then((response) => {
        if (response.status === 'ok') {
        // show message or redirect
          console.log('updated');
          // this.setState({ redirect: true, newProjectId: response.projectId });
          this.setState({
            formDisabled: true,
            savedNotification: <CustomAlert
              dismissable={ true }
              variant={ 'success' }
              heading={ 'Transcript saved' }
              message={ <p>Transcript: <b>{this.state.transcriptTitle}</b> has been saved</p> }
            />
          });
        }
      }).catch(() => {
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
    this.setState({ validated: true });
  }

  render() {
    return (
      <Container style={ { marginBottom: '5em' } }>
        <CustomNavbar
          links={ navbarLinks(this.state.projectId) }
        />
        <br/>

        <CustomBreadcrumb
          items={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              // TODO: need to get project name
              name: `Project: ${ this.state.projectTitle }`,
              link: `/projects/${ this.state.projectId }`
            },
            {
              name: 'Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts`
            },
            {
              name: `${ this.state.transcriptTitle ? this.state.transcriptTitle : '' }`
            }
          ] }
        />

        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.transcriptId }/correct` }>
              <Button variant="outline-primary" size="lg" block>Correct Transcript</Button>
            </LinkContainer>
            <br/>
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.transcriptId }/annotate` }>
              <Button variant="outline-primary" size="lg" block>Annotate Transcript</Button>
            </LinkContainer>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col xs={ 12 } sm={ 12 } md={ 12 } ld={ 12 } xl={ 12 }>
            <Button
              onClick={ () => { this.setState((state) => {return { formDisabled: !state.formDisabled, savedNotification: null };}); } }
              variant={ this.state.formDisabled ? 'outline-secondary' : 'secondary' }
              type="submit"
              block
              size="sm"
            >
                Edit Transcript  <FontAwesomeIcon icon={ faPen } />
            </Button>
          </Col>
        </Row>
        <br/>
        {this.state.savedNotification}

        <Row >
          <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
            <Form
              noValidate
              validated={ this.state.validated }
              onSubmit={ e => this.handleSubmit(e) }
            >
              <Form.Group as={ Row } controlId="formHorizontalTitle">
                <Form.Label column sm={ 2 }>
                  Title
                </Form.Label>
                <Col sm={ 10 }>
                  <Form.Control
                    required
                    disabled={ this.state.formDisabled }
                    type="text"
                    // placeholder="A  Transcript Title"
                    // style={ { border: 'none' } }
                    onChange={ this.handleTitleChange }
                    value={ this.state.transcriptTitle }/>
                </Col>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please chose a title for your project</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={ Row } controlId="formHorizontalDescription">
                <Form.Label column sm={ 2 }>
                  Description
                </Form.Label>
                <Col sm={ 10 }>
                  <Form.Control
                    disabled={ this.state.formDisabled }
                    type="text"
                    as="textarea" rows="3"
                    // placeholder="A Transcript Description"
                    // style={ { border: 'none' } }
                    onChange={ this.handleDescriptionChange }
                    value={ this.state.description }/>
                </Col>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please chose a description for your project</Form.Control.Feedback>
              </Form.Group>
              <Button
                disabled={ this.state.formDisabled }
                // variant="primary"
                variant={ this.state.formDisabled ? 'outline-primary' : 'primary' }
                type="submit">
                Save <FontAwesomeIcon icon={ faSave } />
              </Button>
            </Form>
          </Col>
        </Row>

        <CustomFooter />
      </Container>
    );
  }
}

export default Transcript;
