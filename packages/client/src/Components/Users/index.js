import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
// import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomCard from '../lib/CustomCard/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';

import './index.module.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      projectTitle: '',
      users: [
        { id:1, name: 'Example 1', description: 'example.1@bbc.co.uk', display: true },
        { id:1, name: 'Example 2', description: 'example.2@bbc.co.uk', display: true }
      ]
    };

  }

  // TODO: use API class
  // TODO: also get project title from projectID - separate API call or same?
  //   componentDidMount = () =>{
  //     fetch('http://localhost:5000/api/1/transcripts/1', { mode: 'cors' })
  //     .then(res => res.json())
  //     .then((json)=>{
  //       this.setState({transcriptJson: json})
  //     })
  //   }

  // TODO: could be moved in utils
  // TODO: if moved, then search across client side code to remove duplicate
  includesText = (textOne, textTwo) => {
    return textOne.toLowerCase().trim().includes(textTwo.toLowerCase().trim());
  }

  handleSearch = (e) => {
    const searchText = e.target.value;
    const results = this.state.users.filter((user) => {
      if (this.includesText(user.name, searchText)
      || this.includesText(user.description, searchText)
      ) {
        user.display = true;

        return user;
      } else {
        user.display = false;

        return user;
      }
    });

    this.setState({
      users: results
    });
  }

  render() {

    let users;
    // if ( this.state.transcriptsList !== null) {
    users = this.state.users.map((user) => {
      if (user.display) {
        return ( <CustomCard
          key={ user.id }
          transcriptId={ user.id }
          projectId={ this.state.projectId }
          title={ user.name }
          subtitle={ user.description }
          links={ [
            {
              name: <><FontAwesomeIcon icon={ faUserPlus } /></>,
              link: `/projects/${ this.state.projectId }/users/${ user.id }/add`
            }
          //   {
          //     name: 'Annotate',
          //     link: `/projects/${ this.state.projectId }/transcripts/${ transcript.id }/annotate`
          //   }
          ] }
        />
        );
      } else {
        return null;
      }
    }).filter((user) => {
      return user !== null;
    });
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
          // className="d-none d-sm-block"
          className="hidden-xs"
          // xsHidden
          items={ [ {
            name: 'Projects',
            link: '/projects'
          },
          {
            // TODO: need to get project name
            // TODO: if using project name, only use first x char and add ...
            name: `Project: ${ this.state.projectTitle }`,
            link: `/projects/${ this.state.projectId }`
          },
          {
            name: 'Users'
          }
          ] }
        />
        <div className="">
          <InputGroup className="mb-3">
            <FormControl
              onChange={ this.handleSearch }
              placeholder="Search for a user to add to this project"
              aria-label="search"
              aria-describedby="search"
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon icon={ faSearch } />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <section style={ { height: '80vh', overflow: 'scroll' } }>
            {users}
          </section>
        </div>
        <CustomFooter />
      </Container>
    );
  }
}

export default Users;
