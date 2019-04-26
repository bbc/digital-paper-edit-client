import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSlidersH,
  faHighlighter,
  faTags,
  faTag,
  faUserTag,
  faAngleDown,
  faAngleUp,
  faSyncAlt,
  faTimes,
  faPen,
  faInfoCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import chroma from 'chroma-js';

import Select from 'react-select';

import CreateNewLabelModal from './CreateNewLabelModal.js';

class LabelsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelsListOpen: false
    };
  }

  removeLabel = (id, e) => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm('Click OK to delete the label, Cancel if you changed your mind');
    if (response == true) {
      const newLabelsOptions = this.props.labelsOptions.filter((label) => {
        return label.id !== id;
      });
      console.log('newLabelsOptions', newLabelsOptions);
      // this.setState({ labelsOptions: newLabelsOptions });
      this.props.onLabelsUpdated(newLabelsOptions);
    } else {
      alert('Your label was not deleted');
    }
  }

  // TODO: See if CreateNewLabelModal can be refactored to accomodate for edit label
  // if not then separate model to achieve same
  // https://stackoverflow.com/questions/43335452/pass-item-data-to-a-react-modal
  editLabel = (id, e) => {
    const labelToEdit = this.props.labelsOptions.filter((label) => {
      return label.id === id;
    });
    console.log('labelToEdit', labelToEdit);
    alert('this functionality has not been implemented yet');
  }
  handleNewLabelCreated = (newLabel) => {
    const newLabelsOptions = this.props.labelsOptions;
    newLabel.id = newLabelsOptions[newLabelsOptions.length - 1].id + 1;
    newLabelsOptions.push(newLabel);
    this.props.onLabelsUpdated(newLabelsOptions);
  }

  render() {
    // TODO: add CSS to label and description to constrain width?
    // move edit and X to the rigth
    const labelsListOptions = this.props.labelsOptions.map((label, index) => {
      return (<ListGroup.Item key={ 'label_' + index }>
        <Row>
          {/* Col space for the label color */}
          <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }
            style={ { backgroundColor: label.color } }
            title={ label.label }>
          </Col>
          <Col xs={ 7 } sm={ 7 } md={ 7 } lg={ 7 } xl={ 7 }>
            {label.label}
          </Col>

          <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }>
            <Button title={ 'edit label' }variant="link" size="sm"
              onClick={ (e) => {this.editLabel(label.id, e);} }
              disabled={ label.label.toLowerCase() === 'default' ? true : false }>
              <FontAwesomeIcon icon={ faPen } />
            </Button>
          </Col>
          <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }>
            <Button title={ 'delete label' } variant="link" size="sm"
              onClick={ (e) => {this.removeLabel(label.id, e);} }
              disabled={ label.label.toLowerCase() === 'default' ? true : false }>
              <FontAwesomeIcon icon={ faTimes } />
            </Button>
          </Col>

        </Row>
        <Row>
          {/* Spacing to align title and color */}
          <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }
            title={ label.label }>
          </Col>
          <Col xs={ 10 } sm={ 10 } md={ 10 } lg={ 10 } xl={ 10 }>
            <Form.Text className="text-muted">
              {label.description}
            </Form.Text>
          </Col>
        </Row>
      </ListGroup.Item>);
    });

    const labelsList = (<ListGroup style={ { height: '30vh', overflow: 'scroll' } }>{labelsListOptions}</ListGroup>);

    return (<>
      <Card>
        <Card.Header onClick={ () => {this.setState((state) => {return { labelsListOpen: !state.labelsListOpen };});} }>
          <Nav justify variant="pills">
            <Nav.Item>
              {/* <Col xs={ 9 }> */}
              <FontAwesomeIcon icon={ faTags } /> Labels
            </Nav.Item>
            {/* </Col> */}
            {/* <Col xs={ 3 }> */}
            <Nav.Item>
              <FontAwesomeIcon icon={ this.state.labelsListOpen ? faAngleDown : faAngleUp } />
            </Nav.Item>
          </Nav>
          {/* </Col> */}
        </Card.Header>

        {this.state.labelsListOpen ? <> { labelsList }
          <Card.Footer className="text-muted">
            <CreateNewLabelModal
              onNewLabelCreated={ this.handleNewLabelCreated }
            />
          </Card.Footer> </> : ''}
      </Card>

    </>
    );
  }
}

export default LabelsList;