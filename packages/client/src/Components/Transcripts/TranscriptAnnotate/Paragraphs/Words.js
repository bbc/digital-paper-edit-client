import React, { Component } from 'react';

import removePunctuation from '../../../../Util/remove-punctuation/index.js';
class Words extends Component {
  render() {
    const result = this.props.paragraph.map(word => {
      return (
        <span
          title={ `start:${ word.start } - end:${ word.end }` }
          className={ [ 'words'
            // , styles.highlightedWord
          ].join(' ') }
          data-start={ word.start }
          // TODO: make/Use helper function in Util - removePunctuation
          data-text={ removePunctuation(word.text) }
          data-end={ word.end }
          key={ 'key_' + word.index + '_' + word.end }
          // tabIndex="0"
          role="button"
          aria-pressed="false"
          onKeyDown={ this.props.handleKeyDownWords }
        >
          {word.text}{' '}
        </span>
      );
    });

    return (
      <>{result}</>

    );
  }
};

export default Words;