import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import { RefWarga, rootRef, RefRT, RefRW, RefKK, RefAgenda, RefNotif } from './../../db';
import orderBy from 'lodash/orderBy';
import Datanotif from "./page/DataNotif/daftarnotif";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
class Home extends Component {
  constructor(){
    super();
  this.state = ({
    tasks: [],
    countWarga:0,
    dataPengajuan:[],
    countPria:0,
    countWanita:0,
    countKK:0,
    status: 'Selesai',
    status_agenda:'',
    tanggal_status: '',
    dataPengumuman:0,
    modal:false
  })
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    RefRT.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      snap.forEach(shot => {
        localStorage.setItem("idrt", shot.val().no);
        localStorage.setItem("koderw",  shot.val().norw)

      });

    });
    RefKK.orderByChild("idrt").equalTo(localStorage.getItem("idrt")).on('value', snap => {
      var data = '';
      let count = 0;
      let countPria=0;
      let countWanita=0;
      var countKK  = 0;

      snap.forEach(shot => {
        ++countKK;
        RefWarga.orderByChild("no_kk").equalTo(shot.val().nokk).on("value", snap => {
          const dataWarga = [];
          snap.forEach(shot => {
            ++count;
            // console.log(shot.val());
            if(shot.val().gender === "Laki-Laki"){
              ++countPria;
            }else {
              ++countWanita;
            }
          })
          this.setState({countWarga:count});
          this.setState({countPria:countPria});
          this.setState({countWanita:countWanita});
        })
      })
      this.setState({ countKK:countKK});
    })
    // RefWarga.on('value', snap => {
    //
    //   snap.forEach(shot => {
    //       ++count;
    //       if(shot.val().gender === "Laki-Laki"){
    //         ++countPria;
    //       }else {
    //         ++countWanita;
    //       }
    //   });
    //   this.setState({countWarga:count});
    //   this.setState({countPria:countPria});
    //   this.setState({countWanita:countWanita});
    // });
    // localStorage.setItem("nik", "3811080512990002");
    rootRef.child("Notifikasi").orderByChild("nik_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const dataPengajuan = [];
      snap.forEach(shot => {
        dataPengajuan.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ dataPengajuan, tasksLoading: false });
    });
    rootRef.child("Pengumuman").orderByChild("kd_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const dataPengumuman = [];
      snap.forEach(shot => {
        dataPengumuman.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ dataPengumuman, tasksLoading: false });
    });
    RefRW.orderByChild("no").equalTo(localStorage.getItem("koderw")).on('value', snap => {
      snap.forEach(shot => {
        localStorage.setItem('nikrw', shot.val().nik);
        localStorage.setItem("namarw", shot.val().nama)
      })
    })

    RefWarga.orderByChild("nik").equalTo(localStorage.getItem('nikrw')).on('value', snap => {
      snap.forEach(shot => {
        localStorage.setItem('namarw', shot.val().nama);
      })
    })

    let today = new Date;
    this.state.tanggal_status = today.getFullYear()+"-"+ (today.getMonth()+1) +"-"+today.getDate()
    RefAgenda.orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap =>{
        const tasks = [];
        snap.forEach( shot => {
            tasks.push({ ...shot.val(), key:shot.key })
            console.log("tanggal status", shot.val().tanggal)
            console.log("Tanggal sekarang", this.state.tanggal_status)
            console.log("keynya", {key: shot.key})
            if(shot.val().tanggal === this.state.tanggal_status){
                rootRef.child("Agenda").orderByKey().equalTo(shot.key).update({status_agenda:this.state.status})
                console.log(shot.val().status_agenda)
            }
        })
        this.setState({tasks, tasksLoading: false})
    })
  }
  process(key){
    rootRef.child('Pengajuan').child(key).update({ status: "Proses"});
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
    // const { dataPengajuan, dataPengumuman } = this.state;
    // const orderedTasks = orderBy(
    //   dataPengajuan,
    //   ['time_notif'],['desc']
    // );
    // const orderedPengumuman = orderBy(
    //   dataPengumuman,
    //   ['time_notif'],['desc']
    // );
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
                      <li className="breadcrumb-item active">Beranda</li>
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
                        <h3>{this.state.countWarga}</h3>

                        <p>Jumlah Warga</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag"></i>
                      </div>
                      <a href="" className="small-box-footer"> <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-success">
                      <div className="inner">
                        <h3>{this.state.countPria}<sup></sup></h3>

                        <p>Jumlah Warga laki-laki</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                      </div>
                      <a href="" className="small-box-footer"> <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>{this.state.countWanita}</h3>

                        <p>jumlah warga perempuan</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person-add"></i>
                      </div>
                      <a href="" className="small-box-footer"> <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h3>{this.state.countKK}</h3>

                        <p>Jumlah Kepala Keluarga</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-pie-graph"></i>
                      </div>
                      <a href="" className="small-box-footer"> <i className="fa fa-arrow-circle-right"></i></a>
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

          <aside className="control-sidebar control-sidebar-dark">
          </aside>
        </div>
    );
  }
}

export default Home;
