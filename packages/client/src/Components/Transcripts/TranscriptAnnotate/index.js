import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHighlighter,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

import MediaPlayer from '@bbc/react-transcript-editor/MediaPlayer';
import VideoPlayer from '@bbc/react-transcript-editor/VideoPlayer';
import { secondsToTimecode } from '@bbc/react-transcript-editor/timecodeConverter';

import onlyCallOnce from '../../../Util/only-call-once/index.js';
import CustomNavbar from '../../lib/CustomNavbar/index.js';
import CustomBreadcrumb from '../../lib/CustomBreadcrumb/index.js';
import CustomFooter from '../../lib/CustomFooter/index.js';
import LabelsList from './LabelsList/index.js';

import Paragraphs from './Paragraphs/index.js';
import SearchBar from './SearchBar/index.js';
import Api from '../../../Api/index.js';

class TranscriptAnnotate extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();

    this.state = {
      projectId: this.props.match.params.projectId,
      transcriptId:  this.props.match.params.transcriptId,
      projectTitle: '',
      transcriptJson: null,
      // TODO: rename title to Transcript Title
      title: '',
      url: null,
      mediaDuration: '00:00:00:00',
      currentTime: 0,
      timecodeOffset: 0,
      searchString: '',
      sentenceToSearchCSS: '',
      wordsToSearchCSS: '',
      showTextSearchPreferences: false, //
      showLabelsSearchPreferences: false, //
      showSpeakersSearchPreferences: false, //
      selectedOptionLabelSearch: null,
      selectedOptionSpeakerSearch: null,
      showParagraphsMatchingSearch: false, //
      // TODO: this needs to be called using API
      labelsOptions: [
        // { id:0, value: 'orange', label: 'Default', color: 'orange', description: 'A default label' },
        // { id:0, value: 'ocean', label: 'Politics 2', color: '#00B8D9', description: 'Test description' },
        // { id:1, value: 'blue', label: 'Economics', color: '#0052CC', description: '' },
        // { id:2, value: 'purple', label: 'Introduction', color: '#5243AA', description: '' },
        // { id:3, value: 'red', label: 'Brexit', color: '#FF5630', description: '' },
        // { id:4, value: 'orange', label: 'Conclusion', color: '#FF8B00', description: '' },
        // { id:5, value: 'yellow', label: 'Europe', color: '#FFC400', description: '' },
        // { id:6, value: 'green', label: 'Ritual', color: '#36B37E', description: '' },
        // { id:7, value: 'forest', label: 'Gifts', color: '#00875A', description: '' },
        // { id:8, value: 'slate', label: 'Computer vision', color: '#253858', description: '' },
        // { id:9, value: 'silver', label: 'Open Source', color: '#666666', description: '' }
      ],
      // TODO: combine with transcript + timecodes
      speakersOptions : [
        { value: 'John', label: 'John' },
        { value: 'Jack', label: 'Jack' },
        { value: 'Emily', label: 'Emily' },
        { value: 'Jennifer', label: 'Jennifer' },
        { value: 'Esther', label: 'Esther' },
        { value: 'Ben', label: 'Ben' },
        { value: 'Eleanor', label: 'Eleanor' },
        { value: 'Summer', label: 'Summer' },
        { value: 'Kohinoor', label: 'Kohinoor' },
        { value: 'Cooper', label: 'Cooper' }
      ]
    };
  }

  componentDidMount = () => {
    Api.getAnnotations(this.state.projectId, this.state.transcriptId)
      // TODO: add error handling
      .then(json => {
        console.log(json);
        this.setState({
          projectTitle: json.projectTitle,
          transcriptJson: json.transcript,
          title: json.title,
          url: json.url,
          labelsOptions: json.labels
        });
      });
  };

  handleWordClick = e => {
    if (e.target.className === 'words' ) {
      const wordEl = e.target;
      this.videoRef.current.currentTime = wordEl.dataset.start;
      this.videoRef.current.play();
    }
  };

  handleTimecodeClick= e => {
    if ( e.target.className === 'timecode') {
      const wordEl = e.target;
      this.videoRef.current.currentTime = wordEl.dataset.start;
      this.videoRef.current.play();
    }
  };

  handleSearch = (e, searchPreferences) => {
    console.log(searchPreferences);
    // TODO: debounce to optimise
    if (e.target.value !== '') {
      const searchString = e.target.value;
      this.setState({ searchString: searchString.toLowerCase() });
      //  "debounce" to optimise
      onlyCallOnce(this.hilightWords(searchString), 500);
    }
    // if empty string reset
    else if (e.target.value === '') {
      this.setState({
        sentenceToSearchCSS: '',
        searchString: ''
      });
    }
  };

  // TODO: bug, when highlights a sentence, within a paragraph, it also highlights
  // lose words belonging to that sentence, in the paragraph.
  // eg 'a day not so long ago' it will also highlight all the occurrences of 'a'
  // and other words in the sentence
  // there might be a way to narrow down with CSS selector
  hilightWords = searchString => {
    const listOfSearchWords = searchString.toLowerCase().trim().split(' ');
    const pCSS = `.paragraph[data-paragraph-text*="${ listOfSearchWords.join(' ') }"]`;

    const wordsToSearchCSS = listOfSearchWords.map((searchWord, index) => {
      let res = `${ pCSS } > div > div> span.words[data-text="${ searchWord
        .toLowerCase()
        .trim() }"]`;
      if (index < listOfSearchWords.length - 1) {
        // console.log(index, listOfSearchWords.length);
        res += ', ';
      }

      return res;
    });
    this.setState({
      sentenceToSearchCSS: wordsToSearchCSS.join(' ')
    });
  };

  onLabelsUpdated = (newLabelsOptions) => {
    this.setState({ labelsOptions: newLabelsOptions });
  }

  handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    this.setState({
      currentTime
    });
  }
  onLoadedDataGetDuration = e => {
    const currentDuration = e.target.duration;
    const currentDurationWithOffset = currentDuration + this.state.timecodeOffset;
    const durationInSeconds = secondsToTimecode(currentDurationWithOffset);

    this.setState({
      mediaDuration: durationInSeconds
    });
  };

  handleShowParagraphsMatchingSearch = () => {
    this.setState((state) => {
      return { showParagraphsMatchingSearch: !state.showParagraphsMatchingSearch };
    });
  }

  render() {
    // TODO: change API to return transcript json already in this format
    // + with list of speaker labels
    let text;
    console.log('this.state.transcriptJson', this.state.transcriptJson);
    if (this.state.transcriptJson) {
      text = <Paragraphs
        transcriptJson={ this.state.transcriptJson }
        searchString={ this.state.searchString }
        showParagraphsMatchingSearch={ this.state.showParagraphsMatchingSearch }
      />;
    }

    return (
      <Container fluid={ true } style={ { backgroundColor: '#f9f9f9' } }>
        <style scoped>
          {`.timecode:hover{
                text-decoration: underline;
            }
            .words{
              cursor: pointer
            }`}
        </style>
        <style scoped>
          {/* This effects the styling of the Paragraph component */}
          {`${ this.state.sentenceToSearchCSS } { background-color: ${ 'yellow' }; text-shadow: 0 0 0.01px black }`}
        </style>
        <style scoped>
          {`/* https://stackoverflow.com/questions/7492062/css-overflow-scroll-always-show-vertical-scroll-bar 
          Used to make scrollbar visible for Labels list */
          ::-webkit-scrollbar {
              -webkit-appearance: none;
              width: 7px;
          }
          ::-webkit-scrollbar-thumb {
              border-radius: 4px;
              background-color: rgba(0,0,0,.5);
              -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
          }
          `}
        </style>

        <CustomNavbar
          links={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              name: 'New Projects',
              link: '/projects/new'
            },
            {
              name: 'Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts`
            },
            {
              name: 'New Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts/new`
            },
            {
              name: 'Paper Edits',
              link: `/projects/${ this.state.projectId }/paperedits`
            },
            {
              name: 'New Paper Edit',
              link: `/projects/${ this.state.projectId }/paperedits/new`
            },
            {
              name: 'Users',
              link: `/projects/${ this.state.projectId }/users`
            }
          ] }
        />
        <br />
        <CustomBreadcrumb
          items={ [
            {
              name: 'Projects',
              link: '/projects'
            },
            {
              // TODO: need to get project name?
              // TODO: is this needed?
              name: `Project: ${ this.state.projectTitle }`,
              link: `/projects/${ this.state.projectId }`
            },
            {
              name: 'Transcripts',
              link: `/projects/${ this.state.projectId }/transcripts`
            },
            {
              // Note: There is no individual transcript page only transcript index, annotate, and correct
              name: `${ this.state.projectTitle }`
            },
            {
              name: 'Annotate'
            }
          ] }
        />
        <Row>
          {/* TODO: add  @bbc/react-transcript-editor/MediaPlayer and connect it to the rest of the page */}
          {/* Player controls: <code>MediaPlayer</code> */}
          <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
            <MediaPlayer
              title={ this.state.title ? this.state.title : '' }
              mediaDuration={ this.state.mediaDuration }
              hookSeek={ foo => (this.setCurrentTime = foo) }// <--
              hookPlayMedia={ foo => (this.playMedia = foo) }// <--
              hookIsPlaying={ foo => (this.isPlaying = foo) } // <--
              // rollBackValueInSeconds={ this.state.rollBackValueInSeconds }
              rollBackValueInSeconds={ 15 }
              timecodeOffset={ this.state.timecodeOffset }
              mediaUrl={ this.state.url }
              // handleAnalyticsEvents={ this.props.handleAnalyticsEvents }
              videoRef={ this.videoRef }
              // handleSaveTranscript={ this.handleSaveTranscript }
              handleSaveTranscript={ () => {alert('feature not implemented yet');} }
            />
            <br/>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 } sm={ 3 } md={ 3 } lg={ 3 } xl={ 3 } style={ { paddingRight:'0' } }>
            {this.state.transcriptJson !== null && (
              <>
                <VideoPlayer
                  tabindex="0"
                  role="button"
                  aria-pressed="false"
                  mediaUrl={ this.state.url }
                  onTimeUpdate={ this.handleTimeUpdate }
                  videoRef={ this.videoRef }
                  // previewIsDisplayed={ this.state.previewIsDisplayed }
                  previewIsDisplayed={ true }
                  onLoadedDataGetDuration={ this.onLoadedDataGetDuration }
                />
              </>
            )}

            <LabelsList
              labelsOptions={ this.state.labelsOptions }
              onLabelsUpdated={ this.onLabelsUpdated }
            />

            {/* Highlight Btn? */}
            <br/>
            <ButtonGroup style={ { width: '100%' } } size="sm">
              <Button variant="outline-primary" onClick={ this.handleShow } >
          Highlight <FontAwesomeIcon icon={ faHighlighter } />
              </Button>
              <Button variant="outline-primary" onClick={ this.handleShow } >
                <FontAwesomeIcon icon={ faQuestionCircle } />
              </Button>

            </ButtonGroup>
            <Form.Text className="text-muted">
            TODO: some instructions on how to Highlight
            </Form.Text>
            {/* end Highlight Btn? */}

          </Col>
          <Col xs={ 12 } sm={ 9 } md={ 9 } lg={ 9 } xl={ 9 }>

            <Card>
              <SearchBar
                labelsOptions={ this.state.labelsOptions }
                handleSearch={ this.handleSearch }
                speakersOptions={ this.state.speakersOptions }
                handleShowParagraphsMatchingSearch={ this.handleShowParagraphsMatchingSearch }
              />
              <Card.Body
                onDoubleClick={ this.handleWordClick }
                onClick={ this.handleTimecodeClick }
                style={ { height: '80vh', overflow: 'scroll' } }
              >
                {/* TODO: instead of null, if transcript is not provided, eg offline or server error, then add custom alert */}
                {this.state.transcriptJson !== null && text}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <CustomFooter />
      </Container>
    );
  }
}

export default TranscriptAnnotate;
