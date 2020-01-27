# client electron integration

## Updating Electron app with newer NPM release of client

1. Publish a newer version of the React client to NPM by running `npm run publish:public`
    (you can use [`npm version`](https://docs.npmjs.com/cli/version) - [short doc here](https://github.com/bbc/react-transcript-editor/blob/master/docs/notes/2019-07-31-npm-tags.md))
2. In the [`digital-paper-edit-electron`](https://github.com/bbc/digital-paper-edit-electron/blob/master/package.json) repo, update the DPE React Client (eg `npm install @bbc/digital-paper-edit-clint@latest`)
3. Bump Electron NPM app version (refer to step 1)
4. Push to master (Travis CI will automatically make a new release in [github releases](https://github.com/bbc/digital-paper-edit-electron/releases/))


## How does it work?
### `package.json`
The command `npm run publish:public` publishes to npm, see `package.json`:

```js
"publish:public": "npm run publish:prep && npm publish build --access public",
```

This runs the `publish:prep` step as well, which builds, copies and remove necessary files:

```js
"publish:prep": "npm run build && cp package.json ./build/package.json && cp README.md ./build/README.md && rimraf ./build/db",
```

### `index.html`

The client uses [`create-react-app`](https://create-react-app.dev/).
In the `/public/index.html` folder, there is the `index` file for the react app, which contains logic that makes the `ElectronWrapper` available.

```js
...
      if(window.process && window.process.versions.electron){
        const { app } = require('electron').remote;
        const path = require('path');
        const appPath = app.getAppPath();
        // changing path to simplify being able to load electron wrapper from this index.html file, 
        // which will be deep in node_modules
        window.process.chdir(appPath)
        const ElectronWrapper = require(path.join(appPath,'src','ElectronWrapper','index.js'));
        window.ElectronWrapper = ElectronWrapper;
      }
  ...
```

This line changes directory to simplify loading of the electron wrapper from this file, as the wrapper will be deep in node_modules.

```js
window.process.chdir(appPath)
```

This line `window.ElectronWrapper = ElectronWrapper;` makes `ElectronWrapper` available in the `ApiWrapper` to replace the default `ApiWrapper` in `/src/ApiWrapper/index.js` React client app. 
The `APIWrapper` module uses [dynamic export](https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4)


```js
const ElectronWrapper = require(path.join(appPath,'src','ElectronWrapper','index.js'));
```
The actual `ElectronWrapper` module, `/src/ElectronWrapper/index.js` is in the [`digital-paper-edit-electron`](https://github.com/bbc/digital-paper-edit-electron/tree/master/src/ElectronWrapper) repository, [`bbc/digital-paper-edit-electron/src/ElectronWrapper`](https://github.com/bbc/digital-paper-edit-electron/tree/master/src/ElectronWrapper).




There is scope to simplify the accessing of dependencies, but is currently at a lower priority.

