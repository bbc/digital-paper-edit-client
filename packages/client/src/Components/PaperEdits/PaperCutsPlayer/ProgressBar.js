/* eslint-disable template-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react';

class PaperCutsPlayerProgressBar extends React.PureComponent {
  constructor(props) {
    const {
      width = 640,
    } = props;

    super(props);

    this.width = width;
    this.state = { progress: 0 };
  }

  componentDidUpdate() {
    this.videoContext = this.props.videoContext;
    this.setState({ duration: this.videoContext.duration });
    this.updateProgress();
  }

  updateProgress = () => requestAnimationFrame(() => {
    const currentTime = this.videoContext && this.videoContext.currentTime;
    const progress = (currentTime / this.state.duration) * 100;

    if (this.state.progress !== progress) this.setState({ progress });

    requestAnimationFrame(this.updateProgress);
  });

  handleClick = ({ nativeEvent: { offsetX } }) => {
    this.videoContext.currentTime =
      (offsetX / this.width) * this.state.duration;
  }

  getTracks = () =>
    this.state.duration && this.videoContext._sourceNodes.reverse().map(
      ({ startTime, stopTime, elementURL }, i) => {
        const marginLeft = (startTime / this.state.duration) * this.width;
        const width =
          ((stopTime - startTime) / this.state.duration) * this.width;
        const key = `${elementURL.split('/').slice(-1).pop()}.${i}`;

        return (
          <div key={ key } style={ { pointerEvents: 'none' } } >
            <div className='papercuts-player-progress-track-buffer' />
            <div className='papercuts-player-progress-track'
              style={ { width, marginLeft } }
            />
            <div className='papercuts-player-progress-track-buffer' />
          </div>
        );
      });

  render() {
    if (!this.tracks) this.tracks = this.getTracks();

    return (
      <div
        className='papercuts-player-progress papercuts-player-progress-back'
        onClick={ this.handleClick }
        style={ { width: this.width } }
      >
        <div
          className='papercuts-player-progess papercuts-player-progress-front'
          style={ { width: `${this.state.progress}%` } }
        >
          { this.tracks }
        </div>
      </div>
    );
  }
}

export default PaperCutsPlayerProgressBar;
