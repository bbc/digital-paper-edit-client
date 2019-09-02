import React from 'react';
import {
  faMicrophoneAlt,
  faStickyNote,
  faHeading,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AddElementMenu = (props) => {

  return (<Dropdown>
    <Dropdown.Toggle variant="outline-secondary">
      <FontAwesomeIcon icon={ faPlus } />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item
        onClick={ () => {props.handleAddElement('title');} }
        title="Add a title header element to the programme script"
      >
        <FontAwesomeIcon icon={ faHeading } /> Heading
      </Dropdown.Item>
      <Dropdown.Item
        onClick={ () => {props.handleAddElement('voice-over');} }
        title="Add a title voice over element to the programme script"
      >
        <FontAwesomeIcon icon={ faMicrophoneAlt } /> Voice Over
      </Dropdown.Item>
      <Dropdown.Item
        onClick={ () => {props.handleAddElement('note');} }
        title="Add a note element to the programme script"
      >
        <FontAwesomeIcon icon={ faStickyNote } /> Note
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>);
};

export default AddElementMenu;