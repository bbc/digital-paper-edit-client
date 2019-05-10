import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { shortTimecode } from '@bbc/react-transcript-editor/timecodeConverter';
import styles from './index.module.css';
class Paragraph extends Component {

  render() {
    return (
      <Row
        style={ this.props.showParagraphsMatchingSearch ? this.props.paragraphDisplayPreference : {} }
        className="paragraph"
        data-paragraph-text={ this.props.paragraphText }
      >
        <Col xs={ 8 } sm={ 8 } md={ 3 } lg={ 3 } xl={ 2 }>
          <span className={ [ styles.speaker, styles.unselectable ].join(' ') }
            tabIndex="0"
          >{this.props.speakerName}</span>
        </Col>
        <Col xs={ 4 } sm={ 4 } md={ 2 } lg={ 2 } xl={ 1 }
          style={ { padding: '0em', textAlign: 'center' } }
          className={ styles.unselectable }
        >
          <span
            style={ { cursor: 'pointer', width: '100%' } }
            data-start={ this.props.paragraph[0].start } className={ 'timecode' }
            tabIndex="0"
            onKeyDown={ this.props.handleKeyDownTimecodes }>
            { shortTimecode(this.props.paragraph[0].start) }
          </span>
        </Col>
        <Col xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 } xl={ 9 }>
          {this.props.paragraphElement}
        </Col>
      </Row>
    );
  }
}
export default Paragraph;