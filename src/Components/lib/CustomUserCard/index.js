import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSquare,
  faMinusSquare,
  faCheck,
  faUserPlus,
  faUserMinus
} from '@fortawesome/free-solid-svg-icons';
class CustomUserCard extends Component {
  render() {
    return (
      <Card style={ { width: '100%', marginBottom: '1em' } }>
        <Card.Body>
          <Row>
            <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
              <Card.Title>
                <FontAwesomeIcon icon={ faUser } /> {this.props.userName}
              </Card.Title>
            </Col>
            <Col xs={ 2 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
              {this.props.partOfProject ? (
                <Card.Link>
                  <Button variant="outline-success" size="sm" disabled>
                    <FontAwesomeIcon icon={ faCheck } />
                  </Button>
                </Card.Link>
              ) : (
                <Card.Link>
                  <Button variant="outline-secondary" size="sm" disabled>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                </Card.Link>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={ 10 } sm={ 11 } md={ 11 } ld={ 11 } xl={ 11 }>
              <Card.Subtitle className="mb-2 text-muted">
                {this.props.userEmail}
              </Card.Subtitle>
            </Col>
            <Col xs={ 1 } sm={ 1 } md={ 1 } ld={ 1 } xl={ 1 }>
              {this.props.partOfProject ? (
                <Card.Link>
                  <Button
                    onClick={ () => {
                      this.props.handleRemoveUserToProject(this.props.userId);
                    } }
                    variant="outline-secondary"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={ faUserMinus } />
                  </Button>
                </Card.Link>
              ) : (
                <Card.Link>
                  <Button
                    onClick={ () => {
                      this.props.handleAddUserToProject(this.props.userId);
                    } }
                    variant="outline-secondary"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={ faUserPlus } />
                  </Button>
                </Card.Link>
              )}
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

export default CustomUserCard;
