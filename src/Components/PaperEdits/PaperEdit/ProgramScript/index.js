import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cuid from 'cuid';
import Tab from 'react-bootstrap/Tab';
import PreviewCanvas from './PreviewCanvas/index.js';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import EDL from 'edl_composer';
import generateADL from '@bbc/aes31-adl-composer';
import jsonToFCPX from '@bbc/fcpx-xml-composer';
import downloadjs from 'downloadjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileExport,
  faMicrophoneAlt,
  faStickyNote,
  faHeading,
  faPlus,
  faSync,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

import ProgrammeScript from './ProgrammeScript.js';
import getDataFromUserWordsSelection from './get-data-from-user-selection.js';
import ApiWrapper from '../../../../ApiWrapper/index.js';

class ProgramScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programmeScript: null,
      resetPreview: false,
      // demo content
      playlist:[
        // start - is relative to timeline
        // duration - of clip in playlist
        // sourceStart - time from start of clip in playlist
        { type:'video', start:0, sourceStart: 30, duration:10, src:'https://download.ted.com/talks/MorganVague_2018X.mp4' },
        { type:'video', start:10, sourceStart: 40, duration:10, src:'https://download.ted.com/talks/IvanPoupyrev_2019.mp4' },
        { type:'video', start:20, sourceStart: 50, duration:10, src:'https://download.ted.com/talks/KateDarling_2018S-950k.mp4' },
      ]
    };
  }

  componentDidMount = () => {
    ApiWrapper.getPaperEdit(this.props.projectId, this.props.papereditId)
      .then((json) => {
        console.log('get_ProgrammeScriptAndTranscripts--', json);
        this.setState({
          programmeScript: json.programmeScript
        });
      });
  }

  // TODO: needs to handle when selection spans across multiple paragraphs
  handleAddTranscriptSelectionToProgrammeScript = () => {
    const result = getDataFromUserWordsSelection();
    if (result) {
      console.log(result);
      const { programmeScript } = this.state;
      const elements = this.state.programmeScript.elements;
      // papercut could be abstracted as helper function
      elements.push({
        id: cuid(),
        index: elements.length,
        type: 'paper-cut',
        start:result.start,
        end: result.end,
        speaker: result.speaker,
        words: result.words,
        transcriptId: result.transcriptId,
        labelId: []
      });
      programmeScript.elements = elements;
      this.setState({
        programmeScript: programmeScript
      });
    }
    else {
      alert('Select some text in the transcript to add to the programme script');
      console.log('nothing selected');
    }
  }

  /**
   * Helper function to create json EDL for other EDL/ADL/FPCX export
   */
  getSequenceJsonEDL = () => {
    const edlSq = {
      'title': this.state.programmeScript.title,
      'events': [ ]
    };

    const programmeScriptPaperCuts = this.state.programmeScript.elements.map((element) => {
      if (element.type === 'paper-cut') {
        // Get clipName for current transcript
        const currentTranscript = this.props.transcripts.find((tr) => {
          return tr.id === element.transcriptId;
        });

        const result = {
          startTime: element.start,
          endTime: element.end,
          reelName: 'NA',
          clipName: `${ currentTranscript.clipName }`,
          fps: 25
        };

        return result;
      }

      return null;
    }).filter((el) => {return el !== null;});
    // adding ids to EDL
    const programmeScriptPaperCutsWithId = programmeScriptPaperCuts.map((el, index) => {
      el.id = index + 1;

      return el;
    });
    edlSq.events.push(...programmeScriptPaperCutsWithId);

    return edlSq;
  }

  // https://www.npmjs.com/package/downloadjs
  // https://www.npmjs.com/package/edl_composer
  handleExportEDL = () => {
    const edlSq = this.getSequenceJsonEDL();
    const edl = new EDL(edlSq);
    console.log(edl.compose());
    downloadjs(edl.compose(), `${ this.state.programmeScript.title }.edl`, 'text/plain');
  }

  handleExportADL = () => {
    // alert('this function has not been implemented yet');
    const edlSq = this.getSequenceJsonEDL();
    // const result = generateADL(edlSq);
    const result = generateADL({
      projectOriginator: 'Digital Paper Edit',
      // TODO: it be good to change sequence for the ADL to be same schema
      // as the one for EDL and FCPX - for now just adjusting
      edits: edlSq.events.map((event) => {
        return {
          start: event.startTime,
          end: event.endTime,
          clipName: event.clipName,
          // TODO: could add a label if present
          label: ''
        };
      }),
      // TODO: sampleRate should be pulled from the sequence
      sampleRate: '44100',
      // TODO: frameRate should be pulled from the sequence
      frameRate: 25,
      projectName: edlSq.title
    });
    downloadjs(result, `${ this.state.programmeScript.title }.adl`, 'text/plain');
  }

  handleExportFCPX = () => {
    // alert('this function has not been implemented yet');
    const edlSq = this.getSequenceJsonEDL();

    const result = jsonToFCPX(edlSq);
    downloadjs(result, `${ this.state.programmeScript.title }.fcpxml`, 'text/plain');
  }

  handleExportTxt = () => {
    alert('this function has not been implemented yet');
  }

  handleUpdatePreview = () => {
    let timelineStartTime = 0;
    //  const { playlist } = this.state;
    // { type:'video', start:0, sourceStart: 30, duration:10, src:'https://download.ted.com/talks/MorganVague_2018X.mp4' },
    const playlist = this.state.programmeScript.elements.map((element) => {
      if (element.type === 'paper-cut') {
        // Get clipName for current transcript
        const currentTranscript = this.props.transcripts.find((tr) => {
          return tr.id === element.transcriptId;
        });
        const duration = element.end - element.start;
        // TODO: handle audio only type (eg for radio), get from transcript json?
        const result = {
          type:'video',
          start: timelineStartTime,
          sourceStart: element.start,
          duration: duration,
          src: currentTranscript.url
        };

        timelineStartTime += duration;

        return result;
      }

      return null;
    }).filter((el) => {return el !== null;});

    // Workaround to mound and unmoun the `PreviewCanvas` component
    // to update the playlist
    this.setState({
      resetPreview: true
    }, () => {
      console.log('handleUpdatePreview', playlist);
      this.setState({
        resetPreview: false,
        playlist: playlist
      });
    });
    console.log('handleUpdatePreview', playlist);
    this.setState({
      playlist: playlist
    });
  }

  render() {
    return (
      <Tab.Content>
        <h2>Programme:  <small className="text-muted">
          {this.state.programmeScript ? this.state.programmeScript.title : ''}
        </small></h2>
        {/* <hr/> */}
        { !this.state.resetPreview ?
          <PreviewCanvas playlist={ this.state.playlist } width={ '300' }/>
          : null }
        <br/>

        <Row noGutters>
          <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
            <Button
              // block
              variant="outline-secondary"
              onClick={ this.handleAddTranscriptSelectionToProgrammeScript }
              title="Add a text selection, select text in the transcript, then click this button to add it to the programme script"
            >
              <FontAwesomeIcon icon={ faPlus } /> Selection
            </Button>
          </Col>
          <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
            <Dropdown block>
              <Dropdown.Toggle variant="outline-secondary">
                <FontAwesomeIcon icon={ faPlus } />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                //
                >
                  <FontAwesomeIcon icon={ faHeading } /> Heading
                </Dropdown.Item>
                <Dropdown.Item
                //
                >
                  <FontAwesomeIcon icon={ faMicrophoneAlt } /> Voice Over
                </Dropdown.Item>
                <Dropdown.Item
                  //
                >
                  <FontAwesomeIcon icon={ faStickyNote } /> Note
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
            <Button variant="outline-secondary"
              onClick={ this.handleUpdatePreview }
              // size="sm"
              title="update preview"
              // block
            >
              <FontAwesomeIcon icon={ faSync } /> Preview
            </Button>
          </Col>
          <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary">
                <FontAwesomeIcon icon={ faFileExport } /> Export
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={ this.handleExportEDL }
                  title="export EDL, edit decision list, to import the programme script as a sequence in video editing software - Avid, Premiere, Davinci Resolve, for FCPX choose FCPX XML"
                >
                    EDL - Video <FontAwesomeIcon icon={ faInfoCircle } />
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={ this.handleExportADL }
                  title="export ADL, audio decision list, to import the programme script as a sequence in audio editing software such as SADiE"
                >
                  {/* <FontAwesomeIcon icon={ faFileExport } />  */}
                  ADL - Audio  <FontAwesomeIcon icon={ faInfoCircle } />
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={ this.handleExportFCPX }
                  title="export FCPX XML, to import the programme script as a sequence in Final Cut Pro X, video editing software"
                >
                  FCPX <FontAwesomeIcon icon={ faInfoCircle } />
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={ this.handleExportTxt }
                  title="export Text, export the programme script as a text version"
                >
                  Text <FontAwesomeIcon icon={ faInfoCircle } />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <hr/>
        <article style={ { height: '60vh', overflow: 'scroll' } }>
          <ProgrammeScript programmeScript={ this.state.programmeScript } />
        </article>
      </Tab.Content>
    );
  }
}

export default ProgramScript;
