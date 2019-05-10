import React, { Component } from 'react';
import splitParagraphByAnnotation from './split-paragraph-by-annotation.js';
import Words from './Words.js';
import removePunctuation from '../../../../Util/remove-punctuation/index.js';
import AnnotationOverlayTrigger from './AnnotationOverlayTrigger.js';
import findAnnotationInParagraph from './find-annotation-in-paragraph.js';
import Paragraph from './Paragraph.js';

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
    let paragraphElement;
    const { annotations } = this.props;
    const words = this.props.transcriptJson.words;
    // TODO: Breaking down by punctuation could be done client side or server side
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

    const textResult = paragraphs.map((paragraph, index) => {
      const paragraphText = paragraph.map(word => {
        return removePunctuation(word.text);
      }).join(' ');

      // TODO: handle/refactor search/Display to add support for filter results by speaker and labels
      // TODO: handle support for multiple annotation
      const paragraphDisplayPreference = !paragraphText.includes(this.props.searchString.toLowerCase()) ? { display: 'none' } : { };
      // styles to separate the look of non contiguous paragraphs?
      paragraphDisplayPreference.borderStyle = 'dashed' ;
      paragraphDisplayPreference.borderWidth = '0.01em';
      paragraphDisplayPreference.borderColor = 'lightgray';
      paragraphDisplayPreference.padding = '0.5em';

      // TODO: something around paragraph, start and end time, included or overlappng in labels start and end time
      // to do the filtering

      // findAnnotationInParagraph returns false if it doesn't find any
      const annotation = findAnnotationInParagraph(annotations, paragraph);
      if (annotation) {
        // splitParagraphByAnnotation returns false if it doesn't find any.
        // but we have already checked in previous line with `findAnnotationInParagraph`
        const { wordsBefore, wordsInAnnotation, wordsAfter } = splitParagraphByAnnotation(annotation, paragraph);

        const wordsBeforeEl = wordsBefore ? <Words
          key={ 'key-' + index }
          paragraph={ wordsBefore }
          handleKeyDownWords={ this.handleKeyDownWords }
        /> : null;

        const wordsInAnnotationEl = <Words
          key={ 'key--' + index }
          paragraph={ wordsInAnnotation }
          handleKeyDownWords={ this.handleKeyDownWords }
        />;

        const wordsAfterEl = wordsAfter ? <Words
          key={ 'key---' + index }
          paragraph={ wordsAfter }
          handleKeyDownWords={ this.handleKeyDownWords }
        /> : null;

        paragraphElement = [ wordsBeforeEl,
          <AnnotationOverlayTrigger
            key={ 'key----' + index }
            words={ wordsInAnnotationEl }
            labelsOptions={ this.props.labelsOptions }
            annotationLabelId={ annotation.labelId }
            annotationId={ annotation.id }
            annotationNote={ annotation.note }
            handleDeleteAnnotation={ this.props.handleDeleteAnnotation }
            handleEditAnnotation={ this.props.handleEditAnnotation }
          />,
          wordsAfterEl ];
      } else {
        paragraphElement = <Words
          key={ 'key-----' + index }
          paragraph={ paragraph }
          handleKeyDownWords={ this.handleKeyDownWords }
        />;
      }

      return (

        // TODO: could be extracted as separate component Paragraph?
        <Paragraph
          showParagraphsMatchingSearch={ this.props.showParagraphsMatchingSearch }
          paragraphDisplayPreference={ paragraphDisplayPreference }
          key={ 'key------' + index }
          paragraphText={ paragraphText }
          speakerName={ 'some speaker name' }
          paragraph={ paragraph }
          handleKeyDownTimecodes={ this.handleKeyDownTimecodes }
          paragraphElement={ paragraphElement }
        />

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