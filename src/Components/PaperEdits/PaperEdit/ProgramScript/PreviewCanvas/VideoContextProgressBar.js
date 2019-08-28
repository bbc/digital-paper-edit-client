/* eslint-disable template-curly-spacing */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const VideoContextProgressBar = (props) => {
  const [ percentage, setPercentage ] = useState(0);
  const [ videoContext, setVideoContext ] = useState();

  const onClick = event => {
    console.log(event);
  };

  const updateProgress = () => {
    requestAnimationFrame(() => {
      const progress = (videoContext.currentTime / videoContext.duration) * 100;
      if (progress !== percentage) setPercentage(progress);
      requestAnimationFrame(updateProgress); // loop
    });
  };

  useEffect(() => {
    console.log('USEEFFECT');
    setVideoContext(props.videoContext);
    if (videoContext) {
      updateProgress();
      console.log('updating');
    }
  }, [ props.videoContext, videoContext ]);

  // handleClick = ({ nativeEvent: { offsetX } }) => {
  //   console.log('YAY');
  //   const currentTime = (offsetX / 640) * this.state.duration;
  //   this.videoContext.currentTime = currentTime;
  //   const percentage = (currentTime / this.state.duration) * 100;
  //   this.setState({ percentage: percentage });
  // }

  // const getTracks = () => {

  //   playlist.map(media => {
  //     setPercentage((media.duration / videoContext.duration) * 100)
  //   }
  // });

  // getTracks = () =>
  //   this.state.duration && this.videoContext._sourceNodes.map(
  //     ({ startTime, stopTime, elementURL }, i) => (
  //       <div
  //         key={ `${elementURL}.${startTime}` }
  //         className={ styles.papercutsPlayerProgressTrack }
  //         style={ {
  //           width: ((stopTime - startTime) / this.state.duration) * this.width - 2
  //         } }
  //       >
  //         { (i > 0) && <div />}
  //       </div>
  //     )
  //   );

  // if (!this.tracks) this.tracks = this.getTracks();

  return (
    <>
      <ProgressBar onClick={ onClick } percentage={ percentage }></ProgressBar>
    </>
  );

  // return (
  //   <>
  //     <div
  //       className={ [ styles.papercutsPlayerProgress, styles.papercutsPlayerProgressBack ].join(' ') }
  //       onClick={ this.handleClick }
  //       style={ { width: this.width } }
  //     >
  //       { this.tracks ? this.tracks : <div /> }
  //       <div
  //         className={ [ styles.papercutsPlayerProgress, styles.papercutsPlayerProgressFront ].join(' ') }
  //         style={ { width: `${this.state.progress}%` } }
  //       />

  //     </div>
  //   </>
  // );
};

export default VideoContextProgressBar;
