# Modular Architecture (breaking down repositories and packages)

- Status: accepted
- Deciders: Pietro, Eimi, Dan (Data solutions), James, Alli
- Date: 2019-06-13

Technical Story: Exploring a better way to organise the project than in a monorepo.

## Context and Problem Statement

As this is an opensource project, we might want to separate out the projects so they are more digestible.

## Decision Drivers

- opensource means removing BBC specific code
- separating infrastructure
- electron and cep (future integration)

## Considered Options

There are 3 logically separated packages:

1. UI
2. API (monorepo)
3. (AWS/CEP/Electron) Infrastructure

- Option 1 - bundle everything (UI, API, Infra) into an RPM.
- Option 2 - separate the UI to a new github repository, bundle it as an NPM package. Keep infrastructure in the same repository as API. API will pull in UI as a dependency.
- Option 3 - separate the UI, API and infrastructure. Bundle UI and API separately as NPM packages. Infrastructure will have UI and API packages as dependencies.
- Option 4 - separate the UI, API and infrastructure. Bundle only UI as NPM package, and API will be bundled as RPM. Infrastructure repo will have UI as a dependency.

## Decision Outcome

We opted for Option 4 after another iteration of the architectual flow.
Initially we went for option 3 because we wanted to have a uniform approach for possible future users.
However, after much consideration, we collectively agreed to remove NPM packaging for the API (and the microservices).

Similarly to option 3, we are still keeping the AWS stacks separate in the infrastructure repository.
We will be using Travis CI for the NPM build.
We will be using Jenkins (not publicly accessible) for the RPM build and releasing to Cosmos.
We will be using Speculate, which is an open-source BBC project to generate SPEC files, which adds little overhead in the projects.
We will not automate the release of NPM, but as a manual step which also does testing.
We will retain the public state of each repository and not be concerned with "ready" state of our repositories.

### Why move out API from NPM? (Cons)

- Unknown benefits to external person
- Using NPM for versioning (this can be done through other means)
- Possibly atypical use of NPM (although this is inconclusive)

They can fork the repository to try out the services.

### Reasons for option 3 initially

There is a separation to all the packages, which means it will be simpler to version, test and contribute to individual packages. The API repository will contain different infrastructural flavours of the business logic. There will be a browser (Cloud) package, CEP package, and Electron package that does the same thing. Each is compatible with the UI. To package these similar packages, we can look at `lerna`. The browser flavoured package will have another Express server in the repository to simplify local testing. Infrastructure, which will have UI and API as dependencies will not have an Express server inside.

A potential problem here is that during development, the packages will have features not implemented in the other packages. In order to have parallel set of features, we will add BDD tests to automatically test that all the packages have the same features which are functional.

We are also keeping the AWS Infrastructure public, as the generic cloudformation JSON has no confidential or security issues in it.

#### Why release API in NPM? (Pros)

- Abstraction
- Clear separation of concerns (RPM)
- Simpler to set up for external people (???)

### RPM deployment flow

```
+-------------------------+
| Infrastructure          |           +----------------+
|                         |           |                |      +-------+
| /api                    |           |                |      |       |
| /client                 +---------->+    Jenkins     +----->+  RPM  |
| - speculate (SPEC gen)  |           |                |      |       |
| /... microservices      |           |                |      +-------+
|                         |           +----+------+----+
+-------------------------+                ^      |
                                           |      |
                                           |      |
+-------------------------+                |      |
| API                     |                |      |    Pulls client from NPM
|                         |                |      |    when creating RPM for client
| package.json            +----------------+      +--------------+
| - speculate (SPEC gen)  |                                      |
|                         |                                      |
+-------------------------+                                      |
                                                                 |
                                                                 |
+-------------------------+        +-----------------+           v
| Client                  |        |                 |       +---+---+
|                         |        |                 |       |       |
|                         +------->+    Travis CI    +------>+  NPM  |
|                         |        |                 |       |       |
|                         |        |                 |       +-------+
+-------------------------+        +-----------------+

http://asciiflow.com/
```

Jenkins will then be used to deploy the RPMs to each BBC Cosmos project.
Once deployed, this will be two separate EC2 instances.

```
+---------------------------+           +-----------------------------+
|Client                     |           |API                          |
|   +-------------------+   |           |   +---------------------+   |
|   |Express            |   |           |   |Express              |   |
|   | +---------------+ |   |           |   |                     |   |
|   | |NPM package    | |   |           |   |                     |   |
|   | |with static    | |   |           |   |                     |   |
|   | |files of Client| |   +---------->+   |                     |   +--------->...
|   | |               | |   |           |   |                     |   |
|   | |               | |   |           |   |                     |   |
|   | +---------------+ |   |           |   |                     |   |
|   |                   |   |           |   |                     |   |
|   +-------------------+   |           |   +---------------------+   |
|                           |           |                             |
+---------------------------+           +-----------------------------+
```

### Repo naming conventions

Prefix will be `digital-paper-edit`:

- client: `-client`
- server: `-api`
- electron: `-electron`
- cep: `-cep`
- infrastructure: `-infrastructure` or `-aws`
