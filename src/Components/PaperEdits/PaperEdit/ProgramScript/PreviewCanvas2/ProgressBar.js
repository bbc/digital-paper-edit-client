import React from 'react';
import Filler from './Filler';

const ProgressBar = (props) => {

  return (
    <div onClick={ props.onClick }
      style={ {
        position: 'relative',
        height: '12px',
        width: '100%',
        opacity: '1'
      } } >
      <Filler percentage={ props.percentage }></Filler>
    </div>

  );
};
export default ProgressBar;
