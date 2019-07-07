/**
 * helper function to assign css display preferences
 * @param {boolean} isTextSearch
 * @param {boolean} isSpeakerSearch
 * @param {boolean} isLabelSearch
 */
function computeParagraphDisplayPreference(isTextSearch, isSpeakerSearch, isLabelSearch) {
  let displayPreference = {};
  if (!isTextSearch) {
    displayPreference = { display: 'none' };
  }
  if (!isSpeakerSearch) {
    displayPreference = { display: 'none' };
  }
  if (!isLabelSearch) {
    displayPreference = { display: 'none' };
  }

  return displayPreference;
}

export default computeParagraphDisplayPreference;