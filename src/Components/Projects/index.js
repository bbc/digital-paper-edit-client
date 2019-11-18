import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from '@bbc/digital-paper-edit-react-components/Breadcrumb';
import CustomFooter from '../lib/CustomFooter';
import ItemsContainer from '../lib/ItemsContainer';
import Collection from '../Firebase/Collection';
import { withAuthorization } from '../Session';
import { PROJECTS } from '../../constants/routes';

const Projects = props => {
  const [ uid, setUid ] = useState();
  const [ loading, setIsLoading ] = useState(false);
  const [ items, setItems ] = useState([]);
  const type = 'Project';
  const api = new Collection(props.firebase.db, PROJECTS);

  const createProject = async item => {
    item.users = [ uid ];
    const docRef = await api.postItem(item);

    item.url = `/projects/${ docRef.id }`;
    docRef.update({
      url: item.url
    });

    item.display = true;

    return item;
  };

  const updateProject = async (id, item) => {
    await api.putItem(id, item);
    item.display = true;

    return item;
  };

  const handleSave = async item => {
    if (item.id) {
      return await updateProject(item.id, item);
    } else {
      return await createProject(item);
    }
  };

  const deleteProject = async id => {
    try {
      await api.deleteItem(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = id => {
    deleteProject(id);
  };

  useEffect(() => {
    const getUserProjects = async () => {
      try {
        api.userRef(uid).onSnapshot(snapshot => {
          const projects = snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id, display: true };
          });
          setItems(projects);
        });
      } catch (error) {
        console.log('Error getting documents: ', error);
      }
    };

    const authListener = props.firebase.onAuthUserListener(
      authUser => {
        if (authUser) {
          setUid(authUser.uid);
        }
      },
      () => setUid()
    );

    if (uid && !loading) {
      getUserProjects(uid);
      setIsLoading(true);
    }

    return () => {
      authListener();
    };
  }, [ api, items, loading, props.firebase, uid ]);

  const breadcrumbItems = [
    {
      name: `${ type }s`,
      link: `/${ type }s`
    }
  ];

  console.log(items);

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
        {items ? (
          <ItemsContainer
            key={ type }
            model={ type }
            items={ items }
            handleSave={ handleSave }
            handleDelete={ handleDelete }
          />
        ) : null}
      </Container>
      <CustomFooter />
    </>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Projects);
