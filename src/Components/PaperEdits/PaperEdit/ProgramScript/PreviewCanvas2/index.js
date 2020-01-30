/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import VideoContextPreview from './VideoContextPreview';
import PropTypes from 'prop-types';

const PreviewCanvas = props => {
  const canvasRef = useRef();

  return (
    <VideoContextPreview
      width={ props.width }
      canvasRef={ canvasRef }
      playlist={ props.playlist }
    />
  );
};

PreviewCanvas.propTypes = {
  playlist: PropTypes.array,
  width: PropTypes.number
};

PreviewCanvas.defaultProps = {
  playlist: []
};

export default PreviewCanvas;
