import React, { Component } from 'react';
import { Switch ,Route,BrowserRouter } from "react-router-dom";
import './index.module.css';

class Users extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       transcriptJson: null
//     }

//   }

//   componentDidMount = () =>{
//     fetch('http://localhost:5000/api/1/transcripts/1', { mode: 'cors' })
//     .then(res => res.json())
//     .then((json)=>{
//       this.setState({transcriptJson: json})
//     })
//   }

  render() {
    return (
    <div className="">
        <h1>Users</h1>
        List of users
      </div>
    );
  }
}

export default Users;
