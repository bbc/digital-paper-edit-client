import React, { Component } from 'react';
import { faCut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListPageTemplate from '../lib/ListPageTemplate/index.js';
import navbarLinks from '../lib/custom-navbar-links';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListPage from '../lib/ListPage';
import CustomNavbar from '../lib/CustomNavbar';
import NewItemFormModal from '../lib/NewItemFormModal';
import CustomFooter from '../lib/CustomFooter';
import ApiWrapper from '../../ApiWrapper/index.js';

class PaperEdits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      items: [],
      isNewItemModalShow: false,
      title: 'Test Programme title 9',
      description: 'DD',
      itemId: null
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  // TODO: refactor using API wrapper
  // componentDidMount = () => {
  // TODO: add user id in request?
  // TODO: add end point url in config
  // TODO: move fetch into a API class - to handle electron backend switch
  //   fetch('http://localhost:5000/api/projects/1/paperedits', { mode: 'cors' })
  //     .then(res => res.json())
  //     .then(json => {
  //       // add a display property for component cards search
  //       const tmpList = json.paperedits.map(item => {
  //         item.display = true;

  //         return item;
  //       });
  //       // projectTitle
  //       this.setState({ items: tmpList });
  //     });
  // };

  async componentDidMount () {
    // TODO: do we need to add user id in request?
    const result = await ApiWrapper.getAllPaperEdits(this.state.projectId);
    console.log('result:: ', result);
    if (result) {
      // add a display property for component cards search
      const tmpList = result.map(paperEdit => {
        paperEdit.display = true;

        return paperEdit;
      });
      console.log(tmpList);
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
      console.log(this.state.projectId, item.id, item);
      ApiWrapper.updatePaperEdit(this.state.projectId, item.id, item).then(response => {
        if (response.status === 'ok') {
          const paperedit = response.paperedit;
          // need to add display true attribute for search to the new project
          paperedit.display = true;
          // // Server returns project with UID generated server side
          const { items } = this.state;
          this.findItemById(items, item);
          const papereditIndex = this.state.items.findIndex(item => item.id === paperedit.id);
          items[papereditIndex] = paperedit;
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
    console.log('edit item', item);
  }

  // TODO:
  async handleDeleteItem(itemId) {
    const result = await ApiWrapper.deletePaperEdit(this.state.projectId, itemId);
    if (result.status === 'ok') {
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
        <CustomNavbar/>
        <Container style={ { marginBottom: '5em', marginTop: '1em' } }>

          <ListPage
            model={ 'Paper Edit' }
            items={ this.state.items }
            handleShowCreateNewItemForm={ this.handleShowCreateNewItemForm }
            deleteItem={ this.createNew }
            editItem={ this.createNew }
            handleEdit={ this.handleEditItem }
            handleDelete={ this.handleDeleteItem }
            showLinkPath={ this.showLinkPathToItem }
            handleUpdateList={ this.handleUpdateList }
          />
          <NewItemFormModal
            title={ this.state.title }
            description={ this.state.description }
            id={ this.state.itemId }
            modalTitle={ this.state.itemId ? 'Edit Paper Edit' : 'New Paper Edit' }
            show={ this.state.isNewItemModalShow }
            handleCloseModal={ this.handleCloseModal }
            handleSaveForm={ this.handleSaveItem }
          />
        </Container>
        <CustomFooter/>
      </>
    );
  }
}

export default PaperEdits;
