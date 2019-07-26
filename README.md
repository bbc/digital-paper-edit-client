# Digital Paper Edit - Client

---> _Work in progress_ <--

An application to make it faster, easier and more accessible to edit audio and video interviews using automatically generated transcriptions form STT service.

See [intro](./docs/intro.md) for more info on the project. And [user journey](./docs/user-journey/user-journey.md) for a high level overview of the user journey.

## Project Architecture 

It's a React, Express, Electron, Adobe CEP, AWS stack to be able to deploy one modular code base as a Web app or Cross platform Desktop app (for Mac, win and linux).

The project is organised across these repository 

- [`bbc/digital-paper-edit-client`](https://github.com/bbc/digital-paper-edit-client) - React Client - [npm](https://www.npmjs.com/package/@bbc/digital-paper-edit-client)
- [`bbc/digital-paper-edit-react-components`](https://github.com/bbc/digital-paper-edit-react-components) - React Storybook for Client components - `npm`.
- [`bbc/digital-paper-edit-api`](https://github.com/bbc/digital-paper-edit-api) - Express server API - [npm](https://www.npmjs.com/package/@bbc/digital-paper-edit-api)
- [`bbc/digital-paper-edit-infrastructure`](https://github.com/bbc/digital-paper-edit-infrastructure) - AWS infrastructure for API server and Client.
- [`bbc/digital-paper-edit-electron`](https://github.com/bbc/digital-paper-edit-electron) - Electron, Cross Platform Desktop app - Mac, Windows, Linux
- [`bbc/digital-paper-edit-cep`](https://github.com/bbc/digital-paper-edit-cep) Adobe CEP (Common Extensibility Platform) - Premiere Pro Plugin Panel

Micro services for web app backend

- [`bbc/digital-paper-edit-stt-proxy`](https://github.com/bbc/digital-paper-edit-stt-proxy) - An express server to connect to STT service
- [`bbc/digital-paper-edit-video-preview-converter`](https://github.com/bbc/digital-paper-edit-video-preview-converterr) - An express server to generate an mp4 video preview using ffmpeg
- [`bbc/digital-paper-edit-audio-converter`](https://github.com/bbc/digital-paper-edit-audio-converter) - An express server to generate an audio file with the stt specs to be able to send it to `STT Proxy`.

[See here to see them as a list in github](https://github.com/topics/digital-paper-edit).

See [modular architecture section](./docs/guides/modular-architecture.md) for more details on the stack and the [Modular Architecture ADR for more info on the implementation](https://github.com/bbc/digital-paper-edit-client/blob/master/docs/ADR/2019-05-09-modular-architecture.md)

The projects use [npm semantic versioning](https://docs.npmjs.com/about-semantic-versioning)

![](https://raw.githubusercontent.com/bbc/digital-paper-edit-infrastructure/master/docs/adr/newest_arch.png)


Between the 5 June and 17 July there is a sprint board used for organising the backlog for each two-week sprint cycle.

- [BBC News Labs - Digital Paper Edit - Sprint Board](https://github.com/orgs/bbc/projects/33) is a Github project board [with linked repository](https://help.github.com/en/articles/linking-a-repository-to-a-project-board) where issues are added from the relevant repository listed in architecture section.

The project is divided into [concurrent milestones as described here](https://github.com/bbc/digital-paper-edit-client/milestones)

And there are [github project board for each milestone](https://github.com/bbc/digital-paper-edit-client/projects)

- [1 - Transcript - Editing](https://github.com/bbc/digital-paper-edit-client/projects/2)
- [2 - Transcript - Annotating](https://github.com/bbc/digital-paper-edit-client/projects/3)
- [3 - Paper-editing](https://github.com/bbc/digital-paper-edit-client/projects/4)

With UX being an overarching milestone that cuts across these different parts
- [UX](https://github.com/bbc/digital-paper-edit-client/projects/1)


See [UX Approach](./docs/guides/ux-approach.md) in docs guides for more info.


## Setup

<!-- _stack - optional_

_How to build and run the code/app_ -->

See _optional_ [getting setup with the visual code workspace](docs/guides/visual-code-workspace-setup.md) to get up and running with the various repository needed for this project.


```
git clone git@github.com:bbc/digital-paper-edit-client.git
```

```
cd digital-paper-edit-client
```

Optional step to setup [nvm](https://github.com/nvm-sh/nvm) to use node version 10, otherwise just use node version 10
```
nvm use || nvm install`
```

in root of project
```
npm install
```

## Usage - development

<!-- `cd` into the individual repository inside [`./packages`](./packages) and npm start, or see respective README and package.json for how deal with each. -->


In root of the client project (`cd digital-paper-edit-client`) start React 

```
npm run start
```

To developer for the web app [you will need to start setup and the API server](https://github.com/bbc/digital-paper-edit-api#setup) as well.


>Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
>
>The page will reload if you make edits.<br>
You will also see any lint errors in the console.

<!-- additionally to develop for electron also run ,in another terminal, in root of project.

```
make start-electron
``` -->


## Usage - production

The project is also publicly available in the npm registry [`@bbc/digital-paper-edit-client`](https://www.npmjs.com/package/@bbc/digital-paper-edit-client)

 you can add it to your project
```
npm install @bbc/digital-paper-edit-client
```

and eg in an express server you can serve the static build as follows

```
app.use("/", express.static(path.join(__dirname, '..', 'node_modules/@bbc/digital-paper-edit-client')));
```

## System Architecture

Client - React, is setup using [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

>You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
>
>To learn React, check out the [React documentation](https://reactjs.org/).



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

```
npm run build
```

Build of react client side will be in `build`

>Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
>
>The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


<!-- 
### Electron - Build
First do `make build-react` then 

```
make build-electron
```

`packages/client/dist` will contain your packaged version of the app for desktop -->

## Tests

<!-- _How to carry out tests_ -->

_TBC_

Test coverage using [`jest`](https://jestjs.io/), to run tests

```
npm run test
```

During development you can use

```
npm run test:watch
```

>Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<!-- See README for individual packages for more details -->


<!-- ## Travis CI

On commit this repo uses the [.travis.yml](./.travis.yml) config tu run the automated test on [travis CI](https://travis-ci.org/bbc/react-transcript-editor). -->

## Environment variables

[`.env`](./.env) contains environment variables config for the React client side app.

<mark>Do not store credentials in `.env` during development.</mark>

`REACT_APP_NAME` App name is used in browser title and navbar component.

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

```
npm run publish:public
```

<!-- See README for individual packages for more details -->

for more info on Create React app deployment: 

>See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Demo page on github pages

To update demo on github pages [bbc.github.io/digital-paper-edit-client](https://bbc.github.io/digital-paper-edit-client)

```
npm run deploy:ghpages
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) guidelines.

## Licence
<!-- mention MIT Licence -->
See [LICENCE](./LICENCE.md)

## Legal Disclaimer

_Despite using React and DraftJs, the BBC is not promoting any Facebook products or other commercial interest._


