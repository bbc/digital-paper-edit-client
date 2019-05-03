import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import { shortTimecode } from '@bbc/react-transcript-editor/timecodeConverter';

import styles from './index.module.css';

class Paragraphs extends Component {

  // for accassibility, being able to
  // move with tabs and press enter on
  // timecode to start playing from that point
  handleKeyDownTimecodes =(e) => {
    if (e.key === 'Enter') {
      this.props.handleTimecodeClick(e);
    }
  }

  handleKeyDownWords =(e) => {
    if (e.key === 'Enter') {
      this.props.handleWordClick(e);
    }
  }

  render() {
    let text;
    // TODO: change API end point to return transcript already formatted like this
    // and not in Kaldi format
    const words = this.props.transcriptJson.words.map(word => {
      return {
        index: word.index,
        start: word.start,
        end: word.end,
        text: word.text
      };
    });
    // Breaking down by punctuation can be done client side
    // might need to use a sentence boundary detection
    // later on to optimise. eg to avoid breaking U.S.A. on 3 lines
    const paragraphs = [];
    let pragraph = [];
    words.forEach(word => {
      if (word.text.includes('.')) {
        pragraph.push(word);
        paragraphs.push(pragraph);
        pragraph = [];
      } else {
        pragraph.push(word);
      }
    });

    text = paragraphs.map((paragraph, index) => {
      const paragraphText = paragraph
        .map(word => {
          return word.text;
        })
        .join(' ')
        // TODO: make helper function in Util - removePunctuation
        .replace(/\.|\?|\!|\,|\;/, '')
        .toLowerCase() ;

      // TODO: handle/refactor search/Display to add support for filter results by speaker and labels
      const paragraphDisplayPreference = !paragraphText.includes(this.props.searchString.toLowerCase()) ? { display: 'none' } : { };
      // styles to separate the look of non contiguous paragraphs?
      paragraphDisplayPreference.borderStyle = 'dashed' ;
      paragraphDisplayPreference.borderWidth = '0.01em';
      paragraphDisplayPreference.borderColor = 'lightgray';
      paragraphDisplayPreference.padding = '0.5em';

      const popover = (
        <Popover id="popover-basic" title="Popover right">
          And here's some <strong>amazing</strong> content. It's very engaging. right?
        </Popover>
      );

      const Example = (words) => (
        <OverlayTrigger trigger="click" placement="right" overlay={ popover }>
          <Button variant="success" size="sm">Click me to see</Button>
        </OverlayTrigger>
      );

      return (

        <div
          style={ this.props.showParagraphsMatchingSearch ? paragraphDisplayPreference : {} }
          className="paragraph"
          key={ 'key_' + index }
          data-paragraph-text={ paragraphText }
        >
          <Row key={ 'key_' + index }>
            <Col xs={ 8 } sm={ 8 } md={ 3 } lg={ 3 } xl={ 2 }>
              <span className={ [ styles.speaker, styles.unselectable ].join(' ') }
                tabIndex="0"
              >Speaker Long Name   </span>
            </Col>
            <Col xs={ 4 } sm={ 4 } md={ 2 } lg={ 2 } xl={ 1 }
              style={ { padding: '0em', textAlign: 'center' } }
              className={ styles.unselectable }>
              {/* TODO: convert timecode, with @bbc/react-transcript-editor util */}
              <span
                style={ { cursor: 'pointer', width: '100%' } }
                data-start={ paragraph[0].start } className={ 'timecode' }
                tabIndex="0"
                onKeyDown={ this.handleKeyDownTimecodes }>
                { shortTimecode(paragraph[0].start) }
              </span>
            </Col>
            {/* <Example/> */}
            <Col xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 } xl={ 9 } >
              {paragraph.map(word => {
                return (
                  <span
                    className={ [ 'words'
                      // , styles.highlightedWord
                    ].join(' ') }
                    data-start={ word.start }
                    // TODO: make/Use helper function in Util - removePunctuation
                    data-text={ word.text
                      .replace(/\.|\?|\!|\,|\;/, '')
                      .toLowerCase() }
                    data-end={ word.end }
                    key={ 'key_' + word.index + '_' + word.end }
                    tabIndex="0"
                    role="button"
                    aria-pressed="false"
                    onKeyDown={ this.handleKeyDownWords }
                  >
                    {word.text}{' '}
                  </span>
                );
              })}
            </Col>
          </Row>
        </div>
      );
    });

    return (
      <>
        { text }
      </>
    );
  }
}

export default Paragraphs;