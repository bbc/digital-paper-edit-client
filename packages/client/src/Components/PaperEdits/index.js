import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import ListPageTemplate from '../lib/ListPageTemplate/index.js';
import Api from '../../Api/index.js';
import navbarLinks from '../lib/custom-navbar-links';
import './index.module.css';

class PaperEdits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperEditsList: null,
      projectId: this.props.match.params.projectId,
      projectTitle: ''
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
        // projectTitle
        this.setState({ paperEditsList: tmpList });
      });
  }

  handleDelete = (id) => {
    // TODO: API + server side request for delete
    // on successful then update state
    // Api.deletePaperedit(id).then((res) => {
    //   if (res.status === 'ok') {
    //     const tmpNewList = this.state.paperEditsList.filter(function( obj ) {
    //       return obj.id !== id;
    //     });
    //     this.setState({
    //       paperEditsList: tmpNewList
    //     });
    //   } else {
    //     // TODO: some error handling, error message saying something went wrong
    //   }
    // });
  }

  getShowLinkForCard = (id) => {
    return `/projects/${ this.state.projectId }/paperedits/${ id }`;
  }

  linkToNew = () => {
    return `/projects/${ this.state.projectId }/paperedits/new`;
  };

  render() {

    return (
      <ListPageTemplate
        itemsList={ this.state.paperEditsList }
        handleDelete={ this.handleDelete }
        modelName={ 'paperedits' }
        getShowLinkForCard={ this.getShowLinkForCard }
        linkToNew={ this.linkToNew }
        // showLink for customCard?
        navbarLinks={ navbarLinks(this.state.projectId) }
        breadCrumbItems={
          [ {
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
            name: 'Paper Edits'
          }
          ]
        }
      />
    );
  }
}

export default PaperEdits;
