import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomFooter from '../lib/CustomFooter';
import Transcripts from './Transcripts';
import PaperEdits from './PaperEdits';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import { useStateValue } from '../../State';

const WorkspaceView = (props) => {

  const [ id, setId ] = useState(props.match.params.projectId);
  const [ name, setName ] = useState('Projects Name');
  const [ key, setKey ] = useState('transcripts');

  const [ { projects }, dispatch ] = useStateValue();

  useEffect(() => {
    const findProject = () => {
      return projects.items.find(p => p.id === id);
    };

    const getProject = async() => {
      const result = findProject();
      if (result) {
        setName(result.title);
      }
    };

    if (projects && projects.items)
      getProject();

    return () => {
    };
  }, [ id, projects ]);

  return (
    <>
      <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb items={ [
              {
                name: 'Projects',
                link: '/projects'
              },
              {
                name: name
              }
            ] } />
          </Col>
        </Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={ key }
          onSelect={ k => setKey(k) }
        >
          <Tab eventKey="transcripts" title="Transcripts">
            <Transcripts projectId={ id }/>
          </Tab>
          <Tab eventKey="paperedits" title="Paper Edits">
            <PaperEdits projectId={ id } />
          </Tab>
        </Tabs>
      </Container>

      <CustomFooter/>
    </>
  );
};

export default WorkspaceView;