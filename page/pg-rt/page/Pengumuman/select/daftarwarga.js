import React from 'react';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TaskListItem from './listwarga';
import { RefWarga, RefKK } from './../../../../../db';
export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
    tasks: [],
    tasksLoading: true,
    nikWarga:'',
    value:''
    };
  }

  componentDidMount() {
    let alamat='';
    // RefKK.orderByChild("idrt").equalTo(localStorage.getItem("idrt")).on('value', snap => {
    //
    //   var data = '';
    //   snap.forEach(shot => {
    //     alamat = shot.val().alamat;
    //     // orderByChild("no_kk").equalTo(shot.val().nokk)
    //     RefWarga.orderByChild("no_kk").equalTo(shot.val().nokk).on("value", snap => {
    //       const tasks = [];
    //       snap.forEach(shot => {
    //         tasks.push({ ...shot.val(), key: shot.key, alamat_warga:alamat});
    //         console.log(shot.val());
    //       })
    //       this.setState({tasks, tasksLoading: false, idrt: localStorage.getItem("DataRT")});
    //     })
    //   })
    // })
    RefKK.orderByChild("idrt").equalTo(localStorage.getItem("idrt")).on("value", snap => {
      const tasks = [];
      snap.forEach(shott =>{
        // let alamat = shott.val().alamat;
        RefWarga.orderByChild("no_kk").equalTo(shott.val().nokk).on("value", snap => {
          snap.forEach(shot => {
            // console.log(shott.val())
            tasks.push({ ...shot.val(), key: shot.key, alamat_warga:shott.val().alamat});
          })
          this.setState({tasks, tasksLoading: false, idrt: localStorage.getItem("DataRT")});
        })
      })

    })


    console.log(this.state.tasks);
  }
  handleChange = event => {

    if(event.value === null){
      this.setState({value:''});
    }else{
      this.setState({value:event.value});
      localStorage.setItem("kd_penerima", event.value);
    }
  }

  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );
    const options = [];
    {orderedTasks.map(task => (
        options.push({value:task.nik, label:task.nama+"/"+task.alamat_warga})
      ))}
      console.log(options);
    let taskList;
      taskList = (
        <Select
          name="form-field-name"
          value={this.state.value}
          multi={this.state.multi}
          onChange={this.handleChange}
          options={
            options
          }
        />
      );


    return taskList;
  }
}
