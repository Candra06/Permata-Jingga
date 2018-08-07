import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import Datanotif from "./page/DataNotif/daftarnotif";
import { RefNotif, RefWarga, RefRT, RefPengajuan } from './../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';

class Home extends Component {

  constructor(){
    super();
  this.state = ({ total : 0, selesai:0, pending:0, today:0, modal: false});

  this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    //console.log("NO kknya", localStorage.getItem("no_kk"));
    /*localStorage.setItem("nik", "3511112211990001");
    localStorage.setItem("no_kk", "3511111302011438");
    localStorage.setItem("nama", "Andrean Three");*/
    // RefRT.orderByChild("nort").equalTo(parseInt(localStorage.getItem("idrt"))).on('value', snap => {
    //   snap.forEach(shott => {
    //     console.log("shott "+shott.val().nik)
    //   })
    // })

    RefWarga.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      snap.forEach(shot => {
        // localStorage.setItem("idrt", shot.val().nort);
        // localStorage.setItem("koderw",  shot.val().norw)
        console.log(shot.val())
        RefRT.orderByChild("no").equalTo(parseInt(shot.val().nort)).on('value', snap => {
          snap.forEach(shott => {
            if(shott.val().norw === shot.val().norw){
              localStorage.setItem("nikrt", shott.val().nik)
              localStorage.setItem("idrt", shott.val().no);
              localStorage.setItem("koderw",  shott.val().norw)
              }
            let totalpengajuan = 0, htgselesai = 0, htgpending = 0, today = 0, tdy= new Date();
                let hariini = tdy.getDate()+"-"+(tdy.getMonth()+1)+"-"+tdy.getFullYear();
                //console.log(hariini)
                RefPengajuan.orderByChild("idpenerima").equalTo(shott.val().nik).on('value', snap => {
                  
                  snap.forEach(shottt => {
                    totalpengajuan += 1;
                    if(shottt.val().tgl_pengajuan === hariini){
                      today++;
                      if(shottt.val().status === "Pending"){
                        htgpending++;
                      }else if(shottt.val().status === "Selesai"){
                        htgselesai++;
                      }
                    }
                  });

                  this.setState({ total: totalpengajuan, selesai: htgselesai , pending: htgpending, today: today});

                  totalpengajuan = 0;
                  htgselesai = 0;
                  htgpending = 0;
                  today=0;

                });
          })
        })





      });
    });

   
    // RefPenitipan.on('value', snap => {
    //   const tasks2 = [];
    //   snap.forEach(shot => {
    //     tasks2.push({ ...shot.val(), key: shot.key });
    //     if(shot.val().status === "Pending"){
    //       htgproses++;
    //     }else if(shot.val().status === "Diterima"){
    //       htgwait++;
    //     }else if(shot.val().status === "Ditolak"){
    //       htgselesai++;
    //     }
    //   });
      
    // });
  }


  deleteTask() {
    RefNotif.orderByChild("nik_penerima").equalTo(localStorage.getItem("nikrt")).on('value', snap => {
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
                    <h1 className="m-0 text-dark">Dashboard Sekretaris</h1>
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
                        <h3>{this.state.pending}</h3>

                        <p>Pengajuan Pending</p>
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
                        <h3>{this.state.selesai}</h3>

                        <p>Pengajuan Selesai</p>
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
                        <h3>{this.state.today}</h3>

                        <p>Pengajuan Hari Ini</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-hammer"></i>
                      </div>
                      <a href="" className="small-box-footer">.</a>
                    </div>
                  </div>


                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h3>{this.state.total}</h3>

                        <p>Total Pengajuan</p>
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
                      <h3 className="card-title">Notifikasi</h3>

                            <div className="card-tools">
                              <button type="button" className="btn btn-tool" data-widget="collapse">
                                <i className="fa fa-minus"></i>
                              </button>
                              <button type="button" className="btn btn-tool" onClick={this.toggle} title="Menghapus Semua Notifikasi">
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
