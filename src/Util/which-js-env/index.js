/**
 * Determines the enviroment Javascript is being run on
 * @returns - 'browser', 'electron', 'cep'. where cep stands for adobe CEP panel
 */
function whichJsEnv() {
  // Is browser Eg client side app
  if (window.process === undefined) {
    // console.debug('In browser Environment');
    if (process.env.REACT_APP_NODE_ENV === 'demo') {
      return 'demo';
    }

    return 'browser';
  } else {
    if (window.process.versions.electron !== undefined) {
      console.debug('In Electron Enviroment');
      //   console.info('In Electron v: ', window.process.versions.electron);
      //   console.info('Using chrome v: ', window.process.versions.chrome);
      return 'electron';
    } else if (window.process.versions.cep !== undefined) {
      console.debug('In Adobe CEP Environment');
      //   console.info('In Chromium v: ', window.process.versions.chromium);
      //   console.info('In CEP (Adobe Common Extensibility Platform ) v: ', window.process.versions.cep);
      //   console.info('adjusting current working directory for Adobe CEP');
      //   console.log('Starting directory: ' + process.cwd());
      // try {
      //   // commenting out because of error "chdir: Error: process.chdir is not supported"
      //   // process.chdir(__dirname);
      //   // process.chdir('..');
      //   // console.log('New directory: ' + process.cwd());
      // }
      // catch (err) {
      //   console.log('chdir: ' + err);
      // }
      return 'cep';
    } else {
      console.error("couldn't determine the js environment");

      return undefined;
    }
  }
}

function isBrowser() {
  return whichJsEnv() === 'browser';
}

function isElectron() {
  return whichJsEnv() === 'electron';
}

function isCep() {
  return whichJsEnv() === 'isCep';
}

export default whichJsEnv;

export { isElectron, isBrowser, isCep, whichJsEnv };
