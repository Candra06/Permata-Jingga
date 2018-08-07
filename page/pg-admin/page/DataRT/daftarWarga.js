import React from 'react';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { RefWarga} from './../../../../db';

export default class TaskList extends React.Component{
    constructor(props) {
        super(props);
            this.state ={
                tasks: [],
                tasks1: [],
                taskLoading: true,
                nikWarga: '',
                value: '',
                isi: '',teksalert:'',showalert:'hide',showalertno:'hide',lihatbtn:''
            };


    }

    componentDidMount(){
                RefWarga.on('value', snap =>{
                    const tasks = [];
                    snap.forEach(shot => {
                       
                                tasks.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                                               
                    })
                    this.setState({tasks, taskLoading: false, idrw: localStorage.getItem("DataRW")});
                })
            
    }

    handleChange = event => {

        try{
           
          this.setState({nikWarga: event.value});
          localStorage.setItem("NikPenerima", event.value)
          //localStorage.setItem("AlamatRW", event.alamat);
         // localStorage.setItem("NamaRW", event.nama);
        
        }catch(error){

        }
        
      }
    

    render(){
        const {tasks} = this.state;
        const orderedTasks = orderBy(
            tasks
        );
        const options = []
        orderedTasks.map( task =>{
            options.push({value:task.nik, nohp:task.nohp, alamat:task.alamatku, nama:task.nama, label:task.nama+"("+task.alamatku+")"})
            
        })
        
        let taskList;
        taskList = (
            <Select className="form-control" name="form-field-name" placeholder="Masukkan Nama"
            value={this.state.nikWarga}
            multi={this.state.multi}
            onChange={this.handleChange}
            onSelect={ this.handleSelect }
            options = { options }
            />
        );

        return taskList;
    }
}
