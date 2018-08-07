import React from 'react';
import { RefRW, rootRef, RefWarga, RefKK } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { toast } from 'react-toastify';
export default class Listrw extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,nama:'',
        no: '', nohp: '', email: '', alamat: '', tampil:'', tampilbtn:'block', tmpno:'',
        tasks: [], nikWarga:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
      
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtno, txtnik, txtnohp, txtemail, txtalamat, txtnama) {
        this.setState({
            no: txtno,
            tmpno: txtno,
            nikWarga: txtnik,
            nohp: txtnohp,
            email: txtemail,
            alamat: txtalamat,
            nama: txtnama,
          modal2: !this.state.modal2
        })
      }

      componentDidMount(){
        //this.setState({nikWarga: localStorage.getItem("NikRW")});
                RefWarga.on('value', snap =>{
                    const tasks = [];
                    snap.forEach(shot => {
                            let hitung = 0;
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
                    this.setState({tasks });
                })
           
    }

      handleChangeNo = event => {
        this.setState({ no: event.target.value });
        let hitung = 0;
        RefRW.orderByChild("no").equalTo(event.target.value).on('value', snap => {
          snap.forEach(shot => {
              if(shot.val().no !== this.state.tmpno){
            hitung++;
              }else{

              }

          });
          if(hitung >= 1){
          this.setState({ tampilbtn: 'hide', tampil: 'block'});
          }else{
            this.setState({ tampilbtn: 'block', tampil: 'hide'});
          }
        });
      };

      handleChangeAlamat = event => {
        this.setState({ alamat: event.target.value });

      };
      handleChangeNoHP = event => {
        this.setState({ nohp: event.target.value });

      };

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });

      };
      handleReset = event => {
        event.preventDefault();
        this.setState({ no: '', nohp: '', email: '', alamat: '', tampil:'',nama:'', tampilbtn:'block'});
        //localStorage.setItem("NikRW", "");
      }

    deleteTask = () => {
        const { key } = this.props.task;
        RefRW.child(key).remove();
       toast.success('Data Berhasil Di Hapus', {
               position: toast.POSITION.TOP_RIGHT,
           });
           this.tampildatarw();
            //window.location.reload();
      };
      
      notify(type, kunci){
        return () => {
            try{
                let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');
            if(this.state.nama === ""){
                toast.warn('Nama tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(!this.state.nama.match(/^[a-zA-Z]+$/) && !this.state.nama.match(" ")){
                toast.warn('Nama harus berisi huruf', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.no === ""){
                toast.warn('No RW tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.nikWarga === ""){
                toast.warn('Nik tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.nohp === ""){
                toast.warn('No HP tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.alamat === ""){
                toast.warn('Alamat tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.email === ""){
                toast.warn('Email tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                toast.warn('Email tidak valid', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else{
                rootRef.child('RW').child(kunci).update({ no: this.state.no,
                    alamat: this.state.alamat,
                    nohp: this.state.nohp,
                    email: this.state.email,
                    nik: this.state.nikWarga,
                    nama: this.state.nama});
                    this.setState({ no: '', nohp: '', email: '',nama:'', alamat: '', tampilbtn:'block', tampil: 'hide'});
                   // localStorage.setItem("DataRW", "");
                    toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2();
                    //window.location.reload();
                }
            }catch(error){
                toast.warn('Terjadi Kesalahan');
            }
            };
        };
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
              RefWarga.orderByChild("nik").equalTo(event.value).on('value', snap => {
                snap.forEach(shot => {
                  this.setState({email: shot.val().email, nohp: shot.val().nohp, nama: shot.val().nama});
    
                  RefKK.orderByChild("nokk").equalTo(shot.val().no_kk).on('value', snap => {
                    snap.forEach(shot => {
                        this.setState({ alamat: shot.val().alamat})
                    });
                });
    
                });
              });
            }
            }catch(error){
    
            }
            
          }
        
      tampildatarw = event =>{
        RefWarga.on('value', snap =>{
            const tasks = [];
            snap.forEach(shot => {
                    let hitung = 0;
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
            this.setState({tasks});
        })

      }
  render() {
    const { task } = this.props;
    const { tampil } = this.state;
    let cekk;
    if(tampil === 'hide'){
       
    }else if(tampil === 'block'){
         cekk = (

            <div className="alert alert-danger col-md-12" role="alert" style={{marginTop: 1 + 'em'}}>
                No RW Sudah Di Pakai
            </div>
        )
    }

    if(this.state.hasError){
        return alert('terjadi kesalahan :(');
    }
    const {tasks } = this.state;
    const orderedTasks = orderBy(
        tasks
    );
    const options = []
    orderedTasks.map( task =>{
        options.push({value:task.nik, alamat:task.alamatku, nama:task.nama, label:task.nama+" ("+task.alamatku+")"})
        
    })

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

    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>{task.no}</td>
        <td>{task.nik}</td>
        <td>
        <button type="button" className="btn btn-primary" onClick={() => this.toggle2(task.no,task.nik, task.nohp, task.email, task.alamat, task.nama)}><i className="fa fa-pencil"></i></button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}> 
                            <h3 className="card-title">Update Data RW {task.no}</h3>
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">
                       
                        <div role="form">
                            
                        <div className="card-body">
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <input type="number"
                                            onChange={ this.handleChangeNo }
                                            value={this.state.no}
                                            className="form-control" placeholder="Masukkan No RW" min="1"/>
                                        </div>
                                    </div>

                                     <div className="row col-md-12">
                                        <div className="form-group col-md-12">
                                            {taskList}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <input type="number"
                                            onChange={this.handleChangeNoHP}
                                            value={this.state.nohp}
                                            className="form-control" placeholder="Masukkan NO HP Kepala RW" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <input type="text"
                                            onChange={this.handleChangeEmail}
                                            value={this.state.email}
                                            className="form-control" placeholder="Masukkan Email Kepala RW" min="1"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="from-group col-md-12">
                                            <textarea rows="3" placeholder='Alamat Ketua RW' className='form-control' onChange={this.handleChangeAlamat} value={this.state.alamat}></textarea>
                                        </div>
                                    </div>
                                        <div className="col-md-12">
                                            {cekk}
                                        </div>
                                </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" id={this.state.tampilbtn} onClick={this.notify('success', task.key)}>Update</button>
                                <span>  </span>
                                <Button color="secondary" onClick={this.toggle2}>Close</Button>{' '}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                
                </Modal> 
            <span>  </span>
            <button type="button" className="btn btn-danger" onClick={this.toggle}><i className="fa fa-trash"></i></button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data Rw {task.no} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={this.deleteTask}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
