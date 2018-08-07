import React from 'react';
import orderBy from 'lodash/orderBy';
import Liskuser from './listakun';
import { RefUser } from './../../../../db';
export default class daftarkk extends React.Component {
  state = {
    tasks: [], tasksLoading: true, search: ''
  };

  componentDidMount() {
    RefUser.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        if(shot.val().level === "Admin" || shot.val().level === "Satpam" || shot.val().level === "RT" || shot.val().level === "RW"){

        }else{
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer:no });
        }
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
          return ls.email.indexOf(this.state.search)!==-1 || ls.level.indexOf(this.state.search)!==-1 ||ls.nik.indexOf(this.state.search)!==-1;
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
        <div className='col-md-4 float-right row' style={{marginBottom: 1+'em'}}>
            <input type='text' className='form-control' placeholder='Masukkan Keyword' value={search} onChange={this.handleFilter}/>
          </div>
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Level</th>
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
      taskList = <div className="TaskList-empty">Tidak Ada Data Akun</div>;
    }

    return taskList;
  }
}