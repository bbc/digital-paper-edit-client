# Time Estimations based on Text in Voice Over

* Status: accepted
* Deciders: Eimi, Pietro, Rob
* Date: 2019-10-01

Technical Story: [Investigate: Voiceover time buffer (EDL / FCPX)](https://github.com/bbc/digital-paper-edit-client/issues/65) and [UX investigations: how to better signpost Voice over/link](https://github.com/bbc/digital-paper-edit-client/issues/63)

## Context and Problem Statement

People want to include time taken for voice overs to estimate the time of the rough cut.

## Decision Drivers <!-- optional -->

* Ease of implementation
* Accuracy of time estimated
* Extensibility

## Considered Options

1. Words per minute calculator
2. Reading time calculator
3. Record words, get time from audio
4. Use STT service, get time from audio

## Decision Outcome

Chosen option: 1, because it's the simplest implementation and a standardised way of calculating voice over estimations within the company.

### Positive Consequences <!-- optional -->

* A fairly easy implementation.

### Negative consequences <!-- optional -->

* Less accurate than other options.
* Would require us to change the icon and description of the Voice over, such that it's features are not misunderstood. (This was a point raised in [UX investigations: how to better signpost Voice over/link](https://github.com/bbc/digital-paper-edit-client/issues/63))

## Pros and Cons of the Options <!-- optional -->

### Words per minute calculator

Calculate aggregate time based on 3 seconds per word.

* Good, because it's simple to calculate, doesn't require any additional tooling to implement.
* Good, because it's vouched for by someone with strong editorial experience.
* Bad, because it's very basic, and won't give the most accurate time estimate.

### Reading time calculator

Calculate aggregate time based on read time per word.

* Good, because it's similar to the above - it's simple to implement.
* Bad, because it's even less accurate than the above. Reading time != speaking time

### Record words, get time from audio

Recording audio then retrieving time from audio

* Good, because it produces an accurate time estimate
* Bad, because the audio recorded will most likely be replaced - which will also probably change the time estimate also.
* Bad, because recording audio is a completely new feature that will require additional development in feature that will need storage, transfer and transcoding, based on different platforms and devices.

### Use STT service, get time from audio

Using STT to estimate time of the word, then retrieving time from audio

* Bad, because of similar reasons to above.
* Bad, because also then we would need STT service, which means adding more libraries and potential dependencies to external services, based on platforms and devices.
