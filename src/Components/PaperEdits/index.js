import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListPage from '../lib/ListPage';
import ItemFormModal from '../lib/ItemFormModal';
import ApiWrapper from '../../ApiWrapper/index.js';

class PaperEdits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      items: [],
      isNewItemModalShow: false,
      title: '',
      description: '',
      itemId: null
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  async componentDidMount () {
    // TODO: do we need to add user id in request?
    const result = await ApiWrapper.getAllPaperEdits(this.state.projectId);
    if (result) {
      // add a display property for component cards search
      const tmpList = result.map(paperEdit => {
        paperEdit.display = true;

        return paperEdit;
      });
      this.setState({ items: tmpList });
    }
    // TODO: some error handling
  };

  // TODO: handle save / update through API wrapper
  // // The form works both for new/create and edit/update
  handleSaveItem = (item) => {
    if (!item.id) {
      ApiWrapper.createPaperEdit(this.state.projectId, item).then(response => {
        if (response.status === 'ok') {
          // Server returns project with UID generated server side
          const items = [ ...this.state.items ];
          // need to add display true attribute for search to the new project
          const newPaperEdit = response.paperedit;
          newPaperEdit.display = true;
          items.push(response.paperedit);
          this.setState({
            isNewItemModalShow: false,
            items: items,
            // reset item form
            title: '',
            itemId: null,
            description: ''
          });
        }
      });
    }
    else {
      ApiWrapper.updatePaperEdit(this.state.projectId, item.id, item).then(response => {
        if (response.status === 'ok') {
          const paperedit = response.paperedit;
          // need to add display true attribute for search to the new project
          paperedit.display = true;
          // // Server returns project with UID generated server side
          const { items } = this.state;
          const newItemsList = [ ...items ];
          this.findItemById(items, item);
          const papereditIndex = items.findIndex(item => item.id === paperedit.id);
          newItemsList[papereditIndex] = paperedit;
          this.setState({
            isNewItemModalShow: false,
            items: newItemsList,
            // reset item form
            title: '',
            itemId: null,
            description: ''
          });
        }
      });
    }
  }

  findItemById = (list, id) => {
    const result = list.filter((p) => {
      return p.id === id;
    });

    return result[0];
  }

  handleEditItem = (itemId) => {
    const item = this.findItemById(this.state.items, itemId);
    this.setState({
      title: item.title,
      itemId: item.id,
      description: item.description,
      isNewItemModalShow: true
    });
  }

  // TODO:
  async handleDeleteItem(itemId) {
    const result = await ApiWrapper.deletePaperEdit(this.state.projectId, itemId);
    if (result.ok) {
      const newItemsList = this.state.items.filter((p) => {
        return p.id !== itemId;
      });
      this.setState({ items: newItemsList });
    } else {
      // TODO: some error handling, error message saying something went wrong
    }
  }

  showLinkPathToItem = (id) => {
    return `/projects/${ this.state.projectId }/paperedits/${ id }`;
  }

  handleUpdateList = (list) => {
    this.setState({ items: list });
  }

  handleShowCreateNewItemForm = () => {
    // return '/projects/new';
    this.setState({ isNewItemModalShow: true });
  };

  handleCloseModal = () => {
    this.setState({
      title:'',
      itemId: null,
      description: '',
      isNewItemModalShow: false
    });
  }

  render() {
    return (
      <>
        <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
          <ListPage
            model={ 'Paper Edit' }
            items={ this.state.items }
            icon={ <FontAwesomeIcon icon={ faColumns } color="#007bff"/> }
            handleShowCreateNewItemForm={ this.handleShowCreateNewItemForm }
            // deleteItem={ this.createNew }
            // editItem={ this.createNew }
            handleEdit={ this.handleEditItem }
            handleDelete={ this.handleDeleteItem }
            showLinkPath={ this.showLinkPathToItem }
            handleUpdateList={ this.handleUpdateList }
          />
          <ItemFormModal
            title={ this.state.title }
            description={ this.state.description }
            id={ this.state.itemId }
            modalTitle={ this.state.itemId ? 'Edit Paper Edit' : 'New Paper Edit' }
            show={ this.state.isNewItemModalShow }
            handleCloseModal={ this.handleCloseModal }
            handleSaveForm={ this.handleSaveItem }
          />
        </Container>
      </>
    );
  }
}

export default PaperEdits;
