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

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId
    };

  }

  // componentDidMount = () => {
  //     fetch('http://localhost:5000/api/1/transcripts/1', { mode: 'cors' })
  //     .then(res => res.json())
  //     .then((json)=>{
  //       this.setState({transcriptJson: json})
  //     })
  // }

  render() {
    // let projects;
    // if ( this.state.projectsList !== null) {
    //   projects = this.state.projectsList.map((project) => {
    //     if (project.display) {
    //       return ( <CustomCard
    //         key={ project.id }
    //         id={ project.id }
    //         title={ project.title }
    //         subtitle={ project.description }
    //         links={ [
    //           {
    //             name: 'Show',
    //             link: `/projects/${ project.id }`
    //           },
    //           {
    //             name: 'Transcripts',
    //             link: `/projects/${ project.id }/transcripts`
    //           },
    //           {
    //             name: 'Paper-Edits',
    //             link: `/projects/${ project.id }/paperedits`
    //           }
    //         ] }
    //         // description={ 'test' } - optional
    //         // TODO: Add links
    //       />
    //       );
    //     } else {
    //       return null;
    //     }
    //   })
    //     .filter((project) => {
    //       return project !== null;
    //     });
    // }
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
            name: 'Project'
          }
          ] }
        />

        {/* TODO: show transcripts and paper-edits side by side?*/}

        {/* <InputGroup className="mb-3">
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
        </InputGroup> */}

        <section style={ { height: '75vh', overflow: 'scroll' } }>
          {/* {projects} */}
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

export default Project;
