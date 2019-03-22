import React, { Component } from 'react';
import './index.module.css';

import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import Container from 'react-bootstrap/Container';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomCard from '../lib/CustomCard/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';

class PaperEdits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperEditsList: null,
      projectId: this.props.match.params.projectId
    };

  }
  componentDidMount = () => {
    // TODO: add user id in request?
    // TODO: add end point url in config
    // TODO: move fetch into a API class - to handle electron backend switch
    fetch('http://localhost:5000/api/projects/1/paperedits', { mode: 'cors' })
      .then(res => res.json())
      .then((json) => {
        // add a display property for component cards search
        const tmpList = json.paperedits.map((item) => {
          item.display = true;

          return item;
        });
        this.setState({ paperEditsList: tmpList });
      });
  }

    // TODO: could be moved in utils
    includesText = (textOne, textTwo) => {
      return textOne.toLowerCase().trim().includes(textTwo.toLowerCase().trim());
    }

  handleSearch = (e) => {
    const searchText = e.target.value;
    const results = this.state.paperEditsList.filter((transcript) => {
      if (this.includesText(transcript.title, searchText)
      || this.includesText(transcript.description, searchText)
      ) {
        transcript.display = true;

        return transcript;
      } else {
        transcript.display = false;

        return transcript;
      }
    });

    this.setState({
      paperEditsList: results
    });
  }

  render() {
    let paperedits;
    if ( this.state.paperEditsList !== null) {
      paperedits = this.state.paperEditsList.map((paperEdit) => {
        if (paperEdit.display) {
          return ( <CustomCard
            key={ paperEdit.id }
            id={ paperEdit.id }
            title={ paperEdit.title }
            subtitle={ paperEdit.description }
            links={ [
              {
                name: 'Edit',
                link: `/projects/${ this.state.projectId }/paperedits/${ paperEdit.id }`
              } ] }
          // description={ 'test' } - optional
          // TODO: Add links
          />
          );
        } else {
          return null;
        }
      })
        .filter((paperEdit) => {
          return paperEdit !== null;
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
            // TODO: need to get project name
            // TODO: if using project name, only use first x char and add ...
            name: 'Project',
            link: `/projects/${ this.state.projectId }`
          },
          {
            name: 'PaperEdits'
          }
          ] }
        />

        {/* <LinkContainer to={ `/projects/${ this.state.projectId }/paperEdits/new` }>
          <Button variant="primary">New PaperEdit</Button>
        </LinkContainer> */}

        {/* <br/> <br/> */}

        <InputGroup className="mb-3">
          <FormControl
            onChange={ this.handleSearch }
            placeholder="Search for Paper Edit by title or description"
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
          {paperedits}
        </section>

        <CustomFooter />
      </Container>
    );
  }
}

export default PaperEdits;
