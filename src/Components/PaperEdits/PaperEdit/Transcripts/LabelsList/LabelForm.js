import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GithubPicker } from 'react-color';
import { colorNamesList, randomColor } from './css-color-names.js';
import chroma from 'chroma-js';

class LabelForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      color: this.props.color,
      label: this.props.label,
      description: this.props.description,
      labelId: this.props.labelId
    };
  }

  handleRandomiseColor =() => {
    this.setState({ color: randomColor() });
  }

  handleColorPickerChangeComplete = (color) => {
    this.setState({ color: chroma(color.hex ).name() });
  }

  handleManualColorChange = (e) => {
    if (e && e.target && e.target.value) {
      const colorValue = e.target.value;
      this.setState({ color: chroma.valid(colorValue) ? chroma(colorValue).name() : colorValue });
    }
    else if (e && e.target && e.target.value === '') {
      this.setState({ color: '' });
    }
  }

  handleColorSelectChange = color => {
    this.setState({ color: color.color });
  };

  handleSave = () => {
    // checks color in color picker input is valid - can be color name in letters or hex
    if (chroma.valid(this.state.color)) {
      // checks label name is not empty
      if ( this.state.label !== '') {
        this.props.onLabelSaved({
          value: this.state.color,
          label: this.state.label,
          color: this.state.color,
          description: this.state.description,
          id: this.state.labelId
        });

        this.props.handleClose();
      }
      else {
        alert('add a name to the label to be able to save');
      }
    }
    else {
      alert('choose a valid color');
    }
  }

  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Label Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter label name"
              defaultValue={ this.state.label }
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
              defaultValue={ this.state.description }
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
              <Col xs={ 6 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
                <Form.Control
                  value={ this.state.color }
                  type="text"
                  placeholder="#"
                  onChange={ this.handleManualColorChange }
                />
              </Col>
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
                  colors={ colorNamesList }
                />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" onClick={ this.handleSave } >
              Save
          </Button>
        </Form>
      </>
    );
  }
}
export default LabelForm;