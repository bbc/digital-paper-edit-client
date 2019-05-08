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
    this.duration = this.videoContext && this.videoContext.duration;
    this.videoContext = this.props.videoContext;
    this.updateProgress();
  }

  updateProgress = () => requestAnimationFrame(() => {
    const currentTime = this.videoContext && this.videoContext.currentTime;
    const progress = ( currentTime / this.duration) * 100;

    if (this.state.progress !== progress) this.setState({ progress });

    requestAnimationFrame(this.updateProgress);
  });

  render() {
    const sharedStyle = { position: '0 0', height: '10px' };

    return (
      <div style={ { ...sharedStyle, background: 'grey', width: `${this.width}px` } }>
        <div style={ { ...sharedStyle, background: 'red', width: `${this.state.progress}%` } } />
      </div>
    );
  }
}

export default ProgressBar;
