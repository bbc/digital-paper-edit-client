import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faExclamationTriangle, faPen } from '@fortawesome/free-solid-svg-icons';

class CustomTranscriptCard extends Component {
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
  };

  handleEdit = () => {
    this.props.handleEdit(this.props.id);
  };

  // TODO: this can be refactored to clean up the logic
  render() {
    let status;
    let errorMessageAlert;
    // let statusBadge;
    if (this.props.status === 'error') {
      status = 'danger';
    }
    if (this.props.status === 'in-progress') {
      status = 'info';
      // statusBadge = <Badge variant="info">In progress</Badge>;
    }
    if (this.props.status === 'done') {
      // statusBadge = <Badge variant="success">Success</Badge>;
      status = 'success';
    }
    // let borderStatus;
    // let showBtn = <a href={ `#${ this.props.showLink() }` }>  Show btn</a>;
    let title = <a href={`#${this.props.showLink()}`}> {this.props.title}</a>;
    if (status && status === 'info') {
      title = this.props.title;
    }
    if (status && status === 'danger') {
      title = this.props.title;
      // borderStatus = 'danger';
    }

    if (this.props.status === 'error') {
      errorMessageAlert = (
        <>
          <Alert variant="danger">
            <FontAwesomeIcon icon={faExclamationTriangle} /> {this.props.errorMessage}
          </Alert>
          <Badge variant="danger">Error</Badge>
        </>
      );
    }

    return (
      <ListGroup.Item>
        <Row>
          <Col xs={12} sm={9} md={9} ld={9} xl={9}>
            <Card.Title>
              {this.props.icon ? this.props.icon : ''} {title}
            </Card.Title>
          </Col>
          <Col xs={2} sm={1} md={1} ld={1} xl={1}>
            <Card.Link>
              <Button onClick={this.handleEdit} variant="secondary" size="sm">
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </Card.Link>
          </Col>
          <Col xs={2} sm={1} md={1} ld={1} xl={1}>
            <Card.Link>
              <Button onClick={this.handleDelete} variant="secondary" size="sm">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Card.Link>
          </Col>
          <Col xs={1} sm={1} md={1} ld={1} xl={1}>
            {status && status === 'info' ? (
              <Button variant="info" size="sm" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              </Button>
            ) : (
              ''
            )}
            {status && status === 'danger' ? (
              <Button variant="danger" size="sm" disabled>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </Button>
            ) : (
              ''
            )}
            {status && status === 'success' ? (
              <Button variant="success" size="sm" disabled>
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            ) : (
              ''
            )}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} ld={12} xl={12}>
            <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} ld={12} xl={12}>
            {this.props.sttEngine && this.props.clipName && (
              <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <Badge variant="light">Info</Badge>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <>
                    {this.props.sttEngine ? (
                      <>
                        STT Engine: <Badge variant="light">{this.props.sttEngine}</Badge>
                      </>
                    ) : null}
                    <br />
                    {this.props.clipName ? (
                      <>
                        File Name: <Badge variant="light">{this.props.clipName}</Badge>
                      </>
                    ) : null}
                  </>
                </Accordion.Collapse>
              </Accordion>
            )}
          </Col>
        </Row>

        {errorMessageAlert ? (
          <>
            <Row>
              <Col xs={12} sm={12} md={12} ld={12} xl={12}>
                {errorMessageAlert}
              </Col>
            </Row>
          </>
        ) : null}
      </ListGroup.Item>
    );
  }
}

export default CustomTranscriptCard;
