import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import SearchBar from '../../../Transcripts/TranscriptAnnotate/SearchBar/index.js';
import Paragraphs from '../../../Transcripts/TranscriptAnnotate/Paragraphs/index.js';
import onlyCallOnce from '../../../../Util/only-call-once/index.js';

// import Paragraph from './Paragraph.js';

/**
 * Makes list of unique speakers
 * from transcript.paragraphs list
 * to be used in react-select component
 *
 * TODO: decide if to move server side, and return unique list of speaker to client
 * Or if to move to separate file as util, perhaps generalise as reusable funciton?
 *
 * https://codeburst.io/javascript-array-distinct-5edc93501dc4
 */
function makeListOfUniqueSpeakers(array) {
  const result = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item.speaker)) {
      map.set(item.speaker, true); // set any value to Map
      result.push({
        value: item.speaker,
        label: item.speaker
      });
    }
  }

  return result;
}

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      // isVideoTranscriptPreviewShow: false,
      searchString: '',
      showParagraphsMatchingSearch: false,
      selectedOptionLabelSearch: false,
      selectedOptionSpeakerSearch: [],
      sentenceToSearchCSS: '',
      sentenceToSearchCSSInHighlights: ''
    };
  }

  // handleVideoTranscriptPreviewDisplay = () => {
  //   this.setState((state) => {
  //     return {
  //       isVideoTranscriptPreviewShow: state.isVideoTranscriptPreviewShow === 'none' ? true : 'none'
  //     };
  //   });
  // }

  // functions repeadrted from TranscriptAnnotate/index.js
  handleTimecodeClick= e => {
    if (e.target.classList.contains('timecode')) {
      const wordEl = e.target;
      this.videoRef.current.currentTime = wordEl.dataset.start;
      this.videoRef.current.play();
    }
  };

  handleWordClick = e => {
    if (e.target.className === 'words' ) {
      const wordEl = e.target;
      this.videoRef.current.currentTime = wordEl.dataset.start;
      this.videoRef.current.play();
    }
  };

  handleDeleteAnnotation = (annotationId) => {
    // const { annotations } = this.state;
    // const newAnnotationsSet = annotations.filter((annotation) => {
    //   return annotation.id !== annotationId;
    // });

    // ApiWrapper.deleteAnnotation(this.state.projectId, this.state.transcriptId, annotationId)
    //   .then(json => {
    //     this.setState( { annotations: newAnnotationsSet });
    //   });
  }

  handleEditAnnotation = (annotationId) => {
    // const { annotations } = this.state;
    // const newAnnotationToEdit = annotations.find((annotation) => {
    //   return annotation.id === annotationId;
    // });
    // const newNote = prompt('Edit the text note of the annotation', newAnnotationToEdit.note);
    // if (newNote) {
    //   newAnnotationToEdit.note = newNote;
    //   ApiWrapper.updateAnnotation(this.state.projectId, this.state.transcriptId, annotationId, newAnnotationToEdit)
    //     .then(json => {
    //       const newAnnotation = json.annotation;
    //       // updating annotations client side by removing updating one
    //       // and re-adding to array
    //       // could be refactored using `findindex`
    //       const newAnnotationsSet = annotations.filter((annotation) => {
    //         return annotation.id !== annotationId;
    //       });
    //       newAnnotationsSet.push(newAnnotation);
    //       this.setState( { annotations: newAnnotationsSet });
    //     });
    // }
    // else {
    //   alert('all good nothing changed');
    // }
  }

  handleShowParagraphsMatchingSearch = () => {
    this.setState((state) => {
      return { showParagraphsMatchingSearch: !state.showParagraphsMatchingSearch };
    });
  }

  handleLabelsSearchChange = (selectedOptionLabelSearch) => {
    this.setState({
      selectedOptionLabelSearch
    });
  }

  handleSpeakersSearchChange = (selectedOptionSpeakerSearch) => {
    this.setState({
      selectedOptionSpeakerSearch
    });
  }

  handleSearch = (e, searchPreferences) => {
    // TODO: debounce to optimise
    if (e.target.value !== '') {
      const searchString = e.target.value;
      this.setState({ searchString: searchString.toLowerCase() });
      //  "debounce" to optimise
      onlyCallOnce(this.highlightWords (searchString), 500);
    }
    // if empty string reset
    else if (e.target.value === '') {
      this.setState({
        sentenceToSearchCSS: '',
        searchString: ''
      });
    }
  };

  highlightWords = searchString => {
    const listOfSearchWords = searchString.toLowerCase().trim().split(' ');
    const pCSS = `.paragraph[data-paragraph-text*="${ listOfSearchWords.join(' ') }"]`;

    const wordsToSearchCSS = listOfSearchWords.map((searchWord, index) => {
      let res = `${ pCSS } > div > span.words[data-text="${ searchWord
        .toLowerCase()
        .trim() }"]`;
      if (index < listOfSearchWords.length - 1) {
        res += ', ';
      }

      return res;
    });
    // Need to add an extra span to search annotation hilights
    // TODO: refactor to make more DRY
    const wordsToSearchCSSInHighlights = listOfSearchWords.map((searchWord, index) => {
      let res = `${ pCSS } > div  > span >span.words[data-text="${ searchWord
        .toLowerCase()
        .trim() }"]`;
      if (index < listOfSearchWords.length - 1) {
        res += ', ';
      }

      return res;
    });
    this.setState({
      sentenceToSearchCSS: wordsToSearchCSS.join(' '),
      sentenceToSearchCSSInHighlights: wordsToSearchCSSInHighlights.join(' ')
    });
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    console.log('labelsOptions- TRANSCRIPTS', this.props.labelsOptions);

    return (
      <>
        <style scoped>
          {/* This is to style of the Paragraph component programmatically */}
          {`${ this.state.sentenceToSearchCSS } { background-color: ${ 'yellow' }; text-shadow: 0 0 0.01px black }`}
          {`${ this.state.sentenceToSearchCSSInHighlights } { background-color: ${ 'yellow' }; text-shadow: 0 0 0.01px black }`}
        </style>
        <h2
          className={ [ 'text-truncate', 'text-muted' ].join(' ') }
          title={ `Transcript Title: ${ this.props.title }` }
        >
          {/* <FontAwesomeIcon icon={ this.state.isVideoTranscriptPreviewShow === 'none' ? faEye : faEyeSlash } onClick={ this.handleVideoTranscriptPreviewDisplay }/> */}
          {this.props.title}
        </h2>

        {/* // Preview video - HTML5 Video element or  @bbc/react-transcript-editor/VideoPlayer
        // Media control - HTML5 default or @bbc/react-transcript-editor/MediaPlayer
        // Search Bar - from TranscriptAnnotate component
        // Text -  from TranscriptAnnotate component */}
        <video
          src={ this.props.url }
          ref={ this.videoRef }
          style={ {
            // display: this.state.isVideoTranscriptPreviewShow,
            width: '100%',
            height:'10em',
            backgroundColor: 'black'
          } }
          controls/>
        <article style={ { height: '60vh', overflow: 'scroll' } }>

          <Card>
            <SearchBar
              labelsOptions={ this.props.labelsOptions }
              speakersOptions={ this.props.transcript ? makeListOfUniqueSpeakers(this.props.transcript.paragraphs) : null }
              handleSearch={ this.handleSearch }
              handleLabelsSearchChange={ this.handleLabelsSearchChange }
              handleSpeakersSearchChange={ this.handleSpeakersSearchChange }
              handleShowParagraphsMatchingSearch={ this.handleShowParagraphsMatchingSearch }
            />
            <Card.Body
              onDoubleClick={ this.handleWordClick }
              onClick={ this.handleTimecodeClick }
              style={ { height: '80vh', overflow: 'scroll' } }
            >
              {/* TODO: instead of null, if transcript is not provided, eg offline or server error, then add custom alert */}
              {this.props.transcript
                && <Paragraphs
                  labelsOptions={ this.props.labelsOptions && this.props.labelsOptions }
                  annotations={ this.props.annotations ? this.props.annotations : [] }
                  transcriptJson={ this.props.transcript }
                  searchString={ this.state.searchString ? this.state.searchString : '' }
                  showParagraphsMatchingSearch={ this.state.showParagraphsMatchingSearch }
                  selectedOptionLabelSearch={ this.state.selectedOptionLabelSearch ? this.state.selectedOptionLabelSearch : [] }
                  selectedOptionSpeakerSearch={ this.state.selectedOptionSpeakerSearch ? this.state.selectedOptionSpeakerSearch : [] }
                  transcriptId={ this.props.transcriptId }
                  handleTimecodeClick={ this.handleTimecodeClick }
                  handleWordClick={ this.handleWordClick }
                  handleDeleteAnnotation={ this.handleDeleteAnnotation }
                  handleEditAnnotation={ this.handleEditAnnotation }
                />}
            </Card.Body>
          </Card>

        </article>
      </>
    );
  }
}

export default Transcript;
