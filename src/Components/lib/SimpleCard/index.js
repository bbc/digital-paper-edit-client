import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen
} from '@fortawesome/free-solid-svg-icons';

class SimpleCard extends Component {

  handleDelete = () => {
    //eslint-disable-next-line
    const confirmationPrompt = confirm(
      "Click OK if you wish to delete, cancel if you don't"
    );
    if (confirmationPrompt === true) {
      if (this.props.handleDelete) {
        this.props.handleDelete(this.props.id);
      }
    } else {
      alert('All is good, it was not deleted');
    }
  };

  handleEdit = () => {
    this.props.handleEdit(this.props.id);
  }
  showLinkPath = () => {
    return this.props.showLinkPath(this.props.id);
  }

  render() {

    return (
      <ListGroup.Item>
        {/* <Card.Body> */}
          <Row>
            <LinkContainer to={ this.showLinkPath() } style={ { cursor: 'pointer' } } >
              <Col xs={ 8 } sm={ 10 } md={ 10 } ld={ 10 } xl={ 10 }>
                <Card.Title>
                {this.props.icon} <a href={ `#${ this.showLinkPath() }` } >
                  {this.props.title}
                  </a>
                </Card.Title>
              </Col>
            </LinkContainer>
            <Col xs={ 2 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
              <Card.Link>
                <Button
                  onClick={ this.handleEdit }
                  variant="secondary"
                  size="sm"
                >
                  <FontAwesomeIcon icon={ faPen } />
                </Button>
              </Card.Link>
            </Col>
            <Col xs={ 2 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
              <Card.Link>
                <Button
                  onClick={ this.handleDelete }
                  variant="secondary"
                  size="sm"
                >
                  <FontAwesomeIcon icon={ faTrash } />
                </Button>
              </Card.Link>
            </Col>
          </Row>
          <LinkContainer to={ this.showLinkPath() } style={ { cursor: 'pointer' } } >
            <Row>
              <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
                <Card.Subtitle className="mb-2 text-muted">
                  { this.props.description }
                </Card.Subtitle>
              </Col>
            </Row>
          </LinkContainer>
        {/* </Card.Body> */}
      </ListGroup.Item>
    );
  }
}

export default SimpleCard;
