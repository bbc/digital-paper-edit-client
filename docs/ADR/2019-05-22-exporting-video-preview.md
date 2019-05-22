# Exporting a video preview - draft

* Status: in progress
* Deciders: Pietro
* Date: 2019-05-22 

Technical Story: exporting video preview of a program script.

## Context and Problem Statement

We are using BBC `VideoContext` to display a preview of the paper-cuts in a program script.

Main export is an EDL or XML to import into audio or video editing software to continue from rough cut to fine cut.

However it be useful to be able to export the "rough cut preview" as a video to remove extra steps if users need to share it as is.


## Decision Drivers <!-- optional -->

* Easy to reason around
* Light on the client, for low performance PC running IE (for web version)


## Considered Options

1. Server side `ffmpeg-remix`
2. Export from `VideoContext`
3. client side ffmpeg


## Decision Outcome
<!-- 
Chosen option: "[option 1]", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | … | comes out best (see below)]. -->

_TBC, most likely 1 - `ffmpeg-remix`_

<!-- ### Positive Consequences 

* [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
* …

### Negative consequences

* [e.g., compromising quality attribute, follow-up decisions required, …]
* …  -->

## Pros and Cons of the Options <!-- optional -->

### 1. Server side `ffmpeg-remix`

<!-- [example | description | pointer to more information | …]  -->

[`ffmpeg-remix`](https://www.npmjs.com/package/ffmpeg-remix)

Fast server side cutting of mp4s.

Videos need to be mp4, as it's changing the header info and cut/copy blocks rather then transcoding.

Takes in a json sequence and returns the edited video.


* Good, because it's faster then transcoding
* Bad, because it's server side, needs it's own microservice

### 2. Export from `VideoContext`

[Export high quality video? `#124`](https://github.com/bbc/VideoContext/issues/124#issuecomment-493722339)


* Good, because we are already using VideoContext to display a preview
* Bad, because it might not be possible
* Bad, because it might be resource intense on the client

### 3. client side ffmpeg

- [`ffmpeg.js`](https://github.com/Kagami/ffmpeg.js)
- [`videoconverter.js`](https://bgrins.github.io/videoconverter.js)

eg via webworker to offload effort


* Good, because it could run client side
* Bad, because it might not be production ready, ie too buggy
* Bad, because it might be resource intense on the client


<!-- ## Links 

* [Link type] [Link to ADR]  -->