import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import cuid from 'cuid';

class PaperCut extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let words;
    if (this.props.words) {
      // TODO could wrap words in span and add timecodes
      // to make it cliccable on programme script
      words = this.props.words.map((w) => {
        return (
          <span
            key={ cuid() }
            className="words"
            title={ `stat: ${ w.start }- end: ${ w.end }` }
            data-start={ w.start }
            data-end={ w.end }
          >
            {w.text}
          </span>
        );
      });
    }

    return (
      <>
        <Row>
          <Col sm={ 3 } className={ 'text-truncate text-muted' }
          // TODO: could add timecode from eg -  ${ shortTimecode(this.props.words[0].start) }
          // TODO: Could add transcript name along side the timecode for the paper-cut
            title={ `${ this.props.speaker.toUpperCase() }` }
            style={ { userSelect: 'none' } }>
            <strong>{this.props.speaker.toUpperCase()}</strong>
            {/* <br/> */}
            {/* <u style={ { cursor: 'pointer' } }>00:01:20</u> */}
            {/* <br/> */}
            {/* <FontAwesomeIcon icon={ faTag } />TagExample */}
          </Col>
          <Col sm={ 9 }>
            {/* <p>{ JSON.stringify(this.props.words) }</p> */}
            { words }
          </Col>
        </Row>
      </>
    );
  }
}

PaperCut.propTypes = {
  speaker: PropTypes.any,
  words: PropTypes.any
};

export default PaperCut;
