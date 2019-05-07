/* eslint-disable template-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react';

const ControlButton = ({ className, icon, onClick }) => {
  return (
    <button className={ className } onClick={ onClick } >
      { icon }
    </button>
  );
};

class Controls extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handlePlay() {
    this.props.videoContext.play();
    this.setState({ isPlaying: true });
  }

  handlePause() {
    this.props.videoContext.pause();
    this.setState({ isPlaying: false });
  }

  handleStop() {
    this.props.videoContext.pause();
    this.props.videoContext.currentTime = 0;
    this.setState({ isPlaying: false });
  }

  render() {
    const classNameContainer = 'player-controls-container';
    const classNameContolButton = 'control-button';

    const playIcon = '';
    const pauseIcon = '';
    const stopIcon = '';

    return (
      <div className={ classNameContainer }>
        <ControlButton
          className={ `${classNameContainer} ${classNameContolButton} ${classNameContolButton}__play` }
          icon={ this.state.isPlaying ? pauseIcon : playIcon }
          onClick={ this.state.isPlaying ? this.handlePause : this.handlePlay }
        />
        <ControlButton
          className={ `${classNameContainer} ${classNameContolButton} ${classNameContolButton}__stop` }
          icon={ stopIcon }
          onClick={ this.handleStop }
        />
      </div>
    );
  }
}

export default Controls;
