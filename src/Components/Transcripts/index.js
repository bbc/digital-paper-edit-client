import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListPageTranscript from '../lib/ListPageTranscript';
import FormModal from '@bbc/digital-paper-edit-react-components/FormModal';
import ApiWrapper from '../../ApiWrapper';
import PropTypes from 'prop-types';

const intervalInMs = 30000;

// refactor with projects as they have fairly similar logic.
const Transcripts = (props) => {
  const [ items, setItems ] = useState();
  const [ isNewItemModalShow, setIsNewItemModalShow ] = useState(false);
  const [ isEditItemModalShow, setIsEditItemModalShow ] = useState(false);
  const [ interval, setInterval ] = useState();

  const [ formData, setFormData ] = useState({
    title: '',
    description: '',
    id: null
  });

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      id: null
    });
  };

  const isTranscriptionInProgress = (transcripts) => {
    if (transcripts.length !== 0) {
      const result = transcripts.find((transcript) => {
        return transcript.status === 'in-progress';
      });

      return result ? true : false;
    }

    return false;
  };

  useEffect(() => {

    const getTranscripts = async () => {
      const result = await ApiWrapper.getTranscripts(props.projectId);
      // TODO: add error handling
      if (result) {
        const tmpList = result.transcripts.map((item) => {
          item.display = true;

          return item;
        });
        setItems(tmpList);
        console.log('getTranscripts-tmpList');
      }
    };
    if (!items) {
      getTranscripts();
    }
    // For simplicity rather then handling all the edge cases (on start, save, delete,etc..), the interval runs periodicalicly,
    // and only if there are items in progress in the list, it checks the backed for updates
    if (!interval) {
      setInterval(() => {
        console.log('Running interval to check for transcripts');
        if (isTranscriptionInProgress(items)) {
          console.log('interval: checking transcirpt update');
          getTranscripts();
        }
      }, intervalInMs);
    }

    return () => {
      clearInterval(interval);
    };
  }, [ interval, items, props.projectId ]);

  // side POST using wrapperAPI done
  // inside --> newTranscriptFormModal --> TranscriptForm
  // component - could be refactored
  // but needs to take into account file upload from form in TranscriptForm
  const handleSaveItem = (item) => {
    console.log('handleSaveItem', item);

    const newItem = item;
    newItem.display = true;

    const newItems = items;
    newItems.push(newItem);
    setItems(newItems);
    resetFormData();
    setIsNewItemModalShow(false);
  };

  const handleSaveEditedItem = async (transcript) => {
    const newEditedItem = transcript;
    console.log('newEditedITem', newEditedItem);
    // display attribute for search
    newEditedItem.display = true;
    // Update existing
    const index = items.findIndex(item => item.id === transcript.id);
    const newItemsList = items;
    // preserve status info
    transcript.status = newItemsList[index].status;
    newItemsList[index] = transcript;
    const queryParamsOptions = false;
    const transcriptId = newEditedItem.id;
    // TODO: add error handling, eg message, wasn't able to update etc..
    const response = await ApiWrapper.updateTranscript(props.projectId, transcriptId, queryParamsOptions, newEditedItem);
    if (response.ok) {
      console.log('ApiWrapper.updateTranscript', response, newItemsList);
      setItems(newItemsList);
      setIsEditItemModalShow(false);
    }

  };

  const findItemById = (list, id) => {
    const result = list.filter((p) => {
      return p.id === id;
    });

    return result[0];
  };

  // opens the modal for editing item
  const handleEditItem = (itemId) => {
    const item = findItemById(items, itemId);
    setFormData({
      title: item.title,
      id: item.id,
      description: item.description,
    });
    setIsEditItemModalShow(true);
  };

  const handleDelete = async (transcriptId ) => {
    console.log('handle delete');
    // TODO: API + server side request for delete
    // on successful then update state
    const result = await ApiWrapper.deleteTranscript(props.projectId, transcriptId);
    // TODO: some error handling, error message saying something went wrong
    const findId = (item) => item.id !== transcriptId;
    if (result.ok) {
      const tmpNewList = items.filter(item => findId(item));
      setItems(tmpNewList);
    }
  };

  const showLinkPathToItem = (id) => {
    return `/projects/${ props.projectId }/transcripts/${ id }/correct`;
  };

  const handleShowCreateNewItemForm = () => {
    setIsNewItemModalShow(true);
  };

  const handleCloseModal = () => {
    setFormData();
    resetFormData();
    setIsNewItemModalShow(false);
  };

  const handleCloseModalEdit = () => {
    resetFormData();
    setIsEditItemModalShow(false);
  };

  const handleUpdateList = (list) => {
    setItems(list);
    setIsNewItemModalShow(false);
  };

  return (
    <>
      <Container style={ { marginBottom: '5em', marginTop: '1em' } }>

        <ListPageTranscript
          model={ 'Transcript' }
          items={ items }
          handleShowCreateNewItemForm={ handleShowCreateNewItemForm }
          handleEdit={ handleEditItem }
          handleDelete={ handleDelete }
          showLinkPath={ showLinkPathToItem }
          handleUpdateList={ handleUpdateList }
          //
          handleCloseModal={ handleCloseModal }
          icon={ <FontAwesomeIcon icon={ faFileAlt } /> }
        />
        <FormModal
          projectId={ props.projectId }
          title={ formData.title }
          description={ formData.description }
          id={ formData.id }
          modalTitle={ 'New Transcript' }
          show={ isNewItemModalShow }
          handleCloseModal={ handleCloseModal }
          handleSaveForm={ handleSaveItem }
        />
        <FormModal
          title={ formData.title }
          description={ formData.description }
          id={ formData.id }
          modalTitle={ 'Edit Transcript' }
          show={ isEditItemModalShow }
          handleCloseModal={ handleCloseModalEdit }
          handleSaveForm={ handleSaveEditedItem }
        />
      </Container>
    </>
  );
};

Transcripts.propTypes = {
  projectId: PropTypes.any
};

export default Transcripts;
