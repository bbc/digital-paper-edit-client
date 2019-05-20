# Previewing Paper Cuts - React component

* Status: accepted
* Deciders: Pietro
* Date: 2019-05-20<!--YYYY-MM-DD -->

Technical Story: https://github.com/bbc/digital-paper-edit/issues/3

## Context and Problem Statement

As part of the Paper-edit view

![Screen Shot 2019-04-18 at 13 54 26](https://user-images.githubusercontent.com/4661975/56362368-8fd2bf00-61e1-11e9-9e87-edf71c0da030.png)


> As a user, I want to be able to get (watch or listen to) a preview of the paper-edit/program script so that I can see how my program's paper-cuts (transcripts text selections) will "render" as audio and/or video.

In the sketch, this would be the "canvas" - _borrowing terminology from to the NLE video editors distinction between preview and canvas_

A React component that takes a sequence of audio or video clips as an input, with start and end time, and displays a player that can 
- [ ] Seamlessly play this EDL (edit decision list) without buffer or load time in between clips
- [ ] Has player controls, such as
   - [ ] progress bar
   - [ ] play/pause 
   - [ ] stop

Note that the component should be able to generate the preview if the sequence is made of audio, video or a mix of audio and video files.

In first version it could just deal with sequences of media, but it be good if in subsequent versions it could handle things like text, titles (as a possible way to display place holders for voice over text?) - this second part needs to be flashed out more. But the general thing to keep in mind is the extensibility of the elements to display, if that makes sense.


## Decision Drivers <!-- optional -->

* easy to reason around
* performant 


## Considered Options

1.  Vanilla Js
2. BBC Video compositor
3. Popcorn JS
4. Hyperaud.io
5.  `bbc/VideoContext`

### 1.Vanilla Js

in [autoedit2](http://www.autoedit.io/), [paper-editing](https://autoedit.gitbook.io/user-manual/paperediting) because the files are stored locally, there's no network buffer issue when loading the different clips so used [a vanilla js implementation that you can see in this js fiddle](https://jsfiddle.net/pietrops/kus10b48/)
This also uses media fragments to only get the specific segment.

### 2. BBC Video compositor

[html5-video-compositor](https://github.com/bbc/html5-video-compositor) was a precoursor of `bbc/VideoContext`, now deprecated.

- https://github.com/bbc/html5-video-compositor/wiki/Quick-Start-Guide 
- https://github.com/bbc/html5-video-compositor/wiki/Playlists 

### 3. Popcorn JS
Popcorn js was a library by Mozilla, but is no longer mantained.
There was a [JSfiddle with an example](https://jsfiddle.net/pietrops/0adkfke9/) but 
it's not working, coz no popcorn js CDN url is not valid.

[The Documentation shows what the `sequence` function used to do](https://github.com/mozilla/popcorn-docs/blob/gh-pages/modules/_posts/2012-12-12-sequence.md)

### 4. Hyperaud.io
Hyperaud.io was one of the first project to experiment with the idea of [Hypertranscripts
](https://hyperaud.io/blog/hypertranscripts/) and you can see in the [hyperaud.io pad](https://hyperaud.io/pad/) how you can mix from multiple selections and then get a preview. 

I think under the hood two HTML5 video elements are cued up one after the other as a workaround to reduce load time of the media.

### 5. `bbc/VideoContext`
Main option considered is to use [`bbc/VideoContext`](https://github.com/bbc/VideoContext) within a React component. 

See this issue for more details on how it works with an EDL(Edit Decision List) sequence of clips https://github.com/bbc/VideoContext/issues/42

There are other examples and indications in the repo on how to enable, play, pause, and a progress bar. 

I think under the hood, Video Context, used the HTML5 canvas to concat the videos in the sequence and then provides a unified interface to treat it as a single media.


## Decision Outcome

Chosen option: option 5 `bbc/VideoContext`, because it seems to be a performant way to display an EDL/playlist of clips with start and end times options. It is also currently being mantained by BBC R&D.
