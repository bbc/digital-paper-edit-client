/* eslint-disable template-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const ControlButton = ({ icon, onClick }) => (
  <Button variant="primary" onClick={ onClick } >
    { icon }
  </Button>
);

class PaperCutsPlayerControls extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  handlePlay = () => {
    this.props.videoContext.play();
    this.setState({ isPlaying: true });
  }

  handlePause = () => {
    this.props.videoContext.pause();
    this.setState({ isPlaying: false });
  }

  handleStop = () => {
    this.props.videoContext.pause();
    this.props.videoContext.currentTime = 0;
    this.setState({ isPlaying: false });
  }

  render() {
    const playIcon = <FontAwesomeIcon icon={ faPlay } />;
    const pauseIcon = <FontAwesomeIcon icon={ faPause } />;
    const stopIcon = <FontAwesomeIcon icon={ faStop } />;

    return (
      <div
        className='papercuts-player-controls d-flex align-items-center'
        style={ { width: this.props.width } }>
        <div className='papercuts-player-controls-buttons'>
          <ControlButton
            icon={ this.state.isPlaying ? pauseIcon : playIcon }
            onClick={ this.state.isPlaying ? this.handlePause : this.handlePlay }
          />
          <ControlButton
            icon={ stopIcon }
            onClick={ this.handleStop }
          />
        </div>
      </div>
    );
  }
}

export default PaperCutsPlayerControls;
