import React from 'react';
import orderBy from 'lodash/orderBy';
import Listrt from './listrt';
import { RefRT } from './../../../../db';
export default class daftarrt extends React.Component {
  state = {
    tasks: [], tasksLoading: true, search: ''
  };

  componentDidMount() {
    RefRT.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer: no });

      });
      this.setState({ tasks, tasksLoading: false });
    });
  }

  handleFilter = event => {
    this.setState({ search: event.target.value });
};

  render() {
    const { tasks, tasksLoading, search } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.nama.indexOf(this.state.search)!==-1 || ls.no.indexOf(this.state.search)!==-1 || ls.nik.indexOf(this.state.search)!==-1 || ls.alamat.indexOf(this.state.search)!==-1 || ls.nohp.indexOf(this.state.search)!==-1;
        }
      ),
      ['time_notif']['desc']
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <div className='row col-md-12'>
            <div className='col-md-8 float-left'>
             
            </div>
            <div className='col-md-4 float-right'>
                <input type='text' className='form-control' placeholder='Masukkan Keyword' value={search} onChange={this.handleFilter}/>
            </div>
          </div>
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">No RT</th>
                        <th scope="col">NIK</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">No Telp</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listrt key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data RT</div>;
    }


    return taskList;
  }
}