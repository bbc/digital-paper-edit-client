import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
// import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import CustomNavbar from '../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../lib/CustomBreadcrumb/index.js';
import CustomUserCard from '../lib/CustomUserCard/index.js';
import CustomFooter from '../lib/CustomFooter/index.js';
import navbarLinks from '../lib/custom-navbar-links';
import includesText from '../../Util/includes-text';
import './index.module.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      projectTitle: '',
      usersList: [
        { id:0, name: 'Example 1', email: 'example.1@bbc.co.uk', display: true, partOfProject: true },
        { id:1, name: 'Example 2', email: 'example.2@bbc.co.uk', display: true, partOfProject: false },
        { id:2, name: 'Example 3', email: 'example.3@bbc.co.uk', display: true, partOfProject: true },
        { id:3, name: 'Example 4', email: 'example.4@bbc.co.uk', display: true, partOfProject: false },
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
  // includesText = (textOne, textTwo) => {
  //   return textOne.toLowerCase().trim().includes(textTwo.toLowerCase().trim());
  // }

  handleSearch = (e) => {
    const searchText = e.target.value;

    const results = this.state.usersList.filter((user) => {
      console.log(searchText, user.name, user.email);
      if (includesText(user.name, searchText)
      || includesText(user.email, searchText)
      ) {
        user.display = true;

        return user;
      } else {
        user.display = false;

        return user;
      }
    });

    this.setState({
      usersList: results
    });
  }

  handleAddUserToProject = (userId) => {
    alert('add user ' + userId);
    // TODO: Call API
    const users = this.state.usersList;
    const userTmp = users.map((u) => {
      if (u.id === userId) {
        u.partOfProject = true;
      }

      return u;
    });
    this.setState({
      usersList: userTmp
    });

  }

  handleRemoveUserToProject= (userId) => {
    alert('remove user ' + userId);
    //eslint-disable-next-line
    // const confirmationPrompt = confirm("Click OK if you wish to delete, cancel if you don't");
    // if (confirmationPrompt === true) {
    //   if (this.props.handleDelete) {
    //     this.props.handleDelete(this.props.id);
    //   }
    // } else {
    //   alert('All is good, it was not deleted');
    // }
    // TODO: Call API
    const users = this.state.usersList;
    const userTmp = users.map((u) => {
      if (u.id === userId) {
        u.partOfProject = false;
      }

      return u;
    });
    this.setState({
      usersList: userTmp
    });

  }

  render() {

    let users;
    // if ( this.state.transcriptsList !== null) {
    users = this.state.usersList.map((user) => {
      if (user.display) {
        return ( <CustomUserCard
          key={ user.id }
          userId={ user.id }
          userName={ user.name }
          userEmail={ user.email }
          partOfProject={ user.partOfProject }
          handleAddUserToProject={ this.handleAddUserToProject }
          handleRemoveUserToProject={ this.handleRemoveUserToProject }
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
          links={ navbarLinks(this.state.projectId) }
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
