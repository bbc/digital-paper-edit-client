import React from 'react';

const Filler = (props) => {
  return <div style={ {
    width: `${ props.percentage }%`,
    background: 'red',
    height: '100%',
    borderRadius: 'inherit'
  } } />;
};

export default Filler;
