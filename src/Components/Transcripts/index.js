import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListPageTranscript from '../lib/ListPageTranscript';
import NewTranscriptFormModal from './NewTranscriptFormModal';
import ItemFormModal from '../lib/ItemFormModal';
import ApiWrapper from '../../ApiWrapper';

class Transcripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      items: [],
      isNewItemModalShow: false,
      title:'',
      description: '',
      itemId: null,
      projectTitle: '',
      isServerError: false,
      isEditItemModalShow: false
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {

    const result = await ApiWrapper.getTranscripts(this.state.projectId);
    // TODO: add error handling
    if (result) {
      const tmpList = result.transcripts.map((item) => {
        item.display = true;

        return item;
      });
      this.setState({
        projectTitle: result.projectTitle,
        items: tmpList
      });
    }
  }

  // side POST using wrapperAPI done
  // inside --> newTranscriptFormModal --> TranscriptForm
  // component - could be refactored
  // but needs to take into account file upload from form in TranscriptForm
  handleSaveItem = (item) => {
    console.log('handleSaveItem', item);
    const newItem = item;
    newItem.display = true;
    const { items } = this.state;
    const newitems = [ ...items ];
    newitems.push(newItem);
    this.setState({
      items: newitems,
      title:'',
      itemId: null,
      description: '',
      isNewItemModalShow: false
    }, (props, state) => {
      console.log('setState', props, state);
    });
  }

  handleSaveEditedItem = (transcript) => {
    const newEditedItem = transcript;
    console.log('newEditedITem', newEditedItem);
    // display attribute for search
    newEditedItem.display = true;
    // Update existing
    const { items } = this.state;
    const itemIdex = items.findIndex(item => item.id === transcript.id);
    const newItemsList = [ ...items ];
    // preserve status info
    transcript.status = newItemsList[itemIdex].status;
    newItemsList[itemIdex] = transcript;
    const queryParamsOptions = false;
    const transcriptId = newEditedItem.id;
    // TODO: add error handling, eg message, wasn't able to update etc..
    ApiWrapper.updateTranscript(this.state.projectId, transcriptId, queryParamsOptions, newEditedItem)
      .then((response) => {
        if (response.ok) {
          console.log('ApiWrapper.updateTranscript', response, newItemsList);
          this.setState({
            items: newItemsList,
            isEditItemModalShow: false
          });
        }
      });

  }

  findItemById = (list, id) => {
    const result = list.filter((p) => {
      return p.id === id;
    });

    return result[0];
  }

  // opens the modal for editing item
  handleEditItem = (itemId) => {
    const item = this.findItemById(this.state.items, itemId);
    this.setState({
      title: item.title,
      itemId: item.id,
      description: item.description,
      isEditItemModalShow: true
    });
  }

  async handleDelete (transcriptId ) {
    // TODO: API + server side request for delete
    // on successful then update state
    const result = await ApiWrapper.deleteTranscript(this.state.projectId, transcriptId);
    // TODO: some error handling, error message saying something went wrong
    const findId = (item) => item.id !== transcriptId;
    if (result.ok) {
      const tmpNewList = this.state.items.filter(item => findId(item));
      this.setState({
        items: tmpNewList
      });
    }
  }

  showLinkPathToItem = (id) => {
    return `/projects/${ this.state.projectId }/transcripts/${ id }/correct`;
  }

  handleUpdateList = (list) => {
    this.setState({ items: list });
  }

  handleShowCreateNewItemForm = () => {
    this.setState({ isNewItemModalShow: true });
  }

  handleCloseModal = () => {
    this.setState({
      title:'',
      itemId: null,
      description: '',
      isNewItemModalShow: false
    });
  }

  handleCloseModalEdit = () => {
    this.setState({
      title:'',
      itemId: null,
      description: '',
      isEditItemModalShow: false
    });
  }

  handleUpdateList = (list) => {
    this.setState({ items: list, isNewItemModalShow: false });
  }

  render() {

    return (
      <>
        <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
          <ListPageTranscript
            model={ 'Transcript' }
            items={ this.state.items }
            handleShowCreateNewItemForm={ this.handleShowCreateNewItemForm }
            handleEdit={ this.handleEditItem }
            handleDelete={ this.handleDelete }
            showLinkPath={ this.showLinkPathToItem }
            handleUpdateList={ this.handleUpdateList }
            //
            handleCloseModal={ this.handleCloseModal }
            icon={ <FontAwesomeIcon icon={ faFileAlt } /> }
          />
          <NewTranscriptFormModal
            projectId={ this.state.projectId }
            title={ this.state.title }
            description={ this.state.description }
            id={ this.state.itemId }
            modalTitle={ 'New Transcript' }
            show={ this.state.isNewItemModalShow }
            handleCloseModal={ this.handleCloseModal }
            handleSaveForm={ this.handleSaveItem }
          />
          <ItemFormModal
            title={ this.state.title }
            description={ this.state.description }
            id={ this.state.itemId }
            modalTitle={ 'Edit Transcript' }
            show={ this.state.isEditItemModalShow }
            handleCloseModal={ this.handleCloseModalEdit }
            handleSaveForm={ this.handleSaveEditedItem }
          />
        </Container>
      </>
    );
  }
}

export default Transcripts;
