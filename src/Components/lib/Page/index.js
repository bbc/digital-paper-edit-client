import React, { useState, useEffect } from 'react';
import List from '@bbc/digital-paper-edit-react-components/List';
import SearchBar from '@bbc/digital-paper-edit-react-components/SearchBar';
import includesText from '../../../Util/includes-text/index.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const Page = (props) => {
  const [ items, setItems ] = useState();
  console.log('page', items);

  useEffect(() => {
    if (!items) {
      setItems(props.items);
      console.log('effect', items);
    }

    return () => {

    };
  }, [ items, props.items ]);

  const handleSearch = searchText => {
    const results = items.filter(project => {
      if (
        includesText(project.title, searchText) ||
        includesText(project.description, searchText)
      ) {
        project.display = true;

        return project;
      } else {
        project.display = false;

        return project;
      }
    });
    props.handleUpdateList(results);
  };

  let searchEl;
  let showItems;

  if (items && items.length !== 0) {
    searchEl = <SearchBar handleSearch={ handleSearch } />;

    showItems = (
      <List
        items={ items }
        handleEdit={ () => props.handleEdit }
        handleDelete={ () => props.handleDelete }
        handleSearch={ handleSearch }
      />
    );
  } else {
    searchEl = null;
    showItems = (<i>There are no {props.model}s, create a new one to get started.</i>);
  }

  return (
    <>
      <Row>
        <Col sm={ 9 } >
          {searchEl}
        </Col>

        <Col xs={ 12 } sm={ 3 } >
          <Button onClick={ props.handleShowModal }
            variant="outline-secondary"
            size="sm" block>
                New {props.model}
          </Button>
        </Col>
      </Row>
      {showItems}
    </>
  );
};

Page.propTypes = {
  handleDelete: PropTypes.any,
  handleEdit: PropTypes.any,
  handleShowModal: PropTypes.any,
  handleUpdateList: PropTypes.any,
  items: PropTypes.any,
  model: PropTypes.any,
};

export default Page;
