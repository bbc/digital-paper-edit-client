import ApiWrapper from './ApiWrapper';
// import ElectronWrapper from './ElectronWrapper.js';
import whichJsEnv from '../Util/which-js-env';

const jsENV = whichJsEnv();
// export default apiWrapper;

// dynamic export
// https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4
export default ( () => {
  // await async dependencies
  // export the module
  if (jsENV === 'browser') {
    console.log(whichJsEnv());

    const apiWrapper = new ApiWrapper();
    Object.freeze(apiWrapper);

    return apiWrapper;
  }
  if (jsENV === 'electron') {
    console.log(whichJsEnv());
    const ElectronWrapper = window.ElectronWrapper;
    const electronWrapper = new ElectronWrapper();
    Object.freeze(electronWrapper);

    return electronWrapper;
  }
})();
