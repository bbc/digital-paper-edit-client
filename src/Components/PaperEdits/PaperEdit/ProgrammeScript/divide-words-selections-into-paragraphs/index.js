const hasDifferentSpeaker = (words) => {
  const firstWord = words[0];
  const differentSpeaker = words.find(word =>
    word.speaker !== firstWord.speaker
  );

  return !!(differentSpeaker);
};

const genConsecutiveSpeakerWords = (words, paragraph, paragraphs) => {
  const prevWord = paragraph[paragraph.length - 1];
  const curWord = words[0];
  const wordsRemainder = words.slice(1);
  let newParagraph;

  if (!prevWord || curWord.speaker === prevWord.speaker) {
    paragraph.push(curWord);
    newParagraph = paragraph;
  } else {
    paragraphs.push(paragraph);
    newParagraph = [ curWord ];
  }

  if (wordsRemainder.length) {
    return genConsecutiveSpeakerWords(wordsRemainder, newParagraph, paragraphs);
  } else {
    paragraphs.push(newParagraph);

    return paragraphs;
  }
};

const selectionToParagraphs = words => {
  return genConsecutiveSpeakerWords(words, [], []);
};

export { selectionToParagraphs, hasDifferentSpeaker, };
