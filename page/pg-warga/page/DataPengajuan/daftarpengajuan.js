import React from 'react';
import orderBy from 'lodash/orderBy';
import Listpengajuan from './listpengajuan';
import { RefPengajuan, RefSurat } from './../../../../db';
export default class daftarpengajuan extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
    RefPengajuan.orderByChild("pemohon").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
      let jenis = "";

        RefSurat.orderByChild("kd_surat").equalTo(shot.val().jenis_kebutuhan).on("value", snapp =>{
          snapp.forEach(shott => {
            // jenis_surat.push({ shott.val().jenis_surat});
            jenis = shott.val().jenis_surat;
          })
        no++;
            tasks.push({ ...shot.val(), key: shot.key, jenis_surat:jenis, nomer:no});
          this.setState({ tasks, tasksLoading: false});
        })
      });
     // this.setState({tasksLoading:false})
    });
  }

  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks,['ordertime'], ['asc']
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
                        <th scope="col">Jenis Kebutuhan</th>
                        <th scope="col">Kebutuhan</th>
                        <th scope="col">Tujuan</th>
                        <th scope="col">Status Pengajuan</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listpengajuan key={task.key} task={task}/>
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Pengajuan</div>;
    }


    return taskList;
  }
}
