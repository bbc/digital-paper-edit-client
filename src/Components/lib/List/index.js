import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import SimpleCard from '../SimpleCard';

class List extends React.Component {

  render() {

    const listItems = this.props.items.map((item) => {
      if (item.display) {
        return <SimpleCard
          key={ item.id }
          id={ item.id }
          title={ item.title }
          icon={ this.props.icon }
          description={ item.description }
          handleEdit={ this.props.handleEdit }
          handleDelete={ this.props.handleDelete }
          showLinkPath={ this.props.showLinkPath }
        />;
      } else {
        return null;
      }
    }).filter(item => {
      return item !== null;
    });

    return (<>
      <ListGroup 
      style={ { height: '75vh', overflow: 'scroll' } } 
      // variant="flush"
      >
        {listItems}
      </ListGroup>
    </>
    );
  }
}

export default List;
