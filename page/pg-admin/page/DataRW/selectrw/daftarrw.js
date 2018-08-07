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
    idrw:'',
    kd_rw:''
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentDidMount() {
    this.setState({idrw: localStorage.getItem("DataRW")});
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
   
  }

  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
      taskList = (
        <select className="form-control" value={this.state.idrw} onChange={this.handleChangeOption} style={{height: 3 + 'em'}}>
          <option value="">Pilih RW</option>
          {orderedTasks.map(task => (
            <TaskListItem key={task.key} task={task} />
          ))}
        </select>
      );
    return taskList;
  }
}