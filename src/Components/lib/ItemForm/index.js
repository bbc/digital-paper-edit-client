// https://react-bootstrap.netlify.com/components/forms/#forms-validation
// https://reactjs.org/docs/forms.html

import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: Tmp title text for debugging, remove for production
      // replace with ''
      title: this.props.title,
      description: this.props.description,
      validated: false,
      id: this.props.id
    };
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true });
    }

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      const tmpItem = {
        title: this.state.title,
        description: this.state.description,
        id: this.state.id
      };
      this.props.handleSaveForm(tmpItem);
    }

    //this.setState({ redirect: true, newProjectId: response.projectId });
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  render() {
    return (

      <Form
        noValidate
        validated={ this.state.validated }
        onSubmit={ e => this.handleSubmit(e) }
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter a project title"
            value={ this.state.title }
            onChange={ this.handleTitleChange }
          />
          <Form.Text className="text-muted">
              Chose a title
          </Form.Text>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Please chose a title
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description </Form.Label>
          <Form.Control
            // required
            // as="textarea" rows="3"
            type="text"
            placeholder="Enter a project description"
            value={ this.state.description }
            onChange={ this.handleDescriptionChange }
          />
          <Form.Text className="text-muted">
              Chose an optional description
          </Form.Text>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Please chose a description
          </Form.Control.Feedback>
        </Form.Group>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

export default ItemForm;
