import React from 'react';
import orderBy from 'lodash/orderBy';
import Listrt from './listkelurahan';
import { RefKelurahan } from './../../../../../db';
export default class daftarrt extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
    tasks: [],
    nama:''
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentWillMount() {
    RefKelurahan.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks });
    });
    this.setState({nama: localStorage.getItem("DataKelurahan")});
  }
  handleChangeOption(event) {
    localStorage.setItem('DataKelurahan', event.target.value);
    this.setState({nama: event.target.value});
  }

  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
      taskList = (
        <select className="form-control" value={this.state.nama} onChange={this.handleChangeOption} style={{height: 3 + 'em'}}>
          <option value="">Pilih Kelurahan</option>
          {orderedTasks.map(task => (
            <Listrt key={task.key} task={task} />
          ))}
        </select>
      );
   

    return taskList;
  }
}