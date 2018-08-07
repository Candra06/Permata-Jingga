import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataPengajuan from "./page/Penitipan/dataPenitipan";
import { rootRef, RefPengajuan, RefPenitipan } from '../../db';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
class Penitipan extends Component {

    constructor(props) {
        super(props);
        this.state = { no: '', nik: '', kop: '', norw:'', keyrw: '', arrayrw: '',modal: false };

        localStorage.setItem("DataRW", "");
        this.toggle = this.toggle.bind(this);

      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      handleChangeNo = event => {
        this.setState({ no: event.target.value });
      };

      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
      };

      handleChangeKop = event => {
        this.setState({ kop: event.target.value });
      };
      handleReset = event => {
        event.preventDefault();
        this.setState({ no: '' , nik: '', kop: '' });
      }
      removeAll(){
        RefPengajuan.orderByChild("nik_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key });
            RefPengajuan.child(shot.key).remove();
          });
          this.setState({ tasks});
        });
      }
      notify(type){
        return () => {
            const htg = {
                no: this.state.no.trim(),
                nik: this.state.nik.trim(),
                kop: this.state.kop.trim(),
                norw: localStorage.getItem("DataRW").trim()
              };
              if (htg.no.length && htg.nik.length && localStorage.getItem("DataRW").length) {
                rootRef.child('RT').push(htg);
                this.setState({ no: '' , nik: '', kop: '' });
                localStorage.setItem("DataRW", "");
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
        };
      };
      deleteTask(){
        RefPenitipan.orderByChild("status").equalTo("Selesai").on('value', snap => {
          snap.forEach(shot => {
           if(shot.val().idpenerima === localStorage.getItem("nik")){
            RefPengajuan.child(shot.key).remove();
           }
          });
        });
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
        this.toggle()
      };
  render() {
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Data Penitipan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data Penitipan</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                    <div className="card-header p-2">Pemberitahuan Penitipan yang Diterima
                            <button type="button" onClick={this.toggle} className="btn btn-danger btn-sm float-right"><i className="fa fa-trash"></i></button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                          <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                          <ModalBody>
                              Data Pengajuan Yang Telah Selesai Akan di Hapus!!!
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                              <Button color="danger" onClick={(e) =>this.deleteTask()}>Konfirmasi</Button>
                          </ModalFooter>
                      </Modal>
                          </div>
                          <div className="card-body">
                            <DataPengajuan/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={5000}
                                    />
                                </div>
                            </div>
                    </div>

                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default Penitipan;
