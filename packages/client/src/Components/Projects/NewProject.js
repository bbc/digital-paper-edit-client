// https://react-bootstrap.netlify.com/components/forms/#forms-validation
// https://reactjs.org/docs/forms.html

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';

import Api from '../../Api/index.js';

import './index.module.css';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Test',
      description: '',
      validated: false,
      redirect: false
    };
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });

    const tmpProject = {
      title: this.state.title,
      description: this.state.description
    };

    Api.createProject(tmpProject).then((response) => {
      if (response.status === 'ok') {
        // show message or redirect
        this.setState({ redirect: true });
      }
    });
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/projects/1' />;
    }
  }

  render() {
    const { validated } = this.state;

    return (
      <Container>
        {this.renderRedirect()}
        {/* TODO: import navbar */}
        <CustomNavbar
          links={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              name: 'New Project',
              link: '/projects/new'
            }
          ] }
        />

        <br />
        <CustomBreadcrumb
          items={ [
            {
              name: 'Project',
              link: '/projects'
            },
            {
              name: 'New'
            }
          ] }
        />

        <Form
          noValidate
          validated={ validated }
          onSubmit={ e => this.handleSubmit(e) }
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter a projec title"
              value={ this.state.title }
              onChange={ this.handleTitleChange }
            />
            <Form.Text className="text-muted">
              Chose a title for your project
            </Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please chose a title for your project</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description </Form.Label>
            <Form.Control
              // required
              type="text"
              placeholder="Enter a project description"
              value={ this.state.description }
              onChange={ this.handleDescriptionChange }
            />
            <Form.Text className="text-muted">
              Chose an optional description for your project
            </Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please chose a description for your project</Form.Control.Feedback>
          </Form.Group>

          {/* on change save - send to server as post + link to projects list? */}
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>

        <CustomFooter />
      </Container>
    );
  }
}

export default NewProject;
