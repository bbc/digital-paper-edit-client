import React from 'react';

import { storiesOf } from '@storybook/react';
import PreviewCanvas from '../index.js';

const playlist = [
  { type:'video', start:0, sourceStart: 30, duration:10, src:'https://download.ted.com/talks/MorganVague_2018X.mp4' },
  { type:'video', start:10, sourceStart: 40, duration:10, src:'https://download.ted.com/talks/IvanPoupyrev_2019.mp4' },
  { type:'video', start:20, sourceStart: 50, duration:10, src:'https://download.ted.com/talks/KateDarling_2018S-950k.mp4' },

];

storiesOf('PreviewCanvas', module)
  .add('VideoContext', () =>
    <PreviewCanvas
      playlist={ playlist }
    />
  );
