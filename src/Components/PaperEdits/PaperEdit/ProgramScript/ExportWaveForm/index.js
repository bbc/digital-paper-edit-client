import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import ColorOptionsFormGroup from '../../Transcripts/LabelsList/ColorOptionsFormGroup.js'


function Example(props) {
    const [show, setShow] = useState(false);
    const [waveFormMode, setWaveFormMode] = useState('cline');
    const [waveFormColor, setWaveFormColor] = useState('blue');

    const handleClose = () => setShow(false);
    const  handleSubmit = () =>{
        props.handleExportAudioPreviewWithVideoWaveform({waveFormMode, waveFormColor});
        setShow(false)
    };
    const handleShow = () => setShow(true);


   const handleColorSelectChange = color => {
        // this.setState({ color: color });
        console.log('handleColorSelectChange', color)
        setWaveFormColor(color)
  };

 
  const handleSetWaveFormMode = (e)=>{
    const mode = e.target.value;
      console.log('handleSetWaveFormMode', mode)

    setWaveFormMode(mode);
  }
  
    return (
      <>
        <Dropdown.Item 
            variant="light" 
            eventKey="1"
            onClick={handleShow}
            // title={title}
            >
            {props.text}
        </Dropdown.Item>

        {/* <ExportMenuItem
            tootlipDelay={props.TOOLTIP_DEPLAY_IN_MILLISECONDS}
            onClick={ ()=>{props.handleExportAudioPreviewWithVideoWaveform({waveFormMode:'cline'}) }}
            title={props.title}
            text={props.text}
        />
   */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Export audio as video waveform</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select waveform style</Form.Label>
            <Form.Control as="select" onChange={handleSetWaveFormMode}>
                <option value="cline">cline</option>
                <option value="point">point</option>
                <option value="p2p">p2p</option>
                <option value="line">line</option>
            </Form.Control>
         </Form.Group>
         <Image src={require(`./${waveFormMode}.gif`)} alt="loading..." fluid/>
          <ColorOptionsFormGroup
          color={waveFormColor}
          handleColorSelectChange={handleColorSelectChange}
          />

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Example;