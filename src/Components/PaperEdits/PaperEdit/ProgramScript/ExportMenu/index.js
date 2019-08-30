import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import downloadjs from 'downloadjs';
import EDL from 'edl_composer';
import timecodes from 'node-timecodes';
import generateADL from '@bbc/aes31-adl-composer';
import jsonToFCPX from '@bbc/fcpx-xml-composer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

const ExportMenu = ({ programmeScript, transcripts }) => {

  const defaultReelName = 'NA';
  const defaultFps = 25;
  const defaultTimecodeOffset = '00:00:00:00';
  const defaultSampleRate = '16000';

  const getProgrammeScriptJson = () => {
    // alert('this function has not been implemented yet');
    const edlSq = {
      'title': programmeScript.title,
      'events': [ ]
    };

    const programmeScriptPaperCuts = programmeScript.elements.map((element) => {
      if (element.type === 'paper-cut') {
        console.log('paper-cut::', element);
        // Get clipName for current transcript
        const currentTranscript = transcripts.find((tr) => {
          return tr.id === element.transcriptId;
        });

        const result = {
          ...element,
          startTime: element.start,
          endTime: element.end,
          reelName:  currentTranscript.metadata ? currentTranscript.metadata.reelName : defaultReelName,
          clipName: `${ currentTranscript.clipName }`,
          // TODO: frameRate should be pulled from the clips in the sequence
          // Changing to 24 fps because that is the frame rate of the ted talk examples from youtube
          // but again frameRate should not be hard coded
          fps: currentTranscript.metadata ? currentTranscript.metadata.fps : defaultFps,
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
  };

  const programmeScriptJsonToText = (edlsqJson) => {
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
  };

  /**
   * Helper function to create json EDL for other EDL/ADL/FPCX export
   */

  const getSequenceJsonEDL = () => {
    const edlSq = {
      'title': programmeScript.title,
      'events': [ ]
    };

    const programmeScriptPaperCuts = programmeScript.elements.map((element) => {
      if (element.type === 'paper-cut') {
        // Get clipName for current transcript
        const currentTranscript = transcripts.find((tr) => {
          return tr.id === element.transcriptId;
        });

        const result = {
          startTime: element.start,
          endTime: element.end,
          reelName:  currentTranscript.metadata ? currentTranscript.metadata.reelName : defaultReelName,
          clipName: `${ currentTranscript.clipName }`,
          // TODO: frameRate should be pulled from the clips in the sequence
          // Changing to 24 fps because that is the frame rate of the ted talk examples from youtube
          // but again frameRate should not be hard coded
          fps: currentTranscript.metadata ? currentTranscript.metadata.fps : defaultFps,
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
  };

  // https://www.npmjs.com/package/downloadjs
  // https://www.npmjs.com/package/edl_composer

  const handleExportJson = () => {
    const programmeScriptJson = getProgrammeScriptJson();
    const programmeScriptText = JSON.stringify(programmeScriptJson, null, 2);
    downloadjs(programmeScriptText, `${ programmeScript.title }.json`, 'text/plain');
  };

  const handleExportTxt = () => {
    const programmeScriptJson = getProgrammeScriptJson();
    const programmeScriptText = programmeScriptJsonToText(programmeScriptJson);
    downloadjs(programmeScriptText, `${ programmeScript.title }.txt`, 'text/plain');
  };

  const handleExportEDL = () => {
    const edlSq = getSequenceJsonEDL();
    const edl = new EDL(edlSq);
    console.log(edl.compose());
    downloadjs(edl.compose(), `${ programmeScript.title }.edl`, 'text/plain');
  };

  const handleExportADL = () => {
    // alert('this function has not been implemented yet');
    const edlSq = getSequenceJsonEDL();
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
    downloadjs(result, `${ programmeScript.title }.adl`, 'text/plain');
  };

  const handleExportFCPX = () => {
    // alert('this function has not been implemented yet');
    const edlSq = getSequenceJsonEDL();
    console.log(edlSq);
    const result = jsonToFCPX(edlSq);
    downloadjs(result, `${ programmeScript.title }.fcpxml`, 'text/plain');
  };

  return (
    <Dropdown.Menu>
      <Dropdown.Item
        onClick={ handleExportEDL }
        title="export EDL, edit decision list, to import the programme script as a sequence in video editing software - Avid, Premiere, Davinci Resolve, for FCPX choose FCPX XML"
      >
                        EDL - Video <FontAwesomeIcon icon={ faInfoCircle } />
      </Dropdown.Item>
      <Dropdown.Item
        onClick={ handleExportADL }
        title="export ADL, audio decision list, to import the programme script as a sequence in audio editing software such as SADiE"
      >
        {/* <FontAwesomeIcon icon={ faFileExport } />  */}
                      ADL - Audio  <FontAwesomeIcon icon={ faInfoCircle } />
      </Dropdown.Item>
      <Dropdown.Item
        onClick={ handleExportFCPX }
        title="export FCPX XML, to import the programme script as a sequence in Final Cut Pro X, video editing software"
      >
                      FCPX <FontAwesomeIcon icon={ faInfoCircle } />
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={ handleExportTxt }
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
        onClick={ handleExportJson }
        title="export Json, export the programme script as a json file"
      >
                      Json <FontAwesomeIcon icon={ faInfoCircle } />
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default ExportMenu;