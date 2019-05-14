import React from 'react';
import removePunctuation from '../../../../../Util/remove-punctuation/index.js';
import splitParagraphByAnnotation from './split-paragraph-by-annotation.js';
import findAnnotationInParagraph from './find-annotation-in-paragraph.js';
import groupWordsInParagraphsBySpeakers from './group-words-by-speakers.js';

import Paragraph from './Paragraph.js';
import Words from './Words.js';
import AnnotationOverlayTrigger from './AnnotationOverlayTrigger.js';

function computeParagraphDisplayPreference(isTextSearch, isSpeakerSearch, isLabelSearch) {
  let displayPreference = {};
  if (!isTextSearch) {
    displayPreference = { display: 'none' };
  }
  if (!isSpeakerSearch) {
    displayPreference = { display: 'none' };
  }
  if (!isLabelSearch) {
    displayPreference = { display: 'none' };
  }

  return displayPreference;
}

function generateParagraphs(props) {
  let wordsElements;
  let paragraphDisplayPreference = {};
  const { annotations } = props;

  /**
   *  Group words into paragraphs
   */
  // TODO: Breaking down words in paragraphs could be done
  // client side or server side?
  // using paragraphs attribute of transcript json

  // if (props.transcriptJson.paragraphs) {
  const paragraphsWithWordsSpeakerText = groupWordsInParagraphsBySpeakers(
    props.transcriptJson.words,
    props.transcriptJson.paragraphs
  );

  /**
   * Loop over paragraphs
   */
  const textResult = paragraphsWithWordsSpeakerText.map((paragraph, index) => {
    // console.log(paragraph);
    /* Paragraph text for data attribute for searches, without punctuation */
    const paragraphTextWithoutPunctuation = removePunctuation(paragraph.text);

    /**
     *  Paragraph text search
     */
    // TODO: handle support for multiple annotation
    // let paragraphDisplayPreference = !paragraphTextWithoutPunctuation.includes(
    //   props.searchString.toLowerCase()
    // )
    //   ? { display: 'none' }
    //   : {};

    /**
     * Paragraph contains speaker(s) being search
     *
     * TODO: if paragraph does contains speaker(s) being search for then display node
     * if no speaker being searched for then ignore
     */

    // if paragraph does not include speaker searched for --> display none
    // TODO: handle if not filter, showing only paragraphs matching criteria, how to display matches in context
    // console.log(
    //   'props.selectedOptionSpeakerSearch::',
    //   props.selectedOptionSpeakerSearch
    // );
    // if (props.selectedOptionSpeakerSearch.length !== 0) {
    //   paragraphDisplayPreference =
    //     paragraph.speaker !== props.selectedOptionSpeakerSearch[0].label
    //       ? { display: 'none' }
    //       : { };
    // }

    // TODO: something around paragraph, start and end time, included or overlappng in labels start and end time
    // to do the filtering

    /**
     * find Annotation In Paragraph
     */
    // findAnnotationInParagraph returns false if it doesn't find any
    const annotation = findAnnotationInParagraph(annotations, paragraph.words);

    /**
     *  Paragraph annotation label(s) search
     *
     * TODO: if paragraph does includes annotation label(s) searched for, then display none
     * if no annotation labels being searched ignore
     */

    // if paragraph does not include annotation searched for --> display none
    // console.log(
    //   'props.selectedOptionLabelSearch::',
    //   props.selectedOptionLabelSearch,
    //   'annotation::', annotation
    // );

    // if (annotation) {
    //   if (props.selectedOptionLabelSearch.length !== 0) {
    //   // If label is included in paragraph
    //     console.log(' annotation.labelId ', annotation.labelId, 'props.selectedOptionLabelSearch[0].id', props.selectedOptionLabelSearch[0].id);
    //     paragraphDisplayPreference =
    //   annotation.labelId !== props.selectedOptionLabelSearch[0].id
    //     ? { display: 'none' }
    //     : { };
    //   }
    // }
    // else {
    //   // paragraphDisplayPreference = { display: 'none' };
    // }

    const textSearch = paragraphTextWithoutPunctuation.includes(props.searchString.toLowerCase());

    let speakerSearch = false;
    if (props.selectedOptionSpeakerSearch.length !== 0) {
      // checks speaker against list of speakers in search,
      // TODO: Downcase comparison or use speaker ID?
      if (props.selectedOptionSpeakerSearch.find((spk) => {return spk.label === paragraph.speaker; })) {
      // if (paragraph.speaker === props.selectedOptionSpeakerSearch[0].label) {
        speakerSearch = true;
      }
    }
    else {
      speakerSearch = true;
    }

    let labelSearch = false;

    if (props.selectedOptionLabelSearch.length !== 0) {
      // checks label against list of speakers in search,
      if (props.selectedOptionLabelSearch.find((lb) => {return lb.id === annotation.labelId; })) {
      // if (annotation.labelId === props.selectedOptionLabelSearch[0].id) {
        labelSearch = true;
      }
    }
    else {
      labelSearch = true;
    }
    // isTextSearch, isSpeakerSearch, isLabelSearch
    paragraphDisplayPreference = computeParagraphDisplayPreference(textSearch, speakerSearch, labelSearch, labelSearch);

    /**
     * Annotation In Paragraph - if present
     */
    if (annotation) {

      // splitParagraphByAnnotation returns false if it doesn't find any.
      // but we have already checked in previous line with `findAnnotationInParagraph`
      const {
        wordsBefore,
        wordsInAnnotation,
        wordsAfter
      } = splitParagraphByAnnotation(annotation, paragraph.words);

      const wordsBeforeEl = wordsBefore ? (
        <Words
          key={ 'key-' + index }
          paragraph={ wordsBefore }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
          //   handleKeyDownWords={ this.handleKeyDownWords }
        />
      ) : null;

      const wordsInAnnotationEl = (
        <Words
          key={ 'key--' + index }
          paragraph={ wordsInAnnotation }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
          //   handleKeyDownWords={ this.handleKeyDownWords }
        />
      );

      const wordsAfterEl = wordsAfter ? (
        <Words
          key={ 'key---' + index }
          paragraph={ wordsAfter }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
          //   handleKeyDownWords={ this.handleKeyDownWords }
        />
      ) : null;

      wordsElements = [
        wordsBeforeEl,
        <AnnotationOverlayTrigger
          key={ 'key----' + index }
          words={ wordsInAnnotationEl }
          labelsOptions={ props.labelsOptions }
          annotationLabelId={ annotation.labelId }
          annotationId={ annotation.id }
          annotationNote={ annotation.note }
          handleDeleteAnnotation={ props.handleDeleteAnnotation }
          handleEditAnnotation={ props.handleEditAnnotation }
        />,
        wordsAfterEl
      ];
    } else {
      /**
       * if no annotation in paragraph
       */
      wordsElements = (
        <Words
          key={ 'key-----' + index }
          // TODO: rename to wordsInParagraph? or ListOfWords?
          paragraph={ paragraph.words }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
          //   handleKeyDownWords={ this.handleKeyDownWords }
        />
      );
    }

    /**
     * Create a Paragraph containing words, with or without annotation (overlay)
     */
    return (
      <Paragraph
        showParagraphsMatchingSearch={ props.showParagraphsMatchingSearch }
        paragraphDisplayPreference={ paragraphDisplayPreference }
        key={ 'key------' + index }
        paragraphTextWithoutPunctuation={ paragraphTextWithoutPunctuation }
        speakerName={ paragraph.speaker }
        paragraph={ paragraph.words }
        handleKeyDownTimecodes={ e => {
          return e.key === 'Enter' ? props.handleTimecodeClick(e) : null;
        } }
        // handleKeyDownTimecodes={ this.handleKeyDownTimecodes }
        wordsElements={ wordsElements }
      />
    );
  });

  return textResult;
}

export default generateParagraphs;
