const removePunctuation = (string) => {
  return string.replace(/\.|\?|!|,|;/, '').toLowerCase() ;
};

export default removePunctuation;