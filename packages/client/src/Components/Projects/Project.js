import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';
import navbarLinks from '../lib/custom-navbar-links';
import Api from '../../Api/index.js';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      project: null,
      projectTitle: ''
    };

  }

  componentDidMount = () => {
    Api.getProject(this.state.projectId).then((tmpProject) => {
      console.log(tmpProject);
      this.setState({ project: tmpProject,
        projectTitle: tmpProject.title,
        projectDescription: tmpProject.description
      });
    });
  }

  render() {
    console.log(navbarLinks(this.state.projectId));

    return (
      <Container>
        <CustomNavbar
          links={ navbarLinks(this.state.projectId) }
        />
        <br/>
        <CustomBreadcrumb
          items={ [ {
            name: 'Projects',
            link: '/projects'
          },
          {
            // TODO: project title
            name: `${ this.state.project ? this.state.projectTitle : '' }`
          }
          ] }
        />
        <Row>
          <Col xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/transcripts` }>
              <Button variant="outline-primary" size="lg" block>Transcripts</Button>
            </LinkContainer>
            <br/>
          </Col>
          <Col xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/paperedits` }>
              <Button variant="outline-primary" size="lg" block>Paper-Edits</Button>
            </LinkContainer>
            <br/>
          </Col>
          <Col xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
            <LinkContainer to={ `/projects/${ this.state.projectId }/users` }>
              <Button variant="outline-primary" size="lg" block>Users</Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row >
          <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
            <h1>{this.state.projectTitle}</h1>
            <p>{this.state.projectDescription}</p>
          </Col>
        </Row>
        <CustomFooter />
      </Container>
    );
  }
}

export default Project;
