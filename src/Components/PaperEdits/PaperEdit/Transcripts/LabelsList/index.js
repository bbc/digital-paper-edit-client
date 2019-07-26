import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
  faTags,
  faTimes,
  faPen,
  faCog
} from '@fortawesome/free-solid-svg-icons';

import LabelModal from './LabelModal.js';
import { randomColor } from './css-color-names.js';

class LabelsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLabelsListOpen: false,
      isLabelmodalShown: false
    };
  }

  removeLabel = (id, e) => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm('Click OK to delete the label, Cancel if you changed your mind');
    if (response === true) {
      this.props.onLabelDelete(id);
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
    // this.props.onLabelsUpdate(newLabelsOptions);
    console.log('labelToEdit', labelToEdit);
    // alert('this functionality has not been implemented yet');
  }
  onLabelSaved = (newLabel) => {
    // if updated - labelId is diff from null
    if (newLabel.id) {
      this.props.onLabelUpdate(newLabel);
    }
    // if created
    else {
      this.props.onLabelCreate(newLabel);
    }
  }

  showLabelModal = () => {
    console.log(this.state.isLabelmodalShown);
    this.setState((state) => {
      return {
        isLabelmodalShown: !state.isLabelmodalShown
      };
    });
  }

  render() {
    // TODO: add CSS to label and description to constrain width?
    // move edit and X to the rigth
    let labelsListOptions;
    // Handle edge case if there's no labels
    if (this.props.labelsOptions) {

      labelsListOptions = this.props.labelsOptions.map((label, index) => {
        return (<ListGroup.Item style={ { width: '100%' } } key={ 'label_' + index }>
          <Row>
            {/* Col space for the label color */}
            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }
              style={ { backgroundColor: label.color } }
              title={ label.label }
            >
            </Col>
            <Col xs={ 6 } sm={ 6 } md={ 6 } lg={ 6 } xl={ 6 }
            // className="text-truncate"
              title={ label.label }
            >
              {label.label}
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 }>
              {/* Edit label */}

              {label.label.toLowerCase() !== 'default' ?
                <LabelModal
                  color={ label.color }
                  label={ label.label }
                  description={ label.description }
                  labelId={ label.id }
                  show={ this.state.isLabelmodalShown }
                  onLabelSaved={ this.onLabelSaved }
                  openBtn={ <span> <FontAwesomeIcon icon={ faPen } /></span> }
                /> : <Button title={ 'edit label' } variant="link" size="sm" disabled>
                  <FontAwesomeIcon icon={ faPen } /> </Button> }
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
              className="text-truncate"
              title={ label.label }>
            </Col>
            <Col xs={ 10 } sm={ 10 } md={ 10 } lg={ 10 } xl={ 10 }>
              <Form.Text
                // className={ [ 'text-muted', 'text-truncate' ].join(' ') }
                title={ label.description }>
                {label.description}
              </Form.Text>
            </Col>
          </Row>
        </ListGroup.Item>);
      });
    }

    const labelsList = (<ListGroup style={ { height: '50vh', width: '20vw', overflowY: 'scroll', overflowX: 'hidden' } }>{labelsListOptions}
    </ListGroup>);
    // const labelsList = labelsListOptions;

    return (<>

      {this.props.isLabelsListOpen ? <>
        {/* <br/> */}
        <Card>
          <Card.Header>
            <FontAwesomeIcon icon={ faTags } /> <FontAwesomeIcon icon={ faCog } /> Labels
          </Card.Header>
          { labelsList }
          <Card.Footer className="text-muted">
            <LabelModal
              color={ randomColor() }
              label={ '' }
              description={ '' }
              labelId={ null }
              show={ this.state.isLabelmodalShown }
              onLabelSaved={ this.onLabelSaved }
              openBtn={ <Button variant="outline-secondary" block><FontAwesomeIcon icon={ faTag } /> Create New Label</Button> }
            />
          </Card.Footer>
        </Card>
      </> : ''}

    </>
    );
  }
}

export default LabelsList;