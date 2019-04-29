import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';

import Api from '../../Api/index.js';
import navbarLinks from '../lib/custom-navbar-links';

class TranscriptShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      transcriptId: this.props.match.params.transcriptId,
      projectTitle: 'Test Project Title',
      transcriptTitle: 'Test Transcript Title ',
      transcriptDescription: 'Test Transcript Desc'
    };

  }

  componentDidMount = () => {
    // Get Transcript Title
    // Get Project Title
    // TODO: get Transcript Title
    // Api.getTranscript(this.state.projectId).then((tmpProject) => {
    //   console.log(tmpProject);
    //   this.setState({ project: tmpProject });
    // });
  }

  render() {
    return (
      <Container>
        <CustomNavbar
          links={ navbarLinks(this.state.projectId) }
        />
        <br/>
        <CustomBreadcrumb
          items={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              // TODO: need to get project name
              name: 'Project:',
              link: `/projects/${ this.state.projectId }`
            },
            {
              name: 'Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts`
            },
            {
              name: `${ this.state.transcriptTitle ? this.state.transcriptTitle : '' }`
            }
          ] }

        //   items={ [ {
        //     name: 'Projects',
        //     link: '/projects'
        //   },
        //   {
        //     // TODO: project title
        //     name: `${ this.state.project ? this.state.project.title : '' }`
        //   }
        //   ] }
        />
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.transcriptId }/correct` }>
              <Button variant="outline-primary" size="lg" block>Correct Transcript</Button>
            </LinkContainer>
            <br/>
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.transcriptId }/annotate` }>
              <Button variant="outline-primary" size="lg" block>Annotate Transcript</Button>
            </LinkContainer>
            <br/>
          </Col>
        </Row>
        <Row >
          <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
            <h1>{this.state.transcriptTitle}</h1>
            <p>{this.state.transcriptDescription}</p>
          </Col>
        </Row>
        <CustomFooter />
      </Container>
    );
  }
}

export default TranscriptShow;
