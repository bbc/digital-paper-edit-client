import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

import Transcript from './Transcript.js';
import SearchBarTranscripts from './SearchBarTranscripts/index.js';
import onlyCallOnce from '../../../../Util/only-call-once/index.js';
import makeListOfUniqueSpeakers from './makeListOfUniqueSpeakers.js';
import Paragraphs from './Paragraphs/index.js';
import ApiWrapper from '../../../../ApiWrapper/index.js';

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
      transcriptIdsList: []
    }
  }

  componentDidMount = () =>{
   const transcriptIdsList = this.props.transcripts.filter((transcript)=>{
      return transcript.id&& transcript.transcriptTitle;
    })
    console.log(transcriptIdsList)
    this.setState({
      transcriptIdsList
    })
  // const  annotationsByTranscript = transcriptIdsList.map((transcript)=>{
  //   return {
  //     transcriptId: transcript.id,
  //     annotations: transcript.annotations
  //   }
  // })
  // console.log(annotationsByTranscript)


    // ApiWrapper.getAllAnnotations(this.props.projectId, this.props.transcriptId)
    // .then(json => {
    //   this.setState({
    //     annotations: json.annotations,
    //   });
    // });
  }

  // getAnnoations = async (projectId, transcriptId) =>{
  //   return new Promise((resolve, error)=>{ 
  //     // ApiWrapper.getAllAnnotations(this.props.projectId, this.props.transcriptId)
  //     ApiWrapper.getAllAnnotations(projectId, transcriptId)
  //         .then(json => {
  //           resolve(json.annotations)
  //           // this.setState({
  //           //   annotations: json.annotations,
  //           // });
  //         }).catch((err)=>{
  //           error(err)
  //         })
  //     })
  // }
  // New 
  handleSearch = (e, searchPreferences) => {
    console.log('Transcripts::',e.target.value, searchPreferences)
    // TODO: debounce to optimise
    if (e.target.value !== '') {
      const searchString = e.target.value;
      this.setState({ searchString: searchString.toLowerCase() });
      //  "debounce" to optimise
      // TODO: re introduce this 
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

  // New
  handleLabelsSearchChange = (selectedOptionLabelSearch) => {
    console.log('Transcripts::','handleLabelsSearchChange', selectedOptionLabelSearch);
    this.setState({
      selectedOptionLabelSearch
    });
  }
  // New 
  handleSpeakersSearchChange = (selectedOptionSpeakerSearch) => {
    console.log('Transcripts::','handleSpeakersSearchChange', selectedOptionSpeakerSearch);
    this.setState({
      selectedOptionSpeakerSearch
    });
  }
  // new new 
  handleTranscriptSearchChange = (selectedOptionTranscriptsSearch) => {
    console.log('Transcripts::','handleTranscriptSearchChange', selectedOptionTranscriptsSearch);
    this.setState({
      selectedOptionTranscriptsSearch
    });
  }
  // New 
  handleShowParagraphsMatchingSearch = (isShowParagraphsMatchingSearch) => {
    console.log('Transcripts::','handleShowParagraphsMatchingSearch', isShowParagraphsMatchingSearch);
    this.setState({ showParagraphsMatchingSearch: isShowParagraphsMatchingSearch });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const transcriptsElNav = this.props.transcripts.map((transcript, index) => {
      return (
        <Nav.Item key={ transcript.id  }>
          <Nav.Link
            disabled={ transcript.status !== 'done' ? true : false }
            // title={ transcript.status !== 'done' ? transcript.status : transcript.title }
            eventKey={ transcript.id }

          >
            { transcript.status === 'in-progress' ? <FontAwesomeIcon icon={ faClock }/> : '' }
            { transcript.status === 'error' ? <FontAwesomeIcon icon={ faExclamationTriangle }/> : '' }
            { `  ${ transcript.transcriptTitle }` }
          </Nav.Link>
        </Nav.Item>
      );
    });
    // id - value - label - color - description 
    // const transcriptOptions = [{value: 'test', label: 'test'}];
    const transcriptsOptions = this.props.transcripts.map((transcript)=>{
      if(transcript.id&& transcript.transcriptTitle){
        return {
          id: transcript.id,
         value: transcript.id,
         label: transcript.transcriptTitle,
         description: transcript.description
        }
      }else{
        return {
          id: 'NA',
         value: 'NA',
         label: 'NA',
         description:'NA'
        }
      }
     
    })// TODO: add filter to remove transcripts that  don't are in progress
    // or have an error 
    // console.log('transcriptsOptions', transcriptsOptions)
    // console.log(' this.props.transcripts',  this.props.transcripts)
    const transcriptsUniqueListOfSpeakers2D = this.props.transcripts.map((transcript)=>{
      if(transcript.transcript &&transcript.transcript.paragraphs){
        // console.log(transcript.transcript.paragraphs)
        return makeListOfUniqueSpeakers(transcript.transcript.paragraphs)
      }
      else{
        return {value: 'test', label: 'test'}
      }
      
    })
    const transcriptsUniqueListOfSpeakers = transcriptsUniqueListOfSpeakers2D.reduce(function(prev, curr) {
      return prev.concat(curr);
    });
    // remove duplicates 
    function removeDuplicates(array) {
      //  https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
      return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
    };

    // console.log('transcriptsUniqueListOfSpeakers', transcriptsUniqueListOfSpeakers)
    const transcriptsUniqueListOfSpeakersNoDuplicates = removeDuplicates(transcriptsUniqueListOfSpeakers)
    // const transcriptsUniqueListOfSpeakersNoDuplicates = [...new Set(transcriptsUniqueListOfSpeakers)]
    // console.log('transcriptsUniqueListOfSpeakersNoDuplicates', transcriptsUniqueListOfSpeakersNoDuplicates)
   
    /* TODO: Will this work? */
    const searchBarTranscriptsElement =  <SearchBarTranscripts
    labelsOptions={  this.props.labelsOptions }
    speakersOptions={ transcriptsUniqueListOfSpeakersNoDuplicates }
    handleSearch={ this.handleSearch }
    handleLabelsSearchChange={ this.handleLabelsSearchChange }
    handleSpeakersSearchChange={ this.handleSpeakersSearchChange }
    handleShowParagraphsMatchingSearch={ this.handleShowParagraphsMatchingSearch }
    transcriptOptions={ transcriptsOptions}
    handleTranscriptSearchChange={this.handleTranscriptSearchChange}
  />

    const transcriptsElTab = this.props.transcripts.map((transcript, index) => {
    
      // console.log(' this.props.labelsOptions ',  this.props.labelsOptions )
      return (
        <Tab.Pane key={ transcript.id } eventKey={ transcript.id } >
          <Transcript
            projectId={ this.props.projectId }
            transcriptId={ transcript.id }
            labelsOptions={ this.props.labelsOptions }
            title={ transcript.transcriptTitle }
            transcript={ transcript.transcript }
            url={ transcript.url }
          />
        </Tab.Pane>
      );
    });

   const  searchedParagraphsAcrossTranscripts = this.props.transcripts.map((transcript, index)=>{
     if(transcript.transcript && this.state.selectedOptionTranscriptsSearch.find((t)=> {return transcript.id === t.id})){
       // if transcript ia in list of this.state.selectedOptionTranscriptsSearch
      //  const annotations = await this.getAnnoations(this.props.projectId, transcript.id)
      //  console.log('annotations',annotations)
      // const currentTranscript = transcriptIdsList.find((tr)=>{tr.id === t.id})
      // console.log('transcript',transcript)
      console.log('NEW transcript.annotations',transcript.annotations)
      return <Paragraphs
      labelsOptions={ this.props.labelsOptions }
      // labelsOptions={ this.state.selectedOptionLabelSearch && this.state.selectedOptionLabelSearch }
      // annotations={ this.state.annotations ? this.state.annotations : [] }
      annotations={transcript.annotations? transcript.annotations : []}
      transcriptJson={ transcript.transcript }
      searchString={ this.state.searchString ? this.state.searchString : '' }
      showParagraphsMatchingSearch={ this.state.showParagraphsMatchingSearch }
      selectedOptionLabelSearch={ this.state.selectedOptionLabelSearch ? this.state.selectedOptionLabelSearch : [] }
      selectedOptionSpeakerSearch={ this.state.selectedOptionSpeakerSearch ? this.state.selectedOptionSpeakerSearch : [] }
      transcriptId={ transcript.id }
      handleTimecodeClick={ this.handleTimecodeClick }
      handleWordClick={ this.handleWordClick }
      handleDeleteAnnotation={ this.handleDeleteAnnotation }
      handleEditAnnotation={ this.handleEditAnnotation }
    />
     }
     else {
       return null
     }
    
    })

    return (
      <>
       <style scoped>
          {/* This is to style of the Paragraph component programmatically */}
          {`${ this.state.sentenceToSearchCSS } { background-color: ${ 'yellow' }; text-shadow: 0 0 0.01px black }`}
          {`${ this.state.sentenceToSearchCSSInHighlights } { background-color: ${ 'yellow' }; text-shadow: 0 0 0.01px black }`}
        </style>
        <Tab.Container
          defaultActiveKey={ this.props.transcripts[0] ? this.props.transcripts[0].id : 'first' }
        >
          <Row>
            <Col sm={ 3 }>
              <h2
                className={ [ 'text-truncate', 'text-muted' ].join(' ') }
                // className={ 'text-truncate' }
                title={ 'Transcripts' }
              >
                Transcripts</h2>
              <hr/>
              <Nav variant="pills" className="flex-column">
                <div style={{height: '97vh', overflow: 'scroll'}}>
                { transcriptsElNav }
                </div>
              </Nav>
            </Col>
            <Col sm={ 9 }>
              <Tab.Content>
                {searchBarTranscriptsElement}
                <hr/>
                { this.state.showParagraphsMatchingSearch?
                <> 
                 {searchedParagraphsAcrossTranscripts}
                </>
                :
                <> 
                {transcriptsElTab} 
                </> }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

      </>
    );
  }
}

export default Transcripts;
