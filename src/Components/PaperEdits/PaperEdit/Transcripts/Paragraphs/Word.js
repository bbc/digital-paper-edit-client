import React, { Component } from 'react';
// import removePunctuation from '../../../../../../Util/remove-punctuation/index.js';
import removePunctuation from '../../../../../Util/remove-punctuation/index.js';

class Word extends Component {
  render() {
    const { transcriptId, speaker, word } = this.props;
    // console.log('this.props.paragraph', this.props.transcriptId);
    // const result = this.props.paragraph.map(word => {

    return (
      <span
        title={ `start:${ word.start } - end:${ word.end }` }
        className={ [ 'words'
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