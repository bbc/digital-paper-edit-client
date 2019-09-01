import React from 'react';

import arrayMove from 'array-move';
import SortableElement from './SortableElement';
import SortableContainer from './SortableContainer';

import VoiceOver from './VoiceOver';
import PaperCut from './PaperCut';
import TitleHeading from './TitleHeading';
import Note from './Note';
import Insert from './Insert';

const getElement = (el) => {
  switch (el.type) {
  case 'title':
    return { el:<TitleHeading key={ el.id } title={ el.text } />, type: el.type };
  case 'voice-over':
    return { el:<VoiceOver key={ el.id } text={ el.text } />, type: el.type };
  case 'paper-cut':
    return { el: <PaperCut key={ el.id } el={ el } speaker={ el.speaker } words={ el.words }/>, type: el.type };
  case 'note':
    return { el: <Note key={ el.id } text={ el.text } />, type: el.type };
  case 'insert':
    return { el: <Insert text={ el.text } />, type: el.type };
  default:
    console.error('invalid programme element type');

    return null;
  }
};

const ProgrammeScriptContainer = (props) => {

  const elements = props.elements;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const result = arrayMove(elements, oldIndex, newIndex);
    console.log('onsort end');
    console.log(result);
    props.handleReorder(result);
  };

  let sortableProgramme;

  if (elements) {
    const programme = elements.map((el) => getElement(el));

    sortableProgramme =
      <SortableContainer useDragHandle onSortEnd={ onSortEnd }>
        {programme.map((value, index) => (
          <SortableElement
            key={ `item-${ index }` }
            index={ index }
            value={ value.el }
            type={ value.type }
            handleDelete={ props.handleDeleteElement }
            handleEdit={ props.handleEditElement }
          />
        ))}
      </SortableContainer>;
  }

  return (
    <>
      { sortableProgramme }
    </>
  );
};

export default ProgrammeScriptContainer;
