import React, { useState, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import ApiWrapper from '../../../ApiWrapper';

import { anyInText } from '../../../Util/in-text';
import List from '@bbc/digital-paper-edit-react-components/List';
import SearchBar from '@bbc/digital-paper-edit-react-components/SearchBar';
import FormModal from '@bbc/digital-paper-edit-react-components/FormModal';
import { useStateValue } from '../../../State';

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

const PageView = (props) => {
  const [ { projects, transcripts }, dispatch ] = useStateValue();
  const [ items, setItems ] = useState();

  console.log('projects', projects);
  console.log('transcripts', transcripts);

  if (props.model === 'Transcript') {
    setItems(transcripts);
  } else {
    setItems(projects);
  }

  const [ showModal, setShowModal ] = useState(false);
  const [ formData, dispatchForm ] = useReducer(formReducer, initialFormState);

  // The form works both for new/create and edit/update
  const handleSaveItem = (item) => {
    props.handleSave(item);
    setShowModal(false);
    dispatchForm({ type: 'reset' });
  };

  const findItemById = (list, id) => {
    const result = list.filter((p) => {
      return p.id === id;
    });

    return result[0];
  };

  const handleEditItem = (id) => {
    // const result = await ApiWrapper.updateProject(id);
    const item = findItemById(items, id);
    dispatchForm({
      type: 'update',
      payload: item
    });
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    props.handleDelete(id);
  };

  const handleDisplay = (item, text) => {
    if (anyInText([ item.title, item.description ], text)) {
      item.display = true;
    } else {
      item.display = false;
    }

    return item;
  };

  const handleSearch = text => {
    const results = items.filter(item => handleDisplay(item, text));
    setItems(results);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!items) {
      setItems(props.items);
      console.log('effect', items);
    }

    return () => {

    };
  }, [ items, props.items ]);

  let searchEl;
  let showItems;

  if (items && items.length !== 0) {
    searchEl = <SearchBar handleSearch={ handleSearch } />;

    showItems = (
      <List
        items={ items }
        handleEditItem={ () => handleEditItem }
        handleDeleteItem={ () => handleDeleteItem }
      />
    );

  } else {
    showItems = (<i>There are no {props.model}s, create a new one to get started.</i>);
  }

  return (
    <>
      <Row>
        <Col sm={ 9 } >
          {searchEl}
        </Col>
        <Col xs={ 12 } sm={ 3 } >
          <Button onClick={ handleShowModal }
            variant="outline-secondary"
            size="sm" block>
                New {props.model}
          </Button>
        </Col>
      </Row>
      {showItems}
      <FormModal
        { ...formData }
        modalTitle={ formData.id ? `Edit ${ props.model }` : `New ${ props.model }` }
        showModal={ showModal }
        handleSaveForm={ handleSaveItem }
        itemType={ props.model.toLowerCase }
      />
    </>
  );
};

PageView.propTypes = {
  handleSave: PropTypes.any,
  handleEdit: PropTypes.any,
  handleDelete: PropTypes.any,
  items: PropTypes.any,
  model: PropTypes.string
};

export default PageView;
