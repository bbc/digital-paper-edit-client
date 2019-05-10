/* eslint-disable react/prop-types */
import React from 'react';
import PaperCutsPlayerViewer from './Viewer';
import PaperCutsPlayerProgressBar from './ProgressBar';
import PaperCutsPlayerControls from './Controls';

import './styles.css';

class PaperCutsPlayer extends React.PureComponent {

  constructor(props) {
    const { playlist = [] } = props;

    super(props);

    this.playlist = playlist;
    this.videoContextRef = React.createRef();
  }

  async componentDidMount() {
    this.videoContext = await this.videoContextRef && this.videoContextRef.current && this.videoContextRef.current.videoContext;
    this.forceUpdate();
  }

  render() {
    return (
      <div className='papercuts-player'>
        <PaperCutsPlayerViewer ref={ this.videoContextRef } playlist={ this.playlist } />
        <PaperCutsPlayerProgressBar videoContext={ this.videoContext && this.videoContext } />
        <PaperCutsPlayerControls videoContext={ this.videoContext && this.videoContext } />
      </div>
    );
  }
};

export default PaperCutsPlayer;
