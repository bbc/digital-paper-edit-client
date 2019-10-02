# Placeholder Media in Programme Script

* Status: accepted
* Deciders: Eimi, Pietro
* Date: 2019-10-01

Technical Story: [Investigate: Voiceover time buffer (EDL / FCPX)](https://github.com/bbc/digital-paper-edit-client/issues/65) and [UX investigations: how to better signpost Voice over/link](https://github.com/bbc/digital-paper-edit-client/issues/63)

## Context and Problem Statement

People have mentioned they want to be able to insert placeholders. The placeholders will then be also present in their editing tool of their choice, i.e. Sadie (ADL, EDL) or FCP. Since this is not a prioritised feature (it is a nice-to-have), it has been placed out-of-scope for now. Also "Placeholders" features are sometimes not used at all by content producers.

## Decision Drivers <!-- optional -->

* Ease of implementation
* User Experience
* Demand of feature

## Considered Options

1. Add Placeholder configuration to each type of export files
2. Add dummy content where the content will be replaced
3. Add dummy content with UI to specify filename, so when importing it will point to the right place

## Decision Outcome

This implementation needs investigation from a technical and UX point of view.
We need to clear up assumptions about how things work technically by trying out the placeholder features of each editing tool.
We also need to clear up assumptions about how people use the placeholders, if it needs to be presented in a certain way in the Workspace view.
Ideally I would say Option 1, but we will need to investigate further to conclude properly. This document needs updating once investigations have been done.

### Positive Consequences <!-- optional -->

* Placeholder works out of the box for specific editing tools

### Negative consequences <!-- optional -->

* Will require reverse engineering to understand specific editing tools

## Pros and Cons of the Options <!-- optional -->

### Add "Placeholder" data for specific tools

This means creating solutions for specific editing tools - most likely three (EDL, ADL, FCPX).

* Good, because very specific, could potentially integrate existing flows
* Bad, because it's specific and that requires resources, such as access to the tools and OS to test solutions

### Add dummy data to be specified later

Add dummy data with default content, which will be added into the export file.
This will need to be replaced by the user manually and this could be a frustrating process.

* Good, because dummy data works with all editing tools.
* Bad, because you will have to replace the content later and that could mean you'd have to fiddle quite a bit in the editing tool (assumption)
* Bad, because have to create and store dummy data. (Unknown)

### Add dummy data and specify

Add dummy data with default content, which at export will be replaced with the name provided by the user.
This will require an interface where the user specifies at the point of creating the placeholder.

* Good, because dummy data works with all all editing tools.
* Good, because you can specify what the filename is.
* Bad, because specifying the filename not work out of the box. (Unknown)
* Bad, because you still might need the above dummy data.
