import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import Transcript from './Transcript.js';

class Transcripts extends Component {

  // eslint-disable-next-line class-methods-use-this
  render() {
    const transcriptsElNav = this.props.transcripts.map((transcript, index) => {
      return (
        <Nav.Item key={ index }>
          <Nav.Link eventKey={ index } title={ transcript.transcriptTitle }>{transcript.transcriptTitle}</Nav.Link>
        </Nav.Item>
      );
    });
    const transcriptsElTab = this.props.transcripts.map((transcript, index) => {
      return (
        <Tab.Pane key={ transcript.id } eventKey={ index } >
          <Transcript
            title={ transcript.transcriptTitle }
            transcript={ transcript.transcript }
            url={ transcript.url }
          />
        </Tab.Pane>
      );
    });

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
                {transcriptsElNav}
              </Nav>
            </Col>
            <Col sm={ 9 }
              // onClick={ (e) => {console.log('onClick', e);} }
            >
              <Tab.Content>
                <h2>Search</h2>
                <hr/>
                {transcriptsElTab}
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
