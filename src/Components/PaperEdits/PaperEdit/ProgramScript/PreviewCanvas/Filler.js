import React from 'react';
import styles from './VideoContextProgressBar.module.css';

const Filler = (props) => {
  return <div className={ styles.filler } style={ { width: `${ props.percentage }%` } }></div>;
};

export default Filler;