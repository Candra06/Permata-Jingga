import React from 'react';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { RefWarga, RefUser } from './../../../../db';

export default class TaskList extends React.Component{
    constructor(props) {
        super(props);
            this.state ={
                tasks: [],
                taskLoading: true,
                nikWarga: '',
                value: '',
                isi: ''
            };


    }

    componentDidMount(){
        this.setState({nikWarga: localStorage.getItem("NikAkun")});
                RefWarga.on('value', snap =>{
                    const tasks = [];
                    snap.forEach(shot => {
                            let hitung = 0;
                            RefUser.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                            snap.forEach(shott => {
                            //console.log(shott.val())
                                hitung++;
                                });
                            });
                            
                            if(hitung >= 1){
                                
                            }else{
                                
                                tasks.push({ ...shot.val(), key: shot.key });
                            }

                     })
                    this.setState({tasks, taskLoading: false, idrw: localStorage.getItem("DataRW")});
                })
            
        
    }

    handleChangePilihan = event => {

        try{
          this.setState({nikWarga: event.value});
          localStorage.setItem("NikAkun", event.value)
          localStorage.setItem("EmailAkun", event.email);
        }catch(error){

        }
        
      }
    
    

    render(){
        const {tasks } = this.state;
        const orderedTasks = orderBy(
            tasks
        );
        const options = []
        { orderedTasks.map( task =>(
            options.push({value:task.nik, email:task.email, label:task.nama+"("+task.nik+")"})
            
        ))}
  
        let taskList;
        taskList = (
            <Select className="form-control" name="form-field-name" placeholder="Masukkan Nama"
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
