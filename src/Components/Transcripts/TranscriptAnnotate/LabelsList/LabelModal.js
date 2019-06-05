import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LabelForm from './LabelForm.js';

class LabelModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      color: this.props.color,
      label: this.props.label,
      description:  this.props.description,
      labelId: this.props.labelId
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
      // color: randomColor(),
      // label: '',
      // description: ''
    });
    // Clear all input fields in form?
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Button variant="link" size="sm" onClick={ this.handleShow } block>
          {this.props.openBtn}
        </Button>
        <Modal show={ this.state.show } onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon icon={ faTag } />  Label </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LabelForm
              onLabelSaved={ this.props.onLabelSaved }
              label={ this.props.label }
              description={ this.props.description }
              color={ this.props.color }
              labelId={ this.props.labelId }
              handleClose={ this.handleClose }
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default LabelModal;