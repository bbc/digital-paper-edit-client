import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Page from '../lib/Page';
import FormModal from '@bbc/digital-paper-edit-react-components/FormModal';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import CustomFooter from '../lib/CustomFooter';
import ApiWrapper from '../../ApiWrapper/index.js';

const Projects = () => {
  const [ items, setItems ] = useState();
  const [ showModal, setShowModal ] = useState(false);

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ itemId, setItemId ] = useState(null);

  const getItems = async () => {
    const projects = await ApiWrapper.getAllProjects();
    const projectsDisplayOn = projects.map(project => {
      project.display = true;
      const id = project.id;

      project.key = id;
      project.url = `/projects/${ id }`;

      return project;
    });

    setItems(projectsDisplayOn);
  };

  useEffect(() => {
    getItems();

    return () => {
    };

  }, []);

  const resetItemForm = () => {
    setTitle('');
    setItemId(null);
    setDescription('');

  };

  // The form works both for new/create and edit/update
  const handleSaveItem = async (item) => {
    if (!item.id) {

      const response = await ApiWrapper.createProject(item);

      if (response.status === 'ok') {
        // Server returns project with UID generated server side
        // need to add display true attribute for search to the new project
        const newProject = response.project;
        newProject.display = true;
        const projects = items;
        projects.push(response.project);

        setShowModal(false);
        setItems(projects);
        resetItemForm();
      }
    }
    else {
      const response = await ApiWrapper.updateProject(item.id, item);
      if (response.status === 'ok') {
        const project = response.project;
        // need to add display true attribute for search to the new project
        project.display = true;
        // // Server returns project with UID generated server side
        const index = items.findIndex(element => element.id === project.id);

        const projects = items;
        projects[index] = project;
        setItems(projects);
        setShowModal(false);
        resetItemForm();
      }
    }
  };

  const findItemById = (list, id) => {
    const result = list.filter((p) => {
      return p.id === id;
    });

    return result[0];
  };

  const handleEditItem = (id) => {
    const item = findItemById(items, id);
    setItemId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setShowModal(true);
  };

  const handleDeleteItem = async (id) => {
    const result = await ApiWrapper.deleteProject(id);
    if (result.ok) {
      const newItemsList = items.filter((p) => {
        return p.id !== id;
      });
      setItems(newItemsList);
    } else {
      // TODO: some error handling, error message saying something went wrong
    }
  };

  return (
    <>
      <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
        <Row>
          <Col sm={ 12 }>
            <Breadcrumb items={ [
              {
                name: 'Project'
              }
            ] } />
          </Col>
        </Row>
        <Page
          model={ 'Project' }
          items={ items }
          handleShowModal={ setShowModal }
          handleEdit={ handleEditItem }
          handleDelete={ handleDeleteItem }
          handleUpdateList={ setItems }
        />
        <FormModal
          id={ itemId }
          title={ title }
          description={ description }
          modalTitle={ itemId ? 'Edit Project' : 'New Project' }
          showModal={ showModal }
          handleSaveForm={ handleSaveItem }
          itemType={ 'project' }
        />
      </Container>
      <CustomFooter/>
    </>
  );

};
export default Projects;
