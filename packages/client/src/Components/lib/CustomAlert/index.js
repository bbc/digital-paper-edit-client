import React from 'react';
import Alert from 'react-bootstrap/Alert';

function CustomAlert(props) {
  return (
    <Alert variant={ props.variant }>
      {props.heading ? <Alert.Heading>{props.heading}</Alert.Heading> : ''}
      {props.message}
    </Alert>
  );
}

export default CustomAlert;
