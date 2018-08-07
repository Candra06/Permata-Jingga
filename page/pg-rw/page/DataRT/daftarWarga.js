import React from 'react';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import TaskListItem from './listWarga';
import 'react-select/dist/react-select.css';
import { RefRT, RefRW, RefWarga, RefKK, rootRef } from './../../../../db';

export default class TaskList extends React.Component{
    constructor(props) {
        super(props);
            this.state ={
                tasks: [],
                tasks1: [],
                taskLoading: true,
                nikWarga: '',
                value: '',
                alamat: '',
                isi: '',teksalert:'',showalert:'hide',showalertno:'hide',lihatbtn:''
            };


    }

    componentDidMount(){
        let alamat = "";
        console.log("idrwnya " , localStorage.getItem("koderw"));
        
        RefKK.orderByChild("idrw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
            const tasks = [];
            snap.forEach(shott =>{
              // let alamat = shott.val().alamat;
              RefWarga.orderByChild("no_kk").equalTo(shott.val().nokk).on("value", snap => {
                snap.forEach(shot => {
                  // console.log(shott.val())
                  tasks.push({ ...shot.val(), key: shot.key, alamat:shott.val().alamat});
                })
                this.setState({tasks, tasksLoading: false, idrt: localStorage.getItem("DataRT")});
              })
            })
      
          })

        //   RefRW.equalTo(localStorage.getItem("koderw")).on('value', snap => {
        //     const tasks = [];
        //     snap.forEach(shot => {
        //       tasks.push({ ...shot.val(), key: shot.key });
        //     });
        //     this.setState({ tasks, idrw: localStorage.getItem("DataRW") });
        //   });
    }

    handleChangePilihan = event => {

        try{
            this.setState({nikWarga: event.value});
            localStorage.setItem("NikRT", event.value)
            localStorage.setItem("AlamatRT", event.alamat);
            localStorage.setItem("NamaRT", event.nama);
            localStorage.setItem("NoHPRT", event.nohp);
            this.tampildatarw();
            this.nameInput.focus();
          }catch(error){
      
          }
    }

    handleChangeOption = (event) => {
        localStorage.getItem("koderw", event.target.value);
        this.setState({idrw: event.target.value});
    
    
        RefWarga.orderByChild("nik").equalTo(localStorage.getItem("NikRT")).on('value', snap => {
            let hitung = 0;
            RefRT.orderByChild("nik").equalTo(localStorage.getItem("NikRT")).on('value', snap => {
            const tasks =[];
            snap.forEach(shot =>{
                ++hitung;
                tasks.push({ ...shot.val(), key: shot.key });
            });
            console.log(hitung);
            if(hitung >= 1){
                this.setState({ showalert: 'block', teksalert:'NIK Sudah Menjadi Ketua RT', lihatbtn:'hide'});
                }else{
                  if(this.state.showalertno === 'block'){
                    this.setState({ showalert: 'hide', teksalert:''});

                  }else{
                    this.setState({ showalert: 'hide', teksalert:'', lihatbtn:'block'});
                  }
                }
        });
            snap.forEach(shot => {
              this.setState({email: shot.val().email, nik: shot.val().nik, no_telp: shot.val().nohp, alamat:shot.val().alamat});
            });
          });
      }
    

      tampildatarw = () => {
        RefWarga.orderByChild("nik").equalTo(localStorage.getItem("NikRT")).on('value', snap => {
            snap.forEach(shot => {
              this.setState({email: shot.val().email, nohp: shot.val().nohp});
              RefKK.orderByChild("nokk").equalTo(shot.val().no_kk).on('value', snap => {
                snap.forEach(shot => {
                    this.setState({ alamat: shot.val().alamat})
                });
            });

            });
          });
      }

    render(){
        const {tasks, showalert, teksalert, option} = this.state;
        const orderedTasks = orderBy(
            tasks
        );
       const options = [];
        { tasks.map( task =>(
            options.push({value:task.nik, nohp:task.nohp, alamat:task.alamat, nama:task.nama, label:task.nama+"("+task.alamat+")"})

        ))}
        let cekalert;
            if(showalert === 'hide'){

            }else if(showalert === 'block'){
            cekalert = (
                <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
                {teksalert}
                </div>)
            }
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
