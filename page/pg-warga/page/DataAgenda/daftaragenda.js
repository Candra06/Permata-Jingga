import React from 'react';
import orderBy from 'lodash/orderBy';
import Listagenda from './listagenda';
import { RefAgenda, rootRef } from './../../../../db';
export default class daftaragenda extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
    let no = 0;
    rootRef.child('PesertaAgenda').orderByChild("kd_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
        
      snap.forEach(shot => {
        if(shot.val().status_agenda === "Hapus"){
        }else{
          no++;
        }
      });
     // this.setState({ tasks, tasksLoading: false });
    });
    rootRef.child('PesertaAgenda').orderByChild("kd_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        if(shot.val().status_agenda === "Hapus"){

        }else{
          //no++;
            tasks.push({ ...shot.val(), key: shot.key, nomer: no-- });
        }
      });
      this.setState({ tasks, tasksLoading: false});
    });
  }

  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks,['ordertime'], ['desc']
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
                        <th scope="col">Nama Pengirim</th>
                        <th scope="col">Judul Agenda</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Iuran</th>
                        <th scope="col">Jumlah Iuran</th>
                        <th scope="col">Persetujuan</th>
                        <th scope="col">Pembayaran</th>
                        <th scope="col">Aksi</th>

                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listagenda key={task.key} task={task}/>
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Agenda</div>;
    }


    return taskList;
  }
}
