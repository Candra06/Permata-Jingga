import React from 'react';
import { RefRT, rootRef } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import Daftarrw from "./../DataRW/selectrw/daftarrw";
import { ToastContainer, toast } from 'react-toastify';
export default class Listrt extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        no: '', nik: '', kop: '', norw:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
      
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtno, txtkop, txtnik, txtnorw) {
        this.setState({
            no: txtno,
            kop: txtkop,
            nik: txtnik,
            norw: txtnorw,
          modal2: !this.state.modal2
        });
        localStorage.setItem("DataRW", txtnorw);
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
          kop: this.state.kop.trim(),
          norw: localStorage.getItem("DataRW").trim()
        };
                if (newTask.no.length && newTask.nik.length && localStorage.getItem("DataRW").length) {
                rootRef.child('RT').child(kunci).update({ no: this.state.no, nik: this.state.nik, kop: this.state.kop, norw: localStorage.getItem("DataRW").trim() });
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
        <td>{task.norw}</td>
        <td>{task.nik}</td>
        <td>{task.kop}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.no, task.kop, task.nik, task.norw)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}> 
                <div className="card-header card-info">
                            <h3 className="card-title">Update Data RT {task.no}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">
                       
                        <form role="form">
                            <div className="card-body">
                                <div className="row col-12">
                                    <div className="form-group mb-3 col-12">
                                        <Daftarrw/>
                                    </div>
                                    <div className="input-group mb-3 col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input type="number" 
                                        onChange={this.handleChangeNo}
                                        value={this.state.no}
                                        className="form-control" placeholder="Masukkan No RT" minLength="1"/>
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
