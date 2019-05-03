/**
 * @params {array} - annotations
 * @params {object} - paragraph
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
 */
const findAnnotationInParagraph = (annotations, paragraph) => {
  // console.log('findAnnotationInParagraph ', annotations);
  const paragraphFirstWordTime = paragraph[0].start;
  const paragraphLastWordTime = paragraph[paragraph.length - 1].end;
  const results = annotations.find((annotation) => {
    return (annotation.start >= paragraphFirstWordTime
        && annotation.end <= paragraphLastWordTime );
  });

  if (results) {
    // console.log('results ', results);

    return results;
  }

  return false;

};

export default findAnnotationInParagraph;