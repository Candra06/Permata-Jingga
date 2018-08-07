import React from 'react';
import orderBy from 'lodash/orderBy';
import ListPenitipan from './listlaporan';
import { RefPenitipan, RefLaporan } from './../../../../db';
export default class daftarpenitipan extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
    RefPenitipan.orderByChild("nik_penitip").equalTo(localStorage.getItem("nik")).limitToLast(10).on('value', snap => {
      snap.forEach(shot => {

        RefLaporan.orderByChild("kd_titip").equalTo(shot.val().kd_titip).on("value", snap =>{
          const tasks = [];
          snap.forEach(shott => {
            // console.log(shott.val());
            tasks.push({ ...shott.val(), key: shot.key });
          })
          this.setState({ tasks, tasksLoading: false});
        })
      });
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
                        <th scope="col">Nama Pelapor</th>
                        <th scope="col">Status Rumahr</th>
                        <th scope="col">keterangan</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <ListPenitipan key={task.key} task={task}/>
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Laporan</div>;
    }


    return taskList;
  }
}
