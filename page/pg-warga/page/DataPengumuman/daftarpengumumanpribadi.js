import React from 'react';
import orderBy from 'lodash/orderBy';
import Listpengumumanpribadi from './listpengumumanpribadi';
import { RefPengumuman } from './../../../../db';

export default class daftarpengumumanumum extends React.Component {
  state = {
    tasks: [], tasksLoading: true 
  };

  componentDidMount() {
    RefPengumuman.orderByChild("kd_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
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
      tasks,['time_notif'], ['desc']
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        
        <div className="active tab-pane" id="activity">
          {orderedTasks.map(task => (
            <Listpengumumanpribadi key={task.key} task={task} />
          ))}
       
       </div>
      );
    
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Pengumuman Pribadi</div>;
    }

    return taskList;
  }
}