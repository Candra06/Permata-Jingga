import React, { Component } from "react";

class Footer extends Component {
  
  render() {
    return (
        <footer className="main-footer">
        <strong>Copyright &copy; Wargaku </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>RW</b> Page
        </div>
      </footer>
    );
  }
}
 
export default Footer;