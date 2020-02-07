import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cuid from 'cuid';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import PreviewCanvas from './PreviewCanvas2/index.js';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import EDL from 'edl_composer';
import generateADL from '@pietrop/aes31-adl-composer';
import jsonToFCPX from '@pietrop/fcpx-xml-composer';
import downloadjs from 'downloadjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShare,
  faMicrophoneAlt,
  faStickyNote,
  faHeading,
  faPlus,
  faSync,
  faInfoCircle,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import timecodes from 'node-timecodes';
import ProgrammeScript from './ProgrammeScript.js';
import getDataFromUserWordsSelection from './get-data-from-user-selection.js';
import { divideWordsSelectionsIntoParagraphs, isOneParagraph } from './divide-words-selections-into-paragraphs/index.js';
import ApiWrapper from '../../../../ApiWrapper/index.js';

const defaultReelName = 'NA';
const defaultFps = 25;
const defaultTimecodeOffset = '00:00:00:00';
const defaultSampleRate = '16000';

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
        // { type:'video', start:0, sourceStart: 30, duration:10, src:'https://download.ted.com/talks/MorganVague_2018X.mp4' },
        // { type:'video', start:10, sourceStart: 40, duration:10, src:'https://download.ted.com/talks/IvanPoupyrev_2019.mp4' },
        // { type:'video', start:20, sourceStart: 50, duration:10, src:'https://download.ted.com/talks/KateDarling_2018S-950k.mp4' },
      ]
    };
  }

  componentDidMount = () => {
    ApiWrapper.getPaperEdit(this.props.projectId, this.props.papereditId)
      .then((json) => {
        const programmeScript = json.programmeScript;
        // Adding an insert point at the end of the list
        programmeScript.elements.push({ type: 'insert-point', text: 'Insert Point to add selection' });
        this.setState({
          programmeScript: programmeScript
        }
        // TODO: figure out how to update preview
        // , () => {
        //   this.handleUpdatePreview();
        // }
        );
      });

  }

  // TODO: save to server
  handleProgrammeScriptOrderChange = (list) => {
    console.log('handleProgrammeScriptOrderChange', list);
    this.setState(({ programmeScript }) => {
      programmeScript.elements = list;

      return {
        programmeScript: programmeScript
      };
    }
    );
  }

  // TODO: save to server
  handleDeleteProgrammeScriptElement = (i) => {
    // TODO: add a prompt, like are you shure you want to delete, confirm etc..?
    // alert('handle delete');
    console.log(i);
    this.setState(({ programmeScript }) => {
      const index = i;
      const list = programmeScript.elements;
      list.splice(index, 1);
      programmeScript.elements = list;

      return {
        programmeScript: programmeScript
      };
    }
    );
  }

  handleEditProgrammeScriptElement = (i) => {
    console.log(i);
    const { programmeScript } = this.state;
    const elements = programmeScript.elements;
    const currentElement = elements[i];
    const newText = prompt('Edit', currentElement.text);
    console.log(newText);
    if (newText) {
      currentElement.text = newText;
      elements[i] = currentElement;
      programmeScript.elements = elements;
      // TODO: save to server
      this.setState({
        programmeScript: programmeScript
      });
      // TODO: consider using set state function to avoid race condition? if needed?
      // this.setState(({ programmeScript }) => {
      //   return {
      //     programmeScript: programmeScript
      //   };
      // });
    }
  }

  handleAddTranscriptElementToProgrammeScript = (elementType) => {
    const { programmeScript } = this.state;
    const elements = this.state.programmeScript.elements;
    // TODO: refactor - with helper functions
    if (elementType === 'title'
      || elementType === 'note'
      || elementType === 'voice-over') {
      const text = prompt('Add some text for a section title', 'Some place holder text');
      console.log(text);

      const indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
      const newElement = {
        id: cuid(),
        index: elements.length,
        type: elementType,
        text: text
      };
      elements.splice(indexOfInsertPoint, 0, newElement);
      programmeScript.elements = elements;
      // TODO: save to server
      this.setState({
        programmeScript: programmeScript
      });
    }
  }

  getIndexPositionOfInsertPoint = () => {
    const { programmeScript } = this.state;
    const elements = programmeScript.elements;
    // find insert point in list,
    const insertPointElement = elements.find((el) => {
      return el.type === 'insert-point';
    });
    // get insertpoint index
    const indexOfInsertPoint = elements.indexOf(insertPointElement);

    return indexOfInsertPoint;
  }

  // TODO: save to server
  // TODO: needs to handle when selection spans across multiple paragraphs
  handleAddTranscriptSelectionToProgrammeScript = () => {
    const result = getDataFromUserWordsSelection();
    console.log('getDataFromUserWordsSelection::', result);
    if (result) {
      console.log(JSON.stringify(result, null, 2));

      // result.words
      // TODO: if there's just one speaker in selection do following
      // if it's multiple split list of words into multiple groups
      // and add a papercut for each to the programme script
      const { programmeScript } = this.state;
      const elements = programmeScript.elements;
      // TODO: insert at insert point

      const indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
      if (isOneParagraph(result.words)) {
        // create new element
        // TODO: Create new element could be refactored into helper function
        const newElement = {
          id: cuid(),
          index: elements.length,
          type: 'paper-cut',
          start:result.start,
          end: result.end,
          speaker: result.speaker,
          words: result.words,
          transcriptId: result.transcriptId,
          labelId: []
        };
        // add element just above of insert point
        elements.splice(indexOfInsertPoint, 0, newElement);
        programmeScript.elements = elements;
      }
      else {
        const paragraphs = divideWordsSelectionsIntoParagraphs(result.words);
        paragraphs.reverse().forEach((paragraph) => {
          const newElement = {
            id: cuid(),
            index: elements.length,
            type: 'paper-cut',
            start:paragraph[0].start,
            end: paragraph[paragraph.length - 1].end,
            speaker: paragraph[0].speaker,
            words: paragraph,
            transcriptId: paragraph[0].transcriptId,
            // TODO: ignoring labels for now
            labelId: []
          };
          // add element just above of insert point
          elements.splice(indexOfInsertPoint, 0, newElement);
          programmeScript.elements = elements;
        });
      }
      // TODO: save to server
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

        let mediaFps = defaultFps;
        if(currentTranscript.metadata && currentTranscript.metadata.fps && (currentTranscript.metadata.fps!== 'NA')){
          mediaFps = currentTranscript.metadata.fps
        }

        const result = {
          startTime: element.start,
          endTime: element.end,
          reelName:  currentTranscript.metadata ? currentTranscript.metadata.reelName : defaultReelName,
          clipName: `${ currentTranscript.clipName }`,
          // TODO: frameRate should be pulled from the clips in the sequence
          // Changing to 24 fps because that is the frame rate of the ted talk examples from youtube
          // but again frameRate should not be hard coded
          fps: mediaFps,
          // TODO: if there is an offset this should added here, for now hard coding 0
          offset:  currentTranscript.metadata ? currentTranscript.metadata.timecode : defaultTimecodeOffset,
          sampleRate:  currentTranscript.metadata ? currentTranscript.metadata.sampleRate : defaultSampleRate
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
    const firstElement = edlSq.events[0];
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
      sampleRate: firstElement.sampleRate,
      frameRate: firstElement.fps,
      projectName: edlSq.title
    });
    downloadjs(result, `${ this.state.programmeScript.title }.adl`, 'text/plain');
  }

  handleExportFCPX = () => {
    // alert('this function has not been implemented yet');
    const edlSq = this.getSequenceJsonEDL();
    console.log(edlSq);
    const result = jsonToFCPX(edlSq);
    downloadjs(result, `${ this.state.programmeScript.title }.fcpxml`, 'text/plain');
  }

  getProgrammeScriptJson = () => {
    // alert('this function has not been implemented yet');
    const edlSq = {
      'title': this.state.programmeScript.title,
      'events': [ ]
    };

    const programmeScriptPaperCuts = this.state.programmeScript.elements.map((element) => {
      if (element.type === 'paper-cut') {
        console.log('paper-cut::', element);
        // Get clipName for current transcript
        const currentTranscript = this.props.transcripts.find((tr) => {
          return tr.id === element.transcriptId;
        });

        let mediaFps = defaultFps;
        if(currentTranscript.metadata && currentTranscript.metadata.fps && (currentTranscript.metadata.fps!== 'NA')){
          mediaFps = currentTranscript.metadata.fps
        }
        const result = {
          ...element,
          startTime: element.start,
          endTime: element.end,
          reelName:  currentTranscript.metadata ? currentTranscript.metadata.reelName : defaultReelName,
          clipName: `${ currentTranscript.clipName }`,
          // TODO: frameRate should be pulled from the clips in the sequence
          // Changing to 24 fps because that is the frame rate of the ted talk examples from youtube
          // but again frameRate should not be hard coded
          fps: mediaFps,
          sampleRate:  currentTranscript.metadata ? currentTranscript.metadata.sampleRate : defaultSampleRate,
          offset:  currentTranscript.metadata ? currentTranscript.metadata.timecode : defaultTimecodeOffset
        };

        return result;
      }
      else {
        return element;
      }

    }).filter((el) => {return el !== null;});
    // adding ids to EDL
    const programmeScriptPaperCutsWithId = programmeScriptPaperCuts.map((el, index) => {
      el.id = index + 1;

      return el;
    });
    edlSq.events.push(...programmeScriptPaperCutsWithId);
    console.log(edlSq);

    return edlSq;
  }

  programmeScriptJsonToText = (edlsqJson) => {
    const title = `# ${ edlsqJson.title }\n\n`;
    const body = edlsqJson.events.map((event) => {
      if (event.type === 'title') {
        return `## ${ event.text }`;
      }
      else if (event.type === 'voice-over') {
        return `_${ event.text }_`;

      }
      else if (event.type === 'note') {
        return `[ ${ event.text }]`;
      }
      else if (event.type === 'paper-cut') {
        return `${ timecodes.fromSeconds(event.startTime) }\t${ timecodes.fromSeconds(event.endTime) }\t${ event.speaker }\t-\t${ event.clipName }     \n${ event.words.map((word) => {return word.text;}).join(' ') }`;
      }

      return null;
    });

    return `${ title }${ body.join('\n\n') }`;
  }

  handleExportJson = () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const programmeScriptText = JSON.stringify(programmeScriptJson, null, 2);
    downloadjs(programmeScriptText, `${ this.state.programmeScript.title }.json`, 'text/plain');
  }

  handleExportTxt = () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const programmeScriptText = this.programmeScriptJsonToText(programmeScriptJson);
    downloadjs(programmeScriptText, `${ this.state.programmeScript.title }.txt`, 'text/plain');
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

  handleDoubleClickOnProgrammeScript = (e) => {

    if (e.target.className === 'words') {
      const wordCurrentTime = e.target.dataset.start;
      // TODO: set current time in preview canvas
      // Video context probably needs more info like, which clip/track in the sequence?
      // investigate how to set currentTime in video context
      console.log('wordCurrentTime::', wordCurrentTime);
    }
  }

  handleSaveProgrammeScript = () => {
    const { programmeScript } = this.state;
    if (programmeScript) {
      const elements = programmeScript.elements;
      // finding an removing insert point before saving to server
      // find insert point in list,
      const insertPointElement = elements.find((el) => {
        return el.type === 'insert-point';
      });
      if (insertPointElement) {
        // get insertpoint index
        const indexOfInsertPoint = elements.indexOf(insertPointElement);
        elements.splice(indexOfInsertPoint, 1);
      }

      programmeScript.elements = elements;
      ApiWrapper.updatePaperEdit(this.props.projectId, this.props.papereditId, programmeScript)
        .then((json) => {
          if (json.status === 'ok') {
            alert('saved programme script');
          }
          // const programmeScript = json.programmeScript;
          // Adding an insert point at the end of the list
          // programmeScript.elements.push({ type: 'insert-point', text: 'Insert Point to add selection' });
          // this.setState({
          //   programmeScript: programmeScript
          // }
          // TODO: figure out how to update preview
          // , () => {
          //   this.handleUpdatePreview();
          // }
          // );
        });
    }
  }

  render() {
    return (

      <>
        <h2
          className={ [ 'text-truncate', 'text-muted' ].join(' ') }
          title={ `Programme Script Title: ${ this.state.programmeScript ? this.state.programmeScript.title : '' }` }>
          {/* Programme:  */}
          {/* <small> */}
          {this.state.programmeScript ? this.state.programmeScript.title : ''}
          {/* </small> */}
        </h2>
        <Card>
          <Card.Header>
            {/* <hr/> */}
            { !this.state.resetPreview ?
              <PreviewCanvas playlist={ this.state.playlist }
               width={ 300 }
               />
              : null }
          </Card.Header>
          <Card.Header>

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
              <Col sm={ 12 } md={ 2 } ld={ 2 } xl={ 2 }>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary">
                    <FontAwesomeIcon icon={ faPlus } />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={ () => {this.handleAddTranscriptElementToProgrammeScript('title');} }
                      title="Add a title header element to the programme script"
                    >
                      <FontAwesomeIcon icon={ faHeading } /> Heading
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={ () => {this.handleAddTranscriptElementToProgrammeScript('voice-over');} }
                      title="Add a title voice over element to the programme script"
                    >
                      <FontAwesomeIcon icon={ faMicrophoneAlt } /> Voice Over
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={ () => {this.handleAddTranscriptElementToProgrammeScript('note');} }
                      title="Add a note element to the programme script"
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
                    <FontAwesomeIcon icon={ faShare } /> Export
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
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={ this.handleExportTxt }
                      title="export Text, export the programme script as a text version"
                    >
                  Text File <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={ () => {alert('export word doc not implemented yet');} }
                      title="export docx, export the programme script as a word document"
                    >
                  Word Document <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={ this.handleExportJson }
                      title="export Json, export the programme script as a json file"
                    >
                  Json <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={ 12 } md={ 1 } ld={ 1 } xl={ 1 }>
                <Button variant="outline-secondary"
                  onClick={ this.handleSaveProgrammeScript }
                  // size="sm"
                  title="save programme script"
                  block
                >
                  <FontAwesomeIcon icon={ faSave } />
                  {/* Save */}
                </Button>
              </Col>
            </Row>

          </Card.Header>
          <Card.Body>
            <article
              style={ { height: '60vh', overflow: 'scroll' } }
              onDoubleClick={ this.handleDoubleClickOnProgrammeScript }
            >
              { this.state.programmeScript ? <ProgrammeScript
                programmeScriptElements={ this.state.programmeScript.elements }
                handleProgrammeScriptOrderChange={ this.handleProgrammeScriptOrderChange }
                handleDeleteProgrammeScriptElement={ this.handleDeleteProgrammeScriptElement }
                handleEditProgrammeScriptElement={ this.handleEditProgrammeScriptElement }

              />
                : null }
            </article>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default ProgramScript;
