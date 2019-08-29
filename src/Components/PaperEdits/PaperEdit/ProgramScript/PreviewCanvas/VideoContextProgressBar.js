import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ProgressBar from './ProgressBar';

const getPercentage = (currentTime, duration) => currentTime / duration * 100;
const VideoContextProgressBar = (props) => {
  const ref = useRef();

  const [ percentage, setPercentage ] = useState(0);
  const [ videoContext, setVideoContext ] = useState();
  const [ width, setWidth ] = useState(0);

  const handleClick = ({ nativeEvent: { offsetX } }) => {
    const currentTime = (offsetX / width) * videoContext.duration;
    videoContext.currentTime = currentTime;
    const p = getPercentage(videoContext.currentTime, videoContext.duration);
    setPercentage(p);
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ ref ]);

  useEffect(() => {
    const fillerAnimation = () => {
      const p = getPercentage(videoContext.currentTime, videoContext.duration);
      setPercentage(p);
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
