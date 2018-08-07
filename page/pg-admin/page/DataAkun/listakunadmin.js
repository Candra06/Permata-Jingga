import React from 'react';
import { RefUser, RefWarga } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { toast } from 'react-toastify';

export default class listakunadmin extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        email: '', password:'', nik: '', level: '', tmpemail:'', kode:'', showalert: 'hide', lihatbtn:'block'
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtidrt, txtjml, txtno, txtidrw, txtkode) {
        this.setState({
            password: txtno,
            email: txtjml,
            tmpemail: txtjml,
            nik: txtidrt,
            kode: txtkode,
            level: txtidrw,
          modal2: !this.state.modal2
        });
      }
      handleChangePassword = event => {
        this.setState({ password: event.target.value });
      };

      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
      };

      handleChangeLevel = event => {
        this.setState({ level: event.target.value });
      };

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });
        let hitung = 0;
        RefUser.orderByChild("email").equalTo(event.target.value).on('value', snap =>{
            snap.forEach(shot =>{
                if(shot.val().kd_user === this.state.kode){

                }else{
                hitung++;
                }
            });
            if(hitung >= 1 ){
                this.setState({ showalert: 'block', lihatbtn:'hide'});
            }else{
                    this.setState({ showalert: 'hide', lihatbtn:'block'});
                
            }
        });
      };

      handleReset = event => {
        event.preventDefault();
        this.setState({ email: '', password:'', nik: '', level: '' });
      }
    deleteTask(kodeuser){
        const { key } = this.props.task;
        RefUser.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
        //window.location.reload();
      };

      notify(type, kunci, kodeuser){
        return () => {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
            if(this.state.nik === ""){
                toast.warn('Nama tidak boleh kosong', {
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
              }else if(this.state.password === ""){
                toast.warn('Password tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.level === ""){
                toast.warn('Pilih Level Akun', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else{
                    const akundata = {
                        nik:this.state.nik.trim(),
                        password:this.state.password.trim(),
                        level:this.state.level.trim(),
                        email:this.state.email.trim()
                    };
                RefUser.child(kunci).update({nik: this.state.nik, email: this.state.email, password: this.state.password, level: this.state.level });
                this.setState({ email: '', password:'', level: '', nik:'' });

                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2();
                }
            };
        };
  render() {
    const { task } = this.props;
    const { showalert } = this.state;
    let cekalert;
      if(showalert === 'hide'){
  
      }else if(showalert === 'block'){
          cekalert = (
              <div className="alert alert-danger col-md-12" role="alert" style={{marginTop: 0.5 + 'em'}}>
            Email Sudah Di Gunakan!!!
          </div>
          )
      }


    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nik}</td>
        <td>{task.email}</td>
        <td>{task.level}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.nik, task.email, task.password, task.level, task.kd_user)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}>
                <div className="card-header card-info">
                            <h3 className="card-title">Update Akun {task.email}</h3>
                        </div>
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                            <div className="card-body">
                                    <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="form-group col-md-12">
                                                <label>Nama Akun</label>
                                                <input type="email"
                                                onChange={this.handleChangeNik}
                                                value={this.state.nik}
                                                className="form-control" placeholder="Masukkan Nama Akun"/>
                                            </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group col-md-12">
                                                <label>Email</label>
                                                <input type="email"
                                                onChange={this.handleChangeEmail}
                                                value={this.state.email}
                                                className="form-control" placeholder="Masukkan Email"/>
                                            </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group col-md-12">
                                                <label>Password</label>
                                                <input type="password"
                                                onChange={this.handleChangePassword}
                                                value={this.state.password}
                                                className="form-control" placeholder="Masukkan Password"/>
                                            </div>
                                            </div>
                                                <div className="form-group col-md-12">
                                                <label>Level Akun </label>
                                                <select className="form-control" style={{height: 3 + 'em'}}  value={this.state.level} onChange={this.handleChangeLevel}>
                                                    <option value="">Pilih Level Akun</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Satpam">Satpam</option>
                                                </select>
                                            </div>
                                        </div>
                                    {cekalert}
                                </div>

                            <div className="card-footer col-12">
                                <button type="submit" id={this.state.lihatbtn} className="btn btn-primary" onClick={this.notify('success', task.key, task.kd_user)}>Update</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.toggle2}>Batal</button>
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
                        Data Akun {task.email} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) =>this.deleteTask(task.kd_user)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
