import React from 'react';
import orderBy from 'lodash/orderBy';
import ListRW from './listitemrw';
import ListRT from './listitemrt';
import { RefRW, RefRT } from './../../../../../db';
export default class daftarrwrt extends React.Component {


  constructor(props) {
    super(props);
     this.state = {
      tasks: [],
      tasks2: [],
    idrw:'',idrt:'',
    kd_rw:''
    };
    this.setState({idrw: localStorage.getItem("DataRW"), idrt: localStorage.getItem("DataRT")});
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleChangeOptionRT = this.handleChangeOptionRT.bind(this);
  }

  componentDidMount() {
    RefRW.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, idrw: localStorage.getItem("DataRW") });
    });
  }
  handleChangeOption(event) {
    localStorage.setItem('DataRW', event.target.value);
    this.setState({idrw: localStorage.getItem("DataRW")});
    RefRT.orderByChild("norw").equalTo(event.target.value).on('value', snap => {
      const tasks2 = [];
      snap.forEach(shot => {
        tasks2.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks2 });
    });
  }
  handleChangeOptionRT(event) {
    localStorage.setItem('DataRT', event.target.value);
    this.setState({idrt: localStorage.getItem("DataRT")});
  }

  render() {
    const { tasks, tasks2 } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
      taskList = (
      <div className="row">
          <div className="col-md-6">
            <div className="form-group col-md-12">
              <label>Pilih RW</label>
              <select className="form-control" value={this.state.idrw} onChange={this.handleChangeOption} style={{height: 3 + 'em'}}>
                <option value="">Pilih RW</option>
                {orderedTasks.map(task => (
                  <ListRW key={task.key} task={task} />
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group col-md-12">
            <label>Pilih RT</label>
            <select className="form-control" value={this.state.idrt} onChange={this.handleChangeOptionRT} style={{height: 3 + 'em'}}>
                <option value="">Pilih RT</option>
                {tasks2.map(task => (
                  <ListRT key={task.key} task={task} />
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    return taskList;
  }
}
