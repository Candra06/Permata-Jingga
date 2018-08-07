import React from 'react';
import orderBy from 'lodash/orderBy';
import Liskuser from './listakunadmin';
import { RefUser } from './../../../../db';
export default class daftarakunadmin extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
    RefUser.orderByChild("level").on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        if(shot.val().level === "Admin" || shot.val().level === "Satpam"){
          no++;
            tasks.push({ ...shot.val(), key: shot.key, nomer:no });
        }else{
        }
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }

  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Email</th>
                        <th scope="col">Level</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Liskuser key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Akun</div>;
    }

    return taskList;
  }
}