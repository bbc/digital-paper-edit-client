import React, { Component } from 'react';
import cuid from 'cuid';
import Tab from 'react-bootstrap/Tab';
import PreviewCanvas from './PreviewCanvas/index.js';
import Button from 'react-bootstrap/Button';
import EDL from 'edl_composer';
import downloadjs from 'downloadjs';
import ToolBar from './ToolBar';
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

  // https://www.npmjs.com/package/downloadjs
  // https://www.npmjs.com/package/edl_composer
  handleExportEDL = () => {
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
    const edl = new EDL(edlSq);
    console.log(edl.compose());
    downloadjs(edl.compose(), `${ this.state.programmeScript.title }.edl`, 'text/plain');
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
        <Button variant="outline-secondary"
          onClick={ this.handleAddTranscriptSelectionToProgrammeScript }
        >
          Get selection
        </Button>
        <Button variant="outline-secondary"
          onClick={ this.handleExportEDL }
        >
          Export EDL
        </Button>

        <Button variant="outline-secondary"
          onClick={ this.handleUpdatePreview }
        >
         Update Preview
        </Button>
        <br/>
        <ToolBar />
        <hr/>
        <article style={ { height: '60vh', overflow: 'scroll' } }>
          <ProgrammeScript programmeScript={ this.state.programmeScript } />
        </article>
      </Tab.Content>
    );
  }
}

export default ProgramScript;
