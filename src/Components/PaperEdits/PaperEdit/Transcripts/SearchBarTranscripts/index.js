import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faTag,
  faUser,
  faSearch,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import colourStyles from '../LabelsList/select-color-styles.js';
import speakersColorStyles from './select-speakers-color-styles.js';

class SearchBarTranscripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingFilterOptions: false,
      showParagraphsMatchingSearch: false,
      showTextSearchPreferences: false,
      showSpeakersSearchPreferences: false,
      showLabelsSearchPreferences: false,
      selectedOptionTranscriptSearch: false
    };
  }

  handleSpeakersSearchChange = selectedOptionSpeakerSearch => {
    this.props.handleSpeakersSearchChange(selectedOptionSpeakerSearch);
  };

   handleLabelsSearchChange = selectedOptionLabelSearch => {
     this.props.handleLabelsSearchChange(selectedOptionLabelSearch);
   };

   handleShowParagraphsMatchingSearch = () => {
     this.setState((state) => {
      this.props.handleShowParagraphsMatchingSearch( !state.showParagraphsMatchingSearch);
       return { showParagraphsMatchingSearch: !state.showParagraphsMatchingSearch };
     }, () => {
      
     });
   }

   handleTranscriptSearchChange = selectedOptionTranscriptSearch => {
    this.props.handleTranscriptSearchChange(selectedOptionTranscriptSearch);
    this.setState({ selectedOptionTranscriptSearch });
  };

   /* TODO: move SearchBarTranscripts to a Search Toolbar component? */
   render() {

     return (
       <>
              <Row className="mb-3">
                 <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
                 <Button 
                  // block
                  variant="light"
                  onClick={this.props.handleShowAdvancedSearchViewSearchingAcrossTranscripts}
                  title={"close search across transcript in a project"}
                >
                  <FontAwesomeIcon 
                   icon={ faAngleLeft }
                  />
                </Button>
                 </Col>
                 <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
                 <InputGroup >
                    {/* Search */}
                    <FormControl
                      //  TODO: pass labels, speakers, and paragraph pref
                      onChange={ (e) => { this.props.handleSearch(e, {
                        showParagraphsMatchingSearch: this.state.showParagraphsMatchingSearch,
                        showLabelsSearchPreferences: this.state.showLabelsSearchPreferences,
                        showSpeakersSearchPreferences: this.state.showSpeakersSearchPreferences,
                        selectedOptionTranscriptSearch: this.state.selectedOptionTranscriptSearch
                      });} }
                      value={ this.props.searchValue }
                      placeholder="Search text..."
                      aria-label="search"
                      aria-describedby="search"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={ faSearch } />
                      </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                {/* <Form.Text className="text-muted">
                Search Text within a transcript 
              </Form.Text> */}
                </Col>
               </Row>
               <Row className="mb-3">
                 <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
                   <InputGroup.Prepend>
                     <InputGroup.Text>
                       <FontAwesomeIcon icon={ faFileAlt } />
                     </InputGroup.Text>
                   </InputGroup.Prepend>
                 </Col>
                 <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
                   <Select
                     value={ this.state.selectedOptionTranscriptSearch }
                     onChange={ this.handleTranscriptSearchChange }
                     isMulti
                     isSearchable
                     options={ this.props.transcriptOptions }
                     styles={ speakersColorStyles }
                     placeholder={ 'Filter by transcripts...' }
                   />
                {/* <Form.Text className="text-muted">
                Filter by transcripts in the current project
                </Form.Text> */}
                 </Col>
               </Row>
               <Row className="mb-3">
                 <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
                   <InputGroup.Prepend>
                     <InputGroup.Text>
                       <FontAwesomeIcon icon={ faUser } />
                     </InputGroup.Text>
                   </InputGroup.Prepend>
                 </Col>
                 <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
                   <Select
                     value={ this.state.selectedOptionSpeakerSearch }
                     onChange={ this.handleSpeakersSearchChange }
                     isMulti
                     isSearchable
                     options={ this.props.speakersOptions }
                     styles={ speakersColorStyles }
                     placeholder={ 'Filter by speakers...' }
                   />
                {/* <Form.Text className="text-muted">
                  Filter by speaker in the current project
                </Form.Text> */}
                 </Col>
               </Row>
               <Row className="mb-3">
                 <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
                   <InputGroup.Prepend>
                     <InputGroup.Text>
                       <FontAwesomeIcon icon={ faTag } />
                     </InputGroup.Text>
                   </InputGroup.Prepend>
                 </Col>
                 <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
                   <Select
                     value={ this.state.selectedOptionLabelSearch }
                     onChange={ this.handleLabelsSearchChange }
                     isMulti
                     isSearchable
                     options={ this.props.labelsOptions }
                     styles={ colourStyles }
                     placeholder={ 'Filter by labels...' }
                   />
                {/* <Form.Text className="text-muted">
                  Filter by labels in the current project
                </Form.Text> */}
                 </Col>
               </Row>
       </>
     );
   }
}

export default SearchBarTranscripts;