import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import Datanotif from "./page/DataNotif/daftarnotif";
import { RefPengajuan, RefNotif, RefWarga } from './../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';

class Home extends Component {

  constructor(){
    super();
  this.state = ({ jmlkeluarga : 0, jmlselesai:0, jmlproses:0, jmlwait:0, modal: false});

  this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    let htgkeluarga = 0, htgselesai = 0, htgproses = 0, htgwait = 0;
    RefWarga.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      //const tasks = [];
      snap.forEach(shot => {
        //tasks.push({ ...shot.val(), key: shot.key });
        //localStorage.setItem("no_kk", shot.val().no_kk)

        RefWarga.orderByChild("no_kk").equalTo(shot.val().no_kk).on('value', snap => {
          //const tasks = [];
          snap.forEach(shot => {
            //tasks.push({ ...shot.val(), key: shot.key });
            //console.log(shot.val())
            ++htgkeluarga;
          });
          this.setState({ jmlkeluarga: htgkeluarga});
        });
      });
      //this.setState({ tasks});
    });
    /*localStorage.setItem("nik", "3511112211990001");
    localStorage.setItem("no_kk", "3511111302011438");
    localStorage.setItem("nama", "Andrean Three");*/

    

    RefPengajuan.orderByChild("pemohon").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks2 = [];
      snap.forEach(shot => {
        tasks2.push({ ...shot.val(), key: shot.key });
        if(shot.val().status === "Pending"){
            htgwait++;
        }else if(shot.val().status === "Selesai"){
          htgselesai++;
        }else if(shot.val().status === "Proses"){
          htgproses++;
        }
      });
      this.setState({ tasks2, jmlkeluarga: htgkeluarga, jmlproses: htgproses, jmlselesai: htgselesai, jmlwait: htgwait});

    htgkeluarga = 0;
    htgselesai = 0;
    htgproses = 0;
    htgwait = 0;
    });
  }


  deleteTask() {
    RefNotif.orderByChild("nik_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
        RefNotif.child(shot.key).remove();
      });
      this.setState({ tasks});
    });

    toast.success('Data Berhasil Di Hapus', {
        position: toast.POSITION.TOP_RIGHT,
    });
    this.toggle();
  };

  render() {
    return (
        <div className="wrapper">

          <Nav/>


          <Layout/>

          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Dashboard Wargaku</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="">Home</a></li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                </div>
              </div>

            </div>

            <section className="content">
              <div className="container-fluid">

                <div className="row">
                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-info">
                      <div className="inner">
                        <h3>{this.state.jmlkeluarga}</h3>

                        <p>Jumlah Keluarga Anda</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person"></i>
                      </div>
                      <a href="" className="small-box-footer">.</a>
                    </div>
                  </div>


                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-primary">
                      <div className="inner">
                        <h3>{this.state.jmlwait}</h3>

                        <p>Pengajuan Pending</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-clock"></i>
                      </div>
                      <a href="" className="small-box-footer">.</a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>{this.state.jmlproses}</h3>

                        <p>Pengajuan Di Proses</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-hammer"></i>
                      </div>
                      <a href="" className="small-box-footer">.</a>
                    </div>
                  </div>


                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-success">
                      <div className="inner">
                        <h3>{this.state.jmlselesai}</h3>

                        <p>Pengajuan Selesai</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-checkmark"></i>
                      </div>
                      <a href="" className="small-box-footer">.</a>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <section className="col-lg-12 connectedSortable">
                    <div className="card">
                      <div className="card-header p-2">
                      <h3 className="card-title">Notifikasi Anda</h3>

                            <div className="card-tools">
                              <button type="button" className="btn btn-success" data-widget="collapse">
                                <i className="fa fa-minus"></i>
                              </button>
                              <span>  </span>
                              <button type="button" className="btn btn-danger" onClick={this.toggle} title="Menghapus Semua Notifikasi">
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                            </div>
                      <div className="card-body">
                          <Datanotif/>
                    </div>
                    </div>
              </section>
                    </div>
                    </div>
                    </section>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Semua Notifikasi yang anda terima akan di hapus oleh system!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={() => this.deleteTask()}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
                                       <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={3000} />
          <Footer/>

        </div>
    );
  }
}

export default Home;
