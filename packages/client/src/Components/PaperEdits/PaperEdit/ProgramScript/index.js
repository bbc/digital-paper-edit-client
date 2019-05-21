import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import PreviewCanvas from './PreviewCanvas/index.js';
// demo content
const playlist = [
  { type:'video', offset:0, start:0, duration:10, src:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { type:'video', offset:0, start:5, duration:10, src:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { type:'video', offset:10, start:10, duration:10, src:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
];

class ProgramScript extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Tab.Content>
        <h2>Program Script</h2>
        <hr/>
        <h3>Paper Edit title</h3>

        <PreviewCanvas playlist={ playlist } width={ '300' }/>

        <article style={ { height: '60vh', overflow: 'scroll' } }>
          <h4>Topic One</h4>
          {/* https://getbootstrap.com/docs/4.0/utilities/colors/ */}
          <p className={ 'text-secondary' }><i><FontAwesomeIcon icon={ faMicrophoneAlt } />  But what thinks Lazarus? Can he warm his blue hands by holding them up to the grand northern lights? Would not Lazarus rather be in Sumatra than here?
          </i></p>
          <p className={ 'text-secondary' }><i>
          Would he not far rather lay him down lengthwise along the line of the equator; yea, ye gods! go down to the fiery pit itself, in order to keep out this frost?
          </i></p>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 1</strong>
              {/* <br/> */}
              {/* <u style={ { cursor: 'pointer' } }>00:01:40</u> */}
              {/* <br/> */}
              {/* <FontAwesomeIcon icon={ faTag } />TagExample2 */}
            </Col>
            <Col sm={ 9 }>
              <p>Gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p>
              <p>One of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>
          <dl className="row">
            <dt className="col-sm-3">Speaker 1</dt>
            <dd className="col-sm-9">Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots, reminding one of the bulwarks of some condemned old craft.</dd>

            <dt className="col-sm-3">Speaker 2</dt>
            <dd className="col-sm-9">
              <p>On one side hung a very large oil painting so thoroughly besmoked, and every way defaced, that in the unequal crosslights by which you viewed it, it was only by diligent study and a series of systematic visits to it,</p>
              <p>and careful inquiry of the neighbors, that you could any way arrive at an understanding of its purpose.</p>
            </dd>

            <dt className="col-sm-3">Speaker 1</dt>
            <dd className="col-sm-9">Such unaccountable masses of shades and shadows, that at first you almost thought some ambitious young artist, in the time of the New England hags, had endeavored to delineate chaos bewitched.</dd>

            <dt className="col-sm-3 text-truncate">Speaker 3</dt>
            <dd className="col-sm-9">But by dint of much and earnest contemplation, and oft repeated ponderings, and especially by throwing open the little window towards the back of the entry, you at last come to the conclusion that such an idea, however wild, might not be altogether unwarranted.</dd>
          </dl>
          <h4>Topic 2</h4>
          <p><i className={ 'text-secondary' }><FontAwesomeIcon icon={ faMicrophoneAlt } />  But what thinks Lazarus? Can he warm his blue hands by holding them up to the grand northern lights? Would not Lazarus rather be in Sumatra than here?
          </i></p>
          <p><i className={ 'text-secondary' }>
          Would he not far rather lay him down lengthwise along the line of the equator; yea, ye gods! go down to the fiery pit itself, in order to keep out this frost?
          </i></p>
          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 2</strong>
              <br/>
              <u style={ { cursor: 'pointer' } }>00:01:20</u>
              <br/>
              <FontAwesomeIcon icon={ faTag } />TagExample
            </Col>
            <Col sm={ 9 }>
              <p>Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>reminding one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>

          <Row>
            <Col sm={ 3 }>
              <strong>Speaker 1</strong>
              <br/>
              <u style={ { cursor: 'pointer' } }>00:01:40</u>
              <br/>
              <FontAwesomeIcon icon={ faTag } />TagExample
            </Col>
            <Col sm={ 9 }>
              <p>Would that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots.</p> <p>lengthwise one of the bulwarks of some condemned old craft.</p>
            </Col>
          </Row>

          <p><i className={ 'text-secondary' }><FontAwesomeIcon icon={ faMicrophoneAlt } />   Would he not far rather lay him down lengthwise along the line of the equator; yea, ye gods! go down to the fiery pit itself, in order to keep out this frost?
          </i></p>

          <dl className="row">
            <dt className="col-sm-3">Speaker 1</dt>
            <dd className="col-sm-9">Entering that gable-ended Spouter-Inn, you found yourself in a wide, low, straggling entry with old-fashioned wainscots, reminding one of the bulwarks of some condemned old craft.</dd>

            <dt className="col-sm-3">Speaker 2</dt>
            <dd className="col-sm-9">
              <p>On one side hung a very large oil painting so thoroughly besmoked, and every way defaced, that in the unequal crosslights by which you viewed it, it was only by diligent study and a series of systematic visits to it,</p>
              <p>and careful inquiry of the neighbors, that you could any way arrive at an understanding of its purpose.</p>
            </dd>

            <dt className="col-sm-3">Speaker 1</dt>
            <dd className="col-sm-9">Such unaccountable masses of shades and shadows, that at first you almost thought some ambitious young artist, in the time of the New England hags, had endeavored to delineate chaos bewitched.</dd>

            <dt className="col-sm-3 text-truncate">Speaker 3</dt>
            <dd className="col-sm-9">But by dint of much and earnest contemplation, and oft repeated ponderings, and especially by throwing open the little window towards the back of the entry, you at last come to the conclusion that such an idea, however wild, might not be altogether unwarranted.</dd>
          </dl>
        </article>
      </Tab.Content>
    );
  }
}

export default ProgramScript;
