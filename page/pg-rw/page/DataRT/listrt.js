import React from 'react';
import { RefRT, rootRef } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
export default class Listrt extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false, nomer: '',
        no: '', nik: '',  norw:'', nama:'', alamat: '', email: '', no_telp: ''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    componentDidMount() {
        RefRT.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            let no = 0;
            snap.forEach(shot => {
                no++;
              tasks.push({ ...shot.val(), key: shot.key, nomer:no });
            });
            tasks.push({ ...shot.val(), key: shot.key });
          });
          this.setState({ tasks, tasksLoading: false });
        });
        console.log(localStorage.getItem("koderw"));

        RefRT.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on('value', snap => {
            const tasks = [];
            var no=this.state.no-1;
            snap.forEach(shot => {
              let no = 0;
              snap.forEach(shot => {
                  tasks.push({ ...shot.val(), key: shot.key, nomer:no });
                  no--;
              });
              tasks.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ tasks, tasksLoading: false });
          });
      }
      
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtno, txtnik, txtnorw, txtnama, txtalamat, txtemail, txtno_telp) {
        this.setState({
            no: txtno,
            nik: txtnik,
            norw: txtnorw,
            nama: txtnama,
            alamat: txtalamat,
            email: txtemail,
            no_telp: txtno_telp,
          modal2: !this.state.modal2
        });
        localStorage.setItem("DataRW", txtnorw);
      }

      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
      };

      handleChangeNo = event => {
        this.setState({ no: event.target.value });
      };

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleChangeAlamat = event => {
          this.setState({ alamat: event.target.value});
      };

      handleChangeEmail = event => {
          this.setState({ email: event.target.value});
      };

      handleChangeNo_Telp = event => {
          this.setState({ no_telp: event.target.value });
      };

    deleteTask = () => {
        const { key } = this.props.task;
        RefRT.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
      
      notify(type, kunci){
        return () => {
        const newTask = {
          no: this.state.no.trim(),
          nik: this.state.nik.trim(),
          norw: localStorage.getItem("DataRW").trim()
        };
                if (newTask.no.length && newTask.nik.length) {
                rootRef.child('RT').child(kunci).update({ no: this.state.no, nik: this.state.nik, nama: this.state.nama, alamat: this.state.alamat, email: this.state.email, no_telp: this.state.no_telp});
                this.setState({ no: '' , nik: '', nama:'', alamat: '', email: '', no_telp: '' });
                toast.success('Data Berhasil Di Simpan', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2()
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;
  
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.no}</td>
        <td>{task.nik}</td>
        <td>{task.nama}</td>
        <td>{task.alamat}</td>
        <td>{task.nohp}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.no, task.nik, task.norw,task.nama, task.email, task.alamat, task.no_telp)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}> 
                <div className="card-header card-info">
                            <h3 className="card-title">Update Data RT {task.no}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">
                       
                        <div role="form">
                            <div className="card-body">
                                <div className="row col-12">
                                    {/* <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input type="number" 
                                        onChange={this.handleChangeNo}
                                        value={this.state.no}
                                        className="form-control" placeholder="Masukkan No RT" minLength="1"/>
                                    </div> */}
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                        <input type="text"
                                        onChange={this.handleChangeNama}
                                        value={this.state.nama}
                                        className="form-control" placeholder="Masukkan Nama Kepala RT"/>
                                    </div>
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                        <input type="number"
                                        onChange={this.handleChangeNik}
                                        value={this.state.nik}
                                        className="form-control" placeholder="Masukkan NIK Kepala RT"/>
                                    </div>
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                        <input type="number"
                                        onChange={this.handleChangeNo_Telp}
                                        value={this.state.no_telp}
                                        className="form-control" placeholder="Masukkan No Telfon Kepala RT"/>
                                    </div>
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                        <input type="text"
                                        onChange={this.handleChangeEmail}
                                        value={this.state.email}
                                        className="form-control" placeholder="Masukkan Email Kepala RT"/>
                                    </div>
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                        <textarea rows="3" placeholder='Alamat Ketua RT' className='form-control' onChange={this.handleChangeAlamat.bind(this)}>{this.state.alamat}</textarea>
                                    </div>
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
