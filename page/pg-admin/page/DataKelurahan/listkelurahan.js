import React from 'react';
import { RefRT, rootRef, RefKelurahan, RefHapus } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
export default class Listrt extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        nama: '', tmpnama:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
      
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtnama) {
        this.setState({
            nama: txtnama,
            tmpnama: txtnama,
          modal2: !this.state.modal2
        });
      }

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

    deleteTask = () => {
        const { key } = this.props.task;
        RefKelurahan.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
      
      notify(type, kunci){
        return () => {
        const newTask = {
          nama: this.state.nama.trim()
        };
        let hitung = 0;
              RefKelurahan.orderByChild("nama").equalTo(this.state.nama).on('value', snap => {
                snap.forEach(shot => {
                    if(shot.val().nama != this.state.tmpnama){
                    hitung++;
                    }else{

                    }                    
                });

                });
                if(hitung >= 1){
                    toast.warn('Nama Kelurahan Sudah Digunakan!!', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }else{
                if (newTask.nama.length) {
                RefKelurahan.child(kunci).update({ nama: this.state.nama });
                this.setState({ nama: '', tmpnama:'' });
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2()
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            }
            };
        };


        // handleInputChange = (event) => {
        //     //const { key } = this.props.task;
                
        //         if(event.target.checked){
                    
        //              const data = {
        //             kode: event.target.name,
        //             tipe: 'kelurahan',
        //             kodehapus: localStorage.getItem("xkodekelurahan")
        //             }
        //         RefHapus.push(data);
        //            // RefHapus.child(kunci).remove();  
        //         }else{
        //             RefHapus.orderByChild("kode").equalTo(event.target.name).on('value', snap => {
        //                 snap.forEach(shot => {
        //                    RefHapus.child(shot.key).remove();
        //                 });
        //             });

        //         }
            
        //   }

          
  render() {
    const { task } = this.props;
  
    return (
        <tr>
        {/* <td>
            
            <input
        name = {task.key}
            type="checkbox"
           // checked={this.state.isGoing}
            onClick={this.handleInputChange} 
            
            /></td> */}
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.nama)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}> 
                <div className="card-header card-info">
                            <h3 className="card-title">Update Data Kelurahan {task.nama}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">
                       
                        <div role="form">
                        <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="input-group col-md-12">
                                            <input type="text"
                                            onChange={this.handleChangeNama}
                                            value={this.state.nama}
                                            className="form-control " placeholder="Masukkan Nama Kelurahan"/>
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
                        Data Kelurahan {task.nama} Akan di Hapus!!!
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
