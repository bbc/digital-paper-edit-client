import React, { Component, Suspense } from 'react';
import Row from 'react-bootstrap/Row';
import cuid from 'cuid';
import Card from 'react-bootstrap/Card';
import PreviewCanvas from './PreviewCanvas2/index.js';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import EDL from '@pietrop/edl-composer';
import generateADL from '@pietrop/aes31-adl-composer';
import jsonToFCPX from '@pietrop/fcpx-xml-composer';
import jsonToAudition from 'audition-xml-composer';
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
  faTrash,
  faListUl,
  faFileCode,
  faFileVideo,
  faFileAudio,
  faHeadphones,
  faVideo,
  faFileWord,
  faFileAlt,
  faFlask,
} from '@fortawesome/free-solid-svg-icons';
import timecodes from 'node-timecodes';
import Skeleton from '@material-ui/lab/Skeleton';

import ExportMenuItem from './ExportMenuItem';
import getDataFromUserWordsSelection from './get-data-from-user-selection.js';
import { divideWordsSelectionsIntoParagraphs, isOneParagraph } from './divide-words-selections-into-paragraphs/index.js';
import ApiWrapper from '../../../../ApiWrapper/index.js';
import whichJsEnv from '../../../../Util/which-js-env';
import programmeScriptJsonToDocx from './programme-script-json-to-docx/index.js';
import ExportWaveForm from './ExportWaveForm';
const ProgrammeScript = React.lazy(() => import('./ProgrammeScript.js'));

const TOOLTIP_DEPLAY_IN_MILLISECONDS = 3000;
const defaultReelName = 'NA';
const defaultFps = 25;
const defaultTimecodeOffset = '00:00:00:00';
const defaultSampleRate = '16000';
const INSERT_POINT_ELEMENT = { type: 'insert-point', text: 'Insert Point to add selection' };

class ProgramScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSaved: new Date(),
      programmeScript: null,
      resetPreview: false,
      isAdvancedSelect: false,
      // demo content
      playlist: [
        // start - is relative to timeline
        // duration - of clip in playlist
        // sourceStart - time from start of clip in playlist
        // { type:'video', start:0, sourceStart: 30, duration:10, src:'https://download.ted.com/talks/MorganVague_2018X.mp4' },
        // { type:'video', start:10, sourceStart: 40, duration:10, src:'https://download.ted.com/talks/IvanPoupyrev_2019.mp4' },
        // { type:'video', start:20, sourceStart: 50, duration:10, src:'https://download.ted.com/talks/KateDarling_2018S-950k.mp4' },
      ],
    };
  }

  mouseUpListener = () => {
    // makign sure mouse up event is also associated with a selection
    if (window.getSelection || document.selection) {
      const result = getDataFromUserWordsSelection();
      if (result) {
        this.setState({ tmpSelection: result });
        // if advanced select is on, copy over to programme scfript
        if (this.state.isAdvancedSelect) {
          this.handleAddTranscriptSelectionToProgrammeScript();
        }
      }
    }
  };

  componentDidMount = () => {
    ApiWrapper.getPaperEdit(this.props.projectId, this.props.papereditId).then(json => {
      const programmeScript = json.programmeScript;
      // Adding an insert point at the end of the list
      programmeScript.elements.push(INSERT_POINT_ELEMENT);
      this.setState({
        programmeScript: programmeScript,
      });
    });
    // listening for word selections in transcripts
    // to save those tmp selection to enable to
    // use contextual menu in programme script to
    // paste those selections in the programme script
    document.addEventListener('mouseup', this.mouseUpListener);
  };
  componentWillUnmount = () => {
    // removing selection listener
    try {
      document.removeEventListener('mouseup', this.mouseUpListener);
    } catch (error) {
      console.error('error removing listener mouseup', error);
    }
  };

  // TODO: save to server
  handleProgrammeScriptOrderChange = list => {
    this.setState(
      ({ programmeScript }) => {
        programmeScript.elements = list;

        return {
          programmeScript: programmeScript,
        };
      },
      () => {
        this.handleSaveProgrammeScript();
        this.handleUpdatePreview();
      }
    );
  };

  // TODO: save to server
  handleDeleteProgrammeScriptElement = i => {
    // TODO: add a prompt, like are you shure you want to delete, confirm etc..?
    this.setState(
      ({ programmeScript }) => {
        const index = i;
        const list = programmeScript.elements;
        list.splice(index, 1);
        programmeScript.elements = list;

        return {
          programmeScript: programmeScript,
        };
      },
      () => {
        this.handleSaveProgrammeScript();
        this.handleUpdatePreview();
      }
    );
  };

  handleEditProgrammeScriptElement = i => {
    const { programmeScript } = this.state;
    const elements = programmeScript.elements;
    const currentElement = elements[i];
    const newText = prompt('Edit', currentElement.text);
    if (newText) {
      currentElement.text = newText;
      elements[i] = currentElement;
      programmeScript.elements = elements;
      // TODO: save to server
      this.setState(
        {
          programmeScript: programmeScript,
        },
        () => {
          this.handleSaveProgrammeScript();
          // For now programme script elements other
          // than paper cuts don't show in preview canvas
          // so commenting this out for now
          // this.handleUpdatePreview();
        }
      );
    }
  };

  handleAddTranscriptElementToProgrammeScript = (elementType, indexNumber) => {
    console.log('handleAddTranscriptElementToProgrammeScript', elementType, indexNumber);
    const { programmeScript } = this.state;
    const elements = this.state.programmeScript.elements;
    // TODO: refactor - with helper functions
    if (elementType === 'title' || elementType === 'note' || elementType === 'voice-over') {
      const text = prompt('Add some text for a section title', 'Some place holder text');
      if (text) {
        let indexOfInsertPoint = 0;
        if (indexNumber || indexNumber === 0) {
          indexOfInsertPoint = indexNumber + 1;
        } else {
          indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
        }
        const newElement = {
          id: cuid(),
          index: elements.length,
          type: elementType,
          text: text,
        };

        elements.splice(indexOfInsertPoint, 0, newElement);
        programmeScript.elements = elements;
        // TODO: save to server
        this.setState(
          {
            programmeScript: programmeScript,
          },
          () => {
            this.handleSaveProgrammeScript();
          }
        );
      }
    }
  };

  getIndexPositionOfInsertPoint = () => {
    const { programmeScript } = this.state;
    const elements = programmeScript.elements;
    // find insert point in list,
    const insertPointElement = elements.find(el => {
      return el.type === 'insert-point';
    });
    // get insertpoint index
    const indexOfInsertPoint = elements.indexOf(insertPointElement);

    return indexOfInsertPoint;
  };

  handleAddTranscriptSelectionToProgrammeScriptTmpSave = indexNumber => {
    // getting results of word selection from tmpSelection in state
    // tmpSelection in populated via the on mouse app selection listener
    // initialised in componentDidMount
    const result = this.state.tmpSelection;
    // extra validation to make sure it doesn't accidentally try to paste paper-cuts
    // if the user selects those words
    if (result && result.transcriptId && result.speaker) {
      // TODO: if there's just one speaker in selection do following
      // if it's multiple split list of words into multiple groups
      // and add a papercut for each to the programme script
      const { programmeScript } = this.state;
      const elements = programmeScript.elements;
      // TODO: insert at insert point
      let indexOfInsertPoint = 0;
      if (indexNumber || indexNumber === 0) {
        indexOfInsertPoint = indexNumber + 1;
      } else {
        indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
      }
      if (isOneParagraph(result.words)) {
        // create new element
        // TODO: Create new element could be refactored into helper function
        const newElement = {
          id: cuid(),
          index: elements.length,
          type: 'paper-cut',
          start: result.start,
          end: result.end,
          speaker: result.speaker,
          words: result.words,
          transcriptId: result.transcriptId,
          labelId: [],
        };
        // add element just above of insert point
        elements.splice(indexOfInsertPoint, 0, newElement);
        programmeScript.elements = elements;
      } else {
        const paragraphs = divideWordsSelectionsIntoParagraphs(result.words);
        paragraphs.reverse().forEach(paragraph => {
          const newElement = {
            id: cuid(),
            index: elements.length,
            type: 'paper-cut',
            start: paragraph[0].start,
            end: paragraph[paragraph.length - 1].end,
            speaker: paragraph[0].speaker,
            words: paragraph,
            transcriptId: paragraph[0].transcriptId,
            // TODO: ignoring labels for now
            labelId: [],
          };
          // add element just above of insert point
          elements.splice(indexOfInsertPoint, 0, newElement);
          programmeScript.elements = elements;
        });
      }
      // TODO: save to server
      this.setState(
        {
          programmeScript: programmeScript,
        },
        () => {
          this.handleSaveProgrammeScript();
          this.handleUpdatePreview();
        }
      );
    } else {
      alert('Select some text in the transcript to add to the programme script');
    }
  };

  // TODO: save to server
  // TODO: needs to handle when selection spans across multiple paragraphs
  handleAddTranscriptSelectionToProgrammeScript = (e, indexNumber) => {
    const result = getDataFromUserWordsSelection();
    if (result) {
      // TODO: if there's just one speaker in selection do following
      // if it's multiple split list of words into multiple groups
      // and add a papercut for each to the programme script
      const { programmeScript } = this.state;
      const elements = programmeScript.elements;
      // insert at insert point
      let indexOfInsertPoint = 0;
      if (indexNumber || indexNumber === 0) {
        indexOfInsertPoint = indexNumber + 1;
      } else {
        indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
      }
      if (isOneParagraph(result.words)) {
        // create new element
        // TODO: Create new element could be refactored into helper function
        const newElement = {
          id: cuid(),
          index: elements.length,
          type: 'paper-cut',
          start: result.start,
          end: result.end,
          speaker: result.speaker,
          words: result.words,
          transcriptId: result.transcriptId,
          labelId: [],
        };
        // add element just above of insert point
        elements.splice(indexOfInsertPoint, 0, newElement);
        programmeScript.elements = elements;
      } else {
        const paragraphs = divideWordsSelectionsIntoParagraphs(result.words);
        paragraphs.reverse().forEach(paragraph => {
          const newElement = {
            id: cuid(),
            index: elements.length,
            type: 'paper-cut',
            start: paragraph[0].start,
            end: paragraph[paragraph.length - 1].end,
            speaker: paragraph[0].speaker,
            words: paragraph,
            transcriptId: paragraph[0].transcriptId,
            // TODO: ignoring labels for now
            labelId: [],
          };
          // add element just above of insert point
          elements.splice(indexOfInsertPoint, 0, newElement);
          programmeScript.elements = elements;
        });
      }
      // TODO: save to server
      this.setState(
        {
          programmeScript: programmeScript,
        },
        () => {
          this.handleSaveProgrammeScript();
          this.handleUpdatePreview();
          // clearing the selection to avoid bugs
          window.getSelection().collapse(document, 0);
        }
      );
    } else {
      alert('Select some text in the transcript to add to the programme script');
    }
  };

  /**
   * Helper function to create json EDL for other EDL/ADL/FPCX export
   */
  getSequenceJsonEDL = () => {
    const edlSq = {
      title: this.state.programmeScript.title,
      events: [],
    };

    const programmeScriptPaperCuts = this.state.programmeScript.elements
      .map(element => {
        if (element.type === 'paper-cut') {
          // Get clipName for current transcript
          const currentTranscript = this.props.transcripts.find(tr => {
            return tr.id === element.transcriptId;
          });

          let mediaFps = defaultFps;
          if (currentTranscript.metadata && currentTranscript.metadata.fps && currentTranscript.metadata.fps !== 'NA') {
            mediaFps = currentTranscript.metadata.fps;
          }

          const result = {
            startTime: element.start,
            endTime: element.end,
            reelName: currentTranscript.metadata ? currentTranscript.metadata.reelName : defaultReelName,
            clipName: `${currentTranscript.clipName}`,
            // TODO: frameRate should be pulled from the clips in the sequence
            // Changing to 24 fps because that is the frame rate of the ted talk examples from youtube
            // but again frameRate should not be hard coded
            fps: mediaFps,
            // TODO: if there is an offset this should added here, for now hard coding 0
            offset: currentTranscript.metadata ? currentTranscript.metadata.timecode : defaultTimecodeOffset,
            sampleRate: currentTranscript.metadata ? currentTranscript.metadata.sampleRate : defaultSampleRate,
          };

          return result;
        }

        return null;
      })
      .filter(el => {
        return el !== null;
      });
    // adding ids to EDL
    const programmeScriptPaperCutsWithId = programmeScriptPaperCuts.map((el, index) => {
      el.id = index + 1;

      return el;
    });
    edlSq.events.push(...programmeScriptPaperCutsWithId);

    return edlSq;
  };

  getSequenceJsonForFfmpegRemix = () => {
    const programmeScriptPaperCuts = this.state.programmeScript.elements
      .map(element => {
        if (element.type === 'paper-cut') {
          console.log(element);
          // Get clipName for current transcript
          const currentTranscript = this.props.transcripts.find(tr => {
            return tr.id === element.transcriptId;
          });
          // TODO: add a check that exports only if urls all contain mp4s, if not cannot send to ffmpeg-remix(?)
          const result = {
            start: parseFloat(element.start),
            end: parseFloat(element.end),
            // duration: element.end-element.start,
            source: `${currentTranscript.url}`,
          };
          return result;
        }
        return null;
      })
      .filter(el => {
        return el !== null;
      });

    return programmeScriptPaperCuts;
  };

  // https://www.npmjs.com/package/downloadjs
  // https://www.npmjs.com/package/@pietrop/edl-composer
  handleExportEDL = () => {
    const edlSq = this.getSequenceJsonEDL();
    const edl = new EDL(edlSq);
    downloadjs(edl.compose(), `${this.state.programmeScript.title}.edl`, 'text/plain');
  };

  handleExportADL = () => {
    // alert('this function has not been implemented yet');
    const edlSq = this.getSequenceJsonEDL();
    const firstElement = edlSq.events[0];
    let mediaFps = defaultFps;
    if (firstElement.fps && firstElement.fps !== 'NA') {
      mediaFps = firstElement.fps;
    }
    const result = generateADL({
      projectOriginator: 'Digital Paper Edit',
      // TODO: it be good to change sequence for the ADL to be same schema
      // as the one for EDL and FCPX - for now just adjusting
      edits: edlSq.events.map(event => {
        return {
          start: event.startTime,
          end: event.endTime,
          clipName: event.clipName,
          // TODO: could add a label if present
          label: '',
        };
      }),
      sampleRate: firstElement.sampleRate,
      frameRate: mediaFps,
      projectName: edlSq.title,
    });
    downloadjs(result, `${this.state.programmeScript.title}.adl`, 'text/plain');
  };

  handleExportFCPX = () => {
    // alert('this function has not been implemented yet');
    const edlSq = this.getSequenceJsonEDL();
    const result = jsonToFCPX(edlSq);
    downloadjs(result, `${this.state.programmeScript.title}.fcpxml`, 'text/plain');
  };

  handleExportXML = () => {
    const edlSq = this.getSequenceJsonEDL();
    const result = jsonToAudition(edlSq);
    downloadjs(result, `${this.state.programmeScript.title}.xml`, 'text/plain');
  };

  getProgrammeScriptJson = () => {
    const edlSq = {
      title: this.state.programmeScript.title,
      events: [],
    };

    const programmeScriptPaperCuts = this.state.programmeScript.elements
      .map(element => {
        if (element.type === 'paper-cut') {
          // Get clipName for current transcript
          const currentTranscript = this.props.transcripts.find(tr => {
            return tr.id === element.transcriptId;
          });

          let mediaFps = defaultFps;
          if (currentTranscript.metadata && currentTranscript.metadata.fps && currentTranscript.metadata.fps !== 'NA') {
            mediaFps = currentTranscript.metadata.fps;
          }
          // TODO: need to find a way to escape text containing ' in word text attribute
          // const words = element.words.map((word) => {
          //   word.text = word.text.replace(/'/g,"\'");
          //   return word;
          // })

          const result = {
            ...element,
            // words,
            // TODO: this is point to the proxy preview locally on the user's computer
            src: currentTranscript.url,
            startTime: element.start,
            endTime: element.end,
            reelName: currentTranscript.metadata ? currentTranscript.metadata.reelName : defaultReelName,
            clipName: `${currentTranscript.clipName}`,
            // TODO: frameRate should be pulled from the clips in the sequence
            // Changing to 24 fps because that is the frame rate of the ted talk examples from youtube
            // but again frameRate should not be hard coded
            fps: mediaFps,
            sampleRate: currentTranscript.metadata ? currentTranscript.metadata.sampleRate : defaultSampleRate,
            offset: currentTranscript.metadata ? currentTranscript.metadata.timecode : defaultTimecodeOffset,
          };

          return result;
        } else {
          return element;
        }
      })
      .filter(el => {
        return el !== null;
      });
    // adding ids to EDL
    const programmeScriptPaperCutsWithId = programmeScriptPaperCuts.map((el, index) => {
      el.id = index + 1;

      return el;
    });
    edlSq.events.push(...programmeScriptPaperCutsWithId);

    return edlSq;
  };

  programmeScriptJsonToText = edlsqJson => {
    const title = `# ${edlsqJson.title}\n\n`;
    const body = edlsqJson.events.map(event => {
      if (event.type === 'title') {
        return `## ${event.text}`;
      } else if (event.type === 'voice-over') {
        return `_${event.text}_`;
      } else if (event.type === 'note') {
        return `[ ${event.text}]`;
      } else if (event.type === 'paper-cut') {
        // need to escape ' otherwise Premiere.jsx chockes
        return `${timecodes.fromSeconds(event.startTime)}\t${timecodes.fromSeconds(event.endTime)}\t${event.speaker}\t-\t${
          event.clipName
        }     \n${event.words
          .map(word => {
            return word.text.replace(/'/, "'");
          })
          .join(' ')}`;
      }

      return null;
    });

    return `${title}${body.join('\n\n')}`;
  };

  programmeScriptJsonToTextPaperCutsOnly = edlsqJson => {
    const body = edlsqJson.events.map(event => {
      if (event.type === 'paper-cut') {
        // need to escape ' otherwise Premiere.jsx chockes
        return `${event.words
          .map(word => {
            return word.text.replace(/'/, "'");
          })
          .join(' ')}`;
      }

      return null;
    });

    return `${body.filter(e => e !== null).join('\n\n')}`;
  };

  handleExportJson = () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const programmeScriptText = JSON.stringify(programmeScriptJson, null, 2);
    downloadjs(programmeScriptText, `${this.state.programmeScript.title}.json`, 'text/plain');
  };

  handleCepExportSequence = () => {
    const programmeScriptJson = this.getProgrammeScriptJson();

    const paperCuts = programmeScriptJson.events.filter(el => {
      return el.type === 'paper-cut';
    });
    // not quier sure how to escapte  ' in word text attribute, so since it's not needed for premiere export, removing the words
    const paperCutsWithoutWords = paperCuts.map(el => {
      delete el.words;
      return el;
    });
    // TODO: need to remove
    const tmpEdl = {
      edlJson: {
        events: paperCutsWithoutWords,
        title: this.state.programmeScript.title,
      },
    };
    const premiereCommandString = "$._PPP.create_sequence_from_paper_edit('" + JSON.stringify(tmpEdl) + "')";
    window.__adobe_cep__.evalScript(premiereCommandString, function(response) {
      // done
      console.info('done exporting sequence');
    });
  };

  handleExportTxt = () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const programmeScriptText = this.programmeScriptJsonToText(programmeScriptJson);
    downloadjs(programmeScriptText, `${this.state.programmeScript.title}.txt`, 'text/plain');
  };

  handleExportTxtOnyPaperCuts = () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const programmeScriptText = this.programmeScriptJsonToTextPaperCutsOnly(programmeScriptJson);
    downloadjs(programmeScriptText, `${this.state.programmeScript.title}.txt`, 'text/plain');
  };

  handleExportDocx = async () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const isWithClipReference = false;
    const programmeScriptDocx = await programmeScriptJsonToDocx(programmeScriptJson, isWithClipReference);
    downloadjs(programmeScriptDocx, `${this.state.programmeScript.title}.docx`, 'text/docx');
  };

  handleExportDocxWithClipReference = async () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const isWithClipReference = true;
    const programmeScriptDocx = await programmeScriptJsonToDocx(programmeScriptJson, isWithClipReference);
    downloadjs(programmeScriptDocx, `${this.state.programmeScript.title}.docx`, 'text/docx');
  };

  handleUpdatePreview = () => {
    let timelineStartTime = 0;
    // playlist elements for  previe canvas
    // { type:'video', start:0, sourceStart: 30, duration:10, src:'https://download.ted.com/talks/MorganVague_2018X.mp4' },
    const playlist = this.state.programmeScript.elements
      .map(element => {
        if (element.type === 'paper-cut') {
          // Get clipName for current transcript
          const currentTranscript = this.props.transcripts.find(tr => {
            return tr.id === element.transcriptId;
          });
          const duration = element.end - element.start;
          // TODO: handle audio only type (eg for radio), get from transcript json?
          const result = {
            type: 'video',
            start: timelineStartTime,
            sourceStart: element.start,
            duration: duration,
            src: currentTranscript.url,
          };

          timelineStartTime += duration;

          return result;
        }

        return null;
      })
      .filter(el => {
        return el !== null;
      });
    // Workaround to mound and unmoun the `PreviewCanvas` component
    // to update the playlist
    this.setState(
      {
        resetPreview: true,
      },
      () => {
        this.setState({
          resetPreview: false,
          playlist: playlist,
        });
      }
    );
    this.setState({
      playlist: playlist,
    });
  };

  handleDoubleClickOnProgrammeScript = e => {
    if (e.target.className === 'words') {
      // const wordCurrentTime = e.target.dataset.start;
      // TODO: set current time in preview canvas
      // Video context probably needs more info like, which clip/track in the sequence?
      // investigate how to set currentTime in video context
    }
  };

  handleSaveProgrammeScript = () => {
    const { programmeScript } = this.state;
    // cloning programmeScript to avoid overriding original
    const latestProgrammeScript = { ...programmeScript };
    if (latestProgrammeScript) {
      const elements = [...latestProgrammeScript.elements];
      // finding an removing insert point before saving to server
      // find insert point in list,
      const insertPointElement = elements.find(el => {
        return el.type === 'insert-point';
      });
      if (insertPointElement) {
        // get insertpoint index
        const indexOfInsertPoint = elements.indexOf(insertPointElement);
        elements.splice(indexOfInsertPoint, 1);
      }

      latestProgrammeScript.elements = elements;
      ApiWrapper.updatePaperEdit(this.props.projectId, this.props.papereditId, latestProgrammeScript).then(json => {
        if (json.status === 'ok') {
          this.setState({ lastSaved: new Date() });
        }
      });
    }
  };

  // TODO:
  handleChangeInsertPointPosition = indexNumber => {
    const { programmeScript } = this.state;
    const latestProgrammeScript = { ...programmeScript };
    // insert new programme script
    // remove insert point from old programme script (eg index different from new one)
    // save programme script
    if (latestProgrammeScript) {
      const elements = [...latestProgrammeScript.elements];
      // finding an removing insert point before saving to server
      // find insert point in list,
      const insertPointElement = elements.find(el => {
        return el.type === 'insert-point';
      });
      // add new insert point
      const newInsertPoint = { ...INSERT_POINT_ELEMENT };
      elements.splice(indexNumber + 1, 0, newInsertPoint);
      // remove previous  insert point
      if (insertPointElement) {
        // get insertpoint index
        const indexOfInsertPoint = elements.indexOf(insertPointElement);
        elements.splice(indexOfInsertPoint, 1);
      }

      latestProgrammeScript.elements = elements;
      ApiWrapper.updatePaperEdit(this.props.projectId, this.props.papereditId, latestProgrammeScript).then(json => {
        if (json.status === 'ok') {
          this.setState(
            {
              // playlist: playlist,
              lastSaved: new Date(),
              programmeScript: latestProgrammeScript,
            },
            () => {
              // this.handleUpdatePreview()
            }
          );
        }
      });
    }
  };

  handleAdvancedSelectCheckbox = event => {
    const target = event.target;
    this.setState({
      isAdvancedSelect: target.checked,
    });
  };

  handleDeleteProgrammeScriptContent = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('Are you usure you want to delete the content of your programme script?');
    if (confirmation) {
      const { programmeScript } = this.state;
      const latestProgrammeScript = { ...programmeScript };
      // latestProgrammeScript.elements = [];
      latestProgrammeScript.elements = [{ ...INSERT_POINT_ELEMENT }];
      ApiWrapper.updatePaperEdit(this.props.projectId, this.props.papereditId, latestProgrammeScript).then(json => {
        if (json.status === 'ok') {
          this.setState(
            {
              // playlist: playlist,
              lastSaved: new Date(),
              programmeScript: latestProgrammeScript,
            },
            () => {
              this.handleUpdatePreview();
            }
          );
        }
      });
    } else {
      alert('ok no worries, nothing changed');
    }
  };

  handleExportVideoPreview = () => {
    const sequence = this.getSequenceJsonForFfmpegRemix();
    const programmeScriptTitle = this.state.programmeScript.title;
    // timeNow -  eg "3-6-2020_5.41.35PM"
    const timeNow = new Date()
      .toLocaleString()
      .replace(/\//g, '-')
      .replace(/, /g, '_')
      .replace(/:/g, '.')
      .replace(/ /g, '');
    const fileName = `${programmeScriptTitle}_${timeNow}.mp4`;
    ApiWrapper.exportVideo(sequence, fileName).then(res => {
      console.log('exported', res);
    });
  };

  handleExportAudioPreview = () => {
    const sequence = this.getSequenceJsonForFfmpegRemix();
    const programmeScriptTitle = this.state.programmeScript.title;
    // timeNow -  eg "3-6-2020_5.41.35PM"
    const timeNow = new Date()
      .toLocaleString()
      .replace(/\//g, '-')
      .replace(/, /g, '_')
      .replace(/:/g, '.')
      .replace(/ /g, '');
    const fileName = `${programmeScriptTitle}_${timeNow}.wav`;
    ApiWrapper.exportAudio(sequence, fileName, false).then(res => {
      console.log('exported', res);
    });
  };

  handleExportAudioPreviewWithVideoWaveform = ({ waveFormMode, waveFormColor }) => {
    const sequence = this.getSequenceJsonForFfmpegRemix();
    const programmeScriptTitle = this.state.programmeScript.title;
    // timeNow -  eg "3-6-2020_5.41.35PM"
    const timeNow = new Date()
      .toLocaleString()
      .replace(/\//g, '-')
      .replace(/, /g, '_')
      .replace(/:/g, '.')
      .replace(/ /g, '');
    const fileName = `${programmeScriptTitle}_${timeNow}.mp4`;
    const waveForm = true;
    // const waveFormMode = 'cline';
    ApiWrapper.exportAudio(sequence, fileName, waveForm, waveFormMode, waveFormColor).then(res => {
      console.log('exported', res);
    });
  };

  render() {
    const position = window.matchMedia('(max-width: 767px)').matches ? true : false;
    return (
      <>
        <Card
          style={
            {
              // backgroundColor:'#eee',
              // boxShadow: '0 0 10px #ccc'
            }
          }
        >
          <Card.Body style={{ padding: '1em', paddingTop: '0em', paddingBottom: '0.6em' }}>
            {!this.state.resetPreview ? <PreviewCanvas playlist={this.state.playlist} width={300} /> : null}
          </Card.Body>
          <Card.Body style={{ paddingTop: '0px', paddingBottom: '0.6em' }}>
            <Row noGutters>
              <ButtonGroup style={{ width: '100%' }} vertical={position} block>
                <OverlayTrigger
                  placement={'top'}
                  delay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                  overlay={
                    <Tooltip>
                      To add a text selection, select text in the transcript, then click this button to add it to the programme script, at the orange
                      insert point/
                    </Tooltip>
                  }
                >
                  <Button variant="light" size="sm" onClick={this.handleAddTranscriptSelectionToProgrammeScript}>
                    <FontAwesomeIcon icon={faPlus} /> Selection
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={'top'}
                  delay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                  overlay={
                    <Tooltip>
                      Advanced selection - check this box to auto copy across transcript selections to insert point in programme script
                    </Tooltip>
                  }
                >
                  <Button variant="light" style={{ cursor: 'default' }}>
                    <input
                      style={{ cursor: 'pointer' }}
                      name="advancedSelect"
                      type="checkbox"
                      checked={this.state.isAdvancedSelect}
                      onChange={this.handleAdvancedSelectCheckbox}
                    />{' '}
                    <small className={'text-secondary'} style={{ marginBottom: '0em' }}>
                      {'Auto copy selections'}
                    </small>
                  </Button>
                </OverlayTrigger>
                <DropdownButton as={ButtonGroup} variant="light" title={<FontAwesomeIcon icon={faListUl} />}>
                  <ExportMenuItem
                    tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                    onClick={() => {
                      this.handleAddTranscriptElementToProgrammeScript('title');
                    }}
                    title="Add a title header element to the programme script"
                    text={
                      <>
                        {' '}
                        <FontAwesomeIcon icon={faHeading} /> Heading
                      </>
                    }
                  />
                  <ExportMenuItem
                    tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                    onClick={() => {
                      this.handleAddTranscriptElementToProgrammeScript('voice-over');
                    }}
                    title="Add a title voice over element to the programme script"
                    text={
                      <>
                        {' '}
                        <FontAwesomeIcon icon={faMicrophoneAlt} /> Voice Over
                      </>
                    }
                  />
                  <ExportMenuItem
                    tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                    onClick={() => {
                      this.handleAddTranscriptElementToProgrammeScript('note');
                    }}
                    title="Add a note element to the programme script"
                    text={
                      <>
                        <FontAwesomeIcon icon={faStickyNote} /> Note
                      </>
                    }
                  />
                </DropdownButton>

                <OverlayTrigger
                  placement={'top'}
                  delay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                  overlay={<Tooltip>update programme script audio/video preview</Tooltip>}
                >
                  <Button variant="light" onClick={this.handleUpdatePreview}>
                    <FontAwesomeIcon icon={faSync} />
                  </Button>
                </OverlayTrigger>

                <DropdownButton as={ButtonGroup} variant="light" title={<FontAwesomeIcon icon={faShare} />}>
                  {whichJsEnv() === 'cep' ? (
                    <>
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleCepExportSequence}
                        title="export the programme script as a sequence in Adobe Premiere"
                        text={
                          <>
                            Premiere - Sequence <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                    </>
                  ) : (
                    <>
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportEDL}
                        title={
                          'export EDL, edit decision list, to import the programme script as a sequence in video editing software - Avid, Premiere, Davinci Resolve, for FCPX choose FCPX XML'
                        }
                        text={
                          <>
                            {' '}
                            <FontAwesomeIcon icon={faVideo} /> EDL - Video <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        title="export FCPX XML, to import the programme script as a sequence in Final Cut Pro X, video editing software"
                        onClick={this.handleExportFCPX}
                        text={
                          <>
                            {' '}
                            <FontAwesomeIcon icon={faVideo} /> FCPX <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                      <Dropdown.Divider />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportADL}
                        title="export ADL, audio decision list, to import the programme script as a sequence in audio editing software such as SADiE"
                        text={
                          <>
                            {' '}
                            <FontAwesomeIcon icon={faHeadphones} /> ADL - Audio <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportXML}
                        title="export XML, audio decision list, to import the programme script as a sequence in audio editing software such as Audition"
                        text={
                          <>
                            {' '}
                            <FontAwesomeIcon icon={faHeadphones} /> XML - Audition <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                      <Dropdown.Divider />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportTxt}
                        title="export Text, export the programme script as a text version"
                        text={
                          <>
                            {' '}
                            <FontAwesomeIcon icon={faFileAlt} /> Text File <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportTxtOnyPaperCuts}
                        title="export Text, export only the text selection in the programme script as a text version"
                        text={
                          <>
                            {' '}
                            <FontAwesomeIcon icon={faFileAlt} /> Text File (only text selection) <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportDocx}
                        title="export docx, export the programme script as a word document"
                        text={
                          <>
                            <FontAwesomeIcon icon={faFileWord} /> Word Document <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportDocxWithClipReference}
                        title="export docx, export the programme script as a word document, with clip name and timecode references, for text selections"
                        text={
                          <>
                            <FontAwesomeIcon icon={faFileWord} /> Word Doc (with ref) <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />

                      {whichJsEnv() === 'electron' ? (
                        <>
                          <Dropdown.Divider />
                          <ExportMenuItem
                            tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                            onClick={this.handleExportVideoPreview}
                            title="Export mp4 video preview - Experimental feature, at the moment you cannot combine audio and video in the same export."
                            text={
                              <>
                                <FontAwesomeIcon icon={faFileVideo} /> Video (mp4) <FontAwesomeIcon icon={faFlask} />{' '}
                                <FontAwesomeIcon icon={faInfoCircle} />
                              </>
                            }
                          />
                          <ExportMenuItem
                            tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                            onClick={this.handleExportAudioPreview}
                            title="Export wav audio preview - Experimental feature, at the moment you cannot combine audio and video in the same export."
                            text={
                              <>
                                <FontAwesomeIcon icon={faFileAudio} /> Audio (wav) <FontAwesomeIcon icon={faFlask} />
                                <FontAwesomeIcon icon={faInfoCircle} />
                              </>
                            }
                          />
                          <Dropdown.Divider />
                          <ExportWaveForm
                            TOOLTIP_DEPLAY_IN_MILLISECONDS={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                            handleExportAudioPreviewWithVideoWaveform={this.handleExportAudioPreviewWithVideoWaveform}
                            title="Export audio preview as video with animated wave form - Experimental feature, at the moment you cannot combine audio and video in the same export."
                            text={
                              <>
                                <FontAwesomeIcon icon={faFileAudio} /> Animated Waveform (mp4) <FontAwesomeIcon icon={faFlask} />
                                <FontAwesomeIcon icon={faInfoCircle} />
                              </>
                            }
                          />
                        </>
                      ) : null}
                      <Dropdown.Divider />
                      <ExportMenuItem
                        tootlipDelay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                        onClick={this.handleExportJson}
                        title="export Json, export the programme script as a json file"
                        text={
                          <>
                            {' '}
                            <FontAwesomeIcon icon={faFileCode} /> Json <FontAwesomeIcon icon={faInfoCircle} />
                          </>
                        }
                      />
                    </>
                  )}
                </DropdownButton>
                <OverlayTrigger
                  placement={'top'}
                  // delay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                  overlay={<Tooltip>{` Last Saved at ${this.state.lastSaved.toLocaleString()}`}</Tooltip>}
                >
                  <Button variant="light" disabled>
                    <small className={'text-secondary'} style={{ marginBottom: '0em' }}>{`${this.state.lastSaved.toLocaleTimeString()}`}</small>
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={'top'}
                  delay={TOOLTIP_DEPLAY_IN_MILLISECONDS}
                  overlay={<Tooltip>Delete programme script content.</Tooltip>}
                >
                  <Button variant="light" onClick={this.handleDeleteProgrammeScriptContent}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </OverlayTrigger>
              </ButtonGroup>
            </Row>
          </Card.Body>
          <hr style={{ margin: '0px' }} />
          <Card.Body style={{ padding: '0px' }}>
            <article
              style={{
                height: '55vh',
                overflow: 'scroll',
                padding: '1em',
                // backgroundColor:'#f9f9f9'
              }}
              onDoubleClick={this.handleDoubleClickOnProgrammeScript}
            >
              {this.state.programmeScript ? (
                <Suspense
                  fallback={
                    <>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </>
                  }
                >
                  <ProgrammeScript
                    programmeScriptElements={this.state.programmeScript.elements}
                    handleProgrammeScriptOrderChange={this.handleProgrammeScriptOrderChange}
                    handleDeleteProgrammeScriptElement={this.handleDeleteProgrammeScriptElement}
                    handleEditProgrammeScriptElement={this.handleEditProgrammeScriptElement}
                    handleAddTranscriptElementToProgrammeScript={this.handleAddTranscriptElementToProgrammeScript}
                    handleAddTranscriptSelectionToProgrammeScriptTmpSave={this.handleAddTranscriptSelectionToProgrammeScriptTmpSave}
                    handleChangeInsertPointPosition={this.handleChangeInsertPointPosition}
                  />
                </Suspense>
              ) : null}
            </article>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default ProgramScript;
