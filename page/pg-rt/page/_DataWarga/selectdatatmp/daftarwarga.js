import React from 'react';
import orderBy from 'lodash/orderBy';
import Listwarga from './listwarga';
import { RefWargaTmp } from './../../../../../db';

export default class daftarwarga extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    tasks: [], kepala:''    
  };
  }
  

  componentDidMount() {
    RefWargaTmp.orderByChild("kodetmp").equalTo(localStorage.getItem("kodetmp")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks });
    });
    this.setState({kepala: localStorage.getItem("KepalaKK")});
  }

  
  handleChangeOption = event => {
    localStorage.setItem('KepalaKK', event.target.value);
    this.setState({kepala: event.target.value});
  }

  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
 
      taskList = (
        <select className="form-control" value={this.state.kepala} onChange={this.handleChangeOption} style={{height: 3 + 'em'}}>
          <option value="">Pilih Kepala Keluarga</option>
          {orderedTasks.map(task => (
            <Listwarga key={task.key} task={task} />
          ))}
        </select>
        
      );


    return taskList;
  }
}
