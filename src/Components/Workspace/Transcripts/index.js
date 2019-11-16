import React, { useEffect, useState, useContext } from "react";
import ItemsContainer from "../../lib/ItemsContainer";
import PropTypes from "prop-types";
import { deleteItem, updateItem, addItem } from "../../../Context/reducers";
import ApiContext from "../../../Context/ApiContext";
import Collections from "../../../firebase/Collection";
const intervalInMs = 30000;

const Transcripts = props => {
  const api = Collections("transcripts");
  // const api = useContext(ApiContext);
  const [isFetch, setIsFetch] = useState(false);
  const [items, setItems] = useState([]);
  const [isInProgress, setIsInProgress] = useState(false);
  const [interval, setInterval] = useState();
  const type = "Transcript";

  const isTranscriptionInProgress = transcripts => {
    if (transcripts.length !== 0) {
      const result = transcripts.find(transcript => {
        return transcript.status === "in-progress";
      });

      return result ? true : false;
    }

    return false;
  };

  useEffect(() => {
    const genUrl = id => {
      return `#/projects/${props.projectId}/transcripts/${id}/correct`;
    };

    const getTranscripts = async () => {
      const response = await api.getItem(props.projectId); // get item based on reference

      const newItems = response.transcripts.map(transcript => {
        transcript.display = true;
        transcript.url = genUrl(transcript.id);
        transcript.projectId = props.projectId;

        return transcript;
      });
      setItems(newItems);
    };

    if (!isFetch) {
      getTranscripts();
      setIsFetch(true);
    }

    // For simplicity rather then handling all the edge cases (on start, save, delete,etc..), the interval runs periodicalicly,
    // and only if there are items in progress in the list, it checks the backed for updates
    if (isInProgress && !interval) {
      setInterval(
        setTimeout(() => {
          getTranscripts();
        }, intervalInMs)
      );
    }

    if (items.length > 0) {
      setIsInProgress(isTranscriptionInProgress(items));
    }

    return () => {
      clearInterval(interval);
    };
  }, [api, interval, isFetch, isInProgress, items, props.projectId]);

  const updateTranscript = async (id, item) => {
    const queryParamsOptions = false;
    const response = await api.updateTranscript(
      props.projectId,
      id,
      queryParamsOptions,
      item
    );

    if (response.ok) {
      const editedTranscript = response.transcript;
      const index = items.findIndex(pe => pe.id === id);
      const originalTranscript = items[index];

      editedTranscript.display = true;
      editedTranscript.status = originalTranscript.status;
      const newItems = updateItem(id, editedTranscript, items);
      setItems(newItems);
    } else {
      console.log("api.updateTranscript", response);
    }
  };

  const createTranscript = async item => {
    const response = await api.createTranscript(item);
    if (response.ok) {
      const newTranscript = response.transcript;

      newTranscript.display = true;
      newTranscript.status = "in-progress";

      const newItems = addItem(newTranscript, items);
      setItems(newItems);
    } else {
      console.log("api.updateTranscript", response);
    }
  };

  const handleSave = item => {
    if (item.id) {
      return updateTranscript(item.id, item);
    } else {
      return createTranscript(item);
    }
  };

  const deleteTranscript = async id => {
    console.log(api);
    let response;
    try {
      response = await api.deleteTranscript(props.projectId, id);
    } catch (e) {
      console.log(e);
    }
    console.log("api.deleteTranscript", response);

    return response;
  };

  const handleDelete = id => {
    const response = deleteTranscript(id);
    if (response.ok) {
      const newItems = deleteItem(id, items);
      setItems(newItems);
    }
  };

  return (
    <ApiContext.Consumer>
      {() => (
        <ItemsContainer
          type={type}
          items={items}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      )}
    </ApiContext.Consumer>
  );
};

Transcripts.propTypes = {
  projectId: PropTypes.any
};

export default Transcripts;
