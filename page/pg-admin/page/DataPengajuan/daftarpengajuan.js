import React from 'react';
import orderBy from 'lodash/orderBy';
import Listpengajuan from './listpengajuan';
import { RefPengajuan, RefWarga, RefSurat } from './../../../../db';
export default class daftarpengajuan extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
    try{
    RefPengajuan.limitToFirst(10).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        //console.log(shot.val().pemohon);
        RefWarga.orderByChild("nik").equalTo(shot.val().pemohon).on('value', snap => {
          //const tasks = [];
          snap.forEach(shott => {
            RefSurat.orderByChild("kd_surat").equalTo(shot.val().jenis_kebutuhan).on("value", snap => {
              snap.forEach(shottt => {
            no++;
                tasks.push({ ...shot.val(), key: shot.key,namapemohon:shott.val().nama, jenis_surat:shottt.val().jenis_surat, nomer:no });
              })
              this.setState({ tasks, tasksLoading: false });
            })
              //tasks.push({ ...shot.val(), key: shot.key, namapemohon:shott.val().nama });
          })
        })
      });
     // this.setState({ tasks, tasksLoading: false});
    });
  }catch(error){

  }
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
                        <th scope="col">NIK Pengirim</th>
                        <th scope="col">Jenis Kebutuhan</th>
                        <th scope="col">Tujuan</th>
                        <th scope="col">Status Pengajuan</th>
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
      taskList = <div className="TaskList-empty" style={{padding: 0.6 +'em'}}><p>Tidak Ada Data Pengajuan</p></div>;
    }


    return taskList;
  }
}