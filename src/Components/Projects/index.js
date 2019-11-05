import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import CustomFooter from '../lib/CustomFooter';
import ItemsContainer from '../lib/ItemsContainer';
import ApiContext from '../../Context/ApiContext';

const Projects = () => {
  const [ isFetch, setIsFetch ] = useState(false);
  const [ items, setItems ] = useState([]);

  const type = 'Project';
  const api = useContext(ApiContext);

  const createProject = async item => {
    const response = await api.createProject(item);
    if (response.status === 'ok') {
      const newProject = response.project;
      newProject.display = true;
      setIsFetch(false);
    } else {
      console.error('Failed to add project', item, response);
    }
  };

  const updateProject = async (id, item) => {
    const response = await api.updateProject(id, item);

    if (response.status === 'ok') {
      const project = response.project;
      project.display = true;
      setIsFetch(false);
    } else {
      console.error('Failed to update project', response);
    }
  };

  const handleSave = item => {
    if (item.id) {
      return updateProject(item.id, item);
    } else {
      return createProject(item);
    }
  };

  const deleteProject = async id => {
    let response;
    try {
      response = await api.deleteProject(id);
    } catch (e) {
      console.log(e);
    }

    return response;
  };

  const handleDelete = id => {
    const response = deleteProject(id);
    if (response.ok) {
      setIsFetch(false);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      let allProjects = [];

      try {
        const result = await api.getAllProjects();
        allProjects = result.map(project => {
          const id = project.id;
          project.key = id;
          project.url = `/projects/${ id }`;
          project.display = true;

          return project;
        });
      } catch (e) {
        console.log('Failed to get projects');
      }

      setItems(allProjects);
    };

    if (!isFetch) {
      getProjects();
      setIsFetch(true);
    }

    console.log('Project effect', items);

    return () => {};
  }, [ api, isFetch, items ]);

  const breadcrumbItems = [
    {
      name: `${ type }s`,
      link: `/${ type }s`
    }
  ];

  return (
    <>
      <Container
        data-testid="projectsContainer"
        style={ { marginBottom: '5em', marginTop: '1em' } }
      >
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb
              data-testid="projectsBreadcrumb"
              items={ breadcrumbItems }
            />
          </Col>
        </Row>
        <ItemsContainer
          key={ type }
          model={ type }
          items={ items }
          handleSave={ handleSave }
          handleDelete={ handleDelete }
        />
      </Container>
      <CustomFooter />
    </>
  );
};
export default Projects;
