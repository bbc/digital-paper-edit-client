import React, { Component } from 'react';
// import removePunctuation from '../../../../../../Util/remove-punctuation/index.js';
import removePunctuation from '../../../../../Util/remove-punctuation/index.js';

class Word extends Component {
  generatePreviousTimes = (start) => {
    let prevTimes = '';

    for (let i = 0; i < start; i++) {
      prevTimes += `${ i } `;
    }

    if (start % 1 > 0) {
      // Find the closest quarter-second to the current time, for more dynamic results
      const dec = Math.floor((start % 1) * 4.0) / 4.0;
      prevTimes += ` ${ Math.floor(start) + dec }`;
    }

    return prevTimes;
  }
  render() {
    const { transcriptId, speaker, word } = this.props;
    // console.log('this.props.paragraph', this.props.transcriptId);
    // const result = this.props.paragraph.map(word => {

    return (
      <span
        title={ `start:${ word.start } - end:${ word.end }` }
        data-prev-times = { this.generatePreviousTimes( word.start) }
        className={ [ 'words',
          // , styles.highlightedWord
        ].join(' ') }
        data-start={ word.start }
        // TODO: make/Use helper function in Util - removePunctuation
        data-text={ removePunctuation(word.text) }
        // data-text={ word.text }
        data-end={ word.end }
        data-transcript-id={ transcriptId }
        data-speaker={ speaker }
        key={ 'key_' + word.id + '_' + word.end }
        // tabIndex="0"
        role="button"
        aria-pressed="false"
        onKeyDown={ this.props.handleKeyDownWords }
      >
        {word.text}{' '}
      </span>
    );
    // });

    // return (
    //   <>{result}</>

    // );
  }
};

export default Word;