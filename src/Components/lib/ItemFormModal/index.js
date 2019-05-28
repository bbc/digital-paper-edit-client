import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ItemForm from '../ItemForm';

class ItemFormModal extends React.Component {
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
          <ItemForm
            title={ this.props.title }
            description={ this.props.description }
            id={ this.props.id }
            handleSaveForm={ this.props.handleSaveForm }
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default ItemFormModal;
