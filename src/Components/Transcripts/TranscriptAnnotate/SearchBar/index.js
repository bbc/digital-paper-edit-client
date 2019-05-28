import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faParagraph,
  faSlidersH,
  faTags,
  faUserTag,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import colourStyles from '../LabelsList/select-color-styles.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showParagraphsMatchingSearch: false,
      showTextSearchPreferences: false,
      showSpeakersSearchPreferences: false,
      showLabelsSearchPreferences: false
    };
  }

  handleToggleSearchTextPreferences = () => {
    this.setState((state) => {
      return { showTextSearchPreferences: !state.showTextSearchPreferences };
    });
  };

  handleToggleSearchLabelsPreferences = () => {
    this.setState((state) => {
      return {
        showLabelsSearchPreferences: !state.showLabelsSearchPreferences
      };
    });
  };

  handleToggleSearchSpeakersPreferences = () => {
    this.setState((state) => {
      return {
        showSpeakersSearchPreferences: !state.showSpeakersSearchPreferences
      };
    });
  };

  handleSpeakersSearchChange = selectedOptionSpeakerSearch => {
    this.props.handleSpeakersSearchChange(selectedOptionSpeakerSearch);
    this.setState({ selectedOptionSpeakerSearch });
  };

   handleLabelsSearchChange = selectedOptionLabelSearch => {
     this.props.handleLabelsSearchChange(selectedOptionLabelSearch);
     this.setState({ selectedOptionLabelSearch });
   };

   handleShowParagraphsMatchingSearch = () => {
     this.setState((state) => {
       return { showParagraphsMatchingSearch: !state.showParagraphsMatchingSearch };
     }, () => {
       this.props.handleShowParagraphsMatchingSearch();
     });
   }

   /* TODO: move searchBar to a Search Toolbar component? */
   render() {
     const searchBar = <Card.Header>
       <InputGroup className="mb-3">
         {/* Search controls settings */}
         <DropdownButton
           as={ InputGroup.Prepend }
           variant="outline-secondary"
           title={ <><FontAwesomeIcon icon={ faSearch } /><FontAwesomeIcon icon={ faSlidersH } /></> }
           id="input-group-dropdown-1">
           <Dropdown.Item onClick={ this.handleToggleSearchTextPreferences }>
             <FontAwesomeIcon icon={ faParagraph }/>
                Show only matching Paragraphs
           </Dropdown.Item>
           <Dropdown.Divider />
           <Dropdown.Item onClick={ this.handleToggleSearchLabelsPreferences }>
             <FontAwesomeIcon icon={ faTags } />
           Filter results by Labels
           </Dropdown.Item>
           <Dropdown.Item onClick={ this.handleToggleSearchSpeakersPreferences }>
             <FontAwesomeIcon icon={ faUserTag } />
           Filter results by Speakers
           </Dropdown.Item>
         </DropdownButton>
         {/* Search */}
         <FormControl
           //  TODO: pass labels, speakers, and paragraph pref
           onChange={ (e) => {this.props.handleSearch(e, {
             showParagraphsMatchingSearch: this.state.showParagraphsMatchingSearch,
             showLabelsSearchPreferences: this.state.showLabelsSearchPreferences,
             showSpeakersSearchPreferences: this.state.showSpeakersSearchPreferences
           });} }
           placeholder="Search transcript"
           aria-label="search"
           aria-describedby="search"
         />
       </InputGroup>
     </Card.Header>;

     const textSearchPreferences = this.state.showTextSearchPreferences
       ? (<Card.Header>
         <Form.Check
           type="checkbox"
           value={ this.state.showParagraphsMatchingSearch }
           label={ <>Show only matching Paragraphs </> }
           onClick={ this.handleShowParagraphsMatchingSearch }
         />
         <Form.Text className="text-muted"
           label={ <><FontAwesomeIcon icon={ faParagraph }/>Show only matching Paragraphs </> }
           onClick={ this.handleShowParagraphsMatchingSearch }>
           <FontAwesomeIcon icon={ faParagraph }/> Show only paragraphs that contain search results
         </Form.Text>
       </Card.Header>)
       : '';

     const labelsSearchPreferences = this.state.showLabelsSearchPreferences
       ? <Card.Header>
         <Select
           value={ this.state.selectedOptionLabelSearch }
           onChange={ this.handleLabelsSearchChange }
           isMulti
           isSearchable
           options={ this.props.labelsOptions }
           styles={ colourStyles }
         />
         <Form.Text className="text-muted">
           <FontAwesomeIcon icon={ faTags } /> Narrow down search by labels
         </Form.Text>
       </Card.Header>
       : '';

     const speakerSearchPreferences = this.state.showSpeakersSearchPreferences
       ? <Card.Header>
         <Select
           value={ this.state.selectedOptionSpeakerSearch }
           onChange={ this.handleSpeakersSearchChange }
           isMulti
           isSearchable
           options={ this.props.speakersOptions }
         />
         <Form.Text className="text-muted">
           <FontAwesomeIcon icon={ faUserTag } /> See only text for selected speakers
         </Form.Text>
       </Card.Header>
       : '';

     return (
       <>
         { searchBar }
         {textSearchPreferences}
         {labelsSearchPreferences}
         { speakerSearchPreferences }
       </>
     );
   }
}

export default SearchBar;