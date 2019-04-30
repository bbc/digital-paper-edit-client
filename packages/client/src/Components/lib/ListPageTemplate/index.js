import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import CustomNavbar from '../CustomNavbar/index.js';
import CustomBreadcrumb from '../CustomBreadcrumb/index.js';
import CustomCard from '../CustomCard/index.js';

import CustomFooter from '../CustomFooter/index.js';
import CustomAlert from '../CustomAlert/index.js';
import capitaliseFirstLetter from '../../../Util/capitalise-first-letter/index.js';
import includesText from '../../../Util/includes-text/index.js';

class ListPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: this.props.itemsList,
      showSearchInput: false
    };
  }

    handleSearch = (e) => {
      const searchText = e.target.value;
      const results = this.props.itemsList.filter((project) => {
        if (includesText(project.title, searchText)
        || includesText(project.description, searchText)
        ) {
          project.display = true;

          return project;
        } else {
          project.display = false;

          return project;
        }
      });

      this.setState({
        itemsList: results
      });
    }

    render() {
      let itemsCards;
      let description;
      if ( this.props.itemsList !== null) {
        itemsCards = this.props.itemsList.map((item) => {
          let status;
          if (item.status === 'error') {
            status = 'danger';
          }
          if (item.status === 'in-progress') {
            status = 'info';
            description = <Badge variant="info">In progress</Badge>;
          }
          if (item.status === 'done') {
            description = <Badge variant="success">Success</Badge>;
            status = 'success';
          }

          if (item.errorMessage) {
            description = <><Alert variant="danger">
              <FontAwesomeIcon icon={ faExclamationCircle } /> {item.errorMessage}
            </Alert><Badge variant="danger">Error</Badge></>;
          }

          if (item.display) {
            return ( <CustomCard
              icon={ this.props.icon }
              key={ 'key__' + item.id }
              id={ item.id }
              projectId={ item.id }
              title={ item.title }
              subtitle={ item.description }
              handleDelete={ () => { this.props.handleDelete(item.id);} }
              // To be able to do REST for cards for - Projects, transcripts, paperedits
              showLink={ () => {return this.props.getShowLinkForCard(item.id);} }
              status={ status }
              description={ description }
              disabled={ item.status === 'done' ? true : false }
            />
            );
          } else {
            return null;
          }
        })
          .filter((item) => {
            return item !== null;
          });
      }

      let content;
      // TODO: better error handling
      // eg there should be a loading/fetching? and then if it gets error 404 or 505(?) from server
      // then it displayes error from server
      // also add `navigator.onLine` to raise error if offline?
      if (this.props.itemsList !== null && this.props.itemsList.length !== 0) {
        content = <>
          <InputGroup className="mb-3">
            <InputGroup.Prepend onClick={ () => {this.setState((state) => {
              return { showSearchInput:!state.showSearchInput };
            });
            }
            }>
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

          <section style={ { height: '75vh', overflow: 'scroll' } }>
            {itemsCards}
          </section>
        </>;
      } else if (this.props.itemsList === null) {
        content = <><CustomAlert
          variant={ 'danger' }
          heading={ 'Error' }
          message={ 'Unable to reach the server' }
        /></>;

      } else if (this.props.itemsList.length === 0) {

        content = <> <CustomAlert
          variant={ 'info' }
          heading={ `No ${ capitaliseFirstLetter(this.props.modelName) }` }
          message={ <p>You currently don't have any {this.props.modelName.toLowerCase()}, <Alert.Link href={ `#/${ this.props.modelName.toLowerCase() }/new` }>create a new {this.props.modelName.toLowerCase()}</Alert.Link>.</p> }
        /></>;
      }

      return (
        <Container style={ { marginBottom: '5em' } }>
          <CustomNavbar
            links={ this.props.navbarLinks }
          />
          <br/>
          <Row>
            <Col sm={ 9 } md={ 9 } ld={ 9 } xl={ 9 }>
              <CustomBreadcrumb
                items={ this.props.breadCrumbItems }
              />
            </Col>
            <Col xs={ 12 } sm={ 3 } md={ 3 } ld={ 3 } xl={ 3 }>
              <LinkContainer to={ this.props.linkToNew() }>
                <Button variant="outline-secondary" size="lg" block>New </Button>
              </LinkContainer>
              <br/>
            </Col>
          </Row>
          {content}
          <CustomFooter />
        </Container>
      );
    }
}

export default ListPageTemplate;
