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
      this.setState({ project: tmpProject });
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
            },
            {
              name: 'Users',
              link: `/projects/${ this.state.projectId }/users`
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
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts` }>
              <Button variant="outline-primary" size="lg" block>Transcripts</Button>
            </LinkContainer>
            <br/>
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/paperedits` }>
              <Button variant="outline-primary" size="lg" block>Paper-Edits</Button>
            </LinkContainer>
            <br/>
          </Col>
        </Row>

        <Row>
          <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/users` }>
              <Button variant="outline-primary" size="lg" block>Users</Button>
            </LinkContainer>
          </Col>
        </Row>

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
