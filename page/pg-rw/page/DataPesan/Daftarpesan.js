import React from 'react';
import orderBy from 'lodash/orderBy';
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
                        <th scope="col">Tujuan</th>
                        <th scope="col">Isi</th>
                        <th scope="col">Jenis</th>
                    </tr>
                </thead>
                <tbody>
        </tbody>
        </table>
      );
    

    return taskList;
  }
}