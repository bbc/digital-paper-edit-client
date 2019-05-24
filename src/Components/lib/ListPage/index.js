import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import List from '../List';
import CustomBreadcrumb from '../CustomBreadcrumb';
import includesText from '../../../Util/includes-text/index.js';
import SearchBar from '../SearchBar';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false
    };
  }

  handleSearch = searchText => {
    const results = this.props.items.filter(project => {
      if (
        includesText(project.title, searchText) ||
        includesText(project.description, searchText)
      ) {
        project.display = true;

        return project;
      } else {
        project.display = false;

        return project;
      }
    });
    this.props.handleUpdateList(results);
  };

  handleShowSearchBar = () => {
    this.setState(state => {
      return { showSearchInput: !state.showSearchInput };
    });
  }

  render() {

    return (<>

      <Row>
        <Col sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 }>
          <CustomBreadcrumb items={ this.props.breadcrumb } />
        </Col>
        <Col xs={ 12 } sm={ 3 } md={ 3 } ld={ 3 } xl={ 3 }>
          <Button onClick={ this.props.handleShowCreateNewItemForm } variant="outline-secondary" size="lg" block>
                New{' '}
          </Button>
          <br />
        </Col>
      </Row>

      <SearchBar
        handleSearch={ this.handleSearch }
      />

      {this.props.items ?
        <List
          items={ this.props.items }
          handleEdit={ this.props.handleEdit }
          handleDelete={ this.props.handleDelete }
          showLinkPath={ this.props.showLinkPath }
        /> : 'There are no items'}

    </>);
  }
}

export default Page;
