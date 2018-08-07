import React from 'react';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { RefPenitipan } from './../../../../db';

export default class TaskList extends React.Component{
    constructor(props) {
        super(props);
            this.state ={
                tasks: [],
                taskLoading: true,
                kodetitip: '',
                value: '',
                isi: ''
            };


    }

    componentDidMount(){
        this.setState({kodetitip: localStorage.getItem("kodetitip")});
        const tasks = []; 
                            RefPenitipan.orderByChild("status").equalTo("Diterima").on('value', snap => {
                            snap.forEach(shot => {

                                tasks.push({ ...shot.val(), key: shot.key });

                                });
                                this.setState({tasks});
                            });
    }

    handleChangePilihan = event => {

        try{
          this.setState({nikWarga: event.value});
          localStorage.setItem("kodetitip", event.value)
          localStorage.setItem("nikpenitip", event.nikpenitip);
          localStorage.setItem("namapenitip", event.namapenitip);
        }catch(error){

        }
        
      }
    
    

    render(){
        const {tasks } = this.state;
        const orderedTasks = orderBy(
            tasks
        );
        const options = []
        orderedTasks.map( task =>{
            options.push({value:task.kd_titip, nikpenitip:task.nik_penitip, namapenitip:task.nama_penitip, label:task.nama_penitip+" ("+task.alamat+")"})
            
        })
  
        let taskList;
        taskList = (
            <Select className="form-control" name="form-field-name" placeholder="Pilih Data Penitipan"
            value={this.state.nikWarga}
            multi={this.state.multi}
            onChange={this.handleChangePilihan}
            onSelect={ this.handleSelect }
            options = { options }
            />
        );

        return taskList;
    }
}
