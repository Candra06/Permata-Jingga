import React from 'react';
import { rootRef, RefBlog } from './../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../partials/header.js";
import Footer from "../partials/footer.js"
import ViewBlog from "./viewBlog"

export default class detailEvent extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      tasks:[]
    }
  }
    componentWillMount(){
      //console.log(localStorage.getItem("kd_event"));
      RefBlog.orderByChild("kd_event").equalTo(localStorage.getItem("kd_event")).on("value", snap => {
        const tasks= []
        snap.forEach(shot => {
          tasks.push({ ...shot.val(), key: shot.key });
         // console.log(shot.val());
        })
        this.setState({ tasks, tasksLoading: false });
      })
    }
    load(){
      //console.log(localStorage.getItem("kd_event"));
      //console.log(this.state);
    }
  render() {
    const {tasks}  = this.state;
    return (
      <div>
      <Header/>
        <div className="container">
          <div className="row">
            
          {tasks.map(task => (
               <ViewBlog task={task} key={task.key}/>
              ))}

          </div>
        </div>
      <Footer/>
      </div>
    );
  }
}
