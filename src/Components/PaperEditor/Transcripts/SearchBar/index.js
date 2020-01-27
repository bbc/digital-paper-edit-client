import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faAlignJustify,
  faFilter,
  faTag,
  faUser,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import colourStyles from '../LabelsList/select-color-styles.js';
import speakersColorStyles from './select-speakers-color-styles.js';

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

   handleToggleAll = () => {
     this.setState((state) => {
       return {
         showTextSearchPreferences: true,
         showSpeakersSearchPreferences: true,
         showLabelsSearchPreferences: true,
         // defaults to show only matching paragraph to be checked
         showParagraphsMatchingSearch: true
       };
     }, () => {
       this.props.handleShowParagraphsMatchingSearch();
     });
   }

   handleHideAll = () => {
     this.setState((state) => {
       return {
         showTextSearchPreferences: false,
         showSpeakersSearchPreferences: false,
         showLabelsSearchPreferences: false,
         // remove preferences for showing matching paragraphjs when removing filters
         showParagraphsMatchingSearch: false
       };
     }, () => {
       this.props.handleShowParagraphsMatchingSearch();
     });
   }

   /* TODO: move searchBar to a Search Toolbar component? */
   render() {

     return (
       <>
         <Card.Header>
           <InputGroup className="mb-3">
             <InputGroup.Prepend>
               <InputGroup.Text>
                 <FontAwesomeIcon icon={ faSearch } />
               </InputGroup.Text>
             </InputGroup.Prepend>
             {/* Search */}
             <FormControl
               //  TODO: pass labels, speakers, and paragraph pref
               onChange={ (e) => {this.props.handleSearch(e, {
                 showParagraphsMatchingSearch: this.state.showParagraphsMatchingSearch,
                 showLabelsSearchPreferences: this.state.showLabelsSearchPreferences,
                 showSpeakersSearchPreferences: this.state.showSpeakersSearchPreferences
               });} }
               placeholder="Search text..."
               aria-label="search"
               aria-describedby="search"
             />
             <DropdownButton
               drop={ 'right' }
               as={ InputGroup.Append }
               variant="outline-secondary"
               title={ <>
                 <FontAwesomeIcon icon={ faFilter }
                   title="Filter results" />
               </> }
             >
               <Dropdown.Item
                 onClick={ this.handleToggleSearchLabelsPreferences }
                 title="Filter results by Labels"
               >
                 <FontAwesomeIcon icon={ faTag } />  Labels {this.state.showLabelsSearchPreferences ?
                   <FontAwesomeIcon style={ { color:'blue' } } icon={ faCheck } />
                   : ''}
               </Dropdown.Item>
               <Dropdown.Item
                 onClick={ this.handleToggleSearchSpeakersPreferences }
                 title="Filter results by Speakers"
               >
                 <FontAwesomeIcon icon={ faUser } /> Speakers  {this.state.showSpeakersSearchPreferences ?
                   <FontAwesomeIcon style={ { color:'blue' } } icon={ faCheck } />
                   : ''}
               </Dropdown.Item>
               <Dropdown.Item
                 onClick={ this.handleToggleSearchTextPreferences }
                 title="Show only matching paragraphs"
               >
                 <FontAwesomeIcon icon={ faAlignJustify }/> Paragraphs only {this.state.showTextSearchPreferences ?
                   <FontAwesomeIcon style={ { color:'blue' } } icon={ faCheck } />
                   : ''}
               </Dropdown.Item>
               <Dropdown.Item
                 onClick={ this.handleToggleAll }
                 title="Show all of the above options"
               >
                 All {this.state.showLabelsSearchPreferences && this.state.showSpeakersSearchPreferences && this.state.showTextSearchPreferences ?
                   <FontAwesomeIcon style={ { color:'blue' } } icon={ faCheck } />
                   : ''}
               </Dropdown.Item>
               <Dropdown.Divider />
               <Dropdown.Item
                 onClick={ this.handleHideAll }
                 title="Deselect all the options"
               >
                Deselect all
               </Dropdown.Item>
             </DropdownButton>
           </InputGroup>

           { this.state.showLabelsSearchPreferences
             ? <>
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
                     placeholder={ 'Filter by label...' }
                   />
                 </Col>
               </Row>
             </>
             : ''}

           { this.state.showSpeakersSearchPreferences
             ? <>
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
                     placeholder={ 'Filter by speaker...' }
                   />
                 </Col>
               </Row>
             </>
             : ''}

           { this.state.showTextSearchPreferences
             ? (<>
               <Form.Check
                 type="checkbox"
                 checked={ this.state.showParagraphsMatchingSearch }
                 onChange={ this.handleShowParagraphsMatchingSearch }
                 label={ <>
                   <Form.Text
                     className="text-muted"
                     title="Show only matching paragraphs"
                     onClick={ this.handleShowParagraphsMatchingSearch }
                   >
                       Show only matching paragraphs
                   </Form.Text>
                 </> }
               />
             </>)
             : ''}

         </Card.Header>
       </>
     );
   }
}

export default SearchBar;