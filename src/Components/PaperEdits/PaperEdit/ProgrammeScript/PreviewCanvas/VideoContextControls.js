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
    props.videoContext.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    props.videoContext.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    props.videoContext.pause();
    props.videoContext.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <>
      <Col
        sm={ 6 } md={ 6 } ld={ 6 } xl={ 6 }
        // className={ 'col-auto' }
      >
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
        sm={ 6 } md={ 6 } ld={ 6 } xl={ 6 }
        // className={ 'col-auto' }
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
  videoContext: PropTypes.any
};
