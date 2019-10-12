import React, { useEffect, useState, useContext } from 'react';
import ItemsContainer from '../../lib/ItemsContainer';
import PropTypes from 'prop-types';
import { deleteItem, updateItem, addItem } from '../../../Context/reducers';
import ApiContext from '../../../Context/ApiContext';

const PaperEdits = (props) => {
  const api = useContext(ApiContext);
  const [ items, setItems ] = useState([]);
  const type = 'Paper Edit';
  const [ isFetch, setIsFetch ] = useState(false);

  useEffect(() => {
    const genUrl = (id) => {
      return `/projects/${ props.projectId }/paperedits/${ id }`;
    };

    const getAllPaperEdits = async () => {
      const allPaperEdits = await api.getAllPaperEdits(props.projectId);
      console.log(allPaperEdits);

      const paperEdits = allPaperEdits.map(paperEdit => {
        paperEdit.display = true;
        paperEdit.url = genUrl(paperEdit.id);
        paperEdit.projectId = props.projectId;

        return paperEdit;
      });

      setItems(paperEdits);

    };
    // TODO: some error handling
    if (!isFetch) {
      getAllPaperEdits();
      setIsFetch(true);
    }

    return () => {
    };
  }, [ api, isFetch, items, props.projectId ]);

  const createPaperEdit = async (item) => {
    const response = await api.createPaperEdit(props.projectId, item);
    if (response.ok) {
      const newPaperEdit = response.paperedit;
      newPaperEdit.display = true;
      // newPaperEdit.url = genUrl(newPaperEdit.id);

      const newItems = addItem(newPaperEdit, items);
      setItems(newItems);
    } else {
      console.log('api.createPaperEdit', response);
    }
  };

  const updatePaperEdit = async (id, item) => {
    const response = await api.updatePaperEdit(props.projectId, id, item);

    if (response.ok) {
      const paperEdit = response.paperedit;
      paperEdit.display = true;

      const newItems = updateItem(id, paperEdit, items);
      setItems(newItems);
    } else {
      console.log('api.createPaperEdit', response);
    }
  };

  const handleSave = (item) => {
    if (item.id) {
      return updatePaperEdit(item.id, item);
    } else {
      return createPaperEdit(item);
    }
  };

  const deletePaperEdit = async (id) => {
    let response;
    try {
      response = await api.deletePaperEdit(props.projectId, id);
    } catch (e) {
      console.log(e);
    }
    console.log('api.deletePaperEdit', response);

    return response;
  };

  const handleDelete = (id) => {
    console.log('handle delete');
    const response = deletePaperEdit(id);
    if (response.ok) {
      const newItems = deleteItem(id, items);
      setItems(newItems);
    }
  };

  return (
    <ApiContext.Consumer>
      {() => (
        <ItemsContainer
          type={ type }
          items={ items }
          handleSave={ () => handleSave }
          handleDelete={ () => handleDelete }
        />
      )}
    </ApiContext.Consumer>

  );
};

PaperEdits.propTypes = {
  projectId: PropTypes.any
};

export default PaperEdits;
