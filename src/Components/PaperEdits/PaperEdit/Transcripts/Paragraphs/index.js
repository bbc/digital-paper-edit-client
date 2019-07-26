import React, { Component } from 'react';
// import generateParagraphs from './generate-paragraphs/index.js';
import groupWordsInParagraphsBySpeakers from './group-words-by-speakers.js';
import findAnnotationInParagraph from './find-annotation-in-paragraph.js';
import Paragraph from './Paragraph.js';
import Word from './Word.js';
import AnnotationOverlayTrigger from './AnnotationOverlayTrigger.js';
import computeParagraphDisplayPreference from './compute-paragraph-display-preference.js';
import addAnnotationsToWordsInParagraphs from './add-annotations-to-words-in-paragraphs.js';
// import removePunctuation from '../../../../../Util/remove-punctuation.js';
const removePunctuation = (string) => {
  return string.replace(/\.|\?|!|,|;/, '').toLowerCase() ;
};

class Paragraphs extends Component {
  // for accessibility, being able to
  // move with tabs and press enter on
  // timecode to start playing from that point

  // shouldComponentUpdate = () => {
  //   return true;
  // }
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

  // generateParagraphsEl = () => {
  render() {
    let wordsElements;
    let paragraphDisplayPreference = {};
    // const props = this.props;
    // const transcriptId = props.transcriptId;
    // const annotations = props.annotations;

    /**
     *  Group words into paragraphs
     *
     * TODO: Breaking down words in paragraphs could be done
     * client side or server side?
     * using paragraphs attribute of transcript json
     */
    // console.log('this.props.transcriptJson.words', this.props.transcriptJson.words);
    // console.log('this.props.transcriptJson.paragraphs', this.props.transcriptJson.paragraphs);

    const paragraphsWithWordsSpeakerText = groupWordsInParagraphsBySpeakers(
      this.props.transcriptJson.words,
      this.props.transcriptJson.paragraphs
    );
    // console.log('paragraphsWithWordsSpeakerText', paragraphsWithWordsSpeakerText);

    const paragraphWithWordsSpeakersAndAnnotations = addAnnotationsToWordsInParagraphs(paragraphsWithWordsSpeakerText, this.props.annotations);
    /**
     * Loop over paragraphs
     */
    const textResult = paragraphWithWordsSpeakersAndAnnotations.map((paragraph, index) => {
      const annotationInCurrentParagraph = findAnnotationInParagraph(this.props.annotations, paragraph.words);
      /* Paragraph text for data attribute for searches, without punctuation */
      const paragraphTextWithoutPunctuation = removePunctuation(paragraph.text);
      const isTextSearch = paragraphTextWithoutPunctuation.includes(this.props.searchString.toLowerCase());
      let isSpeakerSearch = false;
      if (this.props.selectedOptionSpeakerSearch.length !== 0) {
        // checks speaker against list of speakers in search,
        // TODO: Downcase comparison or use speaker ID?
        if (this.props.selectedOptionSpeakerSearch.find((spk) => {return spk.label === paragraph.speaker; })) {
          isSpeakerSearch = true;
        }
      }
      else {
        isSpeakerSearch = true;
      }

      let isLabelSearch = false;
      if (this.props.selectedOptionLabelSearch.length !== 0) {
        // checks label against list of speakers in search,
        if (this.props.selectedOptionLabelSearch.find((lb) => {return lb.id === annotationInCurrentParagraph.labelId; })) {
          isLabelSearch = true;
        }
      }
      else {
        isLabelSearch = true;
      }
      paragraphDisplayPreference = computeParagraphDisplayPreference(isTextSearch, isSpeakerSearch, isLabelSearch);

      /**
       * find Annotation In Paragraph/words
       */
      wordsElements = paragraph.words.map((word, index) => {
        let result;
        const wordEl = (<Word
          transcriptId={ this.props.transcriptId }
          speaker={ paragraph.speaker }
          key={ 'key--' + index }
          word={ word }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? this.props.handleWordClick(e) : null;
          } }
        />);

        if (word.annotation) {
          // const { annotation } = word;
          result = <AnnotationOverlayTrigger
            key={ 'key----' + index }
            words={ wordEl }
            labelsOptions={ this.props.labelsOptions }
            annotationLabelId={ word.annotation.labelId }
            annotationId={ word.annotation.id }
            annotationNote={ word.annotation.note }
            handleDeleteAnnotation={ this.props.handleDeleteAnnotation }
            handleEditAnnotation={ this.props.handleEditAnnotation }
          />;
        }
        else {
          result = wordEl;
        }

        return result;
      });

      /**
       * Create a Paragraph containing words, with or without annotation (overlay)
       */
      return (
        <Paragraph
          showParagraphsMatchingSearch={ this.props.showParagraphsMatchingSearch }
          paragraphDisplayPreference={ paragraphDisplayPreference }
          key={ 'key------' + index }
          paragraphTextWithoutPunctuation={ paragraphTextWithoutPunctuation }
          speakerName={ paragraph.speaker }
          paragraph={ paragraph.words }
          handleKeyDownTimecodes={ e => {
            return e.key === 'Enter' ? this.props.handleTimecodeClick(e) : null;
          } }
          wordsElements={ wordsElements }
        />
      );
    });

    return (
      <>
        {textResult}
      </>
    );
  }

}

export default Paragraphs;
