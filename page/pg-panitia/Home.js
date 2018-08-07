import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import NumberFormat from 'react-number-format';
import Datanotif from "./page/DataNotif/daftarnotif";
import { RefPengajuan, RefNotif, RefWarga, RefQurban } from './../../db';
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
    RefQurban.on('value', snap => {
      snap.forEach(shot => {     
            ++htgkeluarga;
          });
          this.setState({ jmlkeluarga: htgkeluarga});
        });

    RefQurban.on('value', snap => {
      const tasks2 = [];
      let total = 0
      snap.forEach(shot => {
        tasks2.push({ ...shot.val(), key: shot.key });         
          total = parseInt(total) + parseInt(shot.val().pembayaran)
          if(shot.val().status === "Belum Lunas"){
            htgproses++;
          }else if(shot.val().status === "Lunas"){
            htgselesai++;
          }
      });
      this.setState({ tasks2, jmlkeluarga: htgkeluarga, jmlproses: htgproses, jmlselesai: htgselesai, jmlwait: parseInt(total)});

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
                    <h1 className="m-0 text-dark">Dashboard Permatajingga.net</h1>
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
                        <h4>{this.state.jmlkeluarga}</h4>

                        <p>Jumlah Shohibul Qurban</p>
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
                        <h4><NumberFormat value={this.state.jmlwait} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        <p>Jumlah Dana</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-clock"></i>
                      </div>
                      <a href="" className="small-box-footer">.</a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h4>{this.state.jmlproses}</h4>

                        <p>Jumlah Belum Lunas</p>
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
                        <h4>{this.state.jmlselesai}</h4>

                        <p>Jumlah Lunas</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-checkmark"></i>
                      </div>
                      <a href="" className="small-box-footer">.</a>
                    </div>
                  </div>
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
