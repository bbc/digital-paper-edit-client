import React from 'react';
import Modal from 'react-bootstrap/Modal';
import TranscriptForm from './TranscriptForm';

class NewTranscriptFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'title'
    };
  }

  handleClose = () => {
    this.props.handleCloseModal();
  }

  render() {
    return (
      <Modal show={ this.props.show } onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TranscriptForm
            projectId={ this.props.projectId }
            title={ this.props.title }
            description={ this.props.description }
            id={ this.props.id }
            handleSaveForm={ this.props.handleSaveForm }
            handleCloseModal={ this.props.handleCloseModal }
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewTranscriptFormModal;
