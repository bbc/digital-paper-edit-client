import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';

class CustomBreadcrumb extends Component {

  render() {
    const breadcrumbs = this.props.items.map((item, index) => {
      if (item.link) {
        return (
          <LinkContainer key={ index } to={ item.link }>
            <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
          </LinkContainer>
        );
      } else {
        return (
          <Breadcrumb.Item key={ index } active>
            {item.name}
          </Breadcrumb.Item>
        );
      }
    });

    return (
      <>
      <style scoped>
        {`
        .breadcrumb{ 
          background-color: ${this.props.backgroundColor};
          ${this.props.backgroundColor? ' margin: 0px':''} 
          }
        `}
      </style>
      <div
      // className="d-none d-sm-block"
      >
        <Breadcrumb>
          {breadcrumbs}
        </Breadcrumb>
      </div>
      </>
    );
  }
}

export default CustomBreadcrumb;
