# Modular architecture - draft

- Client : react app
- server: express backend + db 
- electron: react app + custom backend compatible with electron


## Electron - dev and production

```json
  "scripts": {
    ...
    "start": "cross-env NODE_ENV=development electron .",
    ...
```

uses [`cross-env`](https://github.com/kentcdodds/cross-env) to set NODE_ENV to development or production electron, in `package.json`


in development listens to local host `./packages/electron/electron-starter.js`

```js
 if(process.env.NODE_ENV === 'development'){
          // and load the index.html of the app.
        mainWindow.loadURL('http://localhost:3000');
         // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }
    else{
```

In production 

```js
else{
win.loadURL(`file://${path.join(__dirname, './build/index.html')}`)
...
```

## electron assets folder
by default electron looks for assets like icons for the app, in a folder name built, to avoid confusiong we want to rename that folder to `assets` instead. we do so by adding ` "buildResources": "assets"` under the electron `build` info in `electron/package.json`.

```js
 "build": {
   ...
    "directories":{
      "buildResources": "assets"
    },
```

## React router 

>The issue was with `BrowserRouter` of `react-router`. I had to change it to HashRouter and now all files and routes load properly.

from [stackoverflow.com/questions/52093573/using-create-react-app-with-electron-builder](https://stackoverflow.com/questions/52093573/using-create-react-app-with-electron-builder)


## react

----


Used these guides:
- https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
- https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f
- https://gist.github.com/matthewjberger/6f42452cb1a2253667942d333ff53404
- https://hackernoon.com/publishing-a-react-based-app-with-electron-and-nodejs-f5ec44169366 <---
- https://www.infoq.com/presentations/electron-pitfalls <--
- https://electronforge.io/cli/package
- https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3



---


build setup for electron builder, from autoEdit, to ignore ffmpeg static etc..

```json
 "build": {
    "publish": {
      "provider": "github",
      "releaseType": "prerelease",
      "vPrefixedTagName": false
    },
    "appId": "org.autoEdit2.autoEdit2-electron",
    "asar": false,
    "files": [
      "**/*",
      "!config/",
      "!spec/",
      "!project_page/",
      "!vendor/",
      "!docs/",
      "!dist/",
      "!assets/",
      "node_modules/ffmpeg-static-electron/bin/${os}/${arch}/ffmpeg",
      "node_modules/ffmpeg-static-electron/index.js",
      "node_modules/ffmpeg-static-electron/package.json",
      "node_modules/ffprobe-static-electron/bin/${os}/${arch}/ffmpeg",
      "node_modules/ffprobe-static-electron/index.js",
      "node_modules/ffprobe-static-electron/package.json"
    ],
    "copyright": "2019 BBC - Pietro Passarelli",
    "mac": {
      "category": "public.app-category.productivity",
      "files": [
        "!node_modules/ffmpeg-static-electron/bin/win${/*}",
        "!node_modules/ffmpeg-static-electron/bin/linux${/*}",
        "!node_modules/ffprobe-static-electron/bin/win${/*}",
        "!node_modules/ffprobe-static-electron/bin/linux${/*}"
      ],
      "target": [
        {
          "target": "zip",
          "arch": [
            "x64"
          ]
        }
      ]
    },
    "linux": {
      "category": "",
      "packageCategory": "GNOME;GTK;VideoEditing;PaperEditing;Transcriptions",
      "description": "Desktop Client for Linux",
      "target": [
        "AppImage"
      ],
      "maintainer": "Pietro Passarelli <pietro.passarelli@bbc.co.uk>",
      "files": [
        "!node_modules/ffmpeg-static-electron/bin/linux/ia32${/*}",
        "!node_modules/ffmpeg-static-electron/bin/win${/*}",
        "!node_modules/ffmpeg-static-electron/bin/mac${/*}",
        "!node_modules/ffprobe-static-electron/bin/linux/ia32${/*}",
        "!node_modules/ffprobe-static-electron/bin/win${/*}",
        "!node_modules/ffprobe-static-electron/bin/mac${/*}"
      ]
    },
    "deb": {
      "synopsis": "Digital Paper-editing Desktop App"
    },
    "dmg": {
      "background": "build/background.png",
      "icon": "build/icon.icns",
      "iconSize": 128,
      "contents": [
        {
          "x": 448,
          "y": 340,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 192,
          "y": 340,
          "type": "file"
        }
      ]
    },
    "win": {
      "target": "portable",
      "icon": "build/icon.ico",
      "files": [
        "node_modules/ffmpeg-static-electron/bin/win/${arch}/ffmpeg",
        "!node_modules/ffmpeg-static-electron/bin/win/ia32${/*}",
        "!node_modules/ffmpeg-static-electron/bin/linux${/*}",
        "!node_modules/ffmpeg-static-electron/bin/mac${/*}",
        "node_modules/ffprobe-static-electron/bin/win/${arch}/ffprobe",
        "!node_modules/ffprobe-static-electron/bin/win/ia32${/*}",
        "!node_modules/ffprobe-static-electron/bin/linux${/*}",
        "!node_modules/ffprobe-static-electron/bin/mac${/*}"
      ]
    }
  }
  ```



  <!-- 
  unrelated
  https://sizzy.co/ for device testing -->