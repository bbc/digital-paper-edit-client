import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
class CustomCard extends Component {

  handleDelete = () => {
    //eslint-disable-next-line
    const confirmationPrompt = confirm("Click OK if you wish to delete, cancel if you don't");
    if (confirmationPrompt === true) {
      if (this.props.handleDelete) {
        this.props.handleDelete(this.props.id);
      }
    } else {
      alert('All is good, it was not deleted');
    }
  }

  render() {
    let borderStatus;
    // let showBtn = <a href={ `#${ this.props.showLink() }` }>  Show btn</a>;
    let title = <a href={ `#${ this.props.showLink() }` }>  {this.props.title}</a>;
    if (this.props.status && this.props.status === 'info') {
      title = this.props.title;
      // showBtn = <a href={ `#${ this.props.showLink() }` }>  Show btn Disabled</a>;
    }
    if (this.props.status && this.props.status === 'danger') {
      title = this.props.title;
      // showBtn = <a href={ `#${ this.props.showLink() }` }>  Show btn Disabled</a>;
      borderStatus = 'danger';
    }

    return (
      <Card border={ borderStatus }style={ { width: '100%', marginBottom: '1em' } }>
        <Card.Body>
          <Row>
            <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
              <Card.Title>
                {this.props.icon ? this.props.icon : ''} {title}
              </Card.Title>
            </Col>
            <Col xs={ 2 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
              <Card.Link >
                <Button onClick={ this.handleDelete } variant="outline-secondary" size="sm">
                  <FontAwesomeIcon icon={ faTrash } />
                </Button>
              </Card.Link>
            </Col>
          </Row>
          <Row>
            <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
              <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
            </Col>
            <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
              {this.props.status && this.props.status === 'info' ?
                <Button variant="info" size="sm" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button> : ''}
              {this.props.status && this.props.status === 'danger' ?
                <Button variant="danger" size="sm" disabled>
                  <FontAwesomeIcon icon={ faExclamationCircle } />
                </Button> : ''}
              {this.props.status && this.props.status === 'success' ?
                <Button variant="success" size="sm" disabled>
                  <FontAwesomeIcon icon={ faCheck } />
                </Button> : ''}
            </Col>
          </Row>

          <Card.Text>
            <Row>
              <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
                {this.props.description}
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CustomCard;
