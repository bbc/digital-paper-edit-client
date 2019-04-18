import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
// import { LinkContainer } from 'react-router-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomCard from '../lib/CustomCard/index.js';

import CustomFooter from '../lib/CustomFooter/index.js';

import Api from '../../Api/index.js';

import './index.module.css';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsList: null
    };
  }

  componentDidMount = () => {
    // TODO: do we need to add user id in request?
    Api.getProjects().then((projectsList) => {
      console.log('tmpList', projectsList);
      if (projectsList) {
        // add a display property for component cards search
        const tmpList = projectsList.map((item) => {
          item.display = true;

          return item;
        });
        this.setState({ projectsList: tmpList });
      }
    });
  }

    // TODO: could be moved in utils
    includesText = (textOne, textTwo) => {
      return textOne.toLowerCase().trim().includes(textTwo.toLowerCase().trim());
    }

    handleSearch = (e) => {
      const searchText = e.target.value;
      const results = this.state.projectsList.filter((project) => {
        if (this.includesText(project.title, searchText)
        || this.includesText(project.description, searchText)
        ) {
          project.display = true;

          return project;
        } else {
          project.display = false;

          return project;
        }
      });

      this.setState({
        projectsList: results
      });
    }

    render() {
      let projects;
      if ( this.state.projectsList !== null) {
        projects = this.state.projectsList.map((project) => {
          if (project.display) {
            return ( <CustomCard
              key={ project.id }
              id={ project.id }
              title={ project.title }
              subtitle={ project.description }
              links={ [
                {
                  name: 'Show',
                  link: `/projects/${ project.id }`
                },
                {
                  name: 'Transcripts',
                  link: `/projects/${ project.id }/transcripts`
                },
                {
                  name: 'Paper-Edits',
                  link: `/projects/${ project.id }/paperedits`
                }
              ] }
            />
            );
          } else {
            return null;
          }
        })
          .filter((project) => {
            return project !== null;
          });
      }

      return (
        <Container>
          <CustomNavbar
            links={ [
              {
                name: 'Projects',
                link: '/projects'
              },
              {
                name: 'New Project',
                link: '/projects/new',
              }
            ] }
          />
          <br/>
          <CustomBreadcrumb
            items={ [ {
              name: 'Projects'
            }
            ] }
          />

          <InputGroup className="mb-3">
            <FormControl
              onChange={ this.handleSearch }
              placeholder="Search for project title or description"
              aria-label="search"
              aria-describedby="search"
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon icon={ faSearch } />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <section style={ { height: '75vh', overflow: 'scroll' } }>
            {projects}
          </section>

          <Row>
            <Col className="d-none d-sm-block">
              <CustomFooter />
            </Col>
            <Col className="d-lg-block d-md-block">
              <CustomFooter />
            </Col>
          </Row>
        </Container>
      );
    }
}

export default Projects;
