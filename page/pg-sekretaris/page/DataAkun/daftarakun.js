import React from 'react';
import orderBy from 'lodash/orderBy';
import Liskuser from './listakun';
import { RefLaporan } from './../../../../db';
export default class daftarkk extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
    RefLaporan.on('value', snap => {
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
      tasks, ['ordertime'],['desc']
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
                        <th scope="col">Nama Pemilik</th>
                        <th scope="col">Kondisi Rumah</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col">Tanggal</th>
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
      taskList = <div className="TaskList-empty">Tidak Ada Data Laporan</div>;
    }

    return taskList;
  }
}