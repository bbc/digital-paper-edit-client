import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ProgressBar from './ProgressBar';

const VideoContextProgressBar = (props) => {
  const ref = useRef();

  const [ percentage, setPercentage ] = useState(0);
  const [ videoContext, setVideoContext ] = useState();
  const [ width, setWidth ] = useState(0);

  const handleClick = ({ nativeEvent: { offsetX } }) => {
    const currentTime = (offsetX / width) * videoContext.duration;
    videoContext.currentTime = currentTime;
    const progress = (currentTime / videoContext.duration) * 100;
    setPercentage(progress);
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ ref ]);

  useEffect(() => {
    const fillerAnimation = () => {
      const progress = (videoContext.currentTime / videoContext.duration) * 100;
      setPercentage(progress);
      requestAnimationFrame(fillerAnimation);
    };

    setVideoContext(props.videoContext);

    if (videoContext) {
      fillerAnimation();
    }
  }, [ props.videoContext, videoContext ]);

  return (
    <div ref={ ref } style={ { width:'100%' } }>
      <ProgressBar onClick={ handleClick } percentage={ percentage } />
    </div>
  );
};

export default VideoContextProgressBar;
