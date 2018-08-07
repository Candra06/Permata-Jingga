import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
class Logout extends Component {

  render() {
    localStorage.removeItem("nama", "");
    localStorage.removeItem("nik", "");
    localStorage.removeItem("level", "");
    localStorage.clear();
    return (<Redirect to="/"/>)
  }
}

export default Logout;
