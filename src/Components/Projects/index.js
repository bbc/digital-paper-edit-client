import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import CustomFooter from '../lib/CustomFooter';
import ItemsContainer from '../lib/ItemsContainer';
import ApiContext from '../../Context/ApiContext';
import { deleteItem, updateItem, addItem } from '../../Context/reducers';

const Projects = () => {
  const [ isFetch, setIsFetch ] = useState(false);
  const [ items, setItems ] = useState([]);

  const type = 'Project';
  const api = useContext(ApiContext);

  const createProject = async (item) => {
    const response = await api.createProject(item);
    if (response.ok) {
      const newProject = response.project;
      newProject.display = true;
      const newItems = addItem(newProject, items);
      setItems(newItems);
    } else {
      console.error('Failed to add project', item);
    }
  };

  const updateProject = async (id, item) => {
    const response = await api.updateProject(id, item);

    if (response.ok) {
      const project = response.project;
      project.display = true;
      const newItems = updateItem(id, project, items);
      setItems(newItems);
    }
  };

  const handleSave = async (item) => {
    if (item.id) {
      return await updateProject(item.id, item);
    } else {
      return await createProject(item);
    }
  };

  const deleteProject = async (id) => {
    let response;
    try {
      response = await api.deleteProject(id);
    } catch (e) {
      console.log(e);
    }
    console.log('api.deleteProject', response);

    return response;
  };

  const handleDelete = (id) => {
    console.log('handle delete');
    const response = deleteProject(id);
    if (response.ok) {
      const newItems = deleteItem(id, items);
      setItems(newItems);
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

    return () => {
    };

  }, [ api, isFetch, items ]);

  const breadcrumbItems = [
    {
      name: `${ type }s`,
      link: `/${ type }s`,
    }
  ];

  return (
    <>
      <Container
        data-testid='projectsContainer'
        style={ { marginBottom: '5em', marginTop: '1em' } }>
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb
              data-testid='projectsBreadcrumb'
              items={ breadcrumbItems } />
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
