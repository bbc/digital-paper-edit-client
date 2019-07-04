import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <p className={ 'text-secondary' }>
        <FontAwesomeIcon icon={ faStickyNote } /> { this.props.text }
      </p>
    );
  }
}

export default Note;
