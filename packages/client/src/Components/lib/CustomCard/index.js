import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';
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
    let links;
    if (this.props.links !== undefined && this.props.links.length !== 0) {
      links = this.props.links.map((item, index) => {
        return (
          <LinkContainer to={ item.link } key={ item + '_' + index }>
            <Card.Link className={ styles.cardLink }>
              <Button variant="outline-primary" size="sm">
                {item.name}
              </Button>
            </Card.Link>
          </LinkContainer>
        );
      });
    }

    return (
      <Card style={ { width: '100%', marginBottom: '1em' } }>

        <Card.Body>
          <Card.Title>
            {this.props.showLink ? (
              <LinkContainer to={ this.props.showLink }>
                {/* <Button variant="outline-primary" size="sm">
                <FontAwesomeIcon icon={ faCaretRight } />
              </Button> */}
                <a>{this.props.title}</a>
              </LinkContainer>) : <span>{this.props.title} </span>}

          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
          <Card.Text>
            {this.props.description}
          </Card.Text>
          {links}
          <Card.Link >
            <Button onClick={ this.handleDelete } variant="outline-danger" size="sm">
              <FontAwesomeIcon icon={ faTrash } />
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>

    );
  }
}

export default CustomCard;
