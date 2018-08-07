import React from 'react';
import orderBy from 'lodash/orderBy';
import Listwarga from './listwarga';
import { RefWarga } from './../../../../db';

export default class daftarwarga extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
    let nokku = "";
    RefWarga.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      //const tasks = [];
      snap.forEach(shott => {
       // console.log("datanya:", shott.val())
        //tasks.push({ ...shot.val(), key: shot.key });
        
    RefWarga.orderByChild("no_kk").equalTo(shott.val().no_kk).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer: no });
      });
      this.setState({ tasks, tasksLoading: false });
    });
      });
      //this.setState({ tasks, tasksLoading: false });
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
                        <th scope="col">Nama Warga</th>
                        <th scope="col">NIK</th>
                        <th scope="col">Status Keluarga</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listwarga key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );

    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Keluarga</div>;
    }

    return taskList;
  }
}
