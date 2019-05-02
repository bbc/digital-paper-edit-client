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
    } = props;

    super(props);

    this.playlist = playlist;
    this.playing = false;

    this.canvasRef = React.createRef();
    this.canvas = getCanvas(this.canvasRef, width, height);

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this);
  }

  componentDidMount() {
    this.videoCtx = new VideoContext(this.canvasRef.current, () => console.log('oops'));
    this.loadPlaylist();
  }

  loadPlaylist() {
    this.playlist.forEach(({ offset, start, duration, src }) => {
      const videoNode = this.videoCtx.video(src, offset);
      videoNode.start(start);
      videoNode.stop(duration);
      videoNode.connect(this.videoCtx.destination);
    });
  }

  play() {
    this.videoCtx.play();
    this.playing = true;
  }

  pause() {
    this.videoCtx.pause();
    this.playing = false;
  }

  render() {
    return (
      <>
        {this.canvas}
        <div
          className="play-pause-button"
          style={ { background: 'red', width: '100px', height: '100px' } }
          onClick={ () => this.playing ? this.pause() : this.play() }
        >
        </div>
      </>
    );
  }
}

export default PaperCutsPlayer;
