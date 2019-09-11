import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProgrammeScriptContainer from '../index.js';

export const handleReorderActions = action('Handle reorder');
export const handleDeleteActions = action('Handle delete');
export const handleEditActions = action('Handle edit');

const items = [
  {
    type: 'title',
    text: 'An immense Achievement'
  },
  {
    type: 'paper-cut',
    id: 1,
    speaker: 'Mr Loud',
    words: [ { text:'Greatest day of my life was when I wrote this text.', start: 0, end: 1 } ]
  },
  {
    type: 'note',
    text: 'Maybe a little bit obnoxious'
  },
  {
    type: 'insert',
    text: 'Insert New Selection here'
  },
  {
    type: 'paper-cut',
    id: 2,
    speaker: 'Mrs Loud',
    words: [ { text:'Greatest day of my life was when I spoke this text.', start: 0, end: 1 } ]
  },
  {
    type: 'voice-over',
    text: 'link: wonderful times of the Loud family'
  },
];

// export const elements = ProgrammeElements(items, handleEditActions, handleDeleteActions);

storiesOf('ProgrammeScript', module)
  .add('Default', () =>
    <ProgrammeScriptContainer
      items={ items }
      handleDelete={ handleDeleteActions }
      handleEdit={ handleEditActions }
      handleReorder={ handleReorderActions }
    />
  );