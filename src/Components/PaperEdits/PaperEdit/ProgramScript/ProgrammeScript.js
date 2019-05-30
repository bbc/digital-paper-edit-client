import React, { Component } from 'react';
import VoiceOver from './VoiceOver';
import PaperCut from './PaperCut';
import TitleHeading from './TitleHeading';
import Note from './Note';

class ProgrammeScript extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let programme;
    if (this.props.programmeScript) {
      programme = this.props.programmeScript.elements.map((el) => {
        switch (el.type) {
        case 'title':
          return <TitleHeading key={ el.id } title={ el.text } />;
        case 'voice-over':
          return <VoiceOver key={ el.id } text={ el.text } />;
        case 'paper-cut':
          return <PaperCut key={ el.id } speaker={ el.speaker } words={ el.words }/>;
        case 'note':
          return <Note key={ el.id } text={ el.text } />;
        default:
          console.error('invilid programme element type');
        }
      });
    }

    return (
      <>
        {programme}
      </>
    );
  }
}

export default ProgrammeScript;
