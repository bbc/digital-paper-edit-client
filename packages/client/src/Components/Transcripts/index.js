import React, { Component } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListPageTemplate from '../lib/ListPageTemplate/index.js';
import ApiWrapper from '../../ApiWrapper/index.js';
import navbarLinks from '../lib/custom-navbar-links';

class Transcripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptsList: null,
      projectId: this.props.match.params.projectId,
      projectTitle: ''
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {

    const result = await ApiWrapper.getTranscripts(this.state.projectId);
    // TODO: add error handling
    console.log(result);
    if (result) {
      const tmpList = result.transcripts.map((item) => {
        item.display = true;

        return item;
      });
      this.setState({
        projectTitle: result.projectTitle,
        transcriptsList: tmpList
      });
    }
    // .then(json => {
    //   console.log(json);
    //   // add a display property for component cards search
    //   const tmpList = json.transcripts.map((item) => {
    //     item.display = true;

    //     return item;
    //   });
    //   this.setState({
    //     projectTitle: json.projectTitle,
    //     transcriptsList: tmpList
    //   });
    // });
  }

  async handleDelete (transcriptId ) {

    // TODO: API + server side request for delete
    // on successful then update state
    const result = await ApiWrapper.deleteTranscript(this.state.projectId, transcriptId);
    console.log('result ', result);
    const findId = (item) => item.id !== transcriptId;
    // .then((res) => {
    if (result.status === 'ok') {
      const tmpNewList = this.state.transcriptsList.filter(item => findId(item));
      this.setState({
        transcriptsList: tmpNewList
      });
    } else {
      // TODO: some error handling, error message saying something went wrong
    }
    // });
  }

  getShowLinkForCard = (id) => {
    return `/projects/${ this.state.projectId }/transcripts/${ id }`;
  }

  linkToNew = () => {
    return `/projects/${ this.state.projectId }/transcripts/new`;
  };

  render() {
    return (
      <ListPageTemplate
        icon={ <FontAwesomeIcon icon={ faFileAlt } /> }
        itemsList={ this.state.transcriptsList }
        handleDelete={ this.handleDelete }
        modelName={ 'transcripts' }
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
            name: 'Transcripts'
          }
          ]
        }
      />

    );
  }
}

export default Transcripts;
