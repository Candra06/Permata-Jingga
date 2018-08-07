import React, { Component } from 'react';
import image from "../../../asset/img/bg2.jpg";
import orderBy from 'lodash/orderBy';
import { RefBlog } from './../../../db';
import ListEvent from "./dataEvent/listEvent";
class EventPage extends Component {
    state = {
    tasks: [],
    tasksLoading: true
  };

  componentDidMount() {
    RefBlog.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }
  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks,
      ['ordertime'],['desc']
    );
    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 2 + 'em', marginLeft: 50 + '%'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
  }else if(tasks.length){
      taskList=<div className="container-fluid" id='blog'>
         <div className="row">
             <div className='col-12'>
               <h2 className="text-center">Blog</h2>
             </div>
             {orderedTasks.map(task => (
             <ListEvent key={task.key} task={task} />
           ))}
         </div>
      </div>;
    }else{
      taskList = <div className="TaskList-empty">Tidak Ada Blog</div>;
    }
    return taskList;
  }
}

export default EventPage;
