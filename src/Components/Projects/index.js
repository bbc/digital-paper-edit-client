import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import ListPageTemplate from '../lib/ListPageTemplate/index.js';
import ApiWrapper from '../../ApiWrapper/index.js';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount () {
    // TODO: do we need to add user id in request?
    const result = await ApiWrapper.getAllProjects();

    if (result) {
      // add a display property for component cards search
      const tmpList = result.map(project => {
        project.display = true;

        return project;
      });
      this.setState({ projects: tmpList });
    }
    // TODO: some error handling
  };

  async handleDelete(id) {
    console.log('handleDelete id', id);
    // TODO: API + server side request for delete
    // on successful then update state
    const result = await ApiWrapper.deleteProject(id);
    const findId = (item) => item.id !== id;

    if (result.status === 'ok') {
      const filteredProjects = this.state.projects.filter(item => findId(item));
      this.setState({
        projects: filteredProjects
      });
    } else {
      // TODO: some error handling, error message saying something went wrong
    }
  };

  // To be able to do REST for cards for - Projects, transcripts, paperedits
  getShowLinkForCard = id => {
    return `/projects/${ id }`;
  };

  linkToNew = () => {
    return '/projects/new';
  };

  render() {
    return (
      <ListPageTemplate
        icon={ <FontAwesomeIcon icon={ faFolder } /> }
        itemsList={ this.state.projects }
        handleDelete={ this.handleDelete }
        modelName={ 'projects' }
        getShowLinkForCard={ this.getShowLinkForCard }
        linkToNew={ this.linkToNew }
        // showLink for customCard?
        navbarLinks={ [
          {
            name: (
              <span>
                {' '}
                <FontAwesomeIcon icon={ faFolder } /> Projects
              </span>
            ),
            link: '/projects'
          },
          {
            name: (
              <span>
                {' '}
                <FontAwesomeIcon icon={ faFolderPlus } /> NewProject
              </span>
            ),
            link: '/projects/new'
          }
        ] }
        breadCrumbItems={ [
          {
            name: 'Projects'
          }
        ] }
      />
    );
  }
}

export default Projects;
