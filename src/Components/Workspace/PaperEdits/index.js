import React, { useEffect, useState, useContext } from 'react';
import ItemsContainer from '../../lib/ItemsContainer';
import PropTypes from 'prop-types';
import Collection from '../../Firebase/Collection';
import { withAuthorization } from '../../Session';

const PaperEdits = props => {
  const api = new Collection(props.firebase.db, 'paperedits');
  const [ items, setItems ] = useState([]);
  const TYPE = 'Paper Edit';
  const [ loading, setIsLoading ] = useState(false);

  const genUrl = id => {
    return `/projects/${ props.projectId }/paperedits/${ id }`;
  };

  useEffect(() => {
    const getPaperEdits = async () => {
      try {
        api.projectRef(props.projectId).onShapshot(snapshot => {
          const paperEdits = snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id, display: true };
          });
          setItems(paperEdits);
        });
      } catch (error) {
        console.log('Error getting documents: ', error);
      }
    };
    // TODO: some error handling
    if (!loading) {
      getPaperEdits();
      setIsLoading(true);
    }

    return () => {};
  }, [ api, loading, items, props.projectId ]);

  const createPaperEdit = async item => {
    item.projectId = props.projectId;
    const docRef = await api.postItem(item);
    item.url = genUrl(docRef.id);

    docRef.update({
      url: item.url
    });

    item.display = true;

    return item;
  };

  const updatePaperEdit = async (id, item) => {
    await api.put(id, item);
    item.display = true;
  };

  const handleSave = async item => {
    if (item.id) {
      return await updatePaperEdit(item.id, item);
    } else {
      return await createPaperEdit(item);
    }
  };

  const deletePaperEdit = async id => {
    try {
      await api.delete(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = id => {
    deletePaperEdit(id);
  };

  return (
    <ItemsContainer
      type={ TYPE }
      items={ items }
      handleSave={ handleSave }
      handleDelete={ handleDelete }
    />
  );
};

PaperEdits.propTypes = {
  projectId: PropTypes.any
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(PaperEdits);
