/* eslint-disable react/prop-types */
import React from 'react';
import Player from './Player';
import ProgressBar from '@bbc/react-transcript-editor/ProgressBar';

class PaperCutsPlayer extends React.PureComponent {

  constructor(props) {
    const { playlist = [] } = props;

    super(props);

    this.playlist = playlist;
    this.player = React.createRef();
  }

  render() {
    return (
      <>
        <Player ref={ this.player } playlist={ this.playlist } />
        <ProgressBar
          buttonClick={ () => {} }
          value={ (this.playlist && this.playlist.current && this.playlist.current.currentTime) || 0 }
          max={ (this.playlist && this.playlist.current && this.playlist.current.duration) || 0 }
        />
      </>
    );
  }
};

export default PaperCutsPlayer;
