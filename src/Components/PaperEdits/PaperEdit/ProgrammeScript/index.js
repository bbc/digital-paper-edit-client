import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import cuid from 'cuid';
import getDataFromUserWordsSelection from './get-data-from-user-selection.js';
import { divideWordsSelectionsIntoParagraphs, isOneParagraph } from './divide-words-selections-into-paragraphs/index.js';

import ApiWrapper from '../../../../ApiWrapper';
import PreviewCanvas from './PreviewCanvas/';
import ProgrammeScriptContainer from './ProgrammeScriptContainer';
import Menu from './Menu/index.js';

const ProgrammeScript = (props) => {
  const [ programme, setProgramme ] = useState();
  const [ elements, setElements ] = useState();
  const [ playlist, setPlaylist ] = useState([]);
  const [ resetPreview, setResetPreview ] = useState(false);

  useEffect(() => {
    const fetchPaperEdit = async () => {
      const pe = await ApiWrapper.getPaperEdit(props.projectId, props.papereditId);
      setProgramme(pe.programmeScript);
      const newElements = pe.programmeScript.elements;
      newElements.push({ type: 'insert', text: 'Insert Point to add selection' });
      setElements(newElements);
    };
    if (!programme) {
      fetchPaperEdit();

    }

  }, [ programme, props.papereditId, props.projectId ]);

  // TODO: save to server
  const handleReorder = (list) => {
    setElements(list);
  };

  const getInsertPoint = () => {
    const insertPoint = programme.elements.find((el) => el.type === 'insert');

    return elements.indexOf(insertPoint);;
  };

  const handleAddElement = (elementType) => {
    const text = prompt('Add some text for a section title', 'Some place holder text');
    const insertPoint = getInsertPoint();

    const newElement = {
      id: cuid(),
      index: elements.length,
      type: elementType,
      text: text
    };

    const newElements = elements;
    newElements.splice(insertPoint, 0, newElement);
    setElements(newElements);
  };

  // TODO: save to server
  const handleDeleteElement = (index) => {
    const newElements = elements;
    newElements.splice(index, 1);
    setElements(newElements);

    // TODO: add a prompt, like are you sure you want to delete, confirm etc..?
    // alert('handle delete');

  };

  const handleEditElement = (index) => {
    const currentElement = programme.elements[index];
    const newText = prompt('Edit', currentElement.text);
    if (newText) {
      currentElement.text = newText;

      const newElements = elements;
      newElements[index] = currentElement;
      setElements(newElements);
      // TODO: consider using set state function to avoid race condition? if needed?
      // this.setState(({ programmeScript }) => {
      //   return {
      //     programmeScript: programmeScript
      //   };
      // });
    }
  };

  const getTranscript = (transcriptId) => {
    return props.transcripts.find((tr) => tr.id === transcriptId );
  };

  const getPlayList = () => {
    let startTime = 0;

    return programme.elements.filter((element) => element.type === 'paper-cut')
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

  const handleUpdatePreview = async () => {
    const newPlaylist = getPlayList();
    // Workaround to mound and unmount the `PreviewCanvas` component
    // to update the playlist
    setResetPreview(true);
    setPlaylist(newPlaylist);
    setResetPreview(false);
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

  const handleSave = async () => {
    if (programme) {
      const insertPoint = getInsertPoint();
      const newElements = elements;
      newElements.splice(insertPoint, 1);
      setElements(newElements);

      const json = await ApiWrapper.updatePaperEdit(props.projectId, props.papereditId, programme);
      if (json.status === 'ok') {
        alert('saved programme script');
      }
      // TODO: figure out how to update preview
      // , () => {
      //   this.handleUpdatePreview();
      // }
      // );

    }
  };

  const createElementFromSelection = (selection) => {
    let newElement;
    // result.words
    // TODO: if there's just one speaker in selection do following
    // if it's multiple split list of words into multiple groups
    // and add a papercut for each to the programme script
    // TODO: insert at insert point

    if (isOneParagraph(selection.words)) {
      // create new element
      // TODO: Create new element could be refactored into helper function
      newElement = {
        id: cuid(),
        index: elements.length,
        type: 'paper-cut',
        start:selection.start,
        end: selection.end,
        speaker: selection.speaker,
        words: selection.words,
        transcriptId: selection.transcriptId,
        labelId: []
      };
    }
    else {
      const paragraphs = divideWordsSelectionsIntoParagraphs(selection.words);
      paragraphs.reverse().forEach((paragraph) => {
        newElement = {
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
      });
    }

    return newElement;

  };

  const addElementAboveInsertPoint = (newElement) => {
    const insertPoint = getInsertPoint();
    console.log(insertPoint);
    const newElements = elements;
    newElements.splice(insertPoint, 0, newElement);
  };
  // TODO: save to server
  // TODO: needs to handle when selection spans across multiple paragraphs
  const handleAddTranscriptSelection = () => {
    const selection = getDataFromUserWordsSelection();
    console.log(selection);
    if (selection) {
      const newElement = createElementFromSelection(selection);
      // add element just above of insert point
      const newElements = addElementAboveInsertPoint(newElement);

      // TODO: save to server
      setElements(newElements);
    }
    else {
      alert('Select some text in the transcript to add to the programme script');
    }
  };

  // information around progressbar in the playlist object
  return (
    <>
      <h2
        className={ [ 'text-truncate', 'text-muted' ].join(' ') }
        title={ `Programme Script Title: ${ programme ? programme.title : '' }` }>
        {programme ? programme.title : ''}
      </h2>
      <Card>
        <Card.Header>
          { !resetPreview ?
            <PreviewCanvas playlist={ playlist } programmeScript={ programme } />
            : null }
        </Card.Header>

        <Card.Header>
          <Menu
            programme={ programme }
            transcripts={ props.transcripts }
            handleAddTranscriptSelection={ handleAddTranscriptSelection }
            handleAddElement={ handleAddElement }
            handleUpdatePreview={ handleUpdatePreview }
            handleSave={ handleSave }
          />
        </Card.Header>

        <Card.Body>
          <article
            style={ { height: '60vh', overflow: 'scroll' } }
            onDoubleClick={ handleDoubleClick }
          >
            { elements ?
              <ProgrammeScriptContainer
                items={ elements }
                handleReorder={ handleReorder }
                handleDeleteElement={ handleDeleteElement }
                handleEditElement={ handleEditElement }
              />
              : null }
          </article>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProgrammeScript;
