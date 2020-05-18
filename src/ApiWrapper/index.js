import ApiWrapper from './ApiWrapper';
import DemoApiWrapper from './DemoApiWrapper/index.js';
import whichJsEnv from '../Util/which-js-env';

const jsENV = whichJsEnv();

// dynamic export
// https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4
export default (() => {
  // await async dependencies
  // export the module
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
    // try {
    //   const { ipcRenderer } = require('electron');
    //   const appPath = ipcRenderer.sendSync('synchronous-message-get-app-path', 'ping');
    // const path = require('path');
    // console.log(window.appPath, 'window.AppPath', 'process.cwd()', process.cwd());
    //   window.process.chdir(appPath);
    // const ElectronWrapper = require(path.join(window.appPath, 'src', 'ElectronWrapper', 'index.js'));
    const ElectronWrapper = window.ElectronWrapper;
    const electronWrapper = new ElectronWrapper();
    Object.freeze(electronWrapper);
    return electronWrapper;
    // } catch (e) {
    //   console.error('api wrapper electron', e);
    // }
  }
  if (jsENV === 'cep') {
    // TODO: not sure if this will work
    // try {
    // console.log('__dirname', __dirname);
    // console.log('process.cwd()', process.cwd());
    // /////////////////////////
    // console.log('  process.chdir(__dirname);');
    // process.chdir(__dirname);
    // /////////////////////////
    // console.log('__dirname', __dirname);
    // console.log('process.cwd()', process.cwd());

    // const path = require('path');
    // const AdobeCEPWrapper = require(path.join(__dirname, 'src', 'AdobeCEPWrapper', 'index.js'));
    window.AdobeCEPWrapper = AdobeCEPWrapper;

    const AdobeCEPWrapper = window.AdobeCEPWrapper;
    const adobeCEPWrapper = new AdobeCEPWrapper();
    Object.freeze(adobeCEPWrapper);

    return adobeCEPWrapper;
    // } catch (err) {
    //   console.log('chdir: ' + err);
    // }
  }
})();
