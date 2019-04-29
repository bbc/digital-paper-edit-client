

# Features list / User Stories

See [Github Milestones for more details](https://github.com/bbc/digital-paper-edit/milestones)

_This doc could be converted into user stories with format the_

> As a `< type of user >`, I want `< some goal >` so that `< some reason >`.

<!-- **_TODO_**: convert  this list into user stories with format  \
As a < type of user >, I want < some goal > so that < some reason >.

Grouped into Epics.

With acceptance criteria. 

+give it a number id 

**_TODO_**: Also considering using job to be done instead of user stories [https://jtbd.info/replacing-the-user-story-with-the-job-story-af7cdee10c27](https://jtbd.info/replacing-the-user-story-with-the-job-story-af7cdee10c27) -->



## [Milestone 1: Transcript Editing](https://github.com/bbc/digital-paper-edit/milestone/3)

### Projects

- [ ] Create a new project
- [ ] Create transcripts and paper-edits within a project 
- [ ] View list of projects 


### Transcript - Editing

**skip this** For details see [Transcript Editor - Features Ideas brainstorm - draft](https://paper.dropbox.com/doc/RTCnJXv8pi9Ux36KTS30U), [ @bbc/react-transcript-editor component](https://github.com/bbc/react-transcript-editor) and [demo](https://bbc.github.io/react-transcript-editor/iframe.html?id=transcripteditor--default) 


## [Milestone 2: Transcript Annotations](https://github.com/bbc/digital-paper-edit/milestone/4)

### Transcript - Search

- [ ] search one or multiple transcript at once
- [ ] search a word or sentence
- [ ] see results in context (eg coloured in the original text)
- [ ] see only paragraph containing the searched word or sentence 
    - [ ] + option to go back to in context transcript (?)


### Transcript - Highlighting 

- [ ] Highlight text selection 
- [ ] `default` Highlight colour that can be uncategorised - so that categorising into labels is optional
- [ ] add a label to text selection- with optional note/description for that text selection highlight 
- [ ] each label can have a colour, name, description
    - [ ] eg can use a colour randomizer (similar to github labels to avoid choice paralyses)
- [ ] Should be able to see a list of labels while reading through the transcript for things to highlight 


### Transcript - Highlighting  + filter + search

- [ ] filter text content (paragraphs) by one or multiple speaker
- [ ] filter content by one or multiple labels
- [ ] combine filtering by speakers and labels to narrow down results even further
- [ ] combine filtering (see above) with search - across one or more transcript

## [Milestone 3:  Paper Editing](https://github.com/bbc/digital-paper-edit/milestone/5)

### Programme Script - outline

- [ ] Outline (eg bullet points for story structure)
    - [ ] constitutes a conceptual sections (eg story act or sequence?) of the program script
- [ ] titles elements - eg for video text titles 


### Programme Script - Voice over Text

- [ ] In a program script a user can add a voice over (narration) script text element to help crafting the story
    - [ ] a user can write down the “placeholder” text they would then read out for a voice over 
    - [ ] This could also estimate duration of the voice over script to help with overall planning


### Programme Script - “Paper-editing”

- [ ] Add a text selection, from the transcripts text, to the program script
    - [ ] this can be 
        - [ ] a highlight 
        - [ ] a text selection including whole or parts off a hiliglight
        - [ ] a text selection not previously hiliglighted 
- [ ] Text selections can be added to “outline points/sections” of the program script
- [ ] Text selection should have 
    - [ ] a speaker label - they belong to in original transcript
    - [ ] some reference to the original transcript (eg transcript title/name)
    - [ ] Indications of any labels, that might be part of the text hilights contained in the text selection?
- [ ] A way to go back to the original transcript and see the text selection in context?


### Programme Script - Preview

- [ ] should be able to preview audio/video version off a program script (based on “paper-cuts” in “paper-edit”)


### Programme Script - Export

- [ ] Should be able to export a programme script (with “paper-cuts”) into a video or audio editing software.


## [Milestone 4:  Support for multi user](https://github.com/bbc/digital-paper-edit/milestone/6)

TBC - stretch goal

> Overarching goal of the milestone is to support being able to add multiple users to a project. This might not equal to collaborative editing (google docs style). Needs further investigation on how to handle multi user permissions, eg as an option blocking access to a transcript if a user is already correcting it, and signalling to the project who has got it currently open etc.
