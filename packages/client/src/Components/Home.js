import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import './Home.module.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';

import { LinkContainer } from 'react-router-bootstrap';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import CustomNavbar from './lib/CustomNavbar/index.js';
import CustomFooter from './lib/CustomFooter/index.js';

const Home = () => {

  return (
    <Container>
      <CustomNavbar
        links={ [
          {
            name: 'Projects',
            link: '/projects'
          },
          {
            name: 'New Projects',
            link: '/projects/new'
          }
        ] }
      />
      <br/><br/>
      {/* TBC add some info about what the app, is how to use, signing in etc.. */}
      <Jumbotron>
        <h1>{ process.env.REACT_APP_NAME }</h1>
        <p>
            Some explanation text on how to make the most of this app
        </p>
        <p>
          <ButtonToolbar>
            <LinkContainer to={ '/projects' }>
              <Button variant="link">Projects</Button>
            </LinkContainer>

            <LinkContainer to={ '/projects/new' }>
              <Button variant="link">New Projects</Button>
            </LinkContainer>
          </ButtonToolbar>
        </p>
      </Jumbotron>
      <CustomFooter />
    </Container>
  );

};

export default Home;
