# [short title of solved problem and solution]

* Status: accepted
* Deciders: James, Eimi
* Date: 2019-06-20

Technical Story: [description | ticket/issue URL] <!-- optional -->

## Context and Problem Statement

This addresses the fact that we could not configure different environments to point to different API URLs as necessary (across Int, Test, and Live envs in Cosmos).

At the point of deployment, `npm run build` is called in Jenkins to build the static  bundle and minify etc. Environment config (`REACT_APP_SERVER_URL` etc. variables declared in `.env`) get baked into the bundle and obfuscated at this point.

We would need different Jenkins jobs or parameters to bake in the environment config (eg. the correct server URL) multiple times, which goes against the idea of having an _unconfigured / environment agnostic_ RPM in Cosmos.

## Decision Drivers <!-- optional -->

* Avoiding too much extra code overhead
* Trying to avoid security converns with proxy solutions (injection / DB manipulations)
* Avoiding having to re-build in Cosmos or on the box

## Considered Options

### 1. Proxy
* The react app is build / bundled and served statically as usual
* It continues to make API requests to localhost:8080
* An additional express server acts as a proxy and passes on these requests to the correct API_URL, according to NODE_ENV config which is passed to the proxy server at runtime

### 2. Re-build at runtime
* There is environment configuration
* The RPM used for the EC2 contains a script that performs a rebuild when on the box


### 3. Using the react-scripts development Server
* Using the NODE_ENV config to configure the server and URL, without build / bundling

### 4. Environment replacement with bake-script
* Using `window.env` as a replacement for `process.env`
* Playing config in public folder to avoid minifying
* Bake-script replaces the file with env-specific config at launch

## Decision Outcome

This is a common problem with create-react-app and the need to configure it. We came across [this solution](https://github.com/facebook/create-react-app/issues/578#issuecomment-277843310) which detailed a simple way of consuming config with the `window` global.

In source code this remains localhost:8080 as a local development fallback and it is passed in via Cosmos environment config.

## Pros and Cons of the Options <!-- optional -->

### Proxy

* Good - it aligns initial idea that client could be pulled in _unconfigured_ via NPM.
* Good - no additional rebuilds required
* Bad - additional server config and boilerplate required
* Bad - additional issues and concerns around CORS, security and injection required
* Bad - Not hugely replicable


### Re-build at runtime

* Bad, because of the release not mapping accurately to the system on the EC2

### react-scripts development Server

* Good, because can use environment config easily
* Bad, not a typical pattern
* Bad, security concerns
