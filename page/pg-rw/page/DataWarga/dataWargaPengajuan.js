import React from 'react';
import orderBy from 'lodash/orderBy';
import Listwarga from './listWargaPengajuan';
import { RefPengajuan } from './../../../../db';

export default class DataWargaPengajuan extends React.Component {

    state = {
      tasks: [],
      filterGndr:'',
      tasksLoading: true
    };


  componentDidMount() {
    RefPengajuan.orderByChild("idpenerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false });
    });

  }
  handleFilter = event => {
        this.setState({ filterGndr: event.target.value });
        
  };
  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks, ['ordertime'], ['desc']
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
                        <th scope="col">NIK Pemohon</th>
                        <th scope="col">Jenis Kebutuhan</th>
                        <th scope="col">Tanggal Pengajuan</th>
                        <th scope="col">Status</th>
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
      taskList = <div className="TaskList-empty">Tidak Ada Data Pengajuan</div>;
    }

    return taskList;
  }
}
