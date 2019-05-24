import React from 'react';
import SimpleCard from '../SimpleCard';

class List extends React.Component {

  render() {
    let listItems;
    // if (listItems) {
    listItems = this.props.items.map((item) => {
      if (item.display) {
        return <SimpleCard
          key={ item.id }
          id={ item.id }
          title={ item.title }
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
      <section style={ { height: '75vh', overflow: 'scroll' } }>
        {listItems}
      </section>
    </>
    );
  }
}

export default List;
