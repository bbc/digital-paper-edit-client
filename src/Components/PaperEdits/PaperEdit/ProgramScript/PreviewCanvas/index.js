/* eslint-disable react/prop-types */
import React from 'react';
import VideoContextViewer from './VideoContextViewer';
import VideoContextProgressBar from './VideoContextProgressBar';
import VideoContextControls from './VideoContextControls';
import Row from 'react-bootstrap/Row';

class PreviewCanvas extends React.PureComponent {

  constructor(props) {
    const { playlist = [], width = 640 } = props;

    super(props);

    this.width = width;
    this.height = (9 / 16) * this.width;

    this.playlist = playlist;
    this.videoContextRef = React.createRef();
  }

  componentDidMount() {
    this.videoContext =
      this.videoContextRef
      && this.videoContextRef.current
      && this.videoContextRef.current.videoContext;

    this.forceUpdate();
  }

  render() {
    return (
      <>
        <Row
          className={ 'justify-content-center' }
          style={ { backgroundColor: 'black' } }
        >
          <VideoContextViewer
            ref={ this.videoContextRef }
            playlist={ this.playlist }
            width={ this.width }
            height={ this.height }
          />
        </Row>
        <Row
          className={ 'justify-content-center' }
          style={ { backgroundColor: 'lightgrey' } }
        >
          <VideoContextProgressBar
            width={ this.width }
            videoContext={ this.videoContext && this.videoContext }
          />
        </Row>
        <Row
          // noGutters
          // className={ 'justify-content-center' }
          style={
            {
              marginTop: '0.4em'
            }
          }
        >
          <VideoContextControls
            videoContext={ this.videoContext && this.videoContext }
          />
        </Row>
      </>
    );
  }
};

export default PreviewCanvas;
