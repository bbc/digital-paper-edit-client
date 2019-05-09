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

  async componentDidMount() {
    this.videoContext = await this.playerRef && this.playerRef.current && this.playerRef.current.videoContext;
    this.forceUpdate();
  }

  render() {
    console.log('render', this.videoContext);

    return (
      <>
        <Player ref={ this.playerRef } playlist={ this.playlist } />
        <ProgressBar videoContext={ this.videoContext && this.videoContext } />
        <Controls videoContext={ this.videoContext && this.videoContext } />
      </>
    );
  }
};

export default PaperCutsPlayer;
