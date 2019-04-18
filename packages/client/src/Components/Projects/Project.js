import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';

import Api from '../../Api/index.js';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      project: null
    };

  }

  componentDidMount = () => {
    Api.getProject(this.state.projectId).then((tmpProject) => {
      console.log(tmpProject);
      // if (tmpProject) {
      this.setState({ project: tmpProject });
      // }
    });
  }

  render() {
    return (
      <Container>
        <CustomNavbar
          links={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              name: 'New Projects',
              link: '/projects/new'
            },
            {
              name: 'Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts`
            },
            {
              name: 'New Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts/new`
            },
            {
              name: 'Paper Edits',
              link: `/projects/${ this.state.projectId }/paperedits`
            },
            {
              name: 'New Paper Edit',
              link: `/projects/${ this.state.projectId }/paperedits/new`
            }
          ]
          }
        />
        <br/>
        <CustomBreadcrumb
          items={ [ {
            name: 'Projects',
            link: '/projects'
          },
          {
            // TODO: project title
            name: `${ this.state.project ? this.state.project.title : '' }`
          }
          ] }
        />
        {/* Desktop  */}
        {/* https://getbootstrap.com/docs/4.0/utilities/display/#hiding-elements */}
        {/* <div className="d-none d-sm-block"> */}
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>

            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts` }>
              <Button variant="outline-primary" size="lg" block>Transcripts</Button>
              {/* <h2 className="text-center">Transcripts</h2> */}
            </LinkContainer>

            <br/>
            {/* TODO: Transcripts list */}
            {/* <section style={ { height: '75vh', overflow: 'scroll' } }>
              {this.state.project ? JSON.stringify(this.state.project.transcripts) : ''}

            </section> */}
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>

            <LinkContainer to={ `/projects/${ this.state.projectId }/paperedits` }>
              <Button variant="outline-primary" size="lg" block>Paper-Edits</Button>
              {/*  <h2 className="text-center">Paper-Edits</h2>*/}
            </LinkContainer>

            {/* TODO: Paper-edits list  */}
            {/* <section style={ { height: '75vh', overflow: 'scroll' } }>
              {this.state.project ? JSON.stringify(this.state.project.transcripts) : ''}

            </section> */}
          </Col>
        </Row>
        {/* </div> */}

        {/* Mobile */}
        {/* <div className="d-block d-sm-none">
          <Tabs defaultActiveKey="transcript" id="uncontrolled-tab-example" >
            <Tab eventKey="transcript" title="Transcript">
              <h2> Transcript </h2>
              <section style={ { height: '75vh', overflow: 'scroll' } }>

              </section>
            </Tab>
            <Tab eventKey="paper-edit" title="Paper edit">
              <h2> Paper edit </h2>
              <section style={ { height: '75vh', overflow: 'scroll' } }>

              </section>
            </Tab>
          </Tabs>;
        </div> */}

        <Row>
          <Col >
            <CustomFooter />
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Project;
