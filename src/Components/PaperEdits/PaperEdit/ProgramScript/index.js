import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import cuid from 'cuid';
import PreviewCanvas from './PreviewCanvas/index.js';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ExportMenu from './ExportMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShare,
  faMicrophoneAlt,
  faStickyNote,
  faHeading,
  faPlus,
  faSync,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import ProgrammeScript from './ProgrammeScript.js';
import getDataFromUserWordsSelection from './get-data-from-user-selection.js';
import { divideWordsSelectionsIntoParagraphs, isOneParagraph } from './divide-words-selections-into-paragraphs/index.js';
import ApiWrapper from '../../../../ApiWrapper/index.js';

const ProgramScript = (props) => {
  const [ programmeScript, setProgrammeScript ] = useState();
  const [ playlist, setPlaylist ] = useState([]);
  const [ resetPreview, setResetPreview ] = useState(false);

  useEffect(() => {
    ApiWrapper.getPaperEdit(props.projectId, props.papereditId)
      .then((json) => {
        const ps = json.programmeScript;
        // Adding an insert point at the end of the list
        ps.elements.push({ type: 'insert-point', text: 'Insert Point to add selection' });
        setProgrammeScript(ps);
        // TODO: figure out how to update preview
        // , () => {
        //   this.handleUpdatePreview();
        // }
      });
  }, [ props.papereditId, props.projectId ]);

  // TODO: save to server
  const handleReorder = (list) => {

    programmeScript.elements = list;
    setProgrammeScript(programmeScript);

  };

  // TODO: save to server
  const handleDeleteElement = (index) => {
    const list = programmeScript.elements;
    list.splice(index, 1);
    programmeScript.elements = list;
    setProgrammeScript(programmeScript);

    // TODO: add a prompt, like are you sure you want to delete, confirm etc..?
    // alert('handle delete');

  };

  const handleEditElement = (index) => {
    const elements = programmeScript.elements;
    const currentElement = elements[index];
    const newText = prompt('Edit', currentElement.text);
    if (newText) {
      currentElement.text = newText;
      elements[index] = currentElement;
      programmeScript.elements = elements;
      // TODO: save to server
      setProgrammeScript(programmeScript);
      // TODO: consider using set state function to avoid race condition? if needed?
      // this.setState(({ programmeScript }) => {
      //   return {
      //     programmeScript: programmeScript
      //   };
      // });
    }
  };

  const getInsertPointIndex = () => {
    const elements = programmeScript.elements;
    const insertPointElement = elements.find((el) => el.type === 'insert-point');

    return elements.indexOf(insertPointElement);;
  };

  const handleAddTranscriptElement = (elementType) => {
    const elements = programmeScript.elements;
    // TODO: refactor - with helper functions
    if (elementType === 'title'
      || elementType === 'note'
      || elementType === 'voice-over') {
      const text = prompt('Add some text for a section title', 'Some place holder text');
      const insertIndex = getInsertPointIndex();

      const newElement = {
        id: cuid(),
        index: elements.length,
        type: elementType,
        text: text
      };

      elements.splice(insertIndex, 0, newElement);
      programmeScript.elements = elements;
      setProgrammeScript(programmeScript);
    };
  };

  // TODO: save to server
  // TODO: needs to handle when selection spans across multiple paragraphs
  const handleAddTranscriptSelection = () => {
    const result = getDataFromUserWordsSelection();
    if (result) {
      console.log(JSON.stringify(result, null, 2));

      // result.words
      // TODO: if there's just one speaker in selection do following
      // if it's multiple split list of words into multiple groups
      // and add a papercut for each to the programme script
      const elements = programmeScript.elements;
      // TODO: insert at insert point

      const indexOfInsertPoint = getInsertPointIndex();
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
      setProgrammeScript(programmeScript);
    }
    else {
      alert('Select some text in the transcript to add to the programme script');
    }
  };

  const getTranscript = (transcriptId) => {
    return props.transcripts.find((tr) => tr.id === transcriptId );
  };

  const getPlayList = () => {
    let startTime = 0;

    return programmeScript.elements.filter((element) => element.type === 'paper-cut')
      .map((element) => {
        // TODO: handle audio only type (eg for radio), get from transcript json?
        const result = {
          type:'video',
          start: startTime,
          sourceStart: element.start,
          duration: element.end - element.start,
          src: getTranscript(element.transcriptId).url
        };

        startTime += result.duration;

        return result;
      });
  };

  const handleUpdatePreview = () => {
    const playlist = getPlayList();
    // Workaround to mound and unmount the `PreviewCanvas` component
    // to update the playlist
    setResetPreview(true).then(() => {
      setResetPreview(false);
      setPlaylist(playlist);
    });
    setPlaylist(playlist);
  };

  const handleDoubleClick = (e) => {

    if (e.target.className === 'words') {
      const wordCurrentTime = e.target.dataset.start;
      // TODO: set current time in preview canvas
      // Video context probably needs more info like, which clip/track in the sequence?
      // investigate how to set currentTime in video context
      console.log('wordCurrentTime::', wordCurrentTime);
    }
  };

  const handleSave = () => {
    if (programmeScript) {
      const elements = programmeScript.elements;
      const insertIndex = getInsertPointIndex();
      elements.splice(insertIndex, 1);

      programmeScript.elements = elements;
      ApiWrapper.updatePaperEdit(props.projectId, props.papereditId, programmeScript)
        .then((json) => {
          if (json.status === 'ok') {
            alert('saved programme script');
          }
          // TODO: figure out how to update preview
          // , () => {
          //   this.handleUpdatePreview();
          // }
          // );
        });
    }
  };

  // information around progressbar in the playlist object
  return (
    <>
      <h2
        className={ [ 'text-truncate', 'text-muted' ].join(' ') }
        title={ `Programme Script Title: ${ programmeScript ? programmeScript.title : '' }` }>
        {programmeScript ? programmeScript.title : ''}
      </h2>
      <Card>
        <Card.Header>
          { !resetPreview ?
            <PreviewCanvas playlist={ playlist } programmeScript={ programmeScript } />
            : null }
        </Card.Header>

        <Card.Header>
          <Row noGutters>
            <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
              <Button
                // block
                variant="outline-secondary"
                onClick={ handleAddTranscriptSelection }
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
                    onClick={ () => {handleAddTranscriptElement('title');} }
                    title="Add a title header element to the programme script"
                  >
                    <FontAwesomeIcon icon={ faHeading } /> Heading
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {handleAddTranscriptElement('voice-over');} }
                    title="Add a title voice over element to the programme script"
                  >
                    <FontAwesomeIcon icon={ faMicrophoneAlt } /> Voice Over
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={ () => {handleAddTranscriptElement('note');} }
                    title="Add a note element to the programme script"
                  >
                    <FontAwesomeIcon icon={ faStickyNote } /> Note
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={ 12 } md={ 3 } ld={ 3 } xl={ 3 }>
              <Button variant="outline-secondary"
                onClick={ handleUpdatePreview }
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
                <ExportMenu programmeScript={ programmeScript } transcripts={ props.transcripts } ></ExportMenu>

              </Dropdown>
            </Col>
            <Col sm={ 12 } md={ 1 } ld={ 1 } xl={ 1 }>
              <Button variant="outline-secondary"
                onClick={ handleSave }
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
            onDoubleClick={ handleDoubleClick }
          >
            { programmeScript ? <ProgrammeScript
              programmeScriptElements={ programmeScript.elements }
              handleProgrammeScriptOrderChange={ handleReorder }
              handleDeleteProgrammeScriptElement={ handleDeleteElement }
              handleEditProgrammeScriptElement={ handleEditElement }

            />
              : null }
          </article>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProgramScript;
