import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Note = (props) => (
  <p className={ 'text-secondary' }>
    <FontAwesomeIcon icon={ faStickyNote } /> { props.text }
  </p>
);

Note.propTypes = {
  text: PropTypes.any
};

export default Note;
