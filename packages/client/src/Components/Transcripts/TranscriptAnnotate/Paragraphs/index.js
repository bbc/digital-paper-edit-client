import React, { Component } from 'react';
import generateParagraphs from './generate-paragraphs/index.js';

class Paragraphs extends Component {
  // for accessibility, being able to
  // move with tabs and press enter on
  // timecode to start playing from that point
  handleKeyDownTimecodes = e => {
    if (e.key === 'Enter') {
      this.props.handleTimecodeClick(e);
    }
  };

  handleKeyDownWords = e => {
    if (e.key === 'Enter') {
      this.props.handleWordClick(e);
    }
  };

  generateParagraphsEl = ( ) => {
    const textResult = generateParagraphs(this.props);

    return textResult;
  }

  render() {

    return (
      <>
        {this.generateParagraphsEl()}
      </>
    );
  }
}

export default Paragraphs;
