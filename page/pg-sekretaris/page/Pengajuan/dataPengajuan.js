import React from 'react';
import orderBy from 'lodash/orderBy';
import ListPengajuanBaru from './listPengajuanBaru';
import { RefPengajuan, RefWarga, RefSurat } from './../../../../db';
export default class DataPengajuan extends React.Component {
  state = {
    tasks: [],
    tasksLoading: true
  };

  componentDidMount() {
      let no =0;

      RefPengajuan.orderByChild("idpenerima").equalTo(localStorage.getItem("nikrt")).on('value', snap => {
        snap.forEach(shot => {
          no++;
        });
      });
    RefPengajuan.orderByChild("idpenerima").equalTo(localStorage.getItem("nikrt")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key, nomer:no-- });
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
                        <th scope="col">No Telphone</th>
                        <th scope="col">Kebutuhan</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
		        {orderedTasks.map(task => (
		            <ListPengajuanBaru key={task.key} task={task} />
		          ))}
           </tbody>
        </table>
        </div>
      );
    }else{
      taskList = <div className="TaskList-empty">Tidak Ada Data Pengajuan</div>;
    }

    return taskList;
  }
}
