/* eslint-disable template-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react';

class ProgressBar extends React.PureComponent {
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
    this.videoContext.currentTime = (offsetX / this.width) * this.state.duration;
  }

  getTracks = () => this.state.duration && this.videoContext._sourceNodes.reverse().map(
    ({ startTime, stopTime, elementURL }, i) => {
      const marginLeft = (startTime / this.state.duration) * this.width;
      const width = ((stopTime - startTime) / this.state.duration) * this.width;
      const key = `${elementURL.split('/').slice(-1).pop()}.${i}`;

      return (
        <div key={ key } style={ { pointerEvents: 'none' } } >
          <div style={ { height: 1, opacity: 0.0 } } />
          <div style={ { height: 8, opacity: 0.2, background: 'black', width, marginLeft } } />
          <div style={ { height: 1, opacity: 0.0 } } />
        </div>
      );
    });

  render() {
    const sharedStyle = { position: '0 0', height: '10px' };

    if (!this.tracks) this.tracks = this.getTracks();

    return (
      <div
        onClick={ this.handleClick }
        style={ { ...sharedStyle, background: 'grey', width: this.width, height: 'auto' } }
      >
        <div style={ { ...sharedStyle, background: 'red', width: `${this.state.progress}%`, height: 'auto' } } >
          { this.tracks }
        </div>
      </div>
    );
  }
}

export default ProgressBar;
