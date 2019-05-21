# Aannotations client side representation - Draft



For implementing the selection and highlights and notes on to the document,

the idea is that you could have selection object that allows you to get started and time

of what the user selected, then the user clicks on highlight button.

When the user clicks on the highlight button, they can select the tag of the color, or the label that they want to apply to the selection. When they go back to the actual selection, under the hood, we are taking the start and end time of the range that is then saved with a selection. 

So then the paragraph knows if it needs to display a selection. Now, the paragraph is past the selection data from the transcript and then it knows what it needs to display, the words with backgrounds are no

---


So once the

once the paragraph knows, if it needs to display the words with the time code associated with or no,

sorry, with the amnotation associated with it or not,

then we need. So that's easy to like just had like a background color,

we're not going to do the background highlight,

we're going to do an underline with the color.

So therefore accessibility, the text is more and more readable.

Also, that means, if we were to have multiple selections on one

word, then for an hour ignoring that use case, we're just doing one session per word, we're probably not even going to force it to begin with, because we need kind of better thinking around

what's a good way to limit that

maybe you don't make it selectable, if

it already contains a selection,

or some Father, I don't

know, well, we'll have to see by in the future, where you can do if you're doing underlined,

is that you

could actually

change the CSS

so that

the underlines don't overlap, you space the sentence of a more, and then you can have multiple

colors and labels overlap on the same

sentence or parts, parts of it,

if it needed. So,

then the main thinking here is that you could have the

so if you got the selection,

and the selection is hunger, the words, then

Right, so the bulk of the problem is that

when you go your selection,

your you should be able to click on over, or they are the segment. And you should be able to see if that what is the label associated with it, like what's the name, you can add notes to that selections, a whole bunch of other stuff. Like, if you want to change the label

and the corresponding color, you should be able to do it.

It shouldn't just be something

once you've selected that is just a background call apply to this to the word and it's very hard to modify, delete, or treat it as like

one one kind of unit. So

in order to achieve, what we want is to be able to attach

that kind of

annotation object or information, metadata around the annotation,

that's,

for lack of a better word, we want to be able to attach that to the selection. So to attach that to the

selection,

the best thing to do is probably to attach it either to the first or the last word.

And then

I don't know in some kind of way, if you click on a word, then that word

will pop up the rest of the pop over with the annotation informations.

Potentially.

The problem is,

at this point, we're assuming every selection

is not going to span more than one paragraph that we're going for short. Grauer sentences that are being selected within harder. I think this is kind of consistent with the idea of

what you would do if you're doing a paper edit, which is you wouldn't necessarily try and make big selections, because then you're going to big internet selection. So it can be seen as something that although is a technical limitation, it's kind of bug, it becomes a feature because they can also enforce good practices around keeping the selection short.

So the

bit that I'm still not convinced about is

if you are selecting a word,

and you got the annotation going, how do you do it?

How can you remove a selection, for example, and

I guess, if you

click on our word,

the word should be able to know if it's part of a selection. And then if it is, it shows the pop up. The problem is the way the overlays work. I guess if we do a paragraph level,

that could be fine. Because maybe the selections are

no

other opponent of level the other a transcript level. So the

it's easier to add.

Maybe there's like a prompt

that comes up where you fill in the description, or any notes associated with it.

And then auction, then what happens is, if you click on the word or if you feel associated with the word

in the paragraph level, then here, when you click on a word, it can tell that that word is part of a range, because it's called the ranges in there. And then it can open up the overlay. But then I don't know how you will see the overlay for now, wrapping the whole thing around the overlay, you might need like a

you might

need to rerun that a paragraph would like if else around the words that are part of selection. And and then that means that those are clickable with the overlay next. And then if you click Remove, then gets re render, you remove the range, the paragraph gets displayed

differently without the overlay.

And the group and the words blueprint on overlay. Seems like a very shitty work around the world today.

But potentially it could could work.

Maybe it's worth capturing all lines one er, and then see if there's an easier most referred away

the top thing by line in ers, whatever are we trying to achieve, we're trying to achieve that you can select some words doesn't have to be an actual selection, it could just be like marketing and marketing. That could also be fine. As long as the UX is fine. And the tech works.

Then the

other thing you want to do is being able to

create a selection range that has got started anytime we're using certain and time is references. Then the other thing we want to do is be able to associate a

selection of notation labels information to it. So things like color, the label name,

so the older they will information just series selection. And then the other thing that is specific to the selection and all the label is some notes or some text description. That is not the description label. What is the description of the annotation, something that you know if you have a reason why you annotated it that way you want to put it with it, you should be able to add the text to the annotation.

I think this is fine for now I need to look at it again and make it



---


Take this annotation, referencing a label

```js
[
    ...
    {
        'start': 75.92,
        'end': 87.27,
        'labelId': 0,
        'note': 'optional example text description for an annotation'
    },
    ...
]
```

and wrap words contained by it 
edge case tje label contains parts of the paragraph
- includes starts but not end - start before the paragraph
- includes end but not the paragraph - ends after the paragraph
- includes all of the paragraph, starts paragraph before and ends paragraph after

```json
[
  {
    "index": 1706,
    "start": 702.17,
    "end": 702.37,
    "text": "Their"
  },
  {
    "index": 1707,
    "start": 702.62,
    "end": 703.26,
    "text": "reflections"
  },
  {
    "index": 1708,
    "start": 703.26,
    "end": 703.36,
    "text": "of"
  },
  {
    "index": 1709,
    "start": 703.36,
    "end": 703.45,
    "text": "our"
  },
  {
    "index": 1710,
    "start": 703.45,
    "end": 703.63,
    "text": "own"
  },
  {
    "index": 1711,
    "start": 703.63,
    "end": 704.34,
    "text": "humanity."
  }
]
```

`find` returns first one it finds
```
d = p.find((w)=> { return w.start < 703.36})
```

`filter` returns all of them
```
d = p.filter((w)=> { return w.start > 703.36});
d.length !== 0;
```

returns all words before - including
```
p.filter((w)=> { return w.start <= 703.36});
```

returns all words after - excluding
```
p.filter((w)=> { return w.start > 703.36});
```


eg 
```
p.filter((w)=> { return w.start <= 703.36})
p.filter((w)=> { return w.start > 703.36})
```

edge case, it's first word, or it's last word?
