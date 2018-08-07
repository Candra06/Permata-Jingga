import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataPengajuan from "./page/Pengajuan/dataPengajuan";
import { rootRef, RefPengajuan, RefNoSurat } from '../../db';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
class Pengajuan extends Component {

    constructor(props) {
        super(props);
        this.state = { no: '', nik: '', kop: '', norw:'', keyrw: '', arrayrw: '',modal: false };

        localStorage.setItem("DataRW", "");
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);

      }

      componentWillMount(){
        this.tampilno();
      }
      tampilno(){
        RefNoSurat.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
            
            snap.forEach(shot => {
                this.setState({
                    kunci: shot.key,
                    nomer: shot.val().no_awal,
                })
            })
        })
      }


      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

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
        RefPengajuan.orderByChild("nik_penerima").equalTo("08123308269").on('value', snap => {
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
      toggle2() {
        this.tampilno();
      this.setState({
        modal2: !this.state.modal2
      });
    }
    deleteTask(){
      RefPengajuan.orderByChild("status").equalTo("Selesai").on('value', snap => {
        snap.forEach(shot => {
         if(shot.val().idpenerima === localStorage.getItem("nikrt")){
          RefPengajuan.child(shot.key).remove();
         }
        });
      });
      toast.success('Data Berhasil Di Hapus', {
          position: toast.POSITION.TOP_RIGHT,
      });
      this.toggle()
    };

      handleChangeNo = event => {
        this.setState({
            nomer: event.target.value
        })
    }
    addnomer = () => {
      const {kunci, nomer } = this.state;
      if(nomer === ""){
          toast.warn('Nomer Tidak Boleh Kosong', {
              position: toast.POSITION.TOP_RIGHT,
            });
      }else{
      if(kunci === ""){
          const data = {
              nik : localStorage.getItem("nikrt"),
              no_awal: nomer,
              tercetak :0
          }
          RefNoSurat.push(data)
      }else{
          RefNoSurat.child(kunci).update({
              no_awal: nomer
          })
      }
      toast.success('Data Berhasil Di Simpan', {
          position: toast.POSITION.TOP_RIGHT,
      });
      this.toggle2();
      }
    }

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
                    <h1>Data Pengajuan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data RT</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                  <div className="card card-info">
                    <div className="card-header p-2">Data Pengajuan Warga
                    <div className="card-tools">
                    <button type="button" onClick={this.toggle2} className="btn btn-primary btn-sm"><i className="fa fa-gear"></i></button>
                    {'  '}
                    <button type="button" onClick={this.toggle} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                    </div>                   
                    </div>
                    
                      <div className="card-body">
                        <DataPengajuan/>
                          <div>
                            <ToastContainer
                            hideProgressBar={false}
                            newestOnTop={true}
                            autoClose={2000}
                            />
                          </div>
                          <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
                                        <ModalHeader toggle={this.toggle2}>Pengaturan Nomor Surat</ModalHeader>
                                        <ModalBody>

                                        <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                        <label>Nomor Surat</label>
                                            <input type="number"
                                            onChange={ this.handleChangeNo }
                                            value={this.state.nomer}
                                            className="form-control" placeholder="Masukkan Nomor Surat" min="1"/>
                                        </div>
                                    </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.toggle2}>Batal</Button>{' '}
                                            <Button color="primary" onClick={(e) => this.addnomer()}>Simpan</Button>
                                        </ModalFooter>
                                    </Modal>
                                
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

export default Pengajuan;
