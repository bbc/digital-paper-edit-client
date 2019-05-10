/* eslint-disable react/prop-types */
import React from 'react';
import VideoContext from 'videocontext';

import './styles.css';

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
      className='papercuts-player-viewer'
      ref={ this.canvasRef }
      width={ width }
      height={ height }
    />);
  }

  componentDidMount() {
    this.videoContext = new VideoContext(this.canvasRef.current, () => console.log('oops'));
    this.loadPlaylist();
  }

  loadPlaylist = () => {
    this.playlist.forEach(({ type, offset, start, duration, src }) => {
      const node = this.videoContext[type](src, offset);
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
