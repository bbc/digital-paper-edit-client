import React, { useState, useEffect } from 'react';
import VideoContextProgressBar from './VideoContextProgressBar';
import Controls from '../Controls';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import VideoContext from 'videocontext';

const VideoContextPreview = (props) => {
  const [ videoContext, setVideoContext ] = useState();

  const updateVideoContext = (media) => {
    media.forEach(({ type, sourceStart, start, duration, src }) => {
      const node = videoContext[type](src, sourceStart);
      node.startAt(start);
      node.stopAt(start + duration);
      node.connect(videoContext.destination);
    });
  };

  const handleStop = () => {
    videoContext.pause();
    setVideoContext(vc => {
      vc.currentTime = 0;

      return vc;
    });
  };

  useEffect(() => {
    if (props.canvasRef && props.canvasRef.current) {
      setVideoContext(new VideoContext(props.canvasRef.current));
    }

  }, [ props.canvasRef ]);

  if (videoContext) {
    updateVideoContext(props.playlist);
  }

  const secondsToHHMMSSFormat = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <>
      <Row
        className={ 'justify-content-center' }
        style={ { backgroundColor: 'black' } }
      >
        <canvas
          ref={ props.canvasRef }
          width={ props.width }
          height={ props.width * 0.5625 }
        />
      </Row>
      <Row
        className={ 'justify-content-center' }
        style={ { backgroundColor: 'lightgrey' } }
      >
        <VideoContextProgressBar videoContext={ videoContext }/>
      </Row>
      <Row style={ { marginTop: '0.4em' } }>
        <Controls
          handlePlay={ videoContext ? () => videoContext.play() : () => console.log('handlePlay') }
          handlePause={ videoContext ? () => videoContext.pause() : () => console.log('handlePause') }
          handleStop={ videoContext ? () => handleStop() : () => console.log('handleStop') }
        />
      </Row>
      <Row className={ 'justify-content-center' }>
        Total duration: {videoContext ? secondsToHHMMSSFormat(videoContext.duration) : '00:00:00'}
      </Row>
    </>
  );
};

VideoContextPreview.propTypes = {
  canvasRef: PropTypes.any,
  playlist: PropTypes.array,
  videoContext: PropTypes.any,
  width: PropTypes.any
};

VideoContextPreview.defaultProps = {
  playlist: []
};

export default VideoContextPreview;
