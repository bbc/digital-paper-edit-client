import React, { useEffect, useState } from 'react';
import ItemsContainer from '../../lib/ItemsContainer';
import ApiWrapper from '../../../ApiWrapper';
import PropTypes from 'prop-types';

import { useStateValue } from '../../../State';

const intervalInMs = 30000;

const isTranscriptionInProgress = (transcripts) => {
  if (transcripts.length !== 0) {
    const result = transcripts.find((transcript) => {
      return transcript.status === 'in-progress';
    });

    return result ? true : false;
  }

  return false;
};

// refactor with projects as they have fairly similar logic.
const Transcripts = (props) => {
  const [ { transcripts }, dispatch ] = useStateValue();
  const model = 'Transcript';
  const [ interval, setInterval ] = useState();

  useEffect(() => {
    const genUrl = (id) => {
      return `/projects/${ props.projectId }/transcripts/${ id }/correct`;
    };

    const getTranscripts = async () => {
      const result = await ApiWrapper.getTranscripts(props.projectId);
      // TODO: add error handling
      if (result) {
        const newItems = result.transcripts.map((item) => {
          item.display = true;
          item.url = genUrl(item.id);

          return item;
        });
        dispatch({ type: 'update', items: newItems });
      }
    };
    if (!transcripts) {
      getTranscripts();
    }
    // For simplicity rather then handling all the edge cases (on start, save, delete,etc..), the interval runs periodicalicly,
    // and only if there are items in progress in the list, it checks the backed for updates
    if (transcripts && isTranscriptionInProgress(transcripts.items)) {
      setInterval(() => {
        getTranscripts();
      }, intervalInMs);
    }

    return () => {
      clearInterval(interval);
    };
  }, [ dispatch, interval, props.projectId, transcripts ]);

  // // side POST using wrapperAPI done
  // // inside --> newTranscriptFormModal --> TranscriptForm
  // // component - could be refactored
  // // but needs to take into account file upload from form in TranscriptForm
  // const handleSave = (item) => {
  //   console.log('handleSaveItem', item);
  //   const newItem = item;
  //   dispatch({ type: 'add', newItem: newItem });
  // };

  const handleEdit = async (transcript) => {
    const newEditedItem = transcript;
    // display attribute for search
    newEditedItem.display = true;
    // Update existing
    const index = transcripts.items.findIndex(item => item.id === transcript.id);
    const newItems = transcripts.items;
    // preserve status info
    transcript.status = newItems[index].status;
    newItems[index] = transcript;
    const queryParamsOptions = false;
    const transcriptId = newEditedItem.id;
    // TODO: add error handling, eg message, wasn't able to update etc..
    const response = await ApiWrapper.updateTranscript(props.projectId, transcriptId, queryParamsOptions, newEditedItem);
    if (response.ok) {
      console.log('ApiWrapper.updateTranscript', response, newItems);
      dispatch({ type: 'update', items: newItems });
    }

  };

  const handleDelete = async (transcriptId ) => {
    console.log('handle delete');
    // TODO: API + server side request for delete
    // on successful then update state
    const result = await ApiWrapper.deleteTranscript(props.projectId, transcriptId);
    // TODO: some error handling, error message saying something went wrong
    const findId = (item) => item.id !== transcriptId;
    if (result.ok) {
      const newItems = transcripts.items.filter(item => findId(item));
      dispatch({ type: 'update', items: newItems });
    }
  };

  return (
    <ItemsContainer
      model={ model }
      key={ model }
      items={ transcripts ? transcripts.items : [] }
      handleEdit={ handleEdit }
      handleDelete={ handleDelete }
    />
  );
};

Transcripts.propTypes = {
  projectId: PropTypes.any
};

export default Transcripts;
