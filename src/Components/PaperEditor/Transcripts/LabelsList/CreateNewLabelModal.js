import React, { Component } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// TODO: could replace random with this
// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
// and use the list of named CSS colors instead of hex
import randomColor from 'randomcolor'; // import the script
import { GithubPicker } from 'react-color';
import csscolors from 'css-color-names';
import chroma from 'chroma-js';
import colourStyles from './select-color-styles.js';

//  { value: 'chocolate', label: 'Chocolate' },
//  "aqua": "#00ffff",
const cssColorsList = new Array();
for (var key in csscolors) {
  cssColorsList.push({
    value: key,
    label:key,
    color: csscolors[key]
  });
}

class CreateNewLabelModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      color: randomColor(),
      label: '',
      description: ''
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
      color: randomColor(),
      label: '',
      description: ''
    });
    // Clear all input fields in form?
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  //   TODO: change so that colour
  //   Randomiser https://www.npmjs.com/package/randomcolor
  //   Or choose from palet https://casesandberg.github.io/react-color/
  //   + display current color
  handleRandomiseColor =() => {
    this.setState({ color: randomColor() });
  }

  handleColorPickerChangeComplete = (color) => {
    this.setState({ color: color.hex });
  }

  handleHexChange = (e) => {
    if (e && e.target && e.target.value) {
      const hexColor = e.target.value;
      // if it's a valid colour - css
      //   if (chroma.valid(hexColor)) {
      // if it is expressed as hex
      //   if (!hexColor.includes('#')) {
      // hexColor = chroma(hexColor).hex();
      //   }
      this.setState({ color: chroma.valid(hexColor) ? chroma(hexColor).name() : hexColor });
    //   }
    }
    else if (e && e.target && e.target.value === '') {
      this.setState({ color: '' });
    }
  }

  handleColorSelectChange = color => {
    this.setState({ color: color.color });
    // console.log('Option selected:', selectedOptionSpeakerSearch);
  };

  //   handleColorNameChange =
  handleSave = () => {
    if ( this.state.label !== '') {
      this.props.onNewLabelCreated({
        value: this.state.color,
        label: this.state.label,
        color: this.state.color,
        description: this.state.description
      });

      this.handleClose();
    }
    else {
      alert('add a name to the label to be able to save');
    }

  }

  render() {
    return (
      <>
        <Button variant="outline-primary" size="sm" onClick={ this.handleShow } block>
            Create New Label <FontAwesomeIcon icon={ faTag } />{' '}
        </Button>

        <Modal show={ this.state.show } onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon icon={ faTag } /> Create New Label </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Label Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter label name"
                  onInput={ (e) => {this.setState({ label: e.target.value });} }
                />
                <Form.Text className="text-muted">
                    Required label name
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Label Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter label description"
                  as="textarea" rows="3"
                  onInput={ (e) => { this.setState({ description: e.target.value });} }
                />
                <Form.Text className="text-muted">
                    Optional label description
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formGroupPassword">
                <Form.Label>Color</Form.Label>
                <Row>
                  <Col xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }>
                    <Button onClick={ this.handleRandomiseColor } variant="light" size="sm">
                      <FontAwesomeIcon icon={ faSyncAlt } />
                    </Button>
                  </Col>
                  {/* <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }>
                  </Col> */}
                  <Col xs={ 4 } sm={ 3 } md={ 3 } lg={ 3 } xl={ 3 }>
                    <Form.Control
                      value={ this.state.color }
                      type="text"
                      placeholder="#"
                      onChange={ this.handleHexChange }
                    />
                  </Col>
                  {/* <Col xs={ 4 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
                    <Select
                      value={ chroma(this.state.color).name() }
                      onChange={ this.handleColorSelectChange }
                      isMulti={ false }
                      isSearchable
                      options={ cssColorsList }
                      styles={ colourStyles }
                    />

                  </Col> */}
                  <Col xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 }
                    style={ {
                      backgroundColor: this.state.color,
                      border: 'solid',
                      borderWidth:'0.01em',
                      borderColor: 'grey',
                      padding: '0'
                    } }>
                  </Col>
                </Row>
                <Row>
                  <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 } >
                    <Form.Text className="text-muted">
                   To pick a color you can chose one at random, pick one form the list below, or type the name or hex code above.
                    </Form.Text>
                    <GithubPicker
                      width={ '100%' }
                      color={ this.state.color }
                      triangle={ 'hide' }
                      onChangeComplete={ this.handleColorPickerChangeComplete }
                      //   https://casesandberg.github.io/react-color/
                    //   colors={ csscolorsHexList }
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ this.handleClose }>
                Close
            </Button>
            <Button variant="primary" onClick={ this.handleSave } >
              Create Label
              {/* Save Changes */}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default CreateNewLabelModal;