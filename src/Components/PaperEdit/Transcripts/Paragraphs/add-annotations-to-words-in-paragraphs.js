const isAnnotationWithinWord = ( annotations, wordStartTime, wordEndTime) => {
//   console.log('annotations', annotations, wordStartTime, wordEndTime);
  const results = annotations.find(annotation => {
    return (
      wordStartTime >= annotation.start &&
        wordEndTime <= annotation.end
    );
  });
  //   console.log('isAnnotationWithinWord-results', results);

  return results;
};

const addAnnotationToWordsInOneParagraph = (words, annotations) => {
  return words.map((word) => {
    const annotationForWord = isAnnotationWithinWord(annotations, word.start, word.end);
    if (annotationForWord) {
      word.annotation = annotationForWord;
      // console.log(word.annotation);
    }
    else {
      // this is needed, for when a annotation is being removed from a word
      delete word.annotation;
    }

    return word;
  });

};

const addAnnotationsToWordsInParagraphs = (paragraphsWithWordsSpeakerText, annotations) => {
  return paragraphsWithWordsSpeakerText.map(paragraph => {
    paragraph.words = addAnnotationToWordsInOneParagraph(paragraph.words, annotations);

    return paragraph;
  });
};

export default addAnnotationsToWordsInParagraphs;