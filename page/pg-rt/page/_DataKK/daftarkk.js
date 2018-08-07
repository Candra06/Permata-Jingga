import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listkk';
import { RefKK } from './../../../../db';
export default class daftarkk extends React.Component {
  state = {
    tasks: [],
    tasksLoading: true
  };

  componentDidMount() {
    RefKK.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }

  render() {
    const { tasks,tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
    if (tasksLoading) {
        taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
      </div>;
      }else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <table id="example" className="table">
            <thead>
                    <tr>
                        <th scope="col">RW/RT</th>
                        <th scope="col">No KK</th>
                        <th scope="col">Jumlah Keluarga</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listkk key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );
    }else{
      taskList = <div className="TaskList-empty">Tidak Ada KK</div>;
    }

    return taskList;
  }
}
