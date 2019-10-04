import {
  divideWordsSelectionsIntoParagraphs,
  isOneParagraph
} from './index.js';
import mockData from './mock.sample.json';
import mockDataOneParagraph from './mock_one_paragraph.sample.json';
import mockDataALastWordInAParagraphAlone from './mock_a_last_word_in_a_paragraph_alone.sample.json';

describe("detect if it's one paragraph or not", () => {
  test('recognise when is one paragraph', () => {
    const result = isOneParagraph(mockDataOneParagraph.words);
    expect(result).toBe(true);
  });

  test('recognise when is not one paragraph', () => {
    const result = isOneParagraph(mockData.words);
    expect(result).toBe(false);
  });
});

describe('split into pragraphs', () => {
  test('split into correct number of pragraph', () => {
    const result = divideWordsSelectionsIntoParagraphs(mockData.words);
    expect(result.length).toBe(3);
  });

});

describe('detect if it\'s one paragraph or not', () => {

  test('retains the initial number of words after the split into paragraphs', () => {
    const initialNumberOfWords = mockData.words.length;
    const result = divideWordsSelectionsIntoParagraphs(mockData.words);
    // https://stackoverflow.com/questions/16468124/count-values-of-the-inner-two-dimensional-array-javascript
    const numberOfWordsAfterDivide = result.reduce(
      (count, row) => count + row.length,
      0
    );
    expect(numberOfWordsAfterDivide).toBe(initialNumberOfWords);
  });

  test("retains the initial number of words after the split into paragraphs - even when there's a last paragraph with just one word at the end", () => {
    const initialNumberOfWords = mockDataALastWordInAParagraphAlone.words.length;
    const result = divideWordsSelectionsIntoParagraphs(
      mockDataALastWordInAParagraphAlone.words
    );
    // https://stackoverflow.com/questions/16468124/count-values-of-the-inner-two-dimensional-array-javascript
    const numberOfWordsAfterDivide = result.reduce((count, row) => count + row.length, 0);
    expect(numberOfWordsAfterDivide).toBe(initialNumberOfWords);
  });
});

test.skip('split - TBC', () => {
  const result = divideWordsSelectionsIntoParagraphs(mockData.words);
  expect(result.length).toBe(3);
});
