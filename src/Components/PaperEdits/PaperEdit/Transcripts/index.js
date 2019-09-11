import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

import Transcript from './Transcript.js';
import cuid from 'cuid';

class Transcripts extends Component {

  // eslint-disable-next-line class-methods-use-this
  render() {
    const transcriptsElNav = this.props.transcripts.map((transcript) => {
      return (
        <Nav.Item key={ cuid() }>
          <Nav.Link
            disabled={ transcript.status !== 'done' ? true : false }
            // title={ transcript.status !== 'done' ? transcript.status : transcript.title }
            eventKey={ transcript.id }

          >
            { transcript.status === 'in-progress' ? <FontAwesomeIcon icon={ faClock }/> : '' }
            { transcript.status === 'error' ? <FontAwesomeIcon icon={ faExclamationTriangle }/> : '' }
            { `  ${ transcript.transcriptTitle }` }
          </Nav.Link>
        </Nav.Item>
      );
    });
    const transcriptsElTab = this.props.transcripts.map((transcript) => {
      return (
        <Tab.Pane key={ cuid() } eventKey={ transcript.id } >
          <Transcript
            projectId={ this.props.projectId }
            transcriptId={ transcript.id }
            labelsOptions={ this.props.labelsOptions }
            title={ transcript.transcriptTitle }
            transcript={ transcript.transcript }
            url={ transcript.url }
            videoHeight={ this.props.videoHeight }
          />
        </Tab.Pane>
      );
    });

    return (
      <>
        <Tab.Container
          defaultActiveKey={ this.props.transcripts[0] ? this.props.transcripts[0].id : 'first' }
        >
          <Row>
            <Col sm={ 3 }>
              <h2
                className={ [ 'text-truncate', 'text-muted' ].join(' ') }
                // className={ 'text-truncate' }
                title={ 'Transcripts' }
              >
                Transcripts</h2>
              <hr/>
              <Nav variant="pills" className="flex-column">
                { transcriptsElNav }
              </Nav>
            </Col>
            <Col sm={ 9 }>
              <Tab.Content>
                { transcriptsElTab }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

      </>
    );
  }
}

export default Transcripts;
