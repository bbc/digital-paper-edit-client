import React, { useEffect, useState } from 'react';
import ApiWrapper from '../../../ApiWrapper';
import ItemsContainer from '../../lib/ItemsContainer';
import PropTypes from 'prop-types';
import { deleteItem, updateItem, addItem } from '../../../State/reducers';

const PaperEdits = (props) => {
  const [ items, setItems ] = useState([]);
  const type = 'Paper Edit';
  const [ isFetch, setIsFetch ] = useState(false);

  useEffect(() => {
    const genUrl = (id) => {
      return `/projects/${ props.projectId }/paperedits/${ id }`;
    };

    const getAllPaperEdits = async () => {
      const allPaperEdits = await ApiWrapper.getAllPaperEdits(props.projectId);

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
  }, [ isFetch, items, props.projectId ]);

  const createPaperEdit = async (item) => {
    const response = await ApiWrapper.createPaperEdit(props.projectId, item);
    if (response.status === 'ok') {
      const newPaperEdit = response.paperedit;
      newPaperEdit.display = true;
      // newPaperEdit.url = genUrl(newPaperEdit.id);

      const newItems = addItem(newPaperEdit, items);
      setItems(newItems);
    } else {
      console.log('ApiWrapper.createPaperEdit', response);
    }
  };

  const updatePaperEdit = async (id, item) => {
    const response = await ApiWrapper.updatePaperEdit(props.projectId, id, item);

    if (response.status === 'ok') {
      const paperEdit = response.paperedit;
      paperEdit.display = true;

      const newItems = updateItem(id, paperEdit, items);
      setItems(newItems);
    } else {
      console.log('ApiWrapper.createPaperEdit', response);
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
      response = await ApiWrapper.deletePaperEdit(props.projectId, id);
    } catch (e) {
      console.log(e);
    }
    console.log('ApiWrapper.deletePaperEdit', response);

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
    <ItemsContainer
      type={ type }
      items={ items }
      handleSave={ () => handleSave }
      handleDelete={ () => handleDelete }
    />
  );
};

PaperEdits.propTypes = {
  projectId: PropTypes.any
};

export default PaperEdits;
