import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { shortTimecode } from '@bbc/react-transcript-editor/timecodeConverter';
import splitParagraphByAnnotation from './split-paragraph-by-annotation.js';
import Words from './Words.js';
import styles from './index.module.css';
import removePunctuation from '../../../../Util/remove-punctuation/index.js';
import CustomOverlayTrigger from './CustomOverlayTrigger.js';
import findAnnotationInParagraph from './find-annotation-in-paragraph.js';
class Paragraphs extends Component {

  // for accessibility, being able to
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
    let textResult;
    let paragraphElement;
    const { annotations } = this.props;
    // console.log('annotations ', annotations);
    // TODO: change API end point to return transcript already formatted like this
    // and not in Kaldi format
    const words = this.props.transcriptJson.words.map(word => {
      return {
        index: word.id,
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

    textResult = paragraphs.map((paragraph, index) => {
      const paragraphText = paragraph
        .map(word => {
          return removePunctuation(word.text);
        })
        .join(' ');

      // TODO: handle/refactor search/Display to add support for filter results by speaker and labels

      // let paragraphDisplayPreferenceIncludesLabel;
      // TODO: handle support for multiple annotation
      const paragraphDisplayPreference = !paragraphText.includes(this.props.searchString.toLowerCase()) ? { display: 'none' } : { };
      // styles to separate the look of non contiguous paragraphs?
      paragraphDisplayPreference.borderStyle = 'dashed' ;
      paragraphDisplayPreference.borderWidth = '0.01em';
      paragraphDisplayPreference.borderColor = 'lightgray';
      paragraphDisplayPreference.padding = '0.5em';

      // TODO: something around paragraph, start and end time, included or overlappng in labels start and end time
      // to do the filtering

      // TODO: handle if it returns false
      const annotation = findAnnotationInParagraph(annotations, paragraph);
      // console.log('paragrah annotation ', annotation);
      if (annotation) {
        // annotation.labelId
        // paragraphDisplayPreferenceIncludesLabel =
        // const annotation = {
        //   'id': 2,
        //   'start':14.38,
        //   'end': 18.14,
        //   'labelId': 1,
        //   'note': 'optional example text description for an annotation - TEST 1'
        // };
        // this.state.annotations
        const paragraphSplitByAnnotation = splitParagraphByAnnotation(annotation, paragraph);
        // <Example text="some text" />;
        // console.log('paragraph:: ', JSON.stringify(paragraph, null, 2));

        if (paragraphSplitByAnnotation) {
        // spread paragraphSplitByAnnotation to get before, annotations, and after
          const wordsBefore = <Words
            paragraph={ paragraphSplitByAnnotation.before }
            handleKeyDownWords={ this.handleKeyDownWords }
          />;

          const annotatatedWords = <Words
            paragraph={ paragraphSplitByAnnotation.annotations }
            handleKeyDownWords={ this.handleKeyDownWords }
          />;

          const wordsAfter = <Words
            paragraph={ paragraphSplitByAnnotation.after }
            handleKeyDownWords={ this.handleKeyDownWords }
          />;

          // TODO: uncomment when ready
          // annotation = paragraphSplitByAnnotation.annotation

          paragraphElement = [ wordsBefore,
          // eslint-disable-next-line react/jsx-key
            <CustomOverlayTrigger
              words={ annotatatedWords }
              labelsOptions={ this.props.labelsOptions }
              annotationLabelId={ annotation.labelId }
              annotationId={ annotation.id }
              annotationNote={ annotation.note }
              handleDeleteAnnotation={ this.props.handleDeleteAnnotation }
              handleEditAnnotation={ this.props.handleEditAnnotation }
            />,
            wordsAfter ];
        }
        // if there are no annotations in this paragraph
        else {
          paragraphElement = <Words
            paragraph={ paragraph }
            handleKeyDownWords={ this.handleKeyDownWords }
          />;
        }
      } else {
        paragraphElement = <Words
          paragraph={ paragraph }
          handleKeyDownWords={ this.handleKeyDownWords }
        />;
      }

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
              {paragraphElement}
            </Col>
          </Row>
        </div>
      );
    });

    return (
      <>
        { textResult }
      </>
    );
  }
}

export default Paragraphs;