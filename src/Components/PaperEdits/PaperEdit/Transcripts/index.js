import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faExclamationTriangle, faSearch } from '@fortawesome/free-solid-svg-icons';

import Transcript from './Transcript.js';
import SearchBarTranscripts from './SearchBarTranscripts/index.js';
import onlyCallOnce from '../../../../Util/only-call-once/index.js';
import makeListOfUniqueSpeakers from './makeListOfUniqueSpeakers.js';
import Paragraphs from './Paragraphs/index.js';

class Transcripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      sentenceToSearchCSS: '',
      sentenceToSearchCSSInHighlights: '',
      selectedOptionLabelSearch: [],
      selectedOptionSpeakerSearch: [],
      selectedOptionTranscriptsSearch: [],
      showParagraphsMatchingSearch: false,
      showAdvancedSearchViewSearchingAcrossTranscripts: false,
    };
  }

  // New
  handleSearch = (e, searchPreferences) => {
    console.log('Transcripts:: SEARCH:::', e.target.value, searchPreferences);
    // TODO: debounce to optimise
    if (e.target.value !== '') {
      const searchString = e.target.value;
      this.setState({ searchString: searchString.toLowerCase() });
      //  "debounce" to optimise
      // TODO: re introduce this
      onlyCallOnce(this.highlightWords(searchString), 500);
    }
    // if empty string reset
    else if (e.target.value === '') {
      this.setState({
        sentenceToSearchCSS: '',
        searchString: '',
      });
    }
  };
  highlightWords = searchString => {
    const listOfSearchWords = searchString
      .toLowerCase()
      .trim()
      .split(' ');
    const pCSS = `.paragraph[data-paragraph-text*="${listOfSearchWords.join(' ')}"]`;

    const wordsToSearchCSS = listOfSearchWords.map((searchWord, index) => {
      let res = `${pCSS} > div > span.words[data-text="${searchWord.toLowerCase().trim()}"]`;
      if (index < listOfSearchWords.length - 1) {
        res += ', ';
      }

      return res;
    });
    // Need to add an extra span to search annotation hilights
    // TODO: refactor to make more DRY
    const wordsToSearchCSSInHighlights = listOfSearchWords.map((searchWord, index) => {
      let res = `${pCSS} > div  > span >span.words[data-text="${searchWord.toLowerCase().trim()}"]`;
      if (index < listOfSearchWords.length - 1) {
        res += ', ';
      }

      return res;
    });
    this.setState({
      sentenceToSearchCSS: wordsToSearchCSS.join(' '),
      sentenceToSearchCSSInHighlights: wordsToSearchCSSInHighlights.join(' '),
    });
  };

  // To search across all transcripts
  handleLabelsSearchChange = selectedOptionLabelSearch => {
    this.setState({
      selectedOptionLabelSearch,
    });
  };
  // To search across all transcripts
  handleSpeakersSearchChange = selectedOptionSpeakerSearch => {
    this.setState({
      selectedOptionSpeakerSearch,
    });
  };
  // To search across all transcripts
  handleTranscriptSearchChange = selectedOptionTranscriptsSearch => {
    this.setState({
      selectedOptionTranscriptsSearch,
    });
  };
  // To search across all transcripts
  handleShowParagraphsMatchingSearch = isShowParagraphsMatchingSearch => {
    this.setState({ showParagraphsMatchingSearch: isShowParagraphsMatchingSearch });
  };

  // TODO: Not yet implemented - low priority
  handleWordClick = e => {
    if (e.target.className === 'words') {
      const wordEl = e.target;
      console.log('wordEl', wordEl);
      // this.videoRef.current.currentTime = wordEl.dataset.start;
      // this.videoRef.current.play();
    }
  };

  handleFilterResults = () => {
    console.log('handleFilterResults');
    this.setState({
      searchString: '',
      sentenceToSearchCSS: '',
      sentenceToSearchCSSInHighlights: '',
      selectedOptionLabelSearch: [],
      selectedOptionSpeakerSearch: [],
      selectedOptionTranscriptsSearch: [],
    });
  };

  handleShowAdvancedSearchViewSearchingAcrossTranscripts = () => {
    this.setState(prevState => {
      if (!prevState.showAdvancedSearchViewSearchingAcrossTranscripts) {
        return {
          showAdvancedSearchViewSearchingAcrossTranscripts: true,
          // in this advanced search view - when searchign across paragraphs always show paragraphs matching searches
          // which means segmenting transcript to show only paragraphs that metch serching criteria
          showParagraphsMatchingSearch: true,
        };
      } else {
        return {
          showAdvancedSearchViewSearchingAcrossTranscripts: false,
          // in this advanced search view - when searchign across paragraphs always show paragraphs matching searches
          // which means segmenting transcript to show only paragraphs that metch serching criteria
          showParagraphsMatchingSearch: false,
          // reset search if closing view
          selectedOptionLabelSearch: [],
          selectedOptionSpeakerSearch: [],
          selectedOptionTranscriptsSearch: [],
        };
      }
    });
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    const transcriptsElNav = this.props.transcripts.map((transcript, index) => {
      // Note: that if there are transcripts in progress, current setup
      // won't show when they are done in this view
      // only in project's view list of transcript you get a UI update when they are done
      return (
        <Nav.Item key={transcript.id}>
          <Nav.Link disabled={transcript.status !== 'done' ? true : false} eventKey={transcript.id}>
            {transcript.status === 'in-progress' ? <FontAwesomeIcon icon={faClock} /> : ''}
            {(transcript.status !== 'done' && transcript.status !== 'in-progress') || transcript.status === 'error' ? (
              <FontAwesomeIcon icon={faExclamationTriangle} />
            ) : (
              ''
            )}
            {`  ${transcript.transcriptTitle}`}
          </Nav.Link>
        </Nav.Item>
      );
    });
    // id - value - label - color - description
    // const transcriptOptions = [{value: 'test', label: 'test'}];
    const transcriptsOptions = this.props.transcripts
      .map(transcript => {
        if (transcript.id && transcript.transcriptTitle) {
          return {
            id: transcript.id,
            value: transcript.id,
            label: transcript.transcriptTitle,
            description: transcript.description,
            status: transcript.status,
          };
        } else {
          return {
            status: transcript.status,
          };
        }
      }) // Filter to show only transcripts that are done. excluding in progress and errored
      .filter(transcript => {
        return transcript.status === 'done';
      });

    const transcriptsUniqueListOfSpeakers2D = this.props.transcripts.map(transcript => {
      if (transcript.transcript && transcript.transcript.paragraphs) {
        return makeListOfUniqueSpeakers(transcript.transcript.paragraphs);
      } else {
        return { value: 'test', label: 'test' };
      }
    });
    const transcriptsUniqueListOfSpeakers = transcriptsUniqueListOfSpeakers2D.reduce(function(prev, curr) {
      return prev.concat(curr);
    });
    // remove duplicates
    function removeDuplicates(array) {
      //  https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
      return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
    }
    const transcriptsUniqueListOfSpeakersNoDuplicates = removeDuplicates(transcriptsUniqueListOfSpeakers);

    /* TODO: Will this work? */
    const searchBarTranscriptsElement = (
      <SearchBarTranscripts
        labelsOptions={this.props.labelsOptions}
        speakersOptions={transcriptsUniqueListOfSpeakersNoDuplicates}
        handleSearch={this.handleSearch}
        searchValue={this.state.searchString}
        handleLabelsSearchChange={this.handleLabelsSearchChange}
        handleSpeakersSearchChange={this.handleSpeakersSearchChange}
        handleShowParagraphsMatchingSearch={this.handleShowParagraphsMatchingSearch}
        transcriptOptions={transcriptsOptions}
        handleTranscriptSearchChange={this.handleTranscriptSearchChange}
        handleFilterResults={this.handleFilterResults}
        handleShowAdvancedSearchViewSearchingAcrossTranscripts={this.handleShowAdvancedSearchViewSearchingAcrossTranscripts}
      />
    );

    const transcriptsElTab = this.props.transcripts.map(transcript => {
      return (
        <Tab.Pane key={transcript.id} eventKey={transcript.id}>
          <Transcript
            status={transcript.status}
            projectId={this.props.projectId}
            transcriptId={transcript.id}
            labelsOptions={this.props.labelsOptions}
            title={transcript.transcriptTitle}
            transcript={transcript.transcript}
            url={transcript.url}
          />
        </Tab.Pane>
      );
    });

    const searchedParagraphsAcrossTranscripts = this.props.transcripts.map((transcript, index) => {
      if (
        transcript.transcript &&
        this.state.selectedOptionTranscriptsSearch.find(t => {
          return transcript.id === t.id;
        })
      ) {
        return (
          <Paragraphs
            labelsOptions={this.props.labelsOptions}
            annotations={transcript.annotations ? transcript.annotations : []}
            transcriptJson={transcript.transcript}
            searchString={this.state.searchString ? this.state.searchString : ''}
            showParagraphsMatchingSearch={this.state.showParagraphsMatchingSearch}
            selectedOptionLabelSearch={this.state.selectedOptionLabelSearch ? this.state.selectedOptionLabelSearch : []}
            selectedOptionSpeakerSearch={this.state.selectedOptionSpeakerSearch ? this.state.selectedOptionSpeakerSearch : []}
            transcriptId={transcript.id}
            handleTimecodeClick={this.handleTimecodeClick}
            // TODO: these attributes below have not been implemented - low priority
            // handleWordClick={ ()=>{alert('not implemented in this view, switch to individual transcript')}}
            handleWordClick={this.handleWordClick}
            // handleDeleteAnnotation={ this.handleDeleteAnnotation }
            handleDeleteAnnotation={() => {
              alert('not implemented in this view, switch to individual transcript');
            }}
            // handleEditAnnotation={ this.handleEditAnnotation }
            handleEditAnnotation={() => {
              alert('not implemented in this view, switch to individual transcript');
            }}
          />
        );
      } else {
        return null;
      }
    });

    return (
      <>
        <style scoped>
          {/* This is to style of the Paragraph component programmatically */}
          {`${this.state.sentenceToSearchCSS} { background-color: ${'yellow'}; text-shadow: 0 0 0.01px black }`}
          {`${this.state.sentenceToSearchCSSInHighlights} { background-color: ${'yellow'}; text-shadow: 0 0 0.01px black }`}
        </style>
        <Tab.Container defaultActiveKey={this.props.transcripts[0] ? this.props.transcripts[0].id : 'first'}>
          <Row>
            <Col sm={!this.state.showAdvancedSearchViewSearchingAcrossTranscripts ? 3 : 0}>
              {!this.state.showAdvancedSearchViewSearchingAcrossTranscripts ? (
                <>
                  <Button
                    onClick={this.handleShowAdvancedSearchViewSearchingAcrossTranscripts}
                    variant={'light'}
                    block
                    title={'Search across transcripts in this project'}
                    size={'sm'}
                  >
                    <FontAwesomeIcon icon={faSearch} /> Project's Transcripts
                  </Button>
                  <hr />

                  <Nav variant="pills" className="flex-column">
                    <div style={{ height: '97vh', overflow: 'scroll' }}>{transcriptsElNav}</div>
                  </Nav>
                </>
              ) : null}
            </Col>

            <Col sm={!this.state.showAdvancedSearchViewSearchingAcrossTranscripts ? 9 : 12}>
              <Tab.Content>
                {this.state.showAdvancedSearchViewSearchingAcrossTranscripts ? (
                  <>
                    {' '}
                    {searchBarTranscriptsElement}
                    <section
                      style={{
                        height: '80vh',
                        overflow: 'auto',
                        border: 'solid',
                        borderWidth: '0.01em',
                        borderColor: 'lightgrey',
                      }}
                    >
                      {searchedParagraphsAcrossTranscripts}
                    </section>
                  </>
                ) : (
                  <>{transcriptsElTab}</>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}

export default Transcripts;
