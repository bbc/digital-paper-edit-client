/**
 * Problem this module solves
 * is given a list of words as a paragraph, it can segment
 * it based on an annotation with start and end time
 * Work in progress
```
const paragraph = [
  {
    index: 1706,
    start: 702.17,
    end: 702.37,
    text: "Their"
  },
  {
    index: 1707,
    start: 702.62,
    end: 703.26,
    text: "reflections"
  },
  {
    index: 1708,
    start: 703.26,
    end: 703.36,
    text: "of"
  },
  {
    index: 1709,
    start: 703.36,
    end: 703.45,
    text: "our"
  },
  {
    index: 1710,
    start: 703.45,
    end: 703.63,
    text: "own"
  },
  {
    index: 1711,
    start: 703.63,
    end: 704.34,
    text: "humanity."
  }
];
```
* and an annotation
```
const annotation = {
  start: 702.62,
  end: 703.45,
  labelId: 0,
  note: "optional example text description for an annotation"
};
```
* it returns
```
{
  before: [{ index: 1706, start: 702.17, end: 702.37, text: "Their" }],
  annotations: [
    { index: 1707, start: 702.62, end: 703.26, text: "reflections" },
    { index: 1708, start: 703.26, end: 703.36, text: "of" }
  ],
  after: [
    { index: 1710, start: 703.45, end: 703.63, text: "own" },
    { index: 1711, start: 703.63, end: 704.34, text: "humanity." }
  ]
}
```
* TODO: add tests for this function
*/

/**
 * Checks if end of an annotation is included in a paragraph
 */
// const paragraphIncludesStartOfAnnotation = (annotation, paragraph) => {
//   // find returns undefined if it doesn't find anything
//   const startWord = paragraph.find(w => {
//     return annotation.start == w.start;
//   });
//   // find returns undefined if it doesn't find anything
//   if (startWord) {
//     return true;
//   }

//   return false;
// };

/**
 * Helper function
 * Checks if start of an annotation is included in a paragraph
 */
// const paragraphIncludesEndOfAnnotation = (annotation, paragraph) => {
//   const endWord = paragraph.find(w => {
//     return annotation.end == w.end;
//   });
//   // find returns undefined if it doesn't find anything
//   if (endWord) {
//     return true;
//   }

//   return false;
// };

/**
 * Helper function
 * Checks if an annotation is included in a paragraph
 */
// const paragraphIncludesAnnotation = (annotation, paragraph) => {
//   if (
//     paragraphIncludesStartOfAnnotation(annotation, paragraph) &&
//     paragraphIncludesEndOfAnnotation(annotation, paragraph)
//   ) {
//     return true;
//   }

//   return false;
// };
/**
 *
 */
const getWordsBeforeAnnotation = (annotation, paragraph) => {
  // TODO: move these in annotation
  // const paragraphFirstWordTime = paragraph[0].start;
  // const paragraphLastWordTime = paragraph[paragraph.length - 1].end;
  // if (annotation.start >= paragraphFirstWordTime &&
  //   annotation.start <= paragraphLastWordTime) {
  //   return paragraph;
  // }
  ///////////////////////////////////////////////////////////
  const paragraphFilterBeforeSelection = paragraph.filter(w => {
    return annotation.start > w.start;
  });
  if (paragraphFilterBeforeSelection.length === 0) {
    return false;
  }

  return paragraphFilterBeforeSelection;
};

/**
 *
 */
const getWordsAfterAnnotation = (annotation, paragraph) => {
  // TODO: move these in annotation
  // const paragraphFirstWordTime = paragraph[0].start;
  // const paragraphLastWordTime = paragraph[paragraph.length - 1].end;
  // if ( annotation.end >= paragraphFirstWordTime &&
  //     annotation.end <= paragraphLastWordTime) {
  //   return paragraph;
  // }
  ///////////////////////////////////////////////////////////
  const paragraphFilterBeforeSelection = paragraph.filter(w => {
    return annotation.end < w.end;
  });
  if (paragraphFilterBeforeSelection.length === 0) {
    return false;
  }

  return paragraphFilterBeforeSelection;
};

/**
 *
 */
const getWordsInAnnotation = (annotation, paragraph) => {
  ///////////////////////////////////////////////////////
  // Case 4 - annotation spans across the current paragraph  but starts in previous one and ends in subsequent one
  // if annotation spans across paragraph - return paragraph
  // const paragraphFirstWordTime = paragraph[0].start;
  // const paragraphLastWordTime = paragraph[paragraph.length - 1].end;
  // if (annotation.start <= paragraphFirstWordTime && annotation.end >= paragraphLastWordTime) {
  //   return paragraph;
  // }
  ///////////////////////////////////////////////////////
  // index for start
  const startWord = paragraph.find(w => {
    return annotation.start === w.start;
  });
  const startIndex = paragraph.indexOf(startWord);
  // index for end
  const endWord = paragraph.find(w => {
    return annotation.end === w.end;
  });
  const endIndex = paragraph.indexOf(endWord);

  //  endIndex + 1 because end not included in slice()
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  return paragraph.slice(startIndex, endIndex + 1);
};

/**
 * Annotation have start and end time
 * paragrap has a list of words with start and end times
 * @param {object} annotation
 * @param {float} annotation.start - time in seconds
 * @param {float} annotation.end - time in seconds
 * @param {int} annotation.labelId
 * @param {string} annotation.note
 * @param {array} paragraph - list of words
 * @param {object} paragraph[] - word object
 * @param {int} paragraph[].index - word id
 * @param {float} paragraph[].start - word start time
 * @param {float} paragraph[].end - word end time
 * @param {string} paragraph[].text - word's text
 *
 * @returns - example output - object with words divided into 3 groups, under attribute, before, annotations, after
```json
{
  before: [{ index: 1706, start: 702.17, end: 702.37, text: "Their" }],
  annotations: [
    { index: 1707, start: 702.62, end: 703.26, text: "reflections" },
    { index: 1708, start: 703.26, end: 703.36, text: "of" }
  ],
  after: [
    { index: 1710, start: 703.45, end: 703.63, text: "own" },
    { index: 1711, start: 703.63, end: 704.34, text: "humanity." }
  ]
}
```
 *
 */
const splitParagraphByAnnotation = (annotation, paragraph) => {
  // if (paragraphIncludesAnnotation(annotation, paragraph)) {
  return {
    // slice before
    wordsBefore: getWordsBeforeAnnotation(annotation, paragraph),
    // slice between
    wordsInAnnotation: getWordsInAnnotation(annotation, paragraph),
    // slice after
    wordsAfter: getWordsAfterAnnotation(annotation, paragraph)
  };
  // }

  // return false;
};

export default splitParagraphByAnnotation;