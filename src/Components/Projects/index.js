import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import CustomFooter from '../lib/CustomFooter';
import ApiWrapper from '../../ApiWrapper/index.js';
import PageView from '../lib/PageView';
import { useStateValue } from '../../State';

const Projects = () => {
  const [ { projects }, dispatch ] = useStateValue();
  const model = 'Project';

  const createProject = async (item) => {
    const response = await ApiWrapper.createProject(item);
    if (response.status === 'ok') {
      // Server returns project with UID generated server side
      // need to add display true attribute for search to the new project
      const newProject = response.project;
      newProject.display = true;
      dispatch.projects({ type: 'add', newItem: response.project });
    } else {
      console.error('Failed to add project', item);
    }
  };

  const updateProject = async (item) => {
    const response = await ApiWrapper.updateProject(item.id, item); if (response.status === 'ok') {
      const project = response.project;
      // need to add display true attribute for search to the new project
      project.display = true;
      // // Server returns project with UID generated server side
      const index = projects.findIndex(element => element.id === project.id);
      const newProjects = projects;

      newProjects[index] = project;
      dispatch.projects({ type: 'update', projects: newProjects });
    }
  };

  const handleSave = async (item) => {
    if (item.id) {
      return await updateProject(item);
    } else {
      return await createProject(item);
    }
  };

  const handleDelete = async (id) => {
    const result = await ApiWrapper.deleteProject(id);
    if (result.ok) {
      const newItemsList = projects.filter((p) => {
        return p.id !== id;
      });
      dispatch.projects({ type: 'update', projects: newItemsList });
    } else {
      // TODO: some error handling, error message saying something went wrong
    }
  };

  useEffect(() => {

    const getProjects = async () => {
      const allProjects = await ApiWrapper.getAllProjects();
      const extendedProjects = allProjects.map(project => {
        const id = project.id;
        project.key = id;
        project.url = `/projects/${ id }`;
        project.display = true;

        return project;
      });
      dispatch.projects({ type: 'update', projects: extendedProjects });
    };

    if (!projects ) {

      getProjects();
    }

    return () => {
    };

  }, [ dispatch, projects ]);

  const breadcrumbItems = [
    {
      name: `${ model }s`,
      link: `/${ model }s`,
    }
  ];

  return (
    <>
      <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb items={ breadcrumbItems } />;
          </Col>
        </Row>
        {/* <PageView
          model={ model }
          handleSave={ handleSave }
          handleDelete={ handleDelete }
        /> */}
      </Container>
      <CustomFooter />
    </>
  );
};
export default Projects;
