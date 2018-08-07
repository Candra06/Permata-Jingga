import React from 'react';
import { RefRT, rootRef, RefWarga, RefRW, RefKK } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import ListRW from './selectdata/listitemrw';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {  toast } from 'react-toastify';
export default class Listrt extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        tasks: [],
        tasks2: [],
        tasks3: [],
        modal: false,
        modal2: false,
        idrw:0,idrt:0,
        kd_rw:'',
        nikWarga: '',nama:'',
        no: 0, nohp: '', email: '', alamat: '', tampil:'', tampilbtn:'block', tmpno:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
      
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtno, txtnik, txtnohp, txtemail, txtalamat, txtnama, txtnorw) {
        
        this.setState({
            no: txtno,
            tmpno: txtno,
            nik: txtnik,
            nikWarga: txtnik,
            nohp: txtnohp,
            email: txtemail,
            alamat: txtalamat,
            idrw: txtnorw,
            nama: txtnama,
          modal2: !this.state.modal2
        });
        try{

            RefWarga.orderByChild("norw").equalTo(txtnorw).on('value', snap =>{
                const tasks3 = [];
                snap.forEach(shot => {
                        let hitung = 0;
                        RefRT.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                        snap.forEach(shot => {
                            ++hitung;
                            });
                        });
                        if(hitung >= 1){

                        }else{

                            tasks3.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                        }
                })
                this.setState({tasks3});
            })
        }catch(error){

        }
      }

      
    componentWillMount() {
    
        RefRW.on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key });
          });
          this.setState({ tasks, idrw: localStorage.getItem("DataRW") });
        });
      }
      handleChangePilihan = event => {

      
        try{
            this.setState({nikWarga: event.value});
            RefWarga.orderByChild("nik").equalTo(event.value).on('value', snap => {
              snap.forEach(shot => {
                this.setState({email: shot.val().email, nohp: shot.val().nohp, nama: shot.val().nama});
  
                RefKK.orderByChild("nokk").equalTo(shot.val().no_kk).on('value', snap => {
                  snap.forEach(shott => {
                      this.setState({ alamat: shott.val().alamat})
                  });
              });
  
              });
            });
            // this.nameInput.focus();
          }catch(error){
  
          }
    
      }
      
      handleChangeOption = (event) => {
        this.setState({idrw: event.target.value});


                    RefWarga.orderByChild("norw").equalTo(event.target.value).on('value', snap =>{
                        const tasks3 = [];
                        snap.forEach(shot => {
                                let hitung = 0;
                                RefRT.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                                snap.forEach(shot => {
                                    ++hitung;
                                    });
                                });
                                if(hitung >= 1){

                                }else{

                                    tasks3.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                                }
                        })
                        this.setState({tasks3});
                    })
      }

      handleChangeNo = event => {
          const {idrw} = this.state;
        this.setState({ no: event.target.value });
        let hitung = 0;
        RefRT.orderByChild("no").equalTo(event.target.value).on('value', snap => {
          snap.forEach(shot => {
              if(shot.val().no != this.state.tmpno && shot.val().norw === idrw){
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
        this.setState({ no: '', nohp: '', email: '', alamat: '', tampil:'', tampilbtn:'block'});
        //localStorage.setItem("NikRW", "");
      }

    deleteTask = () => {
        const { key } = this.props.task;
        RefRT.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
      
    //   tampildatarw = () => {
    //     RefWarga.orderByChild("nik").equalTo(localStorage.getItem("NikRT")).on('value', snap => {
    //         snap.forEach(shot => {
    //           this.setState({email: shot.val().email, nohp: shot.val().nohp, alamat: localStorage.getItem("AlamatRW")});
    //         });
    //       });
    //   }

      notify(type, kunci){
        return () => {
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
        }else if(this.state.idrw === ""){
            toast.warn('No RW tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.no === ""){
            toast.warn('No RT tidak boleh kosong', {
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
          }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
            toast.warn('Email tidak valid', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
                rootRef.child('RT').child(kunci).update({ no: this.state.no, nik: this.state.nikWarga,
                 norw: this.state.idrw,
                 alamat: this.state.alamat,
                 nohp: this.state.nohp,
                 email: this.state.email,
                 nama: this.state.nama });
                this.setState({ no: '', nohp: '', email: '', alamat: '', idrw:'' });
                localStorage.setItem("DataRW", "");
                toast.success('Data Berhasil Di Simpan', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2()
                }
            };
        };
  render() {
    const { task } = this.props;
    const { tampil } = this.state;
    let cekk;
    const { tasks, tasks3, option } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

      const options = [];
        { tasks3.map( task =>(
            options.push({value:task.nik, nohp:task.nohp, alamat:task.alamatku, nama:task.nama, label:task.nama+"("+task.alamatku+")"})

        ))}
    if(tampil === 'hide'){
       
    }else if(tampil === 'block'){
         cekk = (

            <div className="alert alert-danger col-md-12" role="alert" style={{marginTop: 1 + 'em'}}>
                No RT Sudah Di Pakai
            </div>
        )
    }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.norw}/{task.no}</td>
        <td>{task.nama}</td>
        <td>{task.nik}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.no,task.nik, task.nohp, task.email, task.alamat, task.nama, task.norw)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}> 
                <div className="card-header card-info">
                            <h3 className="card-title">Update Data RT {task.no}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">
                       
                        <div role="form">
                        <div className="card-body">
                        <div className="col-md-12">

                                <div className="form-group col-md-12">
                                    <label>Pilih RW <sup>*</sup></label>
                                <select className="form-control" value={this.state.idrw} onChange={this.handleChangeOption} style={{height: 3 + 'em'}}>
                                    <option value="">Pilih RW</option>
                                    {orderedTasks.map(task => (
                                    <ListRW key={task.key} task={task} />
                                    ))}
                                </select>
                                </div>
                                </div>
                                <div className="col-md-12">
                                <div className="form-group col-md-12">

                                    <label>Pilih Ketua RT <sup>*</sup></label>
                                <Select className="form-control" name="form-field-name" placeholder="Masukkan Nama Ketua RT"
                                value={this.state.nikWarga}
                                multi={this.state.multi}
                                onChange={this.handleChangePilihan}
                                onSelect={ this.handleSelect }
                                options = { options }
                                />

                                </div>
                                </div>
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                        <label>No RT <sup>*</sup></label>
                                            <input type="number"
                                            onChange={ this.handleChangeNo }
                                            value={this.state.no}
                                            className="form-control" placeholder="Masukkan No RT" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                        <label>No HP <sup>*</sup></label>
                                            <input type="number"
                                            onChange={this.handleChangeNoHP}
                                            value={this.state.nohp}
                                            className="form-control" placeholder="Masukkan NO HP Kepala RT" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                        <label>Email <sup>*</sup></label>
                                            <input type="text"
                                            onChange={this.handleChangeEmail}
                                            value={this.state.email}
                                            className="form-control" placeholder="Masukkan Email Kepala RT" min="1"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="from-group col-md-12">
                                        <label>Alamat <sup>*</sup></label>
                                            <textarea rows="3" placeholder='Alamat Ketua RT' className='form-control' onChange={this.handleChangeAlamat} value={this.state.alamat}></textarea>
                                        </div>
                                    </div>
                                        <div className="col-md-12">
                                            {cekk}
                                        </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success', task.key)}>Update</button>
                                <span>  </span>
                                <Button color="secondary" onClick={this.toggle2}>Close</Button>{' '}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                
                </Modal> 
            <span>  </span>
                <Button color="danger" onClick={this.toggle}><i className="fa fa-trash"></i></Button>
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
