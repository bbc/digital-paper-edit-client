import React from 'react';
import Alert from 'react-bootstrap/Alert';

// https://react-bootstrap.netlify.com/components/alerts/#dismissing
class CustomAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  handleDismiss = () => this.setState({ show: false });

  render() {
    if (this.state.show) {
      return (
        <Alert variant={this.props.variant} onClose={this.handleDismiss} dismissible>
          {this.props.heading ? <Alert.Heading>{this.props.heading}</Alert.Heading> : ''}
          {this.props.message}
          {this.props.children}
        </Alert>
      );
    } else {
      return (
        <>
          <br />
        </>
      );
    }
  }
}

export default CustomAlert;
