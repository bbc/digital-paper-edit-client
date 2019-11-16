import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';

import Transcripts from './Transcripts/index.js';
import ProgrammeScript from './ProgrammeScript';
import ApiContext from '../../Context/ApiContext';
import PropTypes from 'prop-types';
import Collection from '../Firebase/Collection';

class PaperEditor extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      papereditId: this.props.match.params.papereditId,
      projectTitle: '',
      programmeTitle: '',
      transcripts: null,
      labelsOptions: [],
      isTranscriptsShown: true,
      isProgramScriptShown: true,
      videoHeight: '10em'
    };
  }

  componentDidMount = async () => {
    // const api = this.context;
    const api = Collection('paperedits');
    const json = await api.getItem(this.state.papereditId); // this needs to change

    this.setState({
      programmeTitle: json.programmeScript.title,
      projectTitle: json.project.title,
      transcripts: json.transcripts,
      labelsOptions: json.labels
    });
    // api
    //   .getProgrammeScriptAndTranscripts(
    //     this.state.projectId,
    //     this.state.papereditId
    //   )
    //   .then(json => {
    //     this.setState({
    //       programmeTitle: json.programmeScript.title,
    //       projectTitle: json.project.title,
    //       transcripts: json.transcripts,
    //       labelsOptions: json.labels
    //     });
    //   });
  };

  toggleTranscripts = () => {
    if (this.state.isProgramScriptShown) {
      this.setState(state => {
        return {
          isTranscriptsShown: !state.isTranscriptsShown
        };
      });
    }
  };

  toggleProgramScript = () => {
    if (this.state.isTranscriptsShown) {
      this.setState(state => {
        return {
          isProgramScriptShown: !state.isProgramScriptShown
        };
      });
    }
  };

  render() {
    return (
      <Container style={ { marginBottom: '5em' } } fluid>
        <br />
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb
              items={ [
                {
                  name: 'Projects',
                  link: '/projects'
                },
                {
                  name: `Project: ${ this.state.projectTitle }`,
                  link: `/projects/${ this.state.projectId }`
                },
                {
                  name: 'PaperEdits'
                },
                {
                  name: `${ this.state.programmeTitle }`
                }
              ] }
            />
          </Col>
        </Row>

        <Container fluid={ true }>
          <div className="d-flex flex-column">
            <ButtonGroup size="sm" className="mt-12">
              <Button
                onClick={ this.toggleTranscripts }
                variant={
                  this.state.isTranscriptsShown
                    ? 'secondary'
                    : 'outline-secondary'
                }
              >
                Transcripts{' '}
                <FontAwesomeIcon
                  icon={ this.state.isTranscriptsShown ? faAngleDown : faAngleUp }
                />{' '}
                {this.state.isTranscriptsShown ? 'hide' : 'show'}
              </Button>
              <Button
                onClick={ this.toggleProgramScript }
                variant={
                  this.state.isProgramScriptShown
                    ? 'secondary'
                    : 'outline-secondary'
                }
              >
                Program Script{' '}
                <FontAwesomeIcon
                  icon={
                    this.state.isProgramScriptShown ? faAngleDown : faAngleUp
                  }
                />{' '}
                {this.state.isProgramScriptShown ? 'hide' : 'show'}
              </Button>
            </ButtonGroup>
          </div>

          <Row>
            <Col
              xs={ { span: 12, offset: 0 } }
              sm={ {
                span: this.state.isProgramScriptShown ? 7 : 12,
                offset: this.state.isProgramScriptShown ? 0 : 0
              } }
              md={ {
                span: this.state.isProgramScriptShown ? 7 : 12,
                offset: this.state.isProgramScriptShown ? 0 : 0
              } }
              lg={ {
                span: this.state.isProgramScriptShown ? 7 : 10,
                offset: this.state.isProgramScriptShown ? 0 : 1
              } }
              xl={ {
                span: this.state.isProgramScriptShown ? 7 : 10,
                offset: this.state.isProgramScriptShown ? 0 : 1
              } }
              style={ {
                display: this.state.isTranscriptsShown ? 'block' : 'none'
              } }
            >
              {this.state.transcripts ? (
                <Transcripts
                  projectId={ this.state.projectId }
                  transcripts={ this.state.transcripts }
                  labelsOptions={ this.state.labelsOptions }
                />
              ) : (
                <>
                  <br />
                  <br />
                  <i>No Transcripts, create a transcript to get started</i>
                </>
              )}
            </Col>
            <Col
              xs={ { span: 12, offset: 0 } }
              sm={ {
                span: this.state.isTranscriptsShown ? 5 : 12,
                offset: this.state.isTranscriptsShown ? 0 : 0
              } }
              md={ {
                span: this.state.isTranscriptsShown ? 5 : 12,
                offset: this.state.isTranscriptsShown ? 0 : 0
              } }
              lg={ {
                span: this.state.isTranscriptsShown ? 5 : 10,
                offset: this.state.isTranscriptsShown ? 0 : 1
              } }
              xl={ {
                span: this.state.isTranscriptsShown ? 5 : 8,
                offset: this.state.isTranscriptsShown ? 0 : 2
              } }
              style={ {
                display: this.state.isProgramScriptShown ? 'block' : 'none'
              } }
            >
              {this.state.transcripts ? (
                <ProgrammeScript
                  projectId={ this.state.projectId }
                  papereditId={ this.state.papereditId }
                  transcripts={ this.state.transcripts }
                  videoHeight={ this.props.videoHeight }
                />
              ) : null}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

PaperEditor.propTypes = {
  match: PropTypes.any,
  videoHeight: PropTypes.any
};

export default PaperEditor;
