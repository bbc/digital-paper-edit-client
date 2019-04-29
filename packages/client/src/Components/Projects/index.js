import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import ListPageTemplate from '../lib/ListPageTemplate/index.js';
import Api from '../../Api/index.js';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsList: null
    };
  }

  componentDidMount = () => {
    // TODO: do we need to add user id in request?
    Api.getProjects().then((itemsList) => {
      console.log('itemsList::', itemsList);
      if (itemsList) {
        // add a display property for component cards search
        const tmpList = itemsList.map((item) => {
          item.display = true;

          return item;
        });
        this.setState({ projectsList: tmpList });
      }
      // TODO: some error handling
    });
  }

  handleDelete = (id) => {
    // TODO: API + server side request for delete
    // on successful then update state
    Api.deleteProject(id).then((res) => {
      if (res.status === 'ok') {
        const tmpNewList = this.state.projectsList.filter(function( obj ) {
          return obj.id !== id;
        });
        this.setState({
          projectsList: tmpNewList
        });
      } else {
        // TODO: some error handling, error message saying something went wrong
      }
    });
  }

  // To be able to do REST for cards for - Projects, transcripts, paperedits
  getShowLinkForCard = (id) => {
    return `/projects/${ id }`;
  }

  linkToNew = () => {
    return `/projects/new`;
  };

  render() {

    return (
      <ListPageTemplate
        itemsList={ this.state.projectsList }
        handleDelete={ this.handleDelete }
        modelName={ 'projects' }
        getShowLinkForCard={ this.getShowLinkForCard }
        linkToNew={ this.linkToNew }
        // showLink for customCard?
        navbarLinks={ [
          {
            name:   <span> <FontAwesomeIcon icon={ faFolder } />  Projects</span>,
            link: '/projects'
          },
          {
            name:  <span> <FontAwesomeIcon icon={ faFolderPlus } />  NewProject</span>,
            link: '/projects/new',
          }
        ] }
        breadCrumbItems={
          [ {
            name: 'Projects'
          }
          ]
        }
      />
    );
  }
}

export default Projects;
