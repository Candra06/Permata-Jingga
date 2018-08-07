import React from 'react';
import orderBy from 'lodash/orderBy';
import TaskListItem from './listitemrt';
import { RefRT } from './../../../../../db';
export default class TaskList extends React.Component {
 

  constructor(props) {
    super(props);
     this.state = {
    tasks: [],
    tasksLoading: true,
    idrt:''
    };
    this.setState({idrt: localStorage.getItem("DataRT")});
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentDidMount() {
    RefRT.orderByChild("norw").equalTo(localStorage.getItem("DataRW")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false, idrt: localStorage.getItem("DataRT") });
    });
    console.log(localStorage.getItem("DataRW"));
  }
  handleChangeOption(event) {
    localStorage.setItem('DataRT', event.target.value);
    this.setState({idrt: localStorage.getItem("DataRT")});
  }

  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
      taskList = (
        <select className="form-control" value={this.state.idrt} onChange={this.handleChangeOption}>
          <option value="">Pilih RT</option>
          {orderedTasks.map(task => (
            <TaskListItem key={task.key} task={task} />
          ))}
        </select>
      );
    

    return taskList;
  }
}