import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import './index.module.css';

class CustomCard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       transcriptJson: null
//     }

  //   }

  render() {
    let links;
    console.log(this.props);
    if (this.props.links !== undefined && this.props.links.length !== 0) {
      links = this.props.links.map((item) => {
        return (
          <LinkContainer to={ item.link }>
            <Card.Link>{item.name}</Card.Link>
          </LinkContainer>
        );
      });
    }

    return (
      <Card style={ { width: '100%', marginBottom: '1em' } }>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
          <Card.Text>
            {this.props.description}
          </Card.Text>
          {/* <Card.Link href="#">Edit</Card.Link> */}

          {/* <LinkContainer to="/projects/1/transcripts">
            <Card.Link>Transcripts</Card.Link>
          </LinkContainer>

          <LinkContainer to="/projects/1/paperedits">
            <Card.Link>Paper-Edits</Card.Link>
          </LinkContainer> */}

          {links}

          {/* <LinkContainer to="/projects/1/paperedits"> */}
          <Card.Link>
            <Button variant="danger" size="sm">
              {/* TODO replace with bin icon  */}
              <FontAwesomeIcon icon={ faTrash } />
            </Button>
          </Card.Link>
          {/* </LinkContainer> */}

        </Card.Body>
      </Card>

    );
  }
}

export default CustomCard;
