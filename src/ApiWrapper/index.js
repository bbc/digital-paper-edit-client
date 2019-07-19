import ApiWrapper from './ApiWrapper';
import DemoApiWrapper from './DemoApiWrapper/index.js';
// import ElectronWrapper from './ElectronWrapper.js';
import whichJsEnv from '../Util/which-js-env';

const jsENV = whichJsEnv();
// export default apiWrapper;

// dynamic export
// https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4
export default ( () => {
  // await async dependencies
  // export the module
  if (jsENV === 'browser' && process.env.REACT_APP_NODE_ENV === 'demo') {
    console.log('API Wrapper demo time!');
    const demoApiWrapper = new DemoApiWrapper();
    Object.freeze(demoApiWrapper);

    return demoApiWrapper;
  }
  if (jsENV === 'browser' && process.env.REACT_APP_NODE_ENV !== 'demo') {
    const apiWrapper = new ApiWrapper();
    Object.freeze(apiWrapper);

    return apiWrapper;
  }
  if (jsENV === 'electron') {
    const ElectronWrapper = window.ElectronWrapper;
    const electronWrapper = new ElectronWrapper();
    Object.freeze(electronWrapper);

    return electronWrapper;
  }
})();
