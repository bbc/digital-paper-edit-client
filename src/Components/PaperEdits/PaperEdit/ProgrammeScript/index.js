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
  const [ playlist, setPlaylist ] = useState([]);
  const [ resetPreview, setResetPreview ] = useState(false);

  const setProgrammeWithElements = (newElements) => {
    setProgramme(pr => {
      pr.elements = newElements;

      return pr;
    });
  };

  useEffect(() => {
    const fetchPaperEdit = async () => {
      const pe = await ApiWrapper.getPaperEdit(props.projectId, props.papereditId);
      setProgramme(pe.programmeScript);
      const newElements = pe.programmeScript.elements;
      newElements.push({ type: 'insert', text: 'Insert Point to add selection' });
      setProgrammeWithElements(newElements);
      // TODO: figure out how to update preview
    };
    fetchPaperEdit();

  }, [ props.papereditId, props.projectId ]);

  // TODO: save to server
  const handleReorder = (list) => {
    console.log('handling reorder');
    setProgrammeWithElements(list);
  };

  const getInsertPointIndex = () => {
    const insertElement = programme.elements.find((el) => el.type === 'insert');

    return programme.elements.indexOf(insertElement);;
  };

  const handleAddElement = (elementType) => {
    // TODO: refactor - with helper functions
    if (elementType === 'title'
      || elementType === 'note'
      || elementType === 'voice-over') {
      const text = prompt('Add some text for a section title', 'Some place holder text');
      const insertIndex = getInsertPointIndex();

      const newElement = {
        id: cuid(),
        index: programme.elements.length,
        type: elementType,
        text: text
      };

      const newElements = programme.elements;
      newElements.splice(insertIndex, 0, newElement);
      setProgrammeWithElements(newElements);
    };
  };

  // TODO: save to server
  const handleDeleteElement = (index) => {
    const list = programme.elements;
    list.splice(index, 1);
    setProgrammeWithElements(list);

    // TODO: add a prompt, like are you sure you want to delete, confirm etc..?
    // alert('handle delete');

  };

  const handleEditElement = (index) => {
    const currentElement = programme.elements[index];
    const newText = prompt('Edit', currentElement.text);
    if (newText) {
      currentElement.text = newText;

      const newElements = programme.elements;
      newElements[index] = currentElement;
      // TODO: save to server
      setProgrammeWithElements(newElements);
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
      const insertIndex = getInsertPointIndex();
      const newElements = programme.elements;

      newElements.splice(insertIndex, 1);

      setProgrammeWithElements(newElements);
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

  // TODO: save to server
  // TODO: needs to handle when selection spans across multiple paragraphs
  const handleAddTranscriptSelection = () => {
    const result = getDataFromUserWordsSelection();
    if (result) {
      console.log(JSON.stringify(result, null, 2));
      let newElement;
      // result.words
      // TODO: if there's just one speaker in selection do following
      // if it's multiple split list of words into multiple groups
      // and add a papercut for each to the programme script
      // TODO: insert at insert point

      const indexOfInsertPoint = getInsertPointIndex();
      if (isOneParagraph(result.words)) {
        // create new element
        // TODO: Create new element could be refactored into helper function
        newElement = {
          id: cuid(),
          index: programme.elements.length,
          type: 'paper-cut',
          start:result.start,
          end: result.end,
          speaker: result.speaker,
          words: result.words,
          transcriptId: result.transcriptId,
          labelId: []
        };
      }
      else {
        const paragraphs = divideWordsSelectionsIntoParagraphs(result.words);
        paragraphs.reverse().forEach((paragraph) => {
          newElement = {
            id: cuid(),
            index: programme.elements.length,
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
      // add element just above of insert point
      const newElements = programme.elements;
      newElements.splice(indexOfInsertPoint, 0, newElement);
      // TODO: save to server
      setProgrammeWithElements(newElements);
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
            transcripts=
              { props.transcripts }
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
            { programme ?
              <ProgrammeScriptContainer
                elements={ programme.elements }
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
