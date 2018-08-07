import React from 'react';
import { RefRW, rootRef } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
export default class Listrw extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        no: '', nik: '', kop: ''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
      
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtno, txtkop, txtnik) {
        this.setState({
            no: txtno,
            kop: txtkop,
            nik: txtnik,
          modal2: !this.state.modal2
        });
      }

      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
      };

      handleChangeKop = event => {
        this.setState({ kop: event.target.value });
      };

      handleChangeNo = event => {
        this.setState({ no: event.target.value });
      };

    deleteTask = () => {
        const { key } = this.props.task;
        RefRW.child(key).remove();
      };
      
      notify(type, kunci){
        return () => {
        const newTask = {
          no: this.state.no.trim(),
          nik: this.state.nik.trim(),
          kop: this.state.kop.trim()
        };
                if (newTask.no.length && newTask.nik.length) {
                rootRef.child('RW').child(kunci).update({ no: this.state.no, nik: this.state.nik, kop: this.state.kop });
                this.setState({ no: '' , nik: '', kop: '' });
                toast.success('Data Berhasil Di Simpan', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;
    
    return (
        <tr>
        <td>{task.no}</td>
        <td>{task.nik}</td>
        <td>{task.kop}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.no, task.kop, task.nik)}>Edit</Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}> 
                <div className="card-header card-info">
                            <h3 className="card-title">Update Data RW {task.no}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">
                       
                        <form role="form">
                            <div className="card-body">
                                <div className="row col-12">
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input type="number" 
                                        onChange={this.handleChangeNo}
                                        value={this.state.no}
                                        className="form-control" placeholder="Masukkan No RW"/>
                                    </div>
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                        <input type="number"
                                        onChange={this.handleChangeNik}
                                        value={this.state.nik}
                                        className="form-control" placeholder="Masukkan NIK Kepala RW"/>
                                    </div>
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        </div>
                                        <input type="text" 
                                        onChange={this.handleChangeKop}
                                        value={this.state.kop}
                                        className="form-control" placeholder="Masukkan KOP (Opsional)"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success', task.key)}>Update</button>
                                <span>  </span>
                                <Button color="secondary" onClick={this.toggle2}>Close</Button>{' '}
                            </div>
                        </form>
                    </div>
                </ModalBody>
                
                </Modal> 
            <span>  </span>
                <Button color="danger" onClick={this.toggle}>Delete</Button>
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
