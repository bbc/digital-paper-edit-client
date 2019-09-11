import React from 'react';
import cuid from 'cuid';

import VoiceOver from './VoiceOver';
import PaperCut from './PaperCut';
import TitleHeading from './TitleHeading';
import Note from './Note';

import SortableItem from './SortableItem';

const adaptAddedElement = (type, text) => {
  switch (type) {
  case 'title':
    return (<TitleHeading text={ text } />);
  case 'voice-over':
    return <VoiceOver text={ text } />;
  case 'note':
    return <Note text={ text } />;
  default:
    console.error('invalid added element type: ', type, text);

    return null;
  }
};

const ProgrammeElements = (elements, handleEdit, handleDelete) => {
  return elements.map((el, index) => {
    const key = cuid();
    const type = el.type;
    const text = el.text;

    if (type === 'insert') {
      return (
        <SortableItem
          key={ key }
          index={ index }
          value={ text }
          backgroundColour="orange"
          textColour="white"
        />
      );

    }

    if (type === 'paper-cut') {
      return (
        <SortableItem
          key={ key }
          index={ index }
          value={
            <PaperCut
              speaker={ el.speaker }
              words={ el.words }
            />
          }
          handleDelete={ handleDelete }
          handleEdit={ null }
        />);
    }

    return (
      <SortableItem
        key={ key }
        index={ index }
        value={ adaptAddedElement(type, text) }
        handleDelete={ handleDelete }
        handleEdit={ handleEdit }
      />
    );
  });
};

export default ProgrammeElements;