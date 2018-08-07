import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
class Nav extends Component {

  constructor(props){
    super(props);
    this.state = {
      link:'',
      redirect:false
    }
  }

  componentWillMount(){
    if(localStorage.getItem('level') === null){
      this.setState({link :"/"});
      this.setState({redirect:true});
      console.log("anda harus login");
    }else if(localStorage.getItem("level") === "RT"){
        this.setState({link:"/RT/Home"});
        this.setState({redirect:false});
        console.log("RT");
    }else if(localStorage.getItem("level") === "Admin"){
      this.setState({link:"/Admin/Home"});
      this.setState({redirect:true});
      console.log("ADMIN");
    }else if(localStorage.getItem("level") === "Warga"){
      this.setState({link:"/Warga/Home"});
      this.setState({redirect:true});
      console.log("Warga");
    }else if(localStorage.getItem("level") === "RW"){
      this.setState({link:"/RW/Home"});
      this.setState({redirect:true});
      console.log("RW");
    }else if(localStorage.getItem("level") === "Satpam"){
      this.setState({link:"/Security/Home"});
      this.setState({redirect:false});
      console.log("RW");
    }
  }
  render() {
    if(this.state.redirect){
      return (<Redirect to={this.state.link}/>)
   }
    return (
        <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href=""><i className="fa fa-bars"></i></a>
            </li>
            {/* <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link">Home</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="" className="nav-link">Contact</a>
            </li> */}
          </ul>

          {/* <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-slide="true" href=""><i
                  className="fa fa-th-large"></i></a>
            </li>
          </ul> */}
        </nav>
    );
  }
}

export default Nav;
