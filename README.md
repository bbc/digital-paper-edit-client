# Digital Paper Edit

---> _Work in progress_ <--

<!-- Proof of concept for a modular architecture with

- React
- Express
- Electron

To be able to deploy one code base as

- Desktop app for Mac, win and linux (with auto update)
- Web app -->

<!-- ## Brief of the project
 _One liner + link to confluence page_

_Screenshot of UI - optional_ -->

## Setup

<!-- _stack - optional_

_How to build and run the code/app_ -->

<!-- Follow these instructions to download the repository with the necessary submodules.
With submodules included, it's roughly 300MB so might take a little bit to download.

1. `git clone --recursive --single-branch --branch master git@github.com:electron-react-express.git`
2. `cd electron-react-express`
3. `nvm use || nvm install` - optional, otherwise just use node version 10
4. `yarn` - installs dependencies recursively in each package -->

See the `Makefile`

## Usage

<!-- `cd` into the individual repository inside [`./packages`](./packages) and npm start, or see respective README and package.json for how deal with each. -->

in root of project start the server, express.

```
make server-start
```


and in another terminal, start the client react app.
```
make react-start
```

## System Architecture

<!-- _High level overview of system architecture_ -->

<!-- This project uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). -->

- React app can be deployed on S3 or github pages
- backend, express, deployed on EC2 instance
- db connected to AWS db

TODO

- [ ] hot reloading/watch for express

## Development env

<!--
 _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_ -->

- [ ] node v 10 - lts/dubnium
- [ ] [yarn](https://yarnpkg.com/en/docs/install#mac-stable)
- [ ] see [`.eslintrc`](./.eslintrc) for linting rules

## Build

<!-- _How to run build_ -->

use the make file 

## Tests

<!-- _How to carry out tests_ -->

TBC

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

TBC


---

# TODO
- [ ] `.gitignore`, various `node_modules` folders + `dist` folder for electron and `build` folder for react
- [ ] way to deal with `node_modules` repetitions


- [ ] TravisCI deploy for electron cross platform into github releases
- [ ] add auto update module using github releases