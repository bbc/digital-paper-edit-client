# Modular Architecture (breaking down repositories and packages)

* Status: accepted
* Deciders: Pietro, Eimi
* Date: 2019-05-09

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
2. API
3. Infrastructure

* Option 1 - bundle everything into an RPM.
* Option 2 - separate the UI to a new github repository, bundle it as an NPM package. Keep infrastructure in the same repository as API. API will pull in UI as a dependency.
* Option 3 - separate the UI, API and infrastructure. Bundle UI and API separately as NPM packages  Infrastructure will have UI and API packages as dependencies.

## Decision Outcome

We selected Option 3.
It gives the most clarity for opensource developers as everything has a clear responsibility.

### Positive Consequences <!-- optional -->

* [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
* …

### Negative consequences <!-- optional -->

* [e.g., compromising quality attribute, follow-up decisions required, …]
* …

## Pros and Cons of the Options <!-- optional -->

### [option 1]

[example | description | pointer to more information | …] <!-- optional -->

* Good, because [argument a]
* Good, because [argument b]
* Bad, because [argument c]
* … <!-- numbers of pros and cons can vary -->

### [option 2]

[example | description | pointer to more information | …] <!-- optional -->

* Good, because [argument a]
* Good, because [argument b]
* Bad, because [argument c]
* … <!-- numbers of pros and cons can vary -->

### [option 3]

[example | description | pointer to more information | …] <!-- optional -->

* Good, because [argument a]
* Good, because [argument b]
* Bad, because [argument c]
* … <!-- numbers of pros and cons can vary -->

## Links <!-- optional -->

* [Link type] [Link to ADR] <!-- example: Refined by [ADR-0005](0005-example.md) -->
* … <!-- numbers of links can vary -->