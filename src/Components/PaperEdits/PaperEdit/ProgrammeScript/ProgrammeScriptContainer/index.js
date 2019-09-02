import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import arrayMove from 'array-move';

import SortableElement from './SortableElement';
import SortableContainer from './SortableContainer';

import VoiceOver from './Elements/VoiceOver';
import PaperCut from './Elements/PaperCut';
import TitleHeading from './Elements/TitleHeading';
import Note from './Elements/Note';
import Insert from './Elements/Insert';

import SortableInsert from './SortableInsert';

const getValue = (el) => {
  switch (el.type) {
  case 'title':
    return { el:<TitleHeading key={ el.id } title={ el.text } /> };
  case 'voice-over':
    return { el:<VoiceOver key={ el.id } text={ el.text } /> };
  case 'paper-cut':
    return { el: <PaperCut key={ el.id } el={ el } speaker={ el.speaker } words={ el.words }/> };
  case 'note':
    return { el: <Note key={ el.id } text={ el.text } /> };
  case 'insert':
    return { el: <Insert text={ el.text } /> };
  default:
    console.error('invalid programme element type');

    return null;
  }
};

const ProgrammeScriptContainer = (props) => {

  let sortableProgramme;
  const elements = props.elements;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const result = arrayMove(elements, oldIndex, newIndex);
    console.log(result);
    props.handleReorder(result);
  };

  if (elements) {
    const programme = elements.map((el, index) => {
      const value = getValue(el);
      const type = el.type;

      let handleEdit = props.handleEdit;
      const handleDelete = props.handleDelete;

      if (type === 'insert') {
        return (<SortableInsert value={ value } />);
      } else {
        if (type === 'paper-cut') {
          handleEdit = null;
        }

        return (<SortableElement
          key={ cuid() }
          index={ index }
          value={ value }
          type={ type }
          handleDelete={ handleDelete }
          handleEdit={ handleEdit }
        />);
      }
    });
    sortableProgramme =
      <SortableContainer useDragHandle onSortEnd={ onSortEnd }>
        {programme}
      </SortableContainer>;
  }

  return (
    <>
      { sortableProgramme }
    </>
  );
};

ProgrammeScriptContainer.propTypes = {
  elements: PropTypes.any,
  handleDelete: PropTypes.any,
  handleEdit: PropTypes.any,
  handleReorder: PropTypes.any
};

export default ProgrammeScriptContainer;
