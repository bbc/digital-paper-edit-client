/**
 * Makes list of unique speakers
 * from transcript.paragraphs list
 * to be used in react-select component
 *
 * TODO: decide if to move server side, and return unique list of speaker to client
 * Or if to move to separate file as util, perhaps generalise as reusable funciton?
 *
 * https://codeburst.io/javascript-array-distinct-5edc93501dc4
 */
function makeListOfUniqueSpeakers(array) {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.speaker)) {
        map.set(item.speaker, true); // set any value to Map
        result.push({
          value: item.speaker,
          label: item.speaker
        });
      }
    }
  
    return result;
  }

  export default makeListOfUniqueSpeakers;