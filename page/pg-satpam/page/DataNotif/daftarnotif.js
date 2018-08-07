import React from 'react';
import orderBy from 'lodash/orderBy';
import Listnotif from './listnotif';
import { rootRef } from './../../../../db';

export default class daftarwarga extends React.Component {
  state = {
    tasks: [],
    tasksLoading: true
  };

  componentDidMount() {

    rootRef.child("Notifikasi").orderByChild("nik_penerima").equalTo("Satpam").on('value', snap => {
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
        <div className="tab-pane" id="timeline">
            <ul className="timeline timeline-inverse">

          {orderedTasks.map(task => (
            <Listnotif key={task.key} task={task} />
          ))}
          </ul>
        </div>
      );

    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Notifikasi</div>;
    }
    return taskList;
  }
}
