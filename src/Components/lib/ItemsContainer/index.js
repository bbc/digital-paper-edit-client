import React, { useState, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import { anyInText } from '../../../Util/in-text';
import arrayMatch from '../../../Util/array-match';
import List from '@bbc/digital-paper-edit-react-components/List';
import SearchBar from '@bbc/digital-paper-edit-react-components/SearchBar';
import FormModal from '@bbc/digital-paper-edit-react-components/FormModal';

const initialFormState = {
  title: '',
  description: '',
  id: null
};

const formReducer = (state = initialFormState, { type, payload }) => {
  switch (type) {
  case 'update':
    return { ...state, ...payload };
  case 'reset': {
    return { initialFormState };
  }
  default:
    return state;
  }
};

const ItemsContainer = props => {
  const type = props.type;
  const [ items, setItems ] = useState([]);

  const [ showModal, setShowModal ] = useState(false);
  const [ formData, dispatchForm ] = useReducer(formReducer, initialFormState);

  // The form works both for new/create and edit/update
  const handleSaveForm = item => {
    props.handleSave(item);
    setShowModal(false);
    dispatchForm({ type: 'reset' });
  };

  const handleEditItem = id => {
    const item = items.find(i => i.id === id);
    dispatchForm({
      type: 'update',
      payload: item
    });
    setShowModal(true);
  };

  const handleDeleteItem = id => {
    props.handleDelete(id);
  };

  const handleFilterDisplay = (item, text) => {
    if (anyInText([ item.title, item.description ], text)) {
      item.display = true;
    } else {
      item.display = false;
    }

    return item;
  };

  const handleSearch = text => {
    const results = items.map(item => handleFilterDisplay(item, text));
    setItems(results);
  };

  const toggleShowModal = () => {
    console.log('toggle', !showModal);
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!arrayMatch(props.items, items)) {
      setItems(props.items);
    }

    return () => {};
  }, [ items, props.items ]);

  let searchEl;
  let showItems;

  if (items.length > 0) {
    searchEl = <SearchBar handleSearch={ handleSearch } />;
    showItems = (
      <List
        items={ items }
        handleEditItem={ handleEditItem }
        handleDeleteItem={ handleDeleteItem }
      />
    );
  } else {
    showItems = <i>There are no {type}s, create a new one to get started.</i>;
  }

  return (
    <>
      <Row>
        <Col sm={ 9 }>{searchEl}</Col>
        <Col xs={ 12 } sm={ 3 }>
          <Button
            onClick={ toggleShowModal }
            variant="outline-secondary"
            size="sm"
            block
          >
            New {type}
          </Button>
        </Col>
      </Row>
      {showItems}
      <FormModal
        { ...formData }
        modalTitle={ formData.id ? `Edit ${ type }` : `New ${ type }` }
        showModal={ showModal }
        handleSaveForm={ handleSaveForm }
        itemType={ type.toLowerCase }
      />
    </>
  );
};

ItemsContainer.propTypes = {
  handleSave: PropTypes.any,
  handleDelete: PropTypes.any,
  items: PropTypes.array.isRequired,
  type: PropTypes.string
};

ItemsContainer.defaultProps = {
  type: 'Project'
};

export default ItemsContainer;
