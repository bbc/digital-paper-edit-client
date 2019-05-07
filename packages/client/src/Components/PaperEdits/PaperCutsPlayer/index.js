/* eslint-disable react/prop-types */
import React from 'react';
import Player from './Player';
import ProgressBar from './ProgressBar';
import Controls from './Controls';

class PaperCutsPlayer extends React.PureComponent {

  constructor(props) {
    const { playlist = [] } = props;

    super(props);

    this.playlist = playlist;
    this.playerRef = React.createRef();
  }

  componentDidMount() {
    this.player = this.playerRef && this.playerRef.current;
    this.forceUpdate();
  }

  render() {
    return (
      <>
        <Player ref={ this.playerRef } playlist={ this.playlist } />
        <ProgressBar videoContext={ this.player && this.player.videoContext } />
        <Controls videoContext={ this.player && this.player.videoContext } />
      </>
    );
  }
};

export default PaperCutsPlayer;
