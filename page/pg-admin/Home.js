import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataPengajuan from "./page/DataPengajuan/daftarpengajuan";
import { RefKK, RefPengajuan, RefWarga, RefUser } from './../../db';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
class Home extends Component {

  constructor(){
    super();
  this.state = ({ htgwarga : 0, htgpengajuan:0, htguser:0, htgkk:0,
    modal: false,});
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    console.log(localStorage.setItem("kd_event", ""));
    let jmlwarga = 0, jmlpengajuan=0, jmluser=0, jmlkk=0;
    RefWarga.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
        jmlwarga += 1;
      });
      this.setState({ htgwarga: jmlwarga});
    });

    RefKK.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
        jmlkk += 1;
      });
      this.setState({ htgkk: jmlkk});
    });

    RefUser.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
        jmluser += 1;
      });
      this.setState({ htguser: jmluser});
    });

    RefPengajuan.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
        jmlpengajuan += 1;
      });
      this.setState({ htgpengajuan: jmlpengajuan});
    });
    jmlwarga = 0;
    jmlpengajuan = 0;
    jmluser = 0;
    jmlkk = 0;
  }
  deleteTask(){
    RefPengajuan.orderByChild("status").equalTo("Selesai").on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });

        RefPengajuan.child(shot.key).remove();
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
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2"style={{marginTop: 1 + 'em'}}>
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Dashboard</h1>
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

                <div className="row" style={{marginTop: 1 + 'em'}}>
                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-info">
                      <div className="inner">
                        <h3>{this.state.htgwarga}</h3>

                        <p>Jumlah Warga</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag"></i>
                      </div>
                      <a href="" className="small-box-footer"></a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-success">
                      <div className="inner">
                        <h3>{this.state.htgkk}</h3>

                        <p>Jumlah KK</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                      </div>
                      <a href="" className="small-box-footer"></a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>{this.state.htguser}</h3>

                        <p>User Registrations</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person-add"></i>
                      </div>
                      <a href="" className="small-box-footer"></a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-Primary">
                      <div className="inner">
                        <h3>{this.state.htgpengajuan}</h3>

                        <p>Total Pengajuan</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-pie-graph"></i>
                      </div>
                      <a href="" className="small-box-footer"></a>
                    </div>
                  </div>

                </div>

                <div className="row"style={{marginTop: -1 + 'em'}}>
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header border-transparent">
                        <h3 className="card-title">Pengajuan Terbaru</h3>
                      </div>
                      <div className="card-body p-0">
                        {/* <DataPengajuan/> */}
                      </div>
                      <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={5000}
                                    />
                                </div>
                      <div className="card-footer clearfix">
                        <button type="button" onClick={this.toggle} className="btn btn-danger float-right"><i className="fa fa-trash"></i> Hapus Yang Telah Selesai</button>
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
                    </div>
                  </div>


                </div>

                </div>


            </section>

          </div>
          <Footer/>

          <aside className="control-sidebar control-sidebar-dark">
          </aside>
        </div>
    );
  }
}

export default Home;
