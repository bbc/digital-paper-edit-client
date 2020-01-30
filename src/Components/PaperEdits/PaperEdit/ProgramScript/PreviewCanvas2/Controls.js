import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const playIcon = <FontAwesomeIcon icon={ faPlay } />;
const pauseIcon = <FontAwesomeIcon icon={ faPause } />;
const stopIcon = <FontAwesomeIcon icon={ faStop } />;

const Controls = (props) => {

  const [ isPlaying, setIsPlaying ] = useState(false);

  const handlePlay = () => {
    props.handlePlay();
    setIsPlaying(true);
  };

  const handlePause = () => {
    props.handlePause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    props.handleStop();
    setIsPlaying(false);
  };

  return (
    <>
      <Col sm={ 6 }>
        <Button
          size="sm"
          block
          variant="outline-secondary"
          onClick={ isPlaying ? handlePause : handlePlay }
        >
          { isPlaying ? pauseIcon : playIcon }
        </Button>
      </Col>
      <Col
        sm={ 6 }
      >
        <Button
          size="sm"
          block
          variant="outline-secondary"
          onClick={ handleStop }
        >
          { stopIcon }
        </Button>
      </Col>
    </>
  );
};

export default Controls;

Controls.propTypes = {
  handleStop: PropTypes.any,
  handlePlay: PropTypes.any,
  handlePause: PropTypes.any
};
