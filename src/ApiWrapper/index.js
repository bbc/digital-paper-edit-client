import ApiWrapper from './ApiWrapper';
import DemoApiWrapper from './DemoApiWrapper/index.js';
import whichJsEnv from '../Util/which-js-env';

const jsENV = whichJsEnv();

const dynamicApiWrapper = () => {
  // await async dependencies
  // export the module
  console.debug(jsENV)

  if (jsENV === 'demo') {
    console.log('API Wrapper demo time!');
    const demoApiWrapper = new DemoApiWrapper();
    Object.freeze(demoApiWrapper);

    return demoApiWrapper;
  }
  if (jsENV === 'browser') {
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
};

// dynamic export
// https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4
export default dynamicApiWrapper();
