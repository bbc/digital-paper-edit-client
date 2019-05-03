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
      width = 640,
      height = 360,
      playlist = [],
      canvasRef = React.createRef(),
    } = props;

    super(props);
    this.duration = 0;
    this.currentTime = 0;
    this.isPlaying = false;

    this.playlist = playlist;

    this.canvasRef = canvasRef;
    this.canvas = getCanvas(this.canvasRef, width, height);

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this);
  }

  componentDidMount() {
    this.videoContext = new VideoContext(this.canvasRef.current, () => console.log('oops'));
    this.loadPlaylist();
    this.duration = this.videoContext.duration;
    this.currentTime = this.videoContext.currentTime;
  }

  loadPlaylist() {
    this.playlist.forEach(({ type, offset, start, duration, src }) => {
      const node = this.videoContext[type](src, offset);
      node.startAt(start);
      node.stopAt(start + duration);
      node.connect(this.videoContext.destination);
    });
  }

  play() {
    console.log('play');
    this.videoContext.play();
    this.isPlaying = true;
  }

  pause() {
    this.videoContext.pause();
    this.isPlaying = false;
  }

  render() {
    return (this.canvas);
  }
}

export default PaperCutsPlayer;
