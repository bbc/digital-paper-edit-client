import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';

const VoiceOver = ({ text }) =>
  <p className={ 'text-muted' }>
    <FontAwesomeIcon icon={ faMicrophoneAlt } />
    { text }
  </p>;

export default VoiceOver;
