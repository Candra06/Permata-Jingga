import React from 'react';
import { RefKK, rootRef } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
export default class Listkk extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        nokk: '', jml: '', idrt: '', idrw: ''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
      
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtidrt, txtjml, txtno, txtidrw) {
        this.setState({
            nokk: txtno,
            jml: txtjml,
            idrt: txtidrt,
            idrw: txtidrw,
          modal2: !this.state.modal2
        });
        localStorage.setItem("DataRT", txtidrt)
        localStorage.setItem("DataRW", txtidrw)
      }

      handleChangeNo = event => {
        this.setState({ nokk: event.target.value });
      };

      handleChangeJml = event => {
        this.setState({ jml: event.target.value });
      };
      handleReset = event => {
        //event.preventDefault();
        this.setState({ nokk: '', jml: '' });
      }

    deleteTask = () => {
        const { key } = this.props.task;
        RefKK.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
      
      notify(type, kunci){
        return () => {
        const newTask = {
            nokk: this.state.nokk.trim(),
            jml: this.state.jml.trim()
        };
                if (newTask.nokk.length && newTask.jml.length) {
                rootRef.child('KK').child(kunci).update({ nokk: this.state.nokk, jml: this.state.jml});
                this.setState({ nokk: '', jml: ''});
                
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    //this.toggle2();
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;
  
    return (
        <tr>
        <td>{task.idrw}{'/'}{task.idrt}</td>
        <td>{task.nokk}</td>
        <td>{task.jml}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.idrt, task.jml, task.nokk, task.idrw)}>Edit</Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}> 
                <div className="card-header card-info">
                            <h3 className="card-title">Update Data KK {task.nokk}</h3>
                        </div>
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">
                       
                <form className="form-control">
                            <div className="card-body">
                                    <div className="form-group mb-3 col-12">
                                        <label>No KK</label>
                                        
                                        <input type="number" 
                                        onChange={this.handleChangeNo}
                                        value={this.state.nokk}
                                        className="form-control" placeholder="Masukkan No KK" min="1"/>
                                    </div>
                                    <div className="form-group mb-3 col-12">
                                        <label>Jumlah Keluarga</label>
                                        
                                        <input type="number" 
                                        onChange={this.handleChangeJml}
                                        value={this.state.jml}
                                        className="form-control" placeholder="Jumlah Keluarga" min="1"/>
                                    </div>
                                </div>
                            
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success', task.key)}>Update</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
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
                        Data KK {task.nokk} Akan di Hapus!!!
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
