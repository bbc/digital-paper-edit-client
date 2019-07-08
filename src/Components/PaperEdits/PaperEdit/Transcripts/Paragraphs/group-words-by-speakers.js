/**
 * TODO: remove this and export from @bbc/react-transcript-editor digital-paper-edit STT import draftJs converter

 edge cases
- more segments then words - not an issue if you start by matching words with segment
and handle edge case where it doesn't find a match
- more words then segments - orphan words
*
* Takes in list of words and list of paragraphs (paragraphs have speakers info associated with it)
```js
{
  "words": [
    {
      "id": 0,
      "start": 13.02,
      "end": 13.17,
      "text": "There"
    },
    {
      "id": 1,
      "start": 13.17,
      "end": 13.38,
      "text": "is"
    },
    ...
    ],
  "paragraphs": [
    {
      "id": 0,
      "start": 13.02,
      "end": 13.86,
      "speaker": "TBC 00"
    },
    {
      "id": 1,
      "start": 13.86,
      "end": 19.58,
      "speaker": "TBC 1"
    },
    ...
  ]
}
```
*  and returns a list of words grouped into paragraphs, with words, text and speaker attribute
```js
[
  {
    "words": [
      {
        "id": 0,
        "start": 13.02,
        "end": 13.17,
        "text": "There"
      },
      {
        "id": 1,
        "start": 13.17,
        "end": 13.38,
        "text": "is"
      },
      {
        "id": 2,
        "start": 13.38,
        "end": 13.44,
        "text": "a"
      },
      {
        "id": 3,
        "start": 13.44,
        "end": 13.86,
        "text": "day."
      }
    ],
    "text": "There is a day.",
    "speaker": "TBC 00"
  },
  ...
]
```
 */
function groupWordsInParagraphsBySpeakers(words, segments) {
  // add speakers to each word
  const wordsWithSpeakers = addSpeakerToEachWord(words, segments);
  // group words by speakers sequentially
  const result = groupWordsBySpeaker(wordsWithSpeakers);

  return result;
};

/**
* Add speakers to each words
* if it doesn't have add unknown attribute `U_UKN`
* @param {*} words
* @param {*} segments
*/
function addSpeakerToEachWord(words, segments) {
  return words.map((word) => {
    word.speaker = findSegmentForWord(word, segments);

    return word;
  });
}

/**
 * Groups Words by speaker attribute
 * @param {array} wordsWithSpeakers - same as kaldi words list but with a `speaker` label attribute on each word
 * @return {array} - list of paragraph objcts, with words, text and sepaker attributes.
 * where words is an array and the other two are strings.
 */
function groupWordsBySpeaker(wordsWithSpeakers) {
  let currentSpeaker = wordsWithSpeakers[0].speaker;
  const results = [ ];
  let paragraph = { words: [], text: '', speaker: '' };
  wordsWithSpeakers.forEach((word) => {
    // if current speaker same as word speaker add words to paragraph
    if (currentSpeaker === word.speaker) {
      delete word.speaker;
      paragraph.words.push(word);
      paragraph.text += word.text + ' ';
      paragraph.speaker = currentSpeaker;
    }
    // if it's not same speaker
    else {
      // update current speaker
      currentSpeaker = word.speaker;
      // remove spacing in text
      paragraph.text = paragraph.text.trim();
      //save  previous paragraph
      results.push(paragraph);
      // reset paragraph
      paragraph = { words: [], text: '', speaker: 'U_UKN' };
      // add words attributes to new
      paragraph.words.push(word);
      paragraph.text += word.text + ' ';
    }
  });
  // add last paragraph
  results.push(paragraph);

  return results;
}

/**
* Helper functions
*/

/**
* given word start and end time attributes
* looks for segment range that contains that word
* if it doesn't find any it returns a segment with `UKN`
* speaker attributes.
* @param {object} word - word object
* @param {array} segments - list of segments objects
* @return {object} - a single segment whose range contains the word
*/
function findSegmentForWord(word, segments) {

  const tmpSegment = segments.find((seg) => {
    return ((word.start >= seg.start) && (word.end <= seg.end));
  });
  // if find doesn't find any matches it returns an undefined
  if (tmpSegment === undefined) {
    // covering edge case orphan word not belonging to any segments
    // adding UKN speaker label
    return 'UKN';
  } else {
    // find returns the first element that matches the criteria
    return tmpSegment.speaker;
  }
}

export default groupWordsInParagraphsBySpeakers;