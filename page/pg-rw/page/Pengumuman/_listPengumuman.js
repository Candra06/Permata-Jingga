import React from 'react';
import { RefRW, rootRef, RefWarga, RefPengumuman } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
export default class ListPengumuman extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        modal3: false,
        id_pengumuman: '', id_pembuat: '', isi:'', jenis:'', id_penerima:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
    }

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
      toggle2(xkey, xid_pengumuman, xid_pembuat, xisi, xjenis, xid_penerima) {
        this.setState({
            id_pembuat: xid_pembuat, isi: xisi, jenis:xjenis, id_penerima: xid_penerima, kunci:xkey,
            modal2: !this.state.modal2
        });
        console.log(this.state.kunci);
      }

      handleChangeIsi = event => {
        this.setState({ isi: event.target.value });
      };

      handleChangePengirim = event => {
        this.setState({ id_pembuat: event.target.value });
        console.log(event.target.value);
      };
      handleChangeJenis = event => {
        this.setState({ type: event.target.value });
      };
      handleChangeJenis = event => {
        this.setState({ jenis: event.target.value });
        if(event.target.value === "pribadi"){

            console.log("pribadi");
            this.setState({displayPenerima:"block"});
        }else if(event.target.value === 'umum'){
            console.log("umum");
            this.setState({displayPenerima: "hide"});
        }
      };
      handleChangePenerima = event => {
        this.setState({id_penerima:event.target.value});
      }
      handleChangeTgl = event => {
        this.setState({ tgl_lahir: event.target.value });
      };

    deleteTask = () => {
        const { key } = this.props.task;
        RefPengumuman.child(key).remove();
      };

      notify(type, kunci){
        return () => {
        const newTask = {
            id_pengumuman: this.state.id_pengumuman(),
            isi: this.state.isi(),
            id_pembuat: this.state.id_pembuat(),
            jenis: this.state.jenis(),
            id_penerima: this.state.id_penerima(),
        };
                if (newTask.nama.length && newTask.nik.length) {
                rootRef.child('Pengumuman').child(kunci).update({
                    isi: this.state.isi, id_pembuat: this.state.id_pembuat,
                    jenis: this.state.jenis, id_penerima: this.state.id_penerima
                  });
                this.setState({ isi: '', id_pembuat: '', jenis: '', id_penerima:''  });
                toast.success('Data Berhasil Di Update', {
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
        <td>{task.kd_pembuat}</td>
        <td>{task.kd_penerima}</td>
        <td>{task.jenis}</td>
        <td>{task.isi}</td>
        <td>{task.tanggal}</td>
        <td>
        <Button color="success" onClick={this.toggle3}>Lihat Data</Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3} frame position="top">
                <ModalHeader toggle={this.toggle3}>
                <div className="card-header card-info">
                            <h3 className="card-title">Pengumuman</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">

                        <form role="form">
                            <div className="card-body">
                                <div className="row col-12">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Pengirim</td>
                                            <td>{task.kd_pembuat}</td>
                                        </tr>
                                        <tr>
                                            <td>Isi</td>
                                            <td>{task.isi}</td>
                                        </tr>
                                        <tr>
                                            <td>Penerima</td>
                                            <td>{task.kd_penerima}</td>
                                        </tr>
                                        <tr>
                                            <td>Jenis</td>
                                            <td>{task.jenis}</td>
                                        </tr>
                                        <tr>
                                            <td>Tanggal</td>
                                            <td>{task.tanggal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="danger" onClick={this.toggle3}>Tutup</Button>{' '}
                    </ModalFooter>
                </Modal>
                <span>  </span>
            <span>  </span>
                <Button color="danger" onClick={this.toggle}>Delete</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data  {task.nama} Akan di Hapus!!!
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
