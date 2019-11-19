# Firebase - create react app setup

​
from [Developing and deploying create-react-app to multiple Firebase environments](https://dev.to/captemulation/developing-and-deploying-create-react-app-to-multiple-firebase-environments-4e8h)
​
​

## Introduction

create-react-app makes it easy to quickly get started with React. Firebase makes it easy to quickly get started with web deployments. This article will show how to configure, build and deploy a React app to multiple environments in Firebase. Plus we will get it all working well together with Typescript.
​

## Getting started

First we need to install some tools. These instruction assume a unix terminal prompt. For windows, install WSL (Windows Subsystem for Linux) from the Windows app store
​

## Install NodeJS

If you already have NodeJS installed, you can skip ahead. If not head on over to nodejs.org and download an installer or use nvm to be able to future-proof your NodeJS installation.
​
Using nvm:
​

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

​
Restart your terminal or follow the instructions on the terminal. Then install node:
​
​

```shell
nvm install 12
```

​

## Run create-react-app

​
If you already have an application then you can skip these and go to installing Firebase.
​
To make some steps easier let's pick a name for our new application which we will save as an environment variable to reuse.
​
​

```shell
export REACT_APP=hello-firebase; # replace with your application's name
```

​
Use npx and create-react-app to boilerplate a new react application. I recommend using Typescript to enable type-checking
​

```shell
npx create-react-app ${REACT_APP} --typescript
```

​
Wait a little bit while create-react-app gets ready. When finished enter the application directory:
​

```shell
cd ${REACT_APP}
```

​
​

## Install firebase-tools

In order to work with firebase you will need the firebase command line tool. The easiest way to get it is to install globally with npm:
​

```shell
npm i -g firebase-tools
```

​
​

## Create your firebase application

Head on over to console.firebase.google.com and activate Firebase for your Google account. If you select the Spark plan then for moderately sized applications there is no cost.
​
Once you have activated firebase, go back to the terminal and login:
​

```shell
firebase login
```

​
You will be presented with a login prompt in your browser. Click Allow to complete the login
​

## Firebase environments

If you are just playing around then you can skip this step. When you get serious about developing a real application you will want to create multiple Firebase environments. To start let's create two firebase environments-- a development and production environment. The development environment will be the default environment that can be used for trying out new features and the production environment will the the "stable" customer facing environment.
​

```shell
firebase projects:create ${REACT_APP}-production
firebase projects:create ${REACT_APP}-development
```

​
Firebase environment names must be unique, so if the name you want is not available, try a different name.
​

## Initialize Firebase

​
Now we are ready to initialize firebase inside our create-react-app. Firebase has an interactive application for that:
​

```shell
firebase init
```

​
For now let's just pick Hosting because that is all I am going to be covering. You can always re-run this command later to add features
​
​
We'll use an existing project that we created earlier. If using multiple environments I recommend picking your development environment as the default.
​
Change the hosting location to `build`. Answer yes to if the application is a SPA (single page application).
​
If you going to deploy to multiple environments, then add your secondary environment now:
​

```shell
firebase use --alias production ${REACT-APP}-production; # or whatever name you ended up picking
firebase use default; # switch back to development
```

​

## Firebase implicit initialization scripts

Implicit initialization is a nifty way to initialize Firebase without config files. When supporting multiple configurations from a single project it is the only easy way to support multiple configurations. We really do not want to have the following code because it is not a good idea to leak non-production environment details in a production application:
​

```js
if ((process.env.REACT_APP_DEPLOY_ENV = "production")) {
  firebase.initializeApp(productionConfig);
} else {
  firebase.initializeApp(developmentConfig);
}
```

​
Implicit initialization works by loading Firebase javascript from a special /\_\_/ folder. We we deploy our app to Firebase this route will exist for us but locally we will need to do a little more work to set it up.
​
In your favorite code editor open up the build/index.html that was created by firebase init. At the top of the body tag you will see a series of Firebase related script tags. Select and copy these tags:
​

```html
<!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
<script src="/__/firebase/7.4.0/firebase-app.js"></script>
​
<!-- Add Firebase products that you want to use -->
<script src="/__/firebase/7.4.0/firebase-auth.js"></script>
<script src="/__/firebase/7.4.0/firebase-firestore.js"></script>
<script src="/__/firebase/7.4.0/firebase-functions.js"></script>
```

​
Paste them in your `public/index.html` file at the top of the body tag. Feel free to remove features you are not using.
​
`/__/firebase/js-sdk-version/firebase-sdk-name.js`
​
​
for more details see [Load Firebase SDKs from reserved URLs](https://firebase.google.com/docs/hosting/reserved-urls?authuser=0)
​
**Note** Don't skip this step!
​

## Firebase serve for local development

firebase-tools comes with a server that supports the implicit initialization, but first we need to set up a few things in create-react-app.
​
First let's install run-p which is a handy tool for running multiple npm scripts in parallel. In addition we will need to configure an http proxy.
​

```shell
npm i -D npm-run-all http-proxy-middleware
```

​
In your package.json change the start script from react-scripts start to:
​

```json
  "start": "run-p --race dev:firebase dev:react",
    "dev:firebase": "firebase serve -p 4000",
    "dev:react": "react-scripts start",
```

​
​
Now create `src/setupProxy.js` file and type:
​

```js
const proxy = require('http-proxy-middleware')
​
module.exports = function(app) {
  app.use(
    '/__',
    proxy({
      target: 'http://localhost:4000'
    })
  )
}
```

​
Now we are ready for local development. In your terminal run:
​

```shell
npm start
```

​
If all is well you should see you react app.
​
Checking developer tools and terminal console you should see that Firebase javascript is loading and no errors are present. Hot reloading works so you can make changes to code and they will be reflected immediately.
​
​

## Deploying Firebase Hosting

We are almost ready to deploy our react app to Firebase hosting. First we need to add a line to firebase.json to automatically build our application before deploying. Otherwise you will forget to do it. Add the following line to the hosting section:
​
​

```js
"predeploy": ["npm --prefix \"$RESOURCE_DIR/..\" run build"]
```

In context
​

```js
{
  "functions": {
    "predeploy": ["npm --prefix \"$RESOURCE_DIR/..\" run build"]
  },
  "hosting": {
    "public": "build",
    "predeploy": ["npm --prefix \"$RESOURCE_DIR/..\" run build"]
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/functions/**",
      "**/public/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

​
Now we can deploy:
​

```shell
firebase deploy
```

​
​
React will build and a link will be provided in the console. You should be able to click on that link your React application will load!
​
​

## Switching Environments

When you are ready to deploy to production all it takes is an environment switch.
​

```shell
firebase use production; # switches all future firebase commands to production
firebase deploy
```

​
Or use the -P flag

```shell
firebase -P ${REACT_APP}-production deploy; # Does not switch default environment but still deploys to production
```

​

## Typescript typings

If you start using Firebase in your Typescript application you need to let Typescript know about this global firebase variable that you know have access to. First install firebase not to import but simply to get access to the types contained within:

```shell
npm i -D firebase
```

Now create a src/firebase.d.ts file and copy the following:

```js
import firebase from 'firebase'
​
declare global {
  export const firebase = firebase
}
```

​
Now you have full typescripts bindings available.
​

## Conclusion

I hope this guide makes it easy to use create-react-app together with Firebase for modern web application development combined with free application hosting.
Collapse

---

​
​
In your React app client you can have a `src/Firebase.js` to use within your app.
​

```js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
​
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
​
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
​
export const db = firebase.firestore();
export const functions = firebase.functions();
export default firebase;
```

​
In a React component.

```js
import firebase, { db } from "../../Firebase.js";
...
// in the component, do something with firebase, eg
const storageRef = firebase.storage().ref();
```
