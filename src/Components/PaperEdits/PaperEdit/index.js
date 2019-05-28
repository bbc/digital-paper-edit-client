import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import CustomNavbar from '../../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../../lib/CustomFooter/index.js';
import navbarLinks from '../../lib/custom-navbar-links';

import Transcripts from './Transcripts/index.js';
import ProgramScript from './ProgramScript/index.js';
import ApiWrapper from '../../../ApiWrapper/index.js';

class PaperEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptJson: null,
      title: null,
      projectId:  this.props.match.params.projectId,
      papereditId:  this.props.match.params.papereditId,
      projectTitle: '',
      isTranscriptsShown: true,
      isProgramScriptShown: true
    };
  }

  componentDidMount = () => {
    // TODO get id from props match
    // fetch(`http://localhost:5000/api/projects/${ this.state.projectId }/paperedits/${ this.state.papereditId }`, { mode: 'cors' })
    ApiWrapper.getPaperEdit(this.state.projectId, this.state.papereditId )
      // .then(res => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          paperEditJson: json.paperEdit,
          title: json.title,
          projectTitle: json.projectTitle
        });
      });
  }

  toggleTranscripts =() => {
    console.log('toggleTranscripts');
    if (this.state.isProgramScriptShown ) {
      this.setState((state) => {
        return {
          isTranscriptsShown: !state.isTranscriptsShown
        };
      });
    }
  }

  toggleProgramScript = () => {
    console.log('toggleProgramScript');
    if (this.state.isTranscriptsShown ) {
      this.setState((state) => {
        return {
          isProgramScriptShown: !state.isProgramScriptShown
        };
      });
    }
  }

  saveToServer = () => {
    // TODO: add Api call to save content of
    alert('save to server');
  }

  render() {
    return (
      <Container style={ { marginBottom: '5em' } } fluid>
        <CustomNavbar
          links={ navbarLinks(this.state.projectId) }
        />
        <br/>
        <Row>
          <Col sm={ 12 } md={ 10 } ld={ 10 } xl={ 10 }>
            <CustomBreadcrumb
              items={ [ {
                name: 'Projects',
                link: '/projects'
              },
              {
                // TODO: need to get project name?
                // TODO: is this needed?
                name: `Project: ${ this.state.projectTitle }`,
                link: `/projects/${ this.state.projectId }`
              },
              {
                name: 'PaperEdits',
                // link:`/projects/${ this.state.projectId }/paperedits`
              },
              {
                name: `${ this.state.title }`
              }
              ] }
            />
          </Col>
          <Col xs={ 12 } sm={ 2 } md={ 2 } ld={ 2 } xl={ 2 }>
            <Button variant="outline-secondary" onClick={ this.saveToServer } size="lg" block>
              Save
            </Button>
          </Col>
        </Row>

        <Container fluid={ true }>
          <div className="d-flex flex-column">
            <ButtonGroup size="sm" className="mt-12" block>
              <Button
                onClick={ this.toggleTranscripts }
                variant={ this.state.isTranscriptsShown ? 'primary' : 'outline-primary' }
              >
                Transcripts <FontAwesomeIcon icon={ this.state.isTranscriptsShown ? faAngleDown : faAngleUp } />
              </Button>
              <Button
                onClick={ this.toggleProgramScript }
                variant={ this.state.isProgramScriptShown ? 'primary' : 'outline-primary' }
              >
                 Program Script  <FontAwesomeIcon icon={ this.state.isProgramScriptShown ? faAngleDown : faAngleUp } />
              </Button>
            </ButtonGroup>

            {/* <ToggleButtonGroup
              type="checkbox"
              value={ this.state.value }
              onChange={ this.handleChange }
              defaultValue={ [ 1, 2 ] }
            >
              <ToggleButton value={ 1 }>Transcripts  <FontAwesomeIcon icon={ this.state.isTranscriptsShown ? faAngleDown : faAngleUp } /> </ToggleButton>
              <ToggleButton value={ 2 }>Program Script <FontAwesomeIcon icon={ this.state.isProgramScriptShown ? faAngleDown : faAngleUp } /></ToggleButton>
            </ToggleButtonGroup> */}

          </div>
          <Row>
            <Col
              xs={ { span: 12, offset:0 } }
              sm={ {
                span:7,
                offset: this.state.isProgramScriptShown ? 0 : 2
              } }
              md={ {
                span: this.state.isProgramScriptShown ? 7 : 12,
                offset: this.state.isProgramScriptShown ? 0 : 0
              } }
              lg={ {
                span: this.state.isProgramScriptShown ? 7 : 8,
                offset: this.state.isProgramScriptShown ? 0 : 1
              } }
              xl={ {
                span: this.state.isProgramScriptShown ? 7 : 9,
                offset: this.state.isProgramScriptShown ? 0 : 1
              } }
              style={ { display: this.state.isTranscriptsShown ? 'block' : 'none' } }
            >
              <Transcripts />
            </Col>
            <Col
              xs={ { span: 12, offset:0 } }
              sm={ {
                span: this.state.isTranscriptsShown ? 5 : 7,
                offset: this.state.isTranscriptsShown ? 0 : 3
              } }
              md={ {
                span: this.state.isTranscriptsShown ? 5 : 12,
                offset: this.state.isTranscriptsShown ? 0 : 0
              } }
              lg={ {
                span: this.state.isTranscriptsShown ? 5 : 7,
                offset: this.state.isTranscriptsShown ? 0 : 1
              } }
              xl={ {
                span: this.state.isTranscriptsShown ? 5 : 7,
                offset: this.state.isTranscriptsShown ? 0 : 2
              } }
              style={ { display: this.state.isProgramScriptShown ? 'block' : 'none' } }
            >
              <ProgramScript/>
            </Col>
          </Row>

        </Container>

        <CustomFooter />
      </Container>
    );
  }
}

export default PaperEdit;
