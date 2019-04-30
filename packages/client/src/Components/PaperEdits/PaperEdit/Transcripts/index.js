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

import Transcript from './Transcript.js';

class Transcripts extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
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
            <Col sm={ 9 }
              // onClick={ (e) => {console.log('onClick', e);} }
            >
              <Tab.Content>
                <h2>Search</h2>
                <hr/>
                <Tab.Pane eventKey="first" >
                  <Transcript />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Transcript />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}

export default Transcripts;
