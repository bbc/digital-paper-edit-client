import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

class CustomOverlayTrigger extends Component {

  // TODO: prompt with note content to allow to edit note, and then call back to parent component to update
  handleEditAnnotation = () => {

    // TODO: add prompt
    let text;
    this.props.handleEditAnnotation(this.props.annotationId, text );
    // this.props.handleEditAnnotation
  }

  // TODO: add another function to change label on annotation, eg via a select in overlay

  render() {
    const { annotationLabelId } = this.props;
    let label = this.props.labelsOptions.find((label) => {
      return label.id === annotationLabelId;
    });
    // TODO: Quick fix
    if (!label) {
      label = this.props.labelsOptions[0];
    }
    console.log('labelx', label);
    console.log('this.props.labelsOptions', this.props.labelsOptions);
    console.log('this.props.annotationLabelId', this.props.annotationLabelId);

    return (
      <OverlayTrigger rootClose={ true } trigger="click" placement="bottom"
        overlay={
          <Popover id="popover-basic">
            <Row>
              {/* TODO: should/could have a select to change the label + listener to save
      As well as cross to delete it */}
              <Col md={ 1 } style={ { backgroundColor: label.color, marginLeft:'1em' } }></Col>
              <Col >
                {label.label}
              </Col>
              <Col md={ 1 } style={ { marginRight:'1em' } }
                onClick={ () => {this.props.handleDeleteAnnotation(this.props.annotationId);} }>
                <FontAwesomeIcon icon={ faTrashAlt } />
              </Col>
            </Row>
            <hr/>
            { this.props.annotationNote }
            <br/>
            <FontAwesomeIcon icon={ faPen }
              // TODO: prompt with note content to allow to edit note, and then call back to parent component to update
              onClick={ this.handleEditAnnotation }/>
          </Popover>
        }
      >
        <span style={ { borderBottom: `0.1em ${ label.color } solid` } } className={ 'highlight' }>{this.props.words}</span>
      </OverlayTrigger>
    );
  }
}

export default CustomOverlayTrigger;