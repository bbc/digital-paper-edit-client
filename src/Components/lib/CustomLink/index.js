import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function LinkWrapper(props) {
  return (
    <>
      <Button color="primary" component={Link} to={`${props.to}`} disabled={props.disabled ? props.disabled : false}>
        {props.children}
      </Button>
    </>
  );
}
export default LinkWrapper;
