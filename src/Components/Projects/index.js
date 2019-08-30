import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListPage from '../lib/ListPage';
import ItemFormModal from '../lib/ItemFormModal';
import CustomBreadcrumb from '../lib/CustomBreadcrumb';
import CustomFooter from '../lib/CustomFooter';
import ApiWrapper from '../../ApiWrapper/index.js';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isNewItemModalShow: false,
      title: '',
      description: '',
      itemId: null
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  async componentDidMount () {
    try {
    // TODO: do we need to add user id in request?
      const result = await ApiWrapper.getAllProjects();

      if (result) {
      // add a display property for component cards search
        const tmpList = result.map(project => {
          project.display = true;

          return project;
        });
        this.setState({ items: tmpList });
      }
    } catch (e) {
      console.log('Error with ApiWrapper.getAllProjects', e);
    }
    // TODO: some error handling
  };

  // The form works both for new/create and edit/update
  handleSaveItem = (item) => {
    if (!item.id) {
      ApiWrapper.createProject(item).then(response => {
        if (response.status === 'ok') {
          // Server returns project with UID generated server side
          const projects = [ ...this.state.items ];
          // need to add display true attribute for search to the new project
          const newProject = response.project;
          newProject.display = true;
          projects.push(response.project);
          this.setState({
            isNewItemModalShow: false,
            items: projects,
            // reset item form
            title: '',
            itemId: null,
            description: ''
          });
        }
      });
    }
    else {
      ApiWrapper.updateProject(item.id, item).then(response => {
        if (response.status === 'ok') {
          const project = response.project;
          // need to add display true attribute for search to the new project
          project.display = true;
          // // Server returns project with UID generated server side
          const { items } = this.state;
          this.findItemById(items, item);
          const projectIndex = this.state.items.findIndex(element => element.id === project.id);
          items[projectIndex] = project;
          this.setState({
            isNewItemModalShow: false,
            items: items,
            // reset item form
            title: '',
            itemId: null,
            description: ''
          });
        }
      });
    }
  }

  findItemById = (list, id) => {
    const result = list.filter((p) => {
      return p.id === id;
    });

    return result[0];
  }

  handleEditItem = (itemId) => {
    const item = this.findItemById(this.state.items, itemId);
    this.setState({
      title: item.title,
      itemId: item.id,
      description: item.description,
      isNewItemModalShow: true
    });
    console.log('edit item', item);
  }

  async handleDeleteItem(itemId) {
    const result = await ApiWrapper.deleteProject(itemId);
    if (result.ok) {
      const newItemsList = this.state.items.filter((p) => {
        return p.id !== itemId;
      });
      this.setState({ items: newItemsList });
    } else {
      // TODO: some error handling, error message saying something went wrong
    }
  }

  showLinkPathToItem = (id) => {
    return `/projects/${ id }`;
  }

  handleUpdateList = (list) => {
    this.setState({ items: list });
  }

  handleShowCreateNewItemForm = () => {
    // return '/projects/new';
    this.setState({ isNewItemModalShow: true });
  };

  handleCloseModal = () => {
    this.setState({
      title:'',
      itemId: null,
      description: '',
      isNewItemModalShow: false
    });
  }

  render() {
    return (<>
      <Container style={ { marginBottom: '5em', marginTop: '1em' } }>
        <Row>
          <Col sm={ 12 } md={ 12 } ld={ 12 } xl={ 12 }>
            <CustomBreadcrumb items={ [
              {
                name: 'Projects'
              }
            ] } />
          </Col>
        </Row>
        <ListPage
          model={ 'Project' }
          items={ this.state.items }
          handleShowCreateNewItemForm={ this.handleShowCreateNewItemForm }
          deleteItem={ this.createNew }
          editItem={ this.createNew }
          handleEdit={ this.handleEditItem }
          handleDelete={ this.handleDeleteItem }
          showLinkPath={ this.showLinkPathToItem }
          handleUpdateList={ this.handleUpdateList }
        />
        <ItemFormModal
          title={ this.state.title }
          description={ this.state.description }
          id={ this.state.itemId }
          modalTitle={ this.state.itemId ? 'Edit Project' : 'New Project' }
          show={ this.state.isNewItemModalShow }
          handleCloseModal={ this.handleCloseModal }
          handleSaveForm={ this.handleSaveItem }
        />
      </Container>
      <CustomFooter/>
    </>
    );
  }
}

export default Projects;
