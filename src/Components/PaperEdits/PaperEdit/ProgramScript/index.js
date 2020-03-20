import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cuid from 'cuid';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import PreviewCanvas from './PreviewCanvas2/index.js';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
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
  faJsSquare,
  faFileCode,
  faFilm,
  faFileVideo,
  faStream,
  faFileAudio,
  faHeadphones,
  faVideo,
  faFileWord,
  faFileAlt,
  faFlask
} from '@fortawesome/free-solid-svg-icons';
import timecodes from 'node-timecodes';
import ProgrammeScript from './ProgrammeScript.js';
import getDataFromUserWordsSelection from './get-data-from-user-selection.js';
import { divideWordsSelectionsIntoParagraphs, isOneParagraph } from './divide-words-selections-into-paragraphs/index.js';
import ApiWrapper from '../../../../ApiWrapper/index.js';
import whichJsEnv from '../../../../Util/which-js-env';
import programmeScriptJsonToDocx from './programme-script-json-to-docx/index.js';
import diffDateInMinutes from '../../../../Util/diff-dates-in-minutes';

const defaultReelName = 'NA';
const defaultFps = 25;
const defaultTimecodeOffset = '00:00:00:00';
const defaultSampleRate = '16000';
const INSERT_POINT_ELEMENT = { type: 'insert-point', text: 'Insert Point to add selection' }

class ProgramScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSaved: new Date(),
      programmeScript: null,
      resetPreview: false,
      isAdvancedSelect: false,
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

   mouseUpListener = ()=>{
    // makign sure mouse up event is also associated with a selection 
    if (window.getSelection|| document.selection) {
      const result = getDataFromUserWordsSelection();
      if (result) {
        this.setState({tmpSelection: result})
        // if advanced select is on, copy over to programme scfript
        if(this.state.isAdvancedSelect){
          this.handleAddTranscriptSelectionToProgrammeScript()
        }
      }
    }
  }

  componentDidMount = () => {
    ApiWrapper.getPaperEdit(this.props.projectId, this.props.papereditId)
      .then((json) => {
        const programmeScript = json.programmeScript;
        // Adding an insert point at the end of the list
        programmeScript.elements.push(INSERT_POINT_ELEMENT);
        this.setState({
          programmeScript: programmeScript
        });
      });
      // listening for word selections in transcripts
      // to save those tmp selection to enable to 
      // use contextual menu in programme script to 
      // paste those selections in the programme script
      document.addEventListener('mouseup',this.mouseUpListener)
  }
  componentWillUnmount = ()=>{
    // removing selection listener
    try {
      document.removeEventListener('mouseup',this.mouseUpListener);
    } catch (error) {
     console.error('error removing listener mouseup', error)
    }
  }

  // TODO: save to server
  handleProgrammeScriptOrderChange = (list) => {
    this.setState(({ programmeScript }) => {
      programmeScript.elements = list;

      return {
        programmeScript: programmeScript
      };
    },()=>{
      this.handleSaveProgrammeScript()
      this.handleUpdatePreview();
    }
    );
  }

  // TODO: save to server
  handleDeleteProgrammeScriptElement = (i) => {
    // TODO: add a prompt, like are you shure you want to delete, confirm etc..?
    this.setState(({ programmeScript }) => {
      const index = i;
      const list = programmeScript.elements;
      list.splice(index, 1);
      programmeScript.elements = list;

      return {
        programmeScript: programmeScript
      };
    },()=>{
      this.handleSaveProgrammeScript();
      this.handleUpdatePreview();
    }
    );
  }

  handleEditProgrammeScriptElement = (i) => {
    const { programmeScript } = this.state;
    const elements = programmeScript.elements;
    const currentElement = elements[i];
    const newText = prompt('Edit', currentElement.text);
    if (newText) {
      currentElement.text = newText;
      elements[i] = currentElement;
      programmeScript.elements = elements;
      // TODO: save to server
      this.setState({
        programmeScript: programmeScript
      },()=>{
          this.handleSaveProgrammeScript();
          // For now programme script elements other
          // than paper cuts don't show in preview canvas
          // so commenting this out for now
          // this.handleUpdatePreview();
      });
    }
  }

  handleAddTranscriptElementToProgrammeScript = (elementType, indexNumber) => {
    console.log('handleAddTranscriptElementToProgrammeScript', elementType, indexNumber)
    const { programmeScript } = this.state;
    const elements = this.state.programmeScript.elements;
    // TODO: refactor - with helper functions
    if (elementType === 'title'
      || elementType === 'note'
      || elementType === 'voice-over') {
      const text = prompt('Add some text for a section title', 'Some place holder text');
      if(text){
        let indexOfInsertPoint = 0;
        if(indexNumber || indexNumber ===0 ){
          indexOfInsertPoint = indexNumber+1;
        }else{
          indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
        }
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
        },()=>{
          this.handleSaveProgrammeScript()
        });
      }
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

  handleAddTranscriptSelectionToProgrammeScriptTmpSave =(indexNumber)=>{
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
        if(indexNumber || indexNumber ===0 ){
          indexOfInsertPoint = indexNumber+1;
        }else{
          indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
        }
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
      }, ()=>{
        this.handleSaveProgrammeScript();
        this.handleUpdatePreview();
      });
    }
    else {
      alert('Select some text in the transcript to add to the programme script');
    }
  }

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
      if(indexNumber || indexNumber === 0 ){
          indexOfInsertPoint = indexNumber+1;
        }else{
          indexOfInsertPoint = this.getIndexPositionOfInsertPoint();
        }
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
      }, ()=>{
        this.handleSaveProgrammeScript();
        this.handleUpdatePreview();
        // clearing the selection to avoid bugs
        window.getSelection().collapse(document,0);
      });
    }
    else {
      alert('Select some text in the transcript to add to the programme script');
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

  getSequenceJsonForFfmpegRemix = () => {

    const programmeScriptPaperCuts = this.state.programmeScript.elements.map((element) => {
      if (element.type === 'paper-cut') {
        console.log(element)
        // Get clipName for current transcript
        const currentTranscript = this.props.transcripts.find((tr) => {
          return tr.id === element.transcriptId;
        });
         // TODO: add a check that exports only if urls all contain mp4s, if not cannot send to ffmpeg-remix(?)
        const result = {
          start: parseFloat(element.start),
          end: parseFloat(element.end),
          // duration: element.end-element.start,
          source: `${ currentTranscript.url }`,
        };
        return result;
      }
      return null;
    }).filter((el) => {return el !== null;});

    return programmeScriptPaperCuts;
  }

  // https://www.npmjs.com/package/downloadjs
  // https://www.npmjs.com/package/@pietrop/edl-composer
  handleExportEDL = () => {
    const edlSq = this.getSequenceJsonEDL();
    const edl = new EDL(edlSq);
    downloadjs(edl.compose(), `${ this.state.programmeScript.title }.edl`, 'text/plain');
  }

  handleExportADL = () => {
    // alert('this function has not been implemented yet');
    const edlSq = this.getSequenceJsonEDL();
    const firstElement = edlSq.events[0];
    let mediaFps = defaultFps;
    if(firstElement.fps && (firstElement.fps!== 'NA')){
      mediaFps = firstElement.fps
    }
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
      frameRate: mediaFps,
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

  handleExportXML = () => {
    const edlSq = this.getSequenceJsonEDL();
    const result = jsonToAudition(edlSq);
    downloadjs(result, `${ this.state.programmeScript.title }.xml`, 'text/plain');
  }

  getProgrammeScriptJson = () => {
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
        // need to escape ' otherwise Premiere.jsx chockes 
        return `${ timecodes.fromSeconds(event.startTime) }\t${ timecodes.fromSeconds(event.endTime) }\t${ event.speaker }\t-\t${ event.clipName }     \n${ event.words.map((word) => {return word.text.replace(/'/,'\'');}).join(' ') }`;
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

  handleCepExportSequence = () =>{
    const programmeScriptJson = this.getProgrammeScriptJson();

    const paperCuts = programmeScriptJson.events.filter((el)=>{
      return el.type ==='paper-cut'
    })
    // not quier sure how to escapte  ' in word text attribute, so since it's not needed for premiere export, removing the words
    const paperCutsWithoutWords = paperCuts.map((el)=>{
      delete el.words;
      return el;
    })
    // TODO: need to remove 
    const tmpEdl = {
      edlJson: {
        events: paperCutsWithoutWords,
        title: this.state.programmeScript.title
      } 
    }
    const premiereCommandString = "$._PPP.create_sequence_from_paper_edit('" + JSON.stringify(tmpEdl) + "')";
    window.__adobe_cep__.evalScript(premiereCommandString, function (response){
      // done 
      console.info('done exporting sequence')
    })
  }


  handleExportTxt = () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const programmeScriptText = this.programmeScriptJsonToText (programmeScriptJson);
    downloadjs(programmeScriptText, `${ this.state.programmeScript.title }.txt`, 'text/plain');
  }

  handleExportDocx = async () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const isWithClipReference = false;
    const programmeScriptDocx = await programmeScriptJsonToDocx(programmeScriptJson, isWithClipReference);
    downloadjs(programmeScriptDocx, `${ this.state.programmeScript.title }.docx`, 'text/docx');
  }

  handleExportDocxWithClipReference = async () => {
    const programmeScriptJson = this.getProgrammeScriptJson();
    const isWithClipReference = true;
    const programmeScriptDocx = await programmeScriptJsonToDocx(programmeScriptJson, isWithClipReference);
    downloadjs(programmeScriptDocx, `${ this.state.programmeScript.title }.docx`, 'text/docx');
  }

  handleUpdatePreview = () => {
    let timelineStartTime = 0;
    // playlist elements for  previe canvas
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
      this.setState({
        resetPreview: false,
        playlist: playlist
      });
    });
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
    }
  }

  handleSaveProgrammeScript = () => {
    const { programmeScript } = this.state;
    // cloning programmeScript to avoid overriding original
    const latestProgrammeScript = {...programmeScript}
    if (latestProgrammeScript) {
      const elements = [...latestProgrammeScript.elements];
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

      latestProgrammeScript.elements = elements;
      ApiWrapper.updatePaperEdit(this.props.projectId, this.props.papereditId, latestProgrammeScript)
        .then((json) => {
          if (json.status === 'ok') {
            this.setState({lastSaved: new Date()})
          }
        });
    }
  }

  // TODO:
  handleChangeInsertPointPosition = (indexNumber)=>{
    const { programmeScript } = this.state;
    const latestProgrammeScript = {...programmeScript}
    // insert new programme script
    // remove insert point from old programme script (eg index different from new one)
    // save programme script
    if (latestProgrammeScript) {
      const elements = [...latestProgrammeScript.elements];
      // finding an removing insert point before saving to server
      // find insert point in list,
      const insertPointElement = elements.find((el) => {
        return el.type === 'insert-point';
      });
      // add new insert point
      const newInsertPoint = {...INSERT_POINT_ELEMENT}
      elements.splice( indexNumber+1, 0, newInsertPoint);
      // remove previous  insert point 
      if (insertPointElement) {
        // get insertpoint index
        const indexOfInsertPoint = elements.indexOf(insertPointElement);
        elements.splice(indexOfInsertPoint, 1);
      }

      latestProgrammeScript.elements = elements;
      ApiWrapper.updatePaperEdit(this.props.projectId, this.props.papereditId, latestProgrammeScript)
        .then((json) => {
          if (json.status === 'ok') {
            this.setState({
              // playlist: playlist,
              lastSaved: new Date(),
              programmeScript: latestProgrammeScript
            }, () =>{
              // this.handleUpdatePreview()
            })
          }
        });
    }
  }

  handleAdvancedSelectCheckbox = (event) => {
    const target = event.target;
    this.setState({
      isAdvancedSelect:  target.checked
    });
  }

  handleDeleteProgrammeScriptContent = ()=>{
   // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('Are you usure you want to delete the content of your programme script?');
    if(confirmation){
      const { programmeScript } = this.state;
      const latestProgrammeScript = {...programmeScript}
      // latestProgrammeScript.elements = [];
      latestProgrammeScript.elements = [{...INSERT_POINT_ELEMENT}]
      ApiWrapper.updatePaperEdit(this.props.projectId, this.props.papereditId, latestProgrammeScript)
      .then((json) => {
        if (json.status === 'ok') {
          this.setState({
            // playlist: playlist,
            lastSaved: new Date(),
            programmeScript: latestProgrammeScript
          }, () =>{
            this.handleUpdatePreview()
          })
        }
      });
    }else{
      alert('ok no worries, nothing changed')
    }
  }

  handleExportVideoPreview= ()=>{
    const sequence = this.getSequenceJsonForFfmpegRemix();
    const programmeScriptTitle = this.state.programmeScript.title;
    // timeNow -  eg "3-6-2020_5.41.35PM"
    const timeNow = new Date().toLocaleString().replace(/\//g,'-').replace(/,\ /g,'_').replace(/:/g,'.').replace(/\ /g,'');
    const fileName = `${programmeScriptTitle}_${timeNow}.mp4`;
    ApiWrapper.exportVideo(sequence, fileName).then((res)=>{
      console.log('exported', res)
    })
  }

  handleExportAudioPreview= ()=>{
    const sequence = this.getSequenceJsonForFfmpegRemix();
    const programmeScriptTitle = this.state.programmeScript.title;
    // timeNow -  eg "3-6-2020_5.41.35PM"
    const timeNow = new Date().toLocaleString().replace(/\//g,'-').replace(/,\ /g,'_').replace(/:/g,'.').replace(/\ /g,'');
    const fileName = `${programmeScriptTitle}_${timeNow}.wav`;
    const waveForm = false;
    ApiWrapper.exportAudio(sequence, fileName, false).then((res)=>{
      console.log('exported', res)
    })
  }

  handleExportAudioPreviewWithVideoWaveform = ()=>{
    const sequence = this.getSequenceJsonForFfmpegRemix();
    const programmeScriptTitle = this.state.programmeScript.title;
    // timeNow -  eg "3-6-2020_5.41.35PM"
    const timeNow = new Date().toLocaleString().replace(/\//g,'-').replace(/,\ /g,'_').replace(/:/g,'.').replace(/\ /g,'');
    const fileName = `${programmeScriptTitle}_${timeNow}.mp4`;
    const waveForm = true;
    ApiWrapper.exportAudio(sequence, fileName, waveForm).then((res)=>{
      console.log('exported', res)
    })
  }


  render() {
    return (
      <>
        <Card>
          <Card.Header style={{ padding: '1em',paddingTop: '0em'}}>
            { !this.state.resetPreview ?
              <PreviewCanvas playlist={ this.state.playlist }
               width={ 300 }
               />
              : null }
          </Card.Header>
          <Card.Header>

            <Row noGutters>
              <Col xs={5} sm={ 3 } md={ 3 }lg={ 3 } xl={ 3 }>
                <Button
                  // block
                  variant="btn-secondary"
                  size="sm"
                  onClick={ this.handleAddTranscriptSelectionToProgrammeScript }
                  title="Add a text selection, select text in the transcript, then click this button to add it to the programme script"
                >
                  <FontAwesomeIcon icon={ faPlus } /> Selection
                </Button><br/>
                <input
                  name="advancedSelect"
                  type="checkbox"
                  title="advanced selection - check this box to auto copy across transcript selections to insert point in programme script"
                  checked={this.state.isAdvancedSelect}
                  onChange={this.handleAdvancedSelectCheckbox} 
                /> <small 
                    className={'text-secondary'} 
                    style={{marginBottom: '0em'}}
                    title="advanced selection - check this box to auto copy across transcript selections to insert point in programme script"
                    >{'Auto copy selections'}</small>
              </Col>
              <Col  xs={4}  sm={ 2 } md={ 2 }lg={ 2 } xl={ 2 }>
                <Dropdown>
                  <Dropdown.Toggle variant="btn-secondary">
                    <FontAwesomeIcon icon={ faListUl } />
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
              <Col  xs={3} sm={ 1 } md={ 1 }lg={ 1 } xl={ 1 }>
                <Button variant="btn-secondary"
                  onClick={ this.handleUpdatePreview }
                  // size="sm"
                  title="update programme script audio/video preview"
                  // block
                >
                  <FontAwesomeIcon icon={ faSync } />
                </Button>
              </Col>
              <Col  xs={5} sm={ 2 } md={ 2 }lg={ 2 } xl={ 2 }>
                <Dropdown>
                  <Dropdown.Toggle title={'Export programme script, click to see options'} variant="btn-secondary">
                    <FontAwesomeIcon icon={ faShare } /> Export
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  {(whichJsEnv() === 'cep')? (<>
                    <Dropdown.Item
                      onClick={ this.handleCepExportSequence }
                      title="export the programme script as a sequence in Adobe Premiere"
                    >
                    Premiere - Sequence <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                  </>): (<>
                    <Dropdown.Item
                      onClick={ this.handleExportEDL }
                      title="export EDL, edit decision list, to import the programme script as a sequence in video editing software - Avid, Premiere, Davinci Resolve, for FCPX choose FCPX XML"
                    >
                    <FontAwesomeIcon icon={ faVideo } /> EDL - Video <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={ this.handleExportFCPX }
                      title="export FCPX XML, to import the programme script as a sequence in Final Cut Pro X, video editing software"
                    >
                  <FontAwesomeIcon icon={ faVideo } /> FCPX <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={ this.handleExportADL }
                      title="export ADL, audio decision list, to import the programme script as a sequence in audio editing software such as SADiE"
                    >
                      {/* <FontAwesomeIcon icon={ faFileExport } />  */}
                      <FontAwesomeIcon icon={ faHeadphones } /> ADL - Audio  <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={ this.handleExportXML }
                      title="export XML, to import the programme script as a sequence into Adobe Premiere, Adobe Audition and Final Cut Pro 7"
                    >
                    <FontAwesomeIcon icon={ faHeadphones } /> XML - Audition <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={ this.handleExportTxt }
                      title="export Text, export the programme script as a text version"
                    >
                    <FontAwesomeIcon icon={ faFileAlt } /> Text File <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={ this.handleExportDocx }
                      title="export docx, export the programme script as a word document"
                    ><FontAwesomeIcon icon={ faFileWord } /> Word Document <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={ this.handleExportDocxWithClipReference }
                      title="export docx, export the programme script as a word document, with clip name and timecode references, for text selections"
                    >
                   <FontAwesomeIcon icon={ faFileWord } /> Word Doc (with ref) <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {whichJsEnv()==='electron'?
                      <>
                        <Dropdown.Item
                          onClick={ this.handleExportAudioPreview }
                          title="Export wav audio preview - Experimental feature, at the moment you cannot combine audio and video in the same export."
                          >
                          <FontAwesomeIcon icon={ faFileAudio } /> Audio (wav) <FontAwesomeIcon icon={ faFlask } /><FontAwesomeIcon icon={ faInfoCircle } />
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={ this.handleExportAudioPreviewWithVideoWaveform }
                          title="Export audio preview as video with animated wave form - Experimental feature, at the moment you cannot combine audio and video in the same export."
                          >
                          <FontAwesomeIcon icon={ faFileAudio } /> Audio (mp4) video <FontAwesomeIcon icon={ faFlask } /><FontAwesomeIcon icon={ faInfoCircle } />
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={ this.handleExportVideoPreview }
                          title="Export mp4 video preview - Experimental feature, at the moment you cannot combine audio and video in the same export."
                        >
                          <FontAwesomeIcon icon={ faFileVideo } /> Video (mp4) <FontAwesomeIcon icon={ faFlask } /> <FontAwesomeIcon icon={ faInfoCircle } />
                        </Dropdown.Item>
                        <Dropdown.Divider /> 
                      </>: null   }
                    <Dropdown.Item
                      onClick={ this.handleExportJson }
                      title="export Json, export the programme script as a json file"
                    >
                    <FontAwesomeIcon icon={ faFileCode } /> Json <FontAwesomeIcon icon={ faInfoCircle } />
                    </Dropdown.Item>
                  </>)}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className={'d-none d-sm-block'} sm={ 0 } md={ 1 }lg={1 } xl={ 1 }>
              </Col>
              <Col  xs={4} sm={ 2} md={ 2 }lg={ 2 } xl={ 2 }>
                <div>
                  <small className={'text-secondary'} style={{marginBottom: '0em'}}
                  title={`Last Saved at ${this.state.lastSaved.toLocaleString()}`}
                  >{ `Saved at`}<br/>{ `${this.state.lastSaved.toLocaleTimeString()}`}</small>
                </div>
              </Col>
              <Col  xs={3} sm={ 1} md={ 1 }lg={ 1 } xl={ 1}>
              <Button variant="btn-secondary"
                  onClick={ this.handleDeleteProgrammeScriptContent }
                  // size="sm"
                  title="Delete programme script content"
                  // block
                >
                       <FontAwesomeIcon icon={ faTrash } />
                </Button>
       
              </Col>
            </Row>

          </Card.Header>
          <Card.Body>
            <article
              style={ { height: '55vh', overflow: 'scroll' } }
              onDoubleClick={ this.handleDoubleClickOnProgrammeScript }
            >
              { this.state.programmeScript ? <ProgrammeScript
                programmeScriptElements={ this.state.programmeScript.elements }
                handleProgrammeScriptOrderChange={ this.handleProgrammeScriptOrderChange }
                handleDeleteProgrammeScriptElement={ this.handleDeleteProgrammeScriptElement }
                handleEditProgrammeScriptElement={ this.handleEditProgrammeScriptElement }
                handleAddTranscriptElementToProgrammeScript={this.handleAddTranscriptElementToProgrammeScript}
                handleAddTranscriptSelectionToProgrammeScriptTmpSave={this.handleAddTranscriptSelectionToProgrammeScriptTmpSave}
                handleChangeInsertPointPosition={this.handleChangeInsertPointPosition}
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
