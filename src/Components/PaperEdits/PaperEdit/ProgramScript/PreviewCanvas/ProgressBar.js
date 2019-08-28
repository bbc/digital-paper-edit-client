import React from 'react';
import Filler from './Filler';
import styles from './VideoContextProgressBar.module.css';

const ProgressBar = (props) => {
  return (
    <div className={ styles.progressBar }>
      <Filler percentage={ props.percentage }></Filler>
    </div>

  );
};
export default ProgressBar;