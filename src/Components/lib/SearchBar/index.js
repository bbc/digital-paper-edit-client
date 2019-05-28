import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false
    };
  }

  handleSearch = e => {
    const searchText = e.target.value;
    this.props.handleSearch(searchText);
  };

  handleShowSearchBar = () => {
    this.setState(state => {
      return { showSearchInput: !state.showSearchInput };
    });
  }

  render() {

    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend
          onClick={ this.handleShowSearchBar }
        >
          <InputGroup.Text id="basic-addon2">
            <FontAwesomeIcon icon={ faSearch } />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          style={ { display: this.state.showSearchInput ? '' : 'none' } }
          onChange={ this.handleSearch }
          placeholder="Search"
          aria-label="search"
          aria-describedby="search"
        />
      </InputGroup>
    );
  }
}

export default SearchBar;
