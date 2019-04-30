import React, { Component } from 'react';
import { TranscriptEditor } from '@bbc/react-transcript-editor';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderPlus, faMicrophoneAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import CustomNavbar from '../../../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../../../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../../../lib/CustomFooter/index.js';
import navbarLinks from '../../../lib/custom-navbar-links';
import Paragraph from './Paragraph.js';

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <>
        <h3>Transcript 1</h3>

        {/* // Preview video - HTML5 Video element or  @bbc/react-transcript-editor/VideoPlayer
        // Media control - HTML5 default or @bbc/react-transcript-editor/MediaPlayer
        // Search Bar - from TranscriptAnnotate component
        // Text -  from TranscriptAnnotate component */}
        <video src="https://download.ted.com/talks/KateDarling_2018S-950k.mp4" style={ { width: '100%', height:'10em', backgroundColor: 'black' } } controls/>
        <article style={ { height: '60vh', overflow: 'scroll' } }>
          <Paragraph />
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 1</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
        </article>
      </>
    );
  }
}

export default Transcript;
