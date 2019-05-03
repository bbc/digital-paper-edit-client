import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faSave,
  faFileAlt,
  faTasks,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';
import navbarLinks from '../lib/custom-navbar-links';
import CustomAlert from '../lib/CustomAlert/index.js';
import ApiWrapper from '../../ApiWrapper/index.js';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      title: '',
      description: '',
      formDisabled: true,
      validated: false
    };
  }

  componentDidMount = () => {
    const tmpProject = ApiWrapper.getProject(this.state.projectId).then(tmpProject => {

      this.setState({
        title: tmpProject.title,
        description: tmpProject.description
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

  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      console.log('form.checkValidity()', form.checkValidity());
      const tmpProject = {
        title: this.state.title,
        description: this.state.description,
        projectId: this.state.projectId
      };
      console.log(tmpProject);
      ApiWrapper.updateProject(this.state.projectId, tmpProject)
        .then(response => {
          if (response.status === 'ok') {
            // show message or redirect
            console.log('updated');
            // this.setState({ redirect: true, newProjectId: response.projectId });
            this.setState({
              formDisabled: true,
              savedNotification: (
                <CustomAlert
                  dismissable={ true }
                  variant={ 'success' }
                  heading={ 'Project saved' }
                  message={
                    <p>
                      Project: <b>{this.state.title}</b> has been saved
                    </p>
                  }
                />
              )
            });
          }
        })
        .catch(() => {
          this.setState({
            savedNotification: (
              <CustomAlert
                dismissable={ true }
                variant={ 'danger' }
                heading={ 'Error saving project' }
                message={
                  <p>
                    There was an error trying to save project:{' '}
                    <b>{this.state.title}</b>
                  </p>
                }
              />
            )
          });
        });
    }
    this.setState({ validated: true });
  }

  render() {
    return (
      <Container style={ { marginBottom: '5em' } }>
        <CustomNavbar links={ navbarLinks(this.state.projectId) } />
        <br />
        <CustomBreadcrumb
          items={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              // TODO: project title
              name: `${ this.state.title ? this.state.title : '' }`
            }
          ] }
        />
        {/* <br/> */}
        <Row>
          <Col xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts` }>
              <Button variant="outline-primary" size="lg" block>
                <FontAwesomeIcon icon={ faFileAlt } /> Transcripts
              </Button>
            </LinkContainer>
            <br />
          </Col>
          <Col xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/paperedits` }>
              <Button variant="outline-primary" size="lg" block>
                <FontAwesomeIcon icon={ faTasks } /> Paper-Edits
              </Button>
            </LinkContainer>
            <br />
          </Col>
          <Col xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/users` }>
              <Button variant="outline-primary" size="lg" block>
                <FontAwesomeIcon icon={ faUsers } /> Users
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={ 12 } sm={ 12 } md={ 12 } ld={ 12 } xl={ 12 }>
            <Button
              onClick={ () => {
                this.setState(state => {
                  return {
                    formDisabled: !state.formDisabled,
                    savedNotification: null
                  };
                });
              } }
              variant={
                this.state.formDisabled ? 'outline-secondary' : 'secondary'
              }
              type="submit"
              block
              size="sm"
            >
              Edit Project <FontAwesomeIcon icon={ faPen } />
            </Button>
          </Col>
        </Row>
        <br />
        {this.state.savedNotification}
        <Row>
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
                    // placeholder="A Project Title"
                    // style={ { border: 'none' } }
                    onChange={ this.handleTitleChange }
                    value={ this.state.title }
                  />
                </Col>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please chose a title for your project
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={ Row } controlId="formHorizontalDescription">
                <Form.Label column sm={ 2 }>
                  Description
                </Form.Label>
                <Col sm={ 10 }>
                  <Form.Control
                    disabled={ this.state.formDisabled }
                    type="text"
                    as="textarea"
                    rows="3"
                    // placeholder="A Project Description"
                    // style={ { border: 'none' } }
                    onChange={ this.handleDescriptionChange }
                    value={ this.state.description }
                  />
                </Col>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please chose a description for your project
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                disabled={ this.state.formDisabled }
                // variant="primary"
                variant={
                  this.state.formDisabled ? 'outline-primary' : 'primary'
                }
                type="submit"
              >
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

export default Project;
