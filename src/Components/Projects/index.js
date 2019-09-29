import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import CustomFooter from '../lib/CustomFooter';
import ApiWrapper from '../../ApiWrapper/index.js';
import ItemsContainer from '../lib/ItemsContainer';
import { useStateValue } from '../../State';
import arrayMatch from '../../Util/array-match';

const Projects = () => {
  const [ { projects }, dispatch ] = useStateValue();
  const [ isFetch, setIsFetch ] = useState(false);
  const [ items, setItems ] = useState([]);

  const type = 'Project';

  const createProject = async (item) => {
    const response = await ApiWrapper.createProject(item);
    if (response.status === 'ok') {
      const newProject = response.project;
      newProject.display = true;
      dispatch({ type: 'add', newItem: newProject });
    } else {
      console.error('Failed to add project', item);
    }
  };

  const updateProject = async (id, item) => {
    const response = await ApiWrapper.updateProject(id, item);

    if (response.status === 'ok') {
      const project = response.project;
      project.display = true;
      dispatch({ type: 'updateItem', id: item.id, item: project });
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
      response = await ApiWrapper.deleteProject(id);
    } catch (e) {
      console.log(e);
    }
    console.log('ApiWrapper.deleteProject', response);

    return response;
  };

  const handleDelete = (id) => {
    console.log('handle delete');
    const response = deleteProject(id);
    if (response.ok) {
      dispatch({ type: 'delete', id: id });
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      let allProjects = [];

      try {
        const result = await ApiWrapper.getAllProjects();
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

      dispatch({ type: 'update', items: allProjects });
      setItems(projects.items);
    };

    if (!isFetch) {
      console.log('getting projects at least once');
      getProjects();
      setIsFetch(true);
    }

    if (!arrayMatch(projects.items, items)) {
      setItems(projects.items);
    }

    return () => {
    };

  }, [ dispatch, isFetch, items, projects.items ]);

  const breadcrumbItems = [
    {
      name: `${ type }s`,
      link: `/${ type }s`,
    }
  ];

  return (
    <>
      <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb items={ breadcrumbItems } />
          </Col>
        </Row>
        <ItemsContainer
          key={ type }
          model={ type }
          items={ items }
          handleSave={ () => handleSave }
          handleDelete={ () => handleDelete }
        />
      </Container>
      <CustomFooter />
    </>
  );
};
export default Projects;
