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
import arrayMatch from '../../Util/array-match';

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
  const [ id, setId ] = useState(props.match.params.projectId);
  const [ active, setActive ] = useState('transcripts');
  const [ { projects }, dispatch ] = useStateValue();
  const [ items, setItems ] = useState([]);
  const [ breadcrumb, setBreadcrumb ] = useState(genBreadcrumb('Project Name'));

  useEffect(() => {
    const getProjectName = () => {
      const result = items.find(p => p.id === id);
      if (result) {
        console.log(result);
        const bc = genBreadcrumb(result.title);
        setBreadcrumb(bc);
      }
    };
    if (!arrayMatch(projects.items, items)) {
      setItems(projects.items);
      getProjectName();
    }

    return () => {
    };

  }, [ id, items, projects.items ]);

  return (
    <>
      <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb items={ breadcrumb } />
          </Col>
        </Row>

        <Tabs
          id="controlled-tab-example"
          activeKey={ active }
          onSelect={ tab => setActive(tab) }
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