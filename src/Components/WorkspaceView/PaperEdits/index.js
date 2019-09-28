import React, { useEffect } from 'react';
import ApiWrapper from '../../../ApiWrapper';
import ItemsContainer from '../../lib/ItemsContainer';
import { useStateValue } from '../../../State';
import PropTypes from 'prop-types';

const PaperEdits = (props) => {
  const [ { paperEdits }, dispatch ] = useStateValue();
  const model = 'Paper Edit';
  useEffect(() => {
    const genUrl = (id) => {
      return `/projects/${ props.projectId }/paperedits/${ id }`;
    };
    const getAllPaperEdits = async () => {

      // TODO: do we need to add user id in request?
      const allPaperEdits = await ApiWrapper.getAllPaperEdits(props.projectId);
      // add a display property for component cards search
      const extendedPEs = allPaperEdits.map(paperEdit => {
        paperEdit.display = true;
        paperEdit.url = genUrl(paperEdit.id);

        return paperEdit;
      });
      dispatch({ type: 'update', items: extendedPEs });
    };
    // TODO: some error handling

    getAllPaperEdits();

    return () => {
    };
  }, [ dispatch, props.projectId ]);

  // TODO: handlesave / update through API wrapper
  // The form works both for new/create and edit/update
  const handleEdit = (item) => {
    if (!item.id) {
      ApiWrapper.createPaperEdit(props.projectId, item).then(response => {
        if (response.status === 'ok') {
          // Server returns project with UID generated server side
          // need to add display true attribute for search to the new project
          const newPaperEdit = response.paperedit;
          newPaperEdit.display = true;
          // newPaperEdit.url = genUrl(newPaperEdit.id);
          dispatch({ type: 'add', item: newPaperEdit });
        }
      });
    }
    else {
      ApiWrapper.updatePaperEdit(props.projectId, item.id, item).then(response => {
        if (response.status === 'ok') {
          const paperedit = response.paperedit;
          // need to add display true attribute for search to the new project
          paperedit.display = true;
          // // Server returns project with UID generated server side
          const papereditIndex = paperEdits.items.findIndex(pe => pe.id === paperedit.id);
          const newItemsList = paperEdits.items;
          newItemsList[papereditIndex] = paperedit;
          dispatch({ type: 'update', items: newItemsList });
        }
      });
    }
  };

  // TODO:
  const handleDelete = async (itemId) => {
    const result = await ApiWrapper.deletePaperEdit(props.projectId, itemId);
    if (result.ok) {
      const newItemsList = paperEdits.items.filter((p) => {
        return p.id !== itemId;
      });
      dispatch({ type: 'update', items: newItemsList });
    } else {
      // TODO: some error handling, error message saying something went wrong
    }
  };

  return (
    <ItemsContainer
      model={ model }
      items={ paperEdits ? paperEdits.items : [] }
      handleEdit={ handleEdit }
      handleDelete={ handleDelete }
    />
  );
};

PaperEdits.propTypes = {
  projectId: PropTypes.any
};

export default PaperEdits;
