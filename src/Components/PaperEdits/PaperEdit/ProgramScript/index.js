import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import PreviewCanvas from './PreviewCanvas/index.js';

import ToolBar from './ToolBar';
import ProgrammeScript from './ProgrammeScript.js';
// demo content
const playlist = [
  { type:'video', offset:0, start:0, duration:10, src:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { type:'video', offset:0, start:5, duration:10, src:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { type:'video', offset:10, start:10, duration:10, src:'https://download.ted.com/talks/KateDarling_2018S-950k.mp4' },
];

class ProgramScript extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Tab.Content>
        <h2>Programme:  <small className="text-muted">
          {this.props.programmeScript ? this.props.programmeScript.title : ''}
        </small></h2>
        <hr/>
        <PreviewCanvas playlist={ playlist } width={ '300' }/>
        <br/>
        <ToolBar />
        <hr/>
        <article style={ { height: '60vh', overflow: 'scroll' } }>
          <ProgrammeScript programmeScript={ this.props.programmeScript } />
        </article>
      </Tab.Content>
    );
  }
}

export default ProgramScript;
