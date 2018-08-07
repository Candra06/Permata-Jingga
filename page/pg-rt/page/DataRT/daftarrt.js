import React from 'react';
import orderBy from 'lodash/orderBy';
import Listrt from './listrt';
import { RefRT } from './../../../../db';
export default class daftarrt extends React.Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    RefRT.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }

  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
      taskList = (
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No RT</th>
                        <th scope="col">No RW</th>
                        <th scope="col">NIK</th>
                        <th scope="col">KOP</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listrt key={task.key} task={task} />
          ))}
        </tbody>
        </table>
      );
    

    return taskList;
  }
}