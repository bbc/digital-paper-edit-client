/* eslint-disable react/prop-types */
import React from 'react';
import VideoContextViewer from './VideoContextViewer';
import VideoContextProgressBar from './VideoContextProgressBar';
import VideoContextControls from './VideoContextControls';
import Row from 'react-bootstrap/Row';

class PreviewCanvas extends React.PureComponent {

  constructor(props) {
    const { playlist = [], programmeScript = [] } = props; // default initiated to []

    super(props);

    this.height = this.props.height;
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
            height={ this.height }
          />
        </Row>
        <Row
          className={ 'justify-content-center' }
          style={ { backgroundColor: 'lightgrey' } }
        >
          <VideoContextProgressBar
            videoContext={ this.videoContext }
          />
        </Row>
        <Row
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
