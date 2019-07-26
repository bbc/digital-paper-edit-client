/**
 *  Case 1 - there is an annotation within the boundaries of the current paragraph
 */
const isAnnotationWithinParagraph = ( annotations, paragraphFirstWordTime, paragraphLastWordTime) => {
  const results = annotations.find(annotation => {
    return (
      annotation.start >= paragraphFirstWordTime &&
      annotation.end <= paragraphLastWordTime
    );
  });

  return results;
};

/**
 *  Case 2 - annotation start within the paragraph but ends in subsequent one
 * TODO:
 */
const isAnnotationStartWithinParagraph = ( annotations, paragraphFirstWordTime, paragraphLastWordTime) => {
  const results = annotations.find(annotation => {
    return (
      annotation.start >= paragraphFirstWordTime &&
      annotation.start <= paragraphLastWordTime
    );
  });

  return results;
};

/**
 *  Case 3 - annotation ends within the paragraph  but starts in previous one
 *  TODO:
 */
const isAnnotationEndWithinParagraph = ( annotations, paragraphFirstWordTime, paragraphLastWordTime) => {
  const results = annotations.find(annotation => {
    return (
      annotation.end >= paragraphFirstWordTime &&
      annotation.end <= paragraphLastWordTime
    );
  });

  return results;
};

/**
 *  Case 4 -annotation spans across the current paragraph  but starts in previous one and ends in subsequent one
 * TODO:
 */
const isAnnotationAcrossParagraph = ( annotations, paragraphFirstWordTime, paragraphLastWordTime) => {
  const results = annotations.find(annotation => {
    return (
      annotation.start <= paragraphFirstWordTime &&
      annotation.end >= paragraphLastWordTime
    );
  });

  return results;
};

/**
 *
 * @param {array} annotations
 * @param {object} paragraph
 * @returns annotation object found in the paragraph - false if it doesn't contain
 * example annotation object
 ```
  { 'id': 2,
    'start':14.38,
    'end': 18.14,
    'labelId': 1,
    'note': 'optional example text description for an annotation - TEST 1'
  };
```
 * TODO: This assumes the annotation is included in the paragraph, and doesn't span across multiple lines
 */
const findAnnotationInParagraph = (annotations, paragraph) => {
  const paragraphFirstWordTime = paragraph[0].start;
  const paragraphLastWordTime = paragraph[paragraph.length - 1].end;
  // Case 1 - there is an annotation within the boundaries of the current paragraph
  const resultsCaseOne = isAnnotationWithinParagraph(annotations, paragraphFirstWordTime, paragraphLastWordTime);
  if (resultsCaseOne) {
    return resultsCaseOne;
  }
  // Case 2 - annotation start within the paragraph  but ends in subsequent one
  const resultsCaseTwo = isAnnotationStartWithinParagraph(annotations, paragraphFirstWordTime, paragraphLastWordTime);
  if (resultsCaseTwo) {
    return resultsCaseTwo;
  }
  // // Case 3 - annotation ends within the paragraph  but starts in previous one
  const resultsCase3 = isAnnotationEndWithinParagraph(annotations, paragraphFirstWordTime, paragraphLastWordTime);
  if (resultsCase3) {
    return resultsCase3;
  }
  // // Case 4 - annotation spans across the current paragraph  but starts in previous one and ends in subsequent one
  const resultsCaseFour = isAnnotationAcrossParagraph(annotations, paragraphFirstWordTime, paragraphLastWordTime);
  if (resultsCaseFour) {
    return resultsCaseFour;
  }

  return false;
};

export default findAnnotationInParagraph;