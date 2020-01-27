const inText = (findText, sourceText) => {
  return findText.toLowerCase().trim().includes(sourceText.toLowerCase().trim());
};

const anyInText = (arr, sourceText) => {
  return arr.find(findText => {
    return inText(findText, sourceText);
  });
};

export { inText, anyInText } ;