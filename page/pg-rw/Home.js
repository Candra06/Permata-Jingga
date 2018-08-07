import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import Datanotif from "./page/DataNotif/daftarnotif";
import Datapengajuan from "./page/DataPengajuan/DaftarNotifPengajuan";
import { RefWarga,RefKK, rootRef, RefNotif} from "./../../db";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    tasks: [],
    countWarga:0,
    countKK:0,
    countLK:0,
    countPR:0,
    modal: false
  }; 
  this.toggle = this.toggle.bind(this);

}


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount(){
    rootRef.child("RW").orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks2 = [];
      snap.forEach(shot => {
        tasks2.push({ ...shot.val(), key: shot.key });
        localStorage.setItem("koderw",  shot.val().no)
        // console.log(shot.val())
      });
    });
      
          RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
            
        let count = 0;
        let countLK=0;
        let countPR=0;
            snap.forEach(shot => {
              ++count;
              // console.log(shot.val());
              if(shot.val().gender === "Laki-Laki"){
                ++countLK;
              }else {
                ++countPR;
              }
            })
            this.setState({countWarga: count});
            this.setState({countLK: countLK});
            this.setState({countPR: countPR});
          })
       
      
    RefKK.orderByChild("idrw").equalTo(localStorage.getItem("koderw")).on('value', snap => {
     
      let hitung = 0;
      snap.forEach(shot => {
        ++hitung;
      });
      this.setState({countKK: hitung});
    })
  }
  deleteTask() {
    RefNotif.orderByChild("nik_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      snap.forEach(shot => {
        RefNotif.child(shot.key).remove();
      });
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

                <div className="row">
                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-info">
                      <div className="inner">
                        <h3>{this.state.countKK}</h3>

                        <p>Total KK</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag"></i>
                      </div>
                      <a href="" className="small-box-footer">-</a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-success">
                      <div className="inner">
                        <h3>{this.state.countWarga}</h3>

                        <p>Jumlah Warga</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                      </div>
                      <a href="" className="small-box-footer">-</a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>{this.state.countLK}</h3>

                        <p>Jumlah Laki-Laki</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person-add"></i>
                      </div>
                      <a href="" className="small-box-footer">-</a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h3>{this.state.countPR}</h3>

                        <p>Jumlah Perempuan</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-pie-graph"></i>
                      </div>
                      <a href="" className="small-box-footer">-</a>
                    </div>
                  </div>

                </div>

                <div className="row">
                    <section className="col-lg-6 connectedSortable">
                        <div className="card">
                          <div className="card-header p-2">
                            <ul className="nav nav-pills">
                              <li className="nav-item"><a className="nav-link">Notifikasi Pengumuman</a></li>
                            </ul>
                            <div className="card-tools">
                              <button type="button" className="btn btn-tool" data-widget="collapse">
                                <i className="fa fa-minus"></i>
                              </button>
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
                      <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                                        <ModalBody>
                                            Semua Notifikasi Pengumuman akan di hapus!!
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                                            <Button color="danger" onClick={() => this.deleteTask()}>Konfirmasi</Button>
                                        </ModalFooter>
                                    </Modal>

                      <section className="col-lg-6 connectedSortable">
                        <div className="card">
                          <div className="card-header p-2">
                            <ul className="nav nav-pills">
                              <li className="nav-item"><a className="nav-link">Notifikasi Pengajuan</a></li>
                            </ul>
                          </div>
                          <div className="card-body">
                              <Datapengajuan/>
                          </div>
                        </div>
                  </section>
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
