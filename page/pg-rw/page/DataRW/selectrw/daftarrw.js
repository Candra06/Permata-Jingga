import React from 'react';
import orderBy from 'lodash/orderBy';
import TaskListItem from './listitemrw';
import { RefRW } from './../../../../../db';
export default class TaskList extends React.Component {


  constructor(props) {
    super(props);
     this.state = {
    tasks: [],
    tasksLoading: true,
    idrw:''
    };
    this.setState({idrw: localStorage.getItem("DataRW")});
    this.handleChangeOption = this.handleChangeOption.bind(this);
    localStorage.setItem("CekRW", false);
  }

  componentDidMount() {
    RefRW.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false, idrw: localStorage.getItem("DataRW") });
    });
  }
  handleChangeOption(event) {
    localStorage.setItem('DataRW', event.target.value);
    this.setState({idrw: localStorage.getItem("DataRW")});
    localStorage.setItem("CekRW", true);
  }

  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
      taskList = (
        <select className="form-control" style={{height: 3 + 'em'}} value={this.state.idrw} onChange={this.handleChangeOption}>
          <option value="">Pilih RW</option>
          {orderedTasks.map(task => (
            <TaskListItem key={task.key} task={task} />
          ))}
        </select>
      );


    return taskList;
  }
}
