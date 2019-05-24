import React from 'react';
import Modal from 'react-bootstrap/Modal';
import NewItemForm from '../NewItemForm';

class NewItemFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'title'
    };
  }

  handleClose = () => {
    this.props.handleCloseModal();
  }

  handleSaveForm = (tmpProject) => {
    this.props.handleSaveForm(tmpProject);
  }

  render() {
    return (
      <Modal show={ this.props.show } onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewItemForm
            title={ this.props.title }
            description={ this.props.description }
            id={ this.props.id }
            handleSaveForm={ this.handleSaveForm }
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewItemFormModal;
