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
class Transcripts extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={ 3 }
            // style={ { display:'none' } }
          >
            <h2>Transcripts</h2>
            <hr/>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                {/* TODO: CSS to truncat lenght of transcript name to
                        to avoid overflow same as title name in @bbc/react-transcript-editor */}
                <Nav.Link eventKey="first" title="Transcript 1">Transcript 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" title="Transcript 2">Transcript 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={ 9 }>
            <Tab.Content>
              <h2>Search</h2>
              <hr/>
              <Tab.Pane eventKey="first" >
                <h3>Transcript 1</h3>
                {/* Preview video - HTML5 Video element or  @bbc/react-transcript-editor/VideoPlayer */}
                {/* Media control - HTML5 default or @bbc/react-transcript-editor/MediaPlayer */}
                {/* Search Bar - from TranscriptAnnotate component  */}
                {/* Text -  from TranscriptAnnotate component */}
                <video src="https://download.ted.com/talks/KateDarling_2018S-950k.mp4" style={ { width: '100%', height:'10em', backgroundColor: 'black' } } controls/>
                <article style={ { height: '60vh', overflow: 'scroll' } }>
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
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <h3>Transcript 2</h3>
                <video src="https://www.w3schools.com/html/mov_bbb.mp4" style={ { width: '100%', height:'10em', backgroundColor: 'black' } } controls/>
                <article style={ { height: '60vh', overflow: 'scroll' } }>
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
                  <Row>
                    <Col sm={ 3 }>
                      <strong>Speaker 2</strong>
                    </Col>
                    <Col sm={ 9 }>
                      <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
                    </Col>
                  </Row>
                </article>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    );
  }
}

export default Transcripts;
