import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import VoiceOver from './VoiceOver';
import PaperCut from './PaperCut';
import TitleHeading from './TitleHeading';
import Note from './Note';

import {
  faGripLines,
  faGripHorizontal,
  faPen,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DragHandle = sortableHandle(() => <span> <FontAwesomeIcon icon={ faGripLines } /> </span>);

const SortableItem = sortableElement(({ value, index, type, handleDelete, handleEdit }) => {
  return (<li>
    <Row>
      <Col sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
        <DragHandle />
      </Col>
      <Col sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 }>
        {value}
      </Col>
      <Col sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
        {/* TODO: if paper-cut  then don't show edit/pen icon */}
        {type !== 'paper-cut' ? <FontAwesomeIcon className={ 'text-muted' } icon={ faPen } onClick={ () => { handleEdit(index); } } /> : null}

      </Col>
      <Col sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
        {/* TODO: pass a prop to remove element from list */}
        <FontAwesomeIcon className={ 'text-muted' } icon={ faTrash } onClick={ () => {handleDelete(index);} } />
      </Col>
    </Row></li>);
});

const SortableContainer = sortableContainer(({ children }) => {
  return <ul style={ { listStyle: 'none' } }>{children}</ul>;
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
          return { el:<TitleHeading key={ el.id } title={ el.text } />, type: el.type };
        case 'voice-over':
          return { el:<VoiceOver key={ el.id } text={ el.text } />, type: el.type };
        case 'paper-cut':
          return { el: <PaperCut key={ el.id } speaker={ el.speaker } words={ el.words }/>, type: el.type };
        case 'note':
          return { el: <Note key={ el.id } text={ el.text } />, type: el.type };
        default:
          console.error('invalid programme element type');

          return null;
        }
      });
    }

    if (this.props.programmeScriptElements) {
      sortableProgramme = <SortableContainer useDragHandle onSortEnd={ this.onSortEnd }>
        {programme.map((value, index) => (
          <SortableItem
            key={ `item-${ index }` }
            index={ index }
            value={ value.el }
            type={ value.type }
            handleDelete={ this.props.handleDeleteProgrammeScriptElement }
            handleEdit={ this.props.handleEditProgrammeScriptElement }
          />
        ))}
      </SortableContainer>;
    }

    return (
      <>
        {/* {programme} */}
        { sortableProgramme }
      </>
    );
  }
}

export default ProgrammeScript;
