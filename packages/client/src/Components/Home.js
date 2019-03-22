import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import './Home.module.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';

import { LinkContainer } from 'react-router-bootstrap';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import CustomNavbar from './lib/CustomNavbar/index.js';
import CustomFooter from './lib/CustomFooter/index.js';

class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       transcriptJson: null
//     }

  //   }

  //   componentDidMount = () =>{
  //     fetch('http://localhost:5000/api/1/transcripts/1', { mode: 'cors' })
  //     .then(res => res.json())
  //     .then((json)=>{
  //       this.setState({transcriptJson: json})
  //     })
  //   }
  render() {
    return (
      <Container>
        <CustomNavbar/>
        <br/><br/>
        {/* TBC add some info about what the app, is how to use, signing in etc.. */}

        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
          </p>
          <p>

            <LinkContainer to={ '/projects' }>
              <Button variant="primary">Projects</Button>
            </LinkContainer>

            {/* <LinkContainer to={ '/projects' }>
              <Button variant="primary">Learn more</Button>
            </LinkContainer> */}
          </p>
        </Jumbotron>

        <CustomFooter />
      </Container>
    );
  }
}

export default Home;
