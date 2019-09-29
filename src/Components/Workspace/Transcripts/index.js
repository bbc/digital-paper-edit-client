import React, { useEffect, useState } from 'react';
import ItemsContainer from '../../lib/ItemsContainer';
import ApiWrapper from '../../../ApiWrapper';
import PropTypes from 'prop-types';
import { deleteItem, updateItem } from '../../../State/reducers';

const intervalInMs = 300000;

const isTranscriptionInProgress = (transcripts) => {
  if (transcripts.length !== 0) {
    const result = transcripts.find((transcript) => {
      return transcript.status === 'in-progress';
    });

    return result ? true : false;
  }

  return false;
};

const Transcripts = (props) => {
  const [ isFetch, setIsFetch ] = useState(false);
  const [ items, setItems ] = useState([]);
  const [ interval, setInterval ] = useState();
  const type = 'Transcript';

  useEffect(() => {
    const genUrl = (id) => {
      return `/projects/${ props.projectId }/transcripts/${ id }/correct`;
    };

    const getTranscripts = async () => {
      const response = await ApiWrapper.getTranscripts(props.projectId);

      if (response) {
        const newItems = response.transcripts.map((item) => {
          item.display = true;
          item.url = genUrl(item.id);
          item.projectId = props.projectId;

          return item;
        });
        setItems(newItems);
      }

    };

    if (!isFetch) {
      setIsFetch(true);
      getTranscripts();
    }

    // For simplicity rather then handling all the edge cases (on start, save, delete,etc..), the interval runs periodicalicly,
    // and only if there are items in progress in the list, it checks the backed for updates
    if (!interval && isTranscriptionInProgress(items)) {
      setInterval(() => {
        getTranscripts();
      }, intervalInMs);
    }

    return () => {
      clearInterval(interval);
    };
  }, [ interval, isFetch, items, props.projectId ]);

  const updateTranscript = async (id, item) => {
    const queryParamsOptions = false;
    const response = await ApiWrapper.updateTranscript(
      props.projectId,
      id,
      queryParamsOptions,
      item
    );

    if (response.status === 'ok') {
      const editedTranscript = response.transcript;
      const index = items.findIndex(pe => pe.id === id);
      const originalTranscript = items[index];

      editedTranscript.display = true;
      editedTranscript.status = originalTranscript.status;
      const newItems = updateItem(id, editedTranscript, items);
      setItems(newItems);
    } else {
      console.log('ApiWrapper.updateTranscript', response);
    }
  };

  const handleSave = (item) => {
    if (item.id) {
      return updateTranscript(item.id, item);
    } else {
      console.log('non-existing');
      // return createTranscript(item);
      // creation handled by form
    }
  };

  const deleteTranscript = async (id) => {
    let response;
    try {
      response = await ApiWrapper.deleteTranscript(props.projectId, id);
    } catch (e) {
      console.log(e);
    }
    console.log('ApiWrapper.deleteTranscript', response);

    return response;
  };

  const handleDelete = (id) => {
    const response = deleteTranscript(id);
    if (response.ok) {
      const newItems = deleteItem(id, items);
      setItems(newItems);
    }
  };

  return (
    <ItemsContainer
      type={ type }
      key={ type }
      items={ items }
      handleSave={ () => handleSave }
      handleDelete={ () => handleDelete }
    />
  );
};

Transcripts.propTypes = {
  projectId: PropTypes.any
};

export default React.memo(Transcripts);
