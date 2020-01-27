//  if the speaker of all the words is the same we can assume is one paragraph
const isOneParagraph = words => {
  const firstword = words[0];

  const result = words.filter(word => {
    return word.speaker !== firstword.speaker;
  });

  return result.length === 0;
};

/**
 * helper function to determine if an element is last one in a list
 * based on the index
 */
const isLastElement = (elementIndex, list) => {
  return elementIndex === (list.length - 1);
};
const divideWordsSelectionsIntoParagraphs = words => {
  if (isOneParagraph(words)) {
    return words;
  }
  // initialising previous word speaker with speaker of first word
  let previousWordSpeaker = words[0].speaker;
  let currentParagraph = [];
  const paragraphsResult = [];

  words.forEach((word, index) => {
    if (word.speaker === previousWordSpeaker) {
      currentParagraph.push(word);
    } else {
      paragraphsResult.push(currentParagraph);
      currentParagraph = [];
      // if (isLastElement(index, words)) {
      currentParagraph.push(word);
      // }

      previousWordSpeaker = word.speaker;
    }

    // Handling last paragraph
    if (isLastElement(index, words)) {
      // currentParagraph.push(word);
      paragraphsResult.push(currentParagraph);
    }
  });

  return paragraphsResult;
  // return paragraphsResult.reverse();
};

// divideWordsSelectionsIntoParagraphs(result.words);
export { divideWordsSelectionsIntoParagraphs, isOneParagraph };
