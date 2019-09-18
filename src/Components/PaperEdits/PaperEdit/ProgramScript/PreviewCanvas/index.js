/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import VideoContextPreview from './VideoContextPreview';

const PreviewCanvas = (props) => {
  const canvasRef = useRef();

  return (
    <VideoContextPreview
      canvasRef={ canvasRef }
      playlist={ props.playlist }
    />
  );
};

PreviewCanvas.defaultProps = {
  playlist: []
};

export default PreviewCanvas;
