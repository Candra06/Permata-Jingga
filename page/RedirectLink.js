import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { RefWarga } from './../db';
class RedirectLink extends Component {
  constructor(props){
    super(props);
    this.state = {
      link:'',
      redirect:false
    }
  }
  componentWillMount(){
    if(localStorage.getItem("level") === 'Admin' || localStorage.getItem("level") === "Satpam"){
      this.setState({redirect:true});
    }else{
      RefWarga.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
        const tasks = [];
        snap.forEach(shot => {
          localStorage.setItem("no_kk", shot.val().no_kk);
          localStorage.setItem("nama", shot.val().nama);
          //console.log("work");
        });
          this.setState({redirect:true});
      })
    }

    this.setState({redirect:true});
  }
  render() {
    if(this.state.redirect){
      return (<Redirect to={localStorage.getItem("link")}/>)
    }
    return (
      <div>
        <h2>Redirecting</h2>
      </div>
    );
  }
}

export default RedirectLink;
