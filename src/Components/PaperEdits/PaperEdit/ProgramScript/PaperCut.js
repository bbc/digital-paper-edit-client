import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTag } from '@fortawesome/free-solid-svg-icons';

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
      words = this.props.words.map((w) => {return (
        // eslint-disable-next-line react/jsx-key
        <span
          className="words"
          title={ `stat: ${ w.start }- end: ${ w.end }` }
          data-start={ w.start }
          data-end={ w.end }
        >{w.text} </span>);});
    }

    return (
      <>
        <Row>
          <Col sm={ 3 } className={ 'text-truncate text-muted' } title={ this.props.speaker.toUpperCase() } style={ { userSelect: 'none' } }>
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

export default PaperCut;
