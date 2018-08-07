import React from 'react';
import orderBy from 'lodash/orderBy';
import Listpengurus from './listpengurus';
import { RefWarga, RefPengurus, RefUser } from './../../../../db';

export default class daftarpengurus extends React.Component {
  state = {
    tasks: [], tasksLoading: true, email:'', password:''
  };

  componentWillMount() {
    RefPengurus.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        RefUser.orderByChild("nik").equalTo(shot.val().nik).on('value', snap =>{
          snap.forEach(shott => {
            no++;
            tasks.push({ ...shott.val(), keyUser:shott.key, ...shot.val(),  key: shot.key, nomer: no });
            // this.setState({ password:shott.val().password })
            console.log({key: shot.key})
          })
          this.setState({ tasks, tasksLoading: false });
        });

        // tasks.push({ ...shot.val(), key: shot.key, nomer: no });
        
      });
      
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
                        <th scope="col">Nama Pengurus</th>
                        <th scope="col">Jabatan</th>
                        <th scope="col">No HP</th>
                        <th scope="col">Email</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listpengurus key={task.key} task={task} keyUser={task.keyUser}/>
          ))}
        </tbody>
        </table>
        </div>
      );

    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Warga</div>;
    }

    return taskList;
  }
}
