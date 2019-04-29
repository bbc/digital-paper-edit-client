import React, { Component } from 'react';
import './index.module.css';

import { TranscriptEditor } from '@bbc/react-transcript-editor';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';
import navbarLinks from '../lib/custom-navbar-links';

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptJson: null,
      title: null,
      projectId:  this.props.match.params.projectId,
      projectTitle: ''
    };

  }

  componentDidMount = () => {
    // TODO get id from props match
    fetch('http://localhost:5000/api/projects/1/paperedits/1', { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        this.setState({ paperEditJson: json.paperEdit, title: json.title, projectTitle: json.projectTitle });
      });
  }

  render() {
    return (
      <Container fluid={ true }>

        <CustomNavbar
          links={ navbarLinks(this.state.projectId) }
        />
        <br/>

        {/* <CustomBreadcrumb /> */}
        {/* <Row> */}
        <CustomBreadcrumb
          items={ [ {
            name: 'Projects',
            link: '/projects'
          },
          {
            // TODO: need to get project name?
            // TODO: is this needed?
            name: `Project: ${ this.state.projectTitle }`,
            link: `/projects/${ this.state.projectId }`
          },
          {
            name: 'PaperEdits',
            link:`/projects/${ this.state.projectId }/paperedits`
          },
          {
            name: `${ this.state.title }`
          }
          ] }
        />

        <Container fluid={ true }>
          <Row>
            <Col xs={ 12 } sm={ 7 } md={ 7 } lg={ 7 } xl={ 7 }>
              {/* Search across transcripts could be here? */}
              {/* TODO: separate component for multi transcript view? */}
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={ 3 }>
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
                  <Col sm={ 9 } >
                    <Tab.Content>
                      <Tab.Pane eventKey="first" >
                      Transcript 1
                        {/* Preview video - HTML5 Video element or  @bbc/react-transcript-editor/VideoPlayer */}
                        {/* Media control - HTML5 default or @bbc/react-transcript-editor/MediaPlayer */}
                        {/* Search Bar - from TranscriptAnnotate component  */}
                        {/* Text -  from TranscriptAnnotate component */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        Transcript 2
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
            <Col xs={ 12 } sm={ 5 } md={ 5 } lg={ 5 } xl={ 5 }>
            Canvas
              {/* Canvas preview  */}
              {/* Media Control - if separate from Canvas Preview */}
              {/* Program script - Headings */}
              {/* Program script - Voice over */}
              {/* Program script - Paragraphs (speaker, timecode, word timed text)
              - show transcript title it belongs to,
              as well as any labels paragraph might have? */}
            </Col>
          </Row>

        </Container>

        <CustomFooter />
      </Container>
    );
  }
}

export default Transcript;
