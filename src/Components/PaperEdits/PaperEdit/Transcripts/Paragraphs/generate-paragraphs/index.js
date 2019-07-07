import React from 'react';
import removePunctuation from '../../../../../../Util/remove-punctuation/index.js';
import splitParagraphByAnnotation from './split-paragraph-by-annotation.js';
import findAnnotationInParagraph from './find-annotation-in-paragraph.js';
import groupWordsInParagraphsBySpeakers from './group-words-by-speakers.js';

import Paragraph from './Paragraph.js';
import Words from './Words.js';
import AnnotationOverlayTrigger from './AnnotationOverlayTrigger.js';
import computeParagraphDisplayPreference from './compute-paragraph-display-preference.js';

function generateParagraphs(props) {
  let wordsElements;
  let paragraphDisplayPreference = {};
  const { annotations, transcriptId } = props;

  /**
   *  Group words into paragraphs
   *
   * TODO: Breaking down words in paragraphs could be done
   * client side or server side?
   * using paragraphs attribute of transcript json
   */
  const paragraphsWithWordsSpeakerText = groupWordsInParagraphsBySpeakers(
    props.transcriptJson.words,
    props.transcriptJson.paragraphs
  );

  /**
   * Loop over paragraphs
   */
  const textResult = paragraphsWithWordsSpeakerText.map((paragraph, index) => {
    /* Paragraph text for data attribute for searches, without punctuation */
    const paragraphTextWithoutPunctuation = removePunctuation(paragraph.text);
    // TODO: something around paragraph, start and end time, included or overlappng in labels start and end time
    // to do the filtering

    /**
     * find Annotation In Paragraph
     * findAnnotationInParagraph returns false if it doesn't find any
     */
    const annotation = findAnnotationInParagraph(annotations, paragraph.words);
    // console.log('annotation', annotation);
    const isTextSearch = paragraphTextWithoutPunctuation.includes(props.searchString.toLowerCase());

    let isSpeakerSearch = false;
    if (props.selectedOptionSpeakerSearch.length !== 0) {
      // checks speaker against list of speakers in search,
      // TODO: Down case comparison or use speaker ID?
      if (props.selectedOptionSpeakerSearch.find((spk) => {return spk.label === paragraph.speaker; })) {
        isSpeakerSearch = true;
      }
    }
    else {
      isSpeakerSearch = true;
    }

    let isLabelSearch = false;
    if (props.selectedOptionLabelSearch.length !== 0) {
      // checks label against list of speakers in search,
      if (props.selectedOptionLabelSearch.find((lb) => {return lb.id === annotation.labelId; })) {
        isLabelSearch = true;
      }
    }
    else {
      isLabelSearch = true;
    }
    paragraphDisplayPreference = computeParagraphDisplayPreference(isTextSearch, isSpeakerSearch, isLabelSearch);

    /**
     * Annotation In Paragraph - if present
     *
     * splitParagraphByAnnotation returns false if it doesn't find any.
     * but we have already checked in previous line with `findAnnotationInParagraph`
     */
    if (annotation) {
      const {
        wordsBefore,
        wordsInAnnotation,
        wordsAfter
      } = splitParagraphByAnnotation(annotation, paragraph.words);

      const wordsBeforeEl = wordsBefore ? (
        <Words
          transcriptId={ transcriptId }
          speaker={ paragraph.speaker }
          key={ 'key-' + index }
          paragraph={ wordsBefore }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
        />
      ) : null;

      const wordsInAnnotationEl = (
        <Words
          transcriptId={ transcriptId }
          speaker={ paragraph.speaker }
          key={ 'key--' + index }
          paragraph={ wordsInAnnotation }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
        />
      );

      const wordsAfterEl = wordsAfter ? (
        <Words
          transcriptId={ transcriptId }
          speaker={ paragraph.speaker }
          key={ 'key---' + index }
          paragraph={ wordsAfter }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
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
          transcriptId={ transcriptId }
          speaker={ paragraph.speaker }
          key={ 'key-----' + index }
          // TODO: rename to wordsInParagraph? or ListOfWords?
          paragraph={ paragraph.words }
          handleKeyDownWords={ e => {
            return e.key === 'Enter' ? props.handleWordClick(e) : null;
          } }
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
        wordsElements={ wordsElements }
      />
    );
  });

  return textResult;
}

export default generateParagraphs;
