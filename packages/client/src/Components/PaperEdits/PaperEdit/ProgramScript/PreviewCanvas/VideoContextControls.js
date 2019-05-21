import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

const playIcon = <FontAwesomeIcon icon={ faPlay } />;
const pauseIcon = <FontAwesomeIcon icon={ faPause } />;
const stopIcon = <FontAwesomeIcon icon={ faStop } />;

class Controls extends React.PureComponent {

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

    return (
      <>
        <Col
          className={ 'col-auto' }>
          <Button variant="outline-primary"
            onClick={ this.state.isPlaying ? this.handlePause : this.handlePlay }
          >
            { this.state.isPlaying ? pauseIcon : playIcon }
          </Button>
        </Col>
        <Col
          className={ 'col-auto' }>
          <Button variant="outline-primary"
            onClick={ this.handleStop }
          >
            { stopIcon }
          </Button>
        </Col>
      </>
    );
  }
}

export default Controls;
