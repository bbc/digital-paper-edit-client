import React, { Component } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import VoiceOver from './VoiceOver';
import PaperCut from './PaperCut';
import TitleHeading from './TitleHeading';
import Note from './Note';

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

class ProgrammeScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: this.props.programmeScript ? this.props.programmeScript.elements : []
      // items: [ 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6' ]
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    // this.setState(({ items }) => ({
    //   items:
    // })
    // );
    const result = arrayMove(this.props.programmeScriptElements, oldIndex, newIndex);
    console.log(result);
    this.props.handleProgrammeScriptOrderChange(result);
  };

  render() {
    // const { items } = this.state;
    let programme;
    let sortableProgramme;
    if (this.props.programmeScriptElements) {
      programme = this.props.programmeScriptElements.map((el) => {
        switch (el.type) {
        case 'title':
          return <TitleHeading key={ el.id } title={ el.text } />;
        case 'voice-over':
          return <VoiceOver key={ el.id } text={ el.text } />;
        case 'paper-cut':
          return <PaperCut key={ el.id } speaker={ el.speaker } words={ el.words }/>;
        case 'note':
          return <Note key={ el.id } text={ el.text } />;
        default:
          console.error('invalid programme element type');

          return null;
        }
      });
    }

    if (this.props.programmeScriptElements) {
      sortableProgramme = <SortableContainer onSortEnd={ this.onSortEnd }>
        {programme.map((value, index) => (
          <SortableItem key={ `item-${ index }` } index={ index } value={ value } />
        ))}
      </SortableContainer>;
    }

    return (
      <>
        {/* {programme} */}
        {sortableProgramme}

      </>
    );
  }
}

export default ProgrammeScript;
