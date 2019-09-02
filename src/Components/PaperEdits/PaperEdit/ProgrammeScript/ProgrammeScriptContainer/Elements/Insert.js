import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const Insert = (({ text }) => (
  <span style={ { width: '100%', backgroundColor: 'orange', color: 'white' } }>
    <FontAwesomeIcon icon={ faArrowAltCircleRight } />
    {text}
  </span>)
);

export default Insert;