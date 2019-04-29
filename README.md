# Digital Paper Edit

---> _Work in progress_ <--

An application to make it faster, easier and more accessible to edit audio and video interviews using automatically generated transcriptions form STT service.

See [intro](./docs/intro.md) for more info on the project. And [user journey](./docs/guides/user-journey/user-journey.md) for a high level overview of the user journey.

## Setup

<!-- _stack - optional_

_How to build and run the code/app_ -->


```
git clone git@github.com:bbc/digital-paper-edit.git
```

```
cd digital-paper-edit
```

Optional step to setup [nvm](https://github.com/nvm-sh/nvm) to use node version 10, otherwise just use node version 10
```
nvm use || nvm install`
```

in root of project
```
make install-react
```

and 
```
make install-server
```

if you want to develop for electron also do 
```
make install-electron
```

_Adobe CEP panel instructions coming soon_

## Usage

<!-- `cd` into the individual repository inside [`./packages`](./packages) and npm start, or see respective README and package.json for how deal with each. -->


In root of project start the express server

```
make start-server
```

and in another terminal, in root of project, start the client react app.
```
make start-react
```

additionally to develop for electron also run ,in another terminal, in root of project.

```
make start-electron
```


_Adobe CEP panel instructions coming soon_
See the [`Makefile`](./Makefile) for more details on these commands.


To make code changes checkout the individual repository inside [`./packages/`](./packages)
eg for Client - React [`./packages/client`](./packages/client)
and for Server - Express [`./packages/server`](./packages/server)

To install new modules, cd into the individual repository and npm install from there.


## System Architecture

It's a React, Express, Electron, Adobe CEP, AWS stack to be able to deploy one code base a sWeb app or Desktop app for Mac, win and linux.

See [modular architecture section](./docs/guides/modular-architecture.md) for more details on the stack.

At the moment the repository is setup similarly to a mono repo but it's not using workspaces or other modules normally used in that context just yet (such as lerna etc..).

Client - React, is setup using [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

## Development env

<!--
 _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_ -->

- [ ] npm > `6.1.0`
- [ ] node v 10 - [lts/dubnium](https://scotch.io/tutorials/whats-new-in-node-10-dubnium)
- [ ] see [`.eslintrc`](./.eslintrc) in the various packages for linting rules

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)

<!-- TODO: Setup eslint in express server -->

## Documentation

See [docs](./docs) folder 

- [`docs/features-list`](./docs/features-list.md) overview of main features of the app.
- [`docs/user-journey/user-journey.md`](./docs/user-journey/user-journey.md) overview of main features of the app.
- [`docs/notes/`](./docs/notes/) contains unsorted dev notes on various aspects of the project (think of it as drafts).
- [`docs/guides/`](./docs/guides/) contains good to know/how to on various aspects of the project.
- [`docs/adr/`](./docs/adr/) contains [Architecture Decision Record](https://github.com/joelparkerhenderson/architecture_decision_record).

> An architectural decision record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

We are using [this template for ADR](https://gist.github.com/iaincollins/92923cc2c309c2751aea6f1b34b31d95)
<!-- 
[There also QA testing docs](./docs/qa/README.md) to manual test the component before a major release, (QA testing does not require any technical knowledge). -->


## Build

<!-- _How to run build_ -->

<!-- See README for individual packages for more details ?-->

### Client - React 

```
make build-react
```

Build of react client side will be in `packages/client/build`


### Electron - Build
First do `make build-react` then 

```
make build-electron
```

`packages/client/dist` will contain your packaged version of the app for desktop

### Adobe CEP Panel 

_Adobe CEP panel instructions coming soon_

## Tests

<!-- _How to carry out tests_ -->

_TBC_

<!-- Test coverage using [`jest`](https://jestjs.io/), to run tests

```
npm run test
```

During development you can use

```
npm run test:watch
``` -->

<!-- See README for individual packages for more details -->


<!-- ## Travis CI

On commit this repo uses the [.travis.yml](./.travis.yml) config tu run the automated test on [travis CI](https://travis-ci.org/bbc/react-transcript-editor). -->


## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

_TBC_

<!-- See README for individual packages for more details -->

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) guidelines.

## Licence
<!-- mention MIT Licence -->
See [LICENCE](./LICENCE.md)

## Legal Disclaimer

_Despite using React and DraftJs, the BBC is not promoting any Facebook products or other commercial interest._


