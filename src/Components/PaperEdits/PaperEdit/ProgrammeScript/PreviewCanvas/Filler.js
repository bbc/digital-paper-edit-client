import React from 'react';
import styles from './Filler.module.css';

const Filler = (props) => {
  return <div className={ styles.filler } style={ { width: `${ props.percentage }%` } }></div>;
};

export default Filler;