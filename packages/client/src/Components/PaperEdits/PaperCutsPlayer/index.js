/* eslint-disable react/prop-types */
import React from 'react';
import VideoContext from 'videocontext';

const getCanvas = (ref, width, height) => {
  return (
    <canvas
      ref={ ref }
      className="video-canvas"
      width={ width }
      height={ height }
    >
    </canvas>
  );
};

class PaperCutsPlayer extends React.PureComponent {
  constructor(props) {
    const {
      width = 1280,
      height = 720,
      playlist = []
    } = props;

    super(props);
    this.playlist = playlist;
    this.canvasRef = React.createRef();
    this.canvas = getCanvas(this.canvasRef, width, height);
  }

  componentDidMount() {
    this.videoCtx = new VideoContext(this.canvasRef.current);
  }

  connect() {
    // Connect the created track to the ouput canvas so it can be rendered.
    // You could also connect the video track to an effect node if you wanted to do effects.
    VideoContext
      .importSimpleEDL(this.videoCtx, this.playlist)
      .connect(this.videoCtx.destination);
  }

  play() {
    this.videoCtx.play();
  }

  pause() {
    this.videoCtx.pause();
  }

  render() {
    return (
      <>
        {this.canvas}
        {this.progressBar && this.progressBar}
        {this.controls && this.controls}
      </>
    );
  }
}

export default PaperCutsPlayer;
