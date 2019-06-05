/* eslint-disable react/prop-types */
import React from 'react';
import VideoContext from 'videocontext';

class PaperCutsPlayerViewer extends React.PureComponent {
  constructor(props) {
    const {
      width = 640,
      height = 360,
      playlist = [],
    } = props;

    super(props);

    this.playlist = playlist;
    this.canvasRef = React.createRef();
    this.canvas = (<canvas
      ref={ this.canvasRef }
      width={ width }
      height={ height }
    />);
  }

  componentDidMount() {
    this.videoContext = new VideoContext(
      this.canvasRef.current,
      (err) => console.error(
        'There was problem instantiating the Video Context in Paper Cuts Player Viewer component',
        err,
      )
    );
    this.loadPlaylist();
  }

  loadPlaylist = () => {
    this.playlist.forEach(({ type, sourceStart, start, duration, src }) => {
      const node = this.videoContext[type](src, sourceStart);
      node.startAt(start);
      node.stopAt(start + duration);
      node.connect(this.videoContext.destination);
    });
  }

  render() {
    return (this.canvas);
  }
}

export default PaperCutsPlayerViewer;
