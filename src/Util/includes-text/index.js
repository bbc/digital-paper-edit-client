const includesText = (textOne, textTwo) => {
  return textOne
    .toLowerCase()
    .trim()
    .includes(textTwo.toLowerCase().trim());
};

export default includesText;
