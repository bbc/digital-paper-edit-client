import React, { useState } from 'react';
import { colorNamesList, randomColor } from './css-color-names.js';
import chroma from 'chroma-js';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GithubPicker } from 'react-color';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';

function ColorOptionsFormGroup(props) {
  // Declare a new state variable, which we'll call "count"
  const [color, setColor] = useState(props.color);

  const handleSetColor = (color)=>{
      console.log('handleSetColor', color);
      setColor(color);
      props.handleColorSelectChange(color);
  }

  const handleRandomiseColor =() => {
    // this.setState({ color: randomColor() });
    const tmpColor = randomColor();
    handleSetColor(tmpColor)
  }

  const  handleColorPickerChangeComplete = (color) => {
    // this.setState({ color: chroma(color.hex ).name() });
    const tmpColor = chroma(color.hex).name();
    handleSetColor(tmpColor)
  }

  const handleManualColorChange = (e) => {
    if (e && e.target && e.target.value) {
      const colorValue = e.target.value;
      // this.setState({ color: chroma.valid(colorValue) ? chroma(colorValue).name() : colorValue });

      const tmpColor = chroma.valid(colorValue) ? chroma(colorValue).name() : colorValue ;
      handleSetColor(tmpColor)
    }
    else if (e && e.target && e.target.value === '') {
      // this.setState({ color: '' });
      handleSetColor('')
    }
  }

  // const handleSave = () => {
  //   // checks color in color picker input is valid - can be color name in letters or hex
  //   if (chroma.valid(this.state.color)) {
  //     // checks label name is not empty
  //     if ( this.state.label !== '') {
  //       this.props.onLabelSaved({
  //         value: this.state.color,
  //         label: this.state.label,
  //         color: this.state.color,
  //         description: this.state.description,
  //         id: this.state.labelId
  //       });

  //       this.props.handleClose();
  //     }
  //     else {
  //       alert('add a name to the label to be able to save');
  //     }
  //   }
  //   else {
  //     alert('choose a valid color');
  //   }
  // }



  return (
    
 <Form.Group controlId="formGroupPassword">
 <Form.Label>Color</Form.Label>
 <Row>
   <Col xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }>
     <Button onClick={ handleRandomiseColor } variant="light" size="sm">
       <FontAwesomeIcon icon={ faSyncAlt } />
     </Button>
   </Col>
   <Col xs={ 6 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
     <Form.Control
       value={ color }
       type="text"
       placeholder="#"
       onChange={ handleManualColorChange }
     />
   </Col>
   <Col xs={ 2 } sm={ 2 } md={ 2 } lg={ 2 } xl={ 2 }
     style={ {
       backgroundColor: color,
       border: 'solid',
       borderWidth:'0.01em',
       borderColor: 'grey',
       padding: '1em'
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
       color={ color }
       triangle={ 'hide' }
       onChangeComplete={ handleColorPickerChangeComplete }
       //   https://casesandberg.github.io/react-color/
       colors={ colorNamesList }
     />
   </Col>
 </Row>
</Form.Group>
  );
}








export default ColorOptionsFormGroup;