import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomFooter from '../lib/CustomFooter';
import Transcripts from './Transcripts';
import PaperEdits from './PaperEdits';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';

import ApiContext from '../../ApiContext';

const genBreadcrumb = (name) => [
  {
    name: 'Projects',
    link: '/projects'
  },
  {
    name: name
  }
];

const WorkspaceView = (props) => {
  const api = useContext(ApiContext);
  const id = props.match.params.projectId;

  const [ active, setActive ] = useState('transcripts');
  const [ name, setName ] = useState('Project Name');

  useEffect(() => {

    const getProjectName = async () => {
      try {
        const response = await api.getProject(id);
        setName(response.project.title);
      } catch (e) {
        console.error('Could not get Project Id: ', id, e );
      }
    };

    getProjectName();

    return () => {
    };

  }, [ api, id, name ]);

  return (
    <ApiContext.Consumer>
      { () => (
        <>
          <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
            <Row>
              <Col sm={ 12 }>
                <Breadcrumb items={ genBreadcrumb(name) } />
              </Col>
            </Row>

            <Tabs
              id="controlled-tab-example"
              activeKey={ active }
              onSelect={ tab => setActive(tab) }
            >
              <Tab eventKey="transcripts" title="Transcripts">
                <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
                  <Transcripts projectId={ id }/>
                </Container>
              </Tab>

              <Tab eventKey="paperedits" title="Paper Edits">
                <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
                  <PaperEdits projectId={ id } />
                </Container>
              </Tab>
            </Tabs>

          </Container>
          <CustomFooter />
        </>
      ) }

    </ApiContext.Consumer>
  );
};

export default WorkspaceView;