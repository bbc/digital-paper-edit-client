/**
 * custom "debounce" function
 * only calls the last time a function is invoked within a time interval.
 * Example use cases, are when triggering an event listener on an input field
 * such as for a search
 * @param {function} cb - is the function you want to invoke only once
 * @param {number} duration - is in milliseconds
 * @return after time interval it invokes cb
 */
const onlyCallOnce = (cb, duration) => {
  let timer;

  return function() {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      cb.apply(null, args);
    }, duration);
  };
};

export default onlyCallOnce;