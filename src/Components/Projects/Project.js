import React from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomBreadcrumb from '../lib/CustomBreadcrumb';
import Transcripts from '../Transcripts';
import PaperEdits from '../PaperEdits';
import ApiWrapper from '../../ApiWrapper/index.js';

class Project extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // for use in react-bootstrap tab component
      key: 'transcripts',
      projectId: this.props.match.params.projectId,
      projectName: 'Projects Name',
    };
  }

  async componentDidMount() {
    // TODO: do we need to add user id in request?
    const result = await ApiWrapper.getProject(this.state.projectId);
    if (result) {
      this.setState({ projectName: result.project.title });
    }
    // TODO: some error handling
  }

  render() {
    return (
      <>
        <Container style={{ marginBottom: '5em', marginTop: '1em' }}>
          <Row>
            <Col sm={12} md={12} ld={12} xl={12}>
              <CustomBreadcrumb
                items={[
                  {
                    name: 'Projects',
                    link: '/projects',
                  },
                  {
                    name: this.state.projectName,
                  },
                ]}
              />
            </Col>
          </Row>
          <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
            <Tab eventKey="transcripts" title="Transcripts">
              <Transcripts projectId={this.state.projectId} />
            </Tab>
            <Tab eventKey="paperedits" title="Paper Edits">
              <PaperEdits projectId={this.state.projectId} />
            </Tab>
          </Tabs>
        </Container>
        {/* <CustomFooter/> */}
      </>
    );
  }
}

export default Project;
