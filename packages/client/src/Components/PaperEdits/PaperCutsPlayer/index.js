/* eslint-disable react/prop-types */
import React from 'react';
import PaperCutsPlayerViewer from './Viewer';
import PaperCutsPlayerProgressBar from './ProgressBar';
import PaperCutsPlayerControls from './Controls';

class PaperCutsPlayer extends React.PureComponent {

  constructor(props) {
    const { playlist = [], width = 640 } = props;

    super(props);

    this.width = width;
    this.height = (9 / 16) * this.width;

    this.playlist = playlist;
    this.videoContextRef = React.createRef();
  }

  componentDidMount() {
    this.videoContext =
      this.videoContextRef
      && this.videoContextRef.current
      && this.videoContextRef.current.videoContext;

    this.forceUpdate();
  }

  render() {
    return (
      <div className='papercuts-player'>
        <PaperCutsPlayerViewer
          ref={ this.videoContextRef }
          playlist={ this.playlist }
          width={ this.width }
          height={ this.height }
        />
        <PaperCutsPlayerProgressBar
          videoContext={ this.videoContext && this.videoContext }
        />
        <PaperCutsPlayerControls
          videoContext={ this.videoContext && this.videoContext }
        />
      </div>
    );
  }
};

export default PaperCutsPlayer;
