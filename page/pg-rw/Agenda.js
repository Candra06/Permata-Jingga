import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarAgenda from "./page/DataAgenda/daftaragenda";
import { RefWarga, rootRef, timeRef, RefAgenda } from '../../db';
import RandomKata from 'randomstring';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';

class Agenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            judul: '',
            tanggal: '',
            deskripsi:'',
            cek: true,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      deleteTask(){
        RefAgenda.orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key });
            RefAgenda.child(shot.key).remove();
          });
        });
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
        this.toggle()
      };
      handleChangejudul = event => {
        this.setState({ judul: event.target.value });
        // localStorage.setItem("judul",event.target.value);
      };

      handleChangeTgl = event => {
        this.setState({ tanggal: event.target.value });
        // localStorage.setItem("tanggal",event.target.value);
        // console.log(event.target.value)
      };
      handleChangeDeskripsi = event => {
        this.setState({deskripsi:event.target.value});
        // localStorage.setItem("isi",event.target.value);
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ judul: '', tanggal: '', deskripsi:'' });
      }

      notify(type){

        // console.log(localStorage.getItem("idrt"));
        return () => {

            if(this.state.judul === ""){
                toast.warn('Masukkan Judul!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.tanggal === ""){
                toast.warn('Pilih Tanggal Agenda', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.deskripsi === ""){
                toast.warn('Masukkan Deskripsi', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
        
              RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                snap.forEach(shot => {
                  // tasks.push({ ...shot.val(), key: shot.key });
                  const htg = {
                    kd_event:RandomKata.generate(10),
                    kd_pembuat:localStorage.getItem("nik"),
                    kd_penerima:shot.val().nik,
                    nama_pengirim:localStorage.getItem("nama"),
                    judul: this.state.judul.trim(),
                    tanggal: this.state.tanggal.trim(),
                    deskripsi: this.state.deskripsi.trim(),
                    ordertime: timeRef
                  };
                  const notif= {
                    nama_pengirim:localStorage.getItem("nama"),
                    nik_penerima:shot.val().nik.trim(),
                    nik_pengirim:localStorage.getItem("nik"),
                    teks:this.state.judul.trim(),
                    time_notif:timeRef,
                    tipe:"biru"
                  }
                  if(shot.val().nik === localStorage.getItem("nik")){

                  }else{
                 rootRef.child('Notifikasi').push(notif);
                }
                rootRef.child('Agenda').push(htg);
                // console.log(htg);
                // console.log(notif);
                })
              })
          
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });

              window.location.reload();
            }
           
        };
      };

      bersih = () =>{
          this.setState({judul: '', tanggal:'', deskripsi:'' });
      }
  render() {
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2" style={{marginTop: -1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Data Agenda</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/RW/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/RW/Agenda">Agenda</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Agenda</h3>

                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row col-md-12">
                                    <div className="col-md-6">
                                      <div className="form-group col-md-12">
                                          <label>Judul Agenda</label>
                                          <div className="input-group">
                                            <input type="text" placeholder="judul agenda" onChange={this.handleChangejudul} value={this.state.judul} className="form-control"/>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group col-md-12">
                                          <label>Tanggal Agenda</label>

                                          <div className="input-group">
                                              <input type="date" onChange={this.handleChangeTgl}
                                              value={this.state.tanggal} className="form-control"/>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <label>Deskripsi</label>
                                            <textarea className="form-control" onChange={this.handleChangeDeskripsi} value={this.state.deskripsi} placeholder="Masukkan Deskripsi Agenda"></textarea>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={(e) => this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Agenda</h3>
                            <button type="button" onClick={this.toggle} className="btn btn-danger btn-sm float-right"><i className="fa fa-trash"></i></button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                              <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                              <ModalBody>
                                  Data Agenda Akan di Hapus!!!
                              </ModalBody>
                              <ModalFooter>
                                  <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                                  <Button color="danger" onClick={(e) =>this.deleteTask()}>Konfirmasi</Button>
                              </ModalFooter>
                          </Modal>
                        </div>
                            <div className="card-body">
                                <DaftarAgenda/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={2000}
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

export default Agenda;
