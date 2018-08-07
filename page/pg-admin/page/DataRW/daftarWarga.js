import React from 'react';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import TaskListItem from './listWarga';
import 'react-select/dist/react-select.css';
import { RefRT, RefWarga, RefKK, rootRef, RefRW } from './../../../../db';
import { ToastContainer, toast } from 'react-toastify';

export default class TaskList extends React.Component{
    constructor(props) {
        super(props);
            this.state ={
                tasks: [],
                taskLoading: true,
                nikWarga: '',
                value: '',
                isi: '',teksalert:'',showalert:'hide',showalertno:'hide',lihatbtn:''
            };


    }

    componentDidMount(){
        //this.setState({nikWarga: localStorage.getItem("NikRW")});
                RefWarga.on('value', snap =>{
                    const tasks = [];
                    snap.forEach(shot => {
                            let hitung = 0;
                                var alamat = "";
                            RefRW.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                            snap.forEach(shot => {
                                hitung++;
                                });
                            });
                            
                            if(hitung >= 1){
                                
                            }else{
                               
                                tasks.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                            }




                    })
                    this.setState({tasks, taskLoading: false, idrw: localStorage.getItem("DataRW")});
                })
           
    }

    handleChangePilihan = event => {

        try{
            let htg = 0;
            RefRW.orderByChild("nik").equalTo(event.value).on('value', snap => {
            snap.forEach(shot => {
                htg++;
            });
        });
        if(htg >= 1){
            toast.warn('Warga ini telah menjadi RW');
        }else{
           
          this.setState({nikWarga: event.value});
          localStorage.setItem("NikRW", event.value)
          //localStorage.setItem("AlamatRW", event.alamat);
          localStorage.setItem("NamaRW", event.nama);
        }
        }catch(error){

        }
        
      }
    
    

    render(){
        if(this.state.hasError){
            return alert('terjadi kesalahan :(');
        }
        const {tasks } = this.state;
        const orderedTasks = orderBy(
            tasks
        );
        const options = []
        { orderedTasks.map( task =>(
            options.push({value:task.nik, alamat:task.alamatku, nama:task.nama, label:task.nama+" ("+task.alamatku+")"})
            
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
