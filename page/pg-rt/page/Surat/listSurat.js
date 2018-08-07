import React from 'react';

import { rootRef, RefSurat } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { toast } from 'react-toastify';
//import { Action } from "../../../../Action";
export default class ListSurat extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        modal3: false,
        search:'',
        kode:'', jenis_surat:'', kunci: ''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
    }
    handleFilter = event => {
          this.setState({ search: event.target.value });
    };
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle3() {
        this.setState({
          modal3: !this.state.modal3
        });
      }
      toggle2(xkey, kode_surat, jenis_surat) {
        this.setState({
            kode: kode_surat, jenis_surat: jenis_surat, kunci:xkey,
          modal2: !this.state.modal2
        });
        console.log(this.state.kunci);
      }

      handleChangeJenis = event => {
        this.setState({ jenis_surat: event.target.value });
      };

      handleChangeKode = event => {
        this.setState({ kode: event.target.value });
      };


    deleteTask = (kun) => {
        const { key } = this.props.task;
        RefSurat.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
        position: toast.POSITION.TOP_RIGHT,
      });
      };

      notify(type, kunci){
        return () => {
        const newTask = {
            kode_surat: this.state.kode.trim(),
            jenis_surat: this.state.jenis_surat.trim(),
        };
                if (newTask.kode_surat.length && newTask.jenis_surat.length) {
                rootRef.child('Surat').child(kunci).update({ kode_surat: this.state.kode,
                    jenis_surat: this.state.jenis_surat });
                this.setState({ kode: '', jenis_surat: '' });
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2();
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
        <td>{task.kode_surat}</td>
        <td>{task.jenis_surat}</td>
        <td>
        <Button color="primary" onClick={() => this.toggle2(task.key, task.kode_surat, task.jenis_surat)}><i className="fa fa-pencil"></i></Button>
            <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
            <ModalHeader toggle={this.toggle2}>
            <div className="card-header">
                        <h3 className="card-title">Update Data Surat {task.jenis_surat}</h3>
                        </div>

            </ModalHeader>
            <ModalBody>
            <div className="card card-info">
            <div className="form-control">
            <div className="card-body">

                                            <div className="row">

                                                <div className="col-md-12">
                                                    <div className="form-group col-md-12">
                                                        <label>Jenis Surat</label>
                                                        <input className="form-control" placeholder="Jenis Surat, contoh:SKTM" value={this.state.jenis_surat} onChange={this.handleChangeJenis}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                <div className="form-group mb-12 col-12">
                                                    <label>Kode Surat</label>
                                                    <input className="form-control" placeholder="Kode Surat, contoh:SJKK" value={this.state.kode} onChange={this.handleChangeKode}/>
                                                </div>
                                                </div>
                                            </div>

                                        </div>

                        <div className="card-footer col-12">
                            <button type="submit" className="btn btn-primary" id={this.state.tampilbtn} onClick={this.notify('success', task.key)}>Update</button>
                            <span>  </span>
                            <button type="reset" className="btn btn-danger"  onClick={this.toggle2}>Batal</button>
                        </div>
                    </div>
                </div>
            </ModalBody>

            </Modal>
            <span> </span>
        <Button color="danger" onClick={this.toggle}><i className='fa fa-trash'></i></Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data  Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={() =>this.deleteTask(task.id_pengumuman)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>

        </td>
    </tr>
    );
  }
}
