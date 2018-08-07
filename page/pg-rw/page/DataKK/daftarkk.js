import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listkk';
import { RefKK, RefWarga } from './../../../../db';
import {Action} from "./../../../../Action";
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import XLSX from 'xlsx';

export default class daftarkk extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: [], tasksLoading:true, search: '', modal: false,files:'',
      data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: []
    }
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    console.log(this.state.data)
    RefKK.orderByChild("idrw").equalTo(localStorage.getItem("koderw")).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer:no });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }

  
  art(){
    alert()
  }
  
  handleFilter = event => {
    this.setState({ search: event.target.value });
  };
  toggle() {
      this.setState({
        modal: !this.state.modal
      });
  }
  sync(){
    RefKK.on('value', snap => {
      snap.forEach(shott => {
        RefWarga.orderByChild("no_kk").equalTo(shott.val().nokk).on("value", snap => {
          snap.forEach(shot => {
            var dt = {
              nik:shot.val().nik.trim()
            }
            Action("deleteWarga", dt).then((result) => {
                if(result!=''){
                  //console.log(result);
                    console.log("success");
                }else{
                    console.log("errors");
                }
            })
          })
        })
      });
    });
      const tasks = [];
        RefWarga.orderByChild("tipewarga").equalTo("Asli").on("value", snap => {
          snap.forEach(shot => {
            var data = {
              kd_warga:RandomKata.generate(10),
              no_kk: shot.val().no_kk.trim(),
              nama: shot.val().nama.trim(),
              nik: shot.val().nik.trim(),
              tempatlahir: shot.val().tempatlahir.trim(),
              tgl_lahir: shot.val().tgl_lahir.trim(),
              pekerjaan: shot.val().pekerjaan.trim(),
              gender: shot.val().gender.trim(),
              nohp: shot.val().nohp.trim(),
              wa: shot.val().wa.trim(),
              email: shot.val().email.trim(),
              fb: shot.val().fb.trim(),
              ig: shot.val().ig.trim(),
              twitter: shot.val().twitter.trim(),
              agama: shot.val().agama.trim(),
              pendidikan: shot.val().pendidikan.trim(),
              status_nikah: shot.val().status_nikah.trim(),
              kewarganegaraan: shot.val().kewarganegaraan.trim(),
              namaayah: shot.val().namaayah.trim(),
              namaibu: shot.val().namaibu.trim(),
              status: shot.val().status.trim(),
            }
            //console.log(data);
            Action("addWarga", data).then ((result) => {
                if(result!=''){
                    console.log("success");
                }else{
                    console.log("errors");
                }
            })
          })
        })
        toast.success('Data Berhasil Di Sinkron', {
          position: toast.POSITION.TOP_RIGHT,
      });
  }
 
  render() {
    const { tasks, tasksLoading, search } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.kepala.indexOf(this.state.search)!==-1 || ls.nokk.indexOf(this.state.search)!==-1 || ls.idrt.indexOf(this.state.search)!==-1;
        }
      ),
      ['time_notif']['desc']
    );
    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <div className='row col-md-12'>
            <div className='col-md-8 float-left'>
              <button onClick={this.sync} className='btn btn-success'><i className="fa fa-refresh"></i>  Sinkronisasi Data</button>
              &nbsp;
             
            </div>
            <div className='col-md-4 float-right'>
                <input type='text' className='form-control' placeholder='Masukkan Keyword' value={search} onChange={this.handleFilter}/>
            </div>
          </div>
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">No KK</th>
                        <th scope="col">RT</th>
                        <th scope="col">Kepala Keluarga</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listkk key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data KK</div>;
    }

    return taskList;
  }
}
