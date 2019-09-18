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

  return (
    <>
      <Row
        className={ 'justify-content-center' }
        style={ { backgroundColor: 'black' } }
      >
        <canvas
          ref={ props.canvasRef }
          width={ props.width }
          height={ props.height }
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
          handlePlay={ videoContext ? () => videoContext.play() : console.log('handlePlay') }
          handlePause={ videoContext ? () => videoContext.pause() : console.log('handlePause') }
          handleStop={ videoContext ? () => handleStop() : console.log('handleStop') }
        />
      </Row>
      <Row className={ 'justify-content-center' }>
        Total duration: {videoContext ? videoContext.duration : 0} seconds
      </Row>
    </>
  );
};

VideoContextPreview.propTypes = {
  canvasRef: PropTypes.any,
  height: PropTypes.number,
  playlist: PropTypes.array,
  videoContext: PropTypes.any,
  width: PropTypes.number
};

VideoContextPreview.defaultProps = {
  playlist: [],
  width : 640,
  height : 360,
};

export default VideoContextPreview;
