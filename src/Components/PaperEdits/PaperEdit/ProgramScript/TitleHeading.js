import React, { Component } from 'react';

class TitleHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <h4>{this.props.title}</h4>
    );
  }
}

export default TitleHeading;
