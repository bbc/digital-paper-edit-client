# Modular Architecture (breaking down repositories and packages)

* Status: accepted
* Deciders: Pietro, Eimi
* Date: 2019-05-10

Technical Story: Exploring a better way to organise the project than in a monorepo.

## Context and Problem Statement

As this is an opensource project, we might want to separate out the projects so they are more digestible. 

## Decision Drivers

* opensource means removing BBC specific code
* separating infrastructure
* electron and cep (future integration)

## Considered Options

There are 3 logically separated packages:

1. UI
2. API (monorepo)
3. (AWS/CEP/Electron) Infrastructure

* Option 1 - bundle everything (UI, API, Infra) into an RPM.
* Option 2 - separate the UI to a new github repository, bundle it as an NPM package. Keep infrastructure in the same repository as API. API will pull in UI as a dependency.
* Option 3 - separate the UI, API and infrastructure. Bundle UI and API separately as NPM packages  Infrastructure will have UI and API packages as dependencies.

## Decision Outcome

We selected Option 3.
There is a separation to all the packages, which means it will be simpler to version, test and contribute to individual packages. The API repository will contain different infrastructural flavours of the business logic. There will be a browser (Cloud) package, CEP package, and Electron package that does the same thing. Each is compatible with the UI. To package these similar packages, we can look at `lerna`. The browser flavoured package will have another Express server in the repository to simplify local testing. Infrastructure, which will have UI and API as dependencies will not have an Express server inside.

A potential problem here is that during development, the packages will have features not implemented in the other packages. In order to have parallel set of features, we will add BDD tests to automatically test that all the packages have the same features which are functional.

We are also keeping the AWS Infrastructure public, as the generic cloudformation JSON has no confidential or security issues in it.