import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarAgenda from "./page/DataAgenda/daftaragenda";
import { RefWarga, rootRef, RefKK, timeRef } from '../../db';
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

class Agenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            tanggal: '',
            deskripsi:'',
            cek: true,
            avatar: '',
            isUploading: false,
            progress: 0,
        };

      }


      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
        localStorage.setItem("judul",event.target.value);
      };

      handleChangeTgl = event => {
        this.setState({ tgl_lahir: event.target.value });
        localStorage.setItem("tanggal",event.target.value);
        console.log(event.target.value)
      };
      handleChangeDeskripsi = event => {
        this.setState({deskripsi:event.target.value});
        localStorage.setItem("isi",event.target.value);
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nama: '', tgl_lahir: '', deskripsi:'' });
      }

      notify(type){

        // console.log(localStorage.getItem("idrt"));
        return () => {
          RefKK.orderByChild("idrt").equalTo(localStorage.getItem("idrt")).on('value', snap => {
            snap.forEach(shot => {
              console.log(shot.val());
              RefWarga.orderByChild("no_kk").equalTo(shot.val().nokk).on("value", snap => {
                snap.forEach(shot => {
                  // tasks.push({ ...shot.val(), key: shot.key });
                  console.log(shot.val());
                  var htg = {
                    kd_event:RandomKata.generate(10),
                    kd_pembuat:localStorage.getItem("nik"),
                    kd_penerima:shot.val().nik,
                    nama_pengirim:localStorage.getItem("nama"),
                    judul: localStorage.getItem("judul"),
                    tanggal: localStorage.getItem("tanggal"),
                    deskripsi: localStorage.getItem("isi"),
                    ordertime: timeRef
                  };
                  var notif= {
                    nama_pengirim:localStorage.getItem("nama"),
                    nik_penerima:shot.val().nik,
                    nik_pengirim:localStorage.getItem("nik"),
                    teks:localStorage.getItem("isi"),
                    time_notif:timeRef,
                    tipe:"biru"
                  }
                  console.log(notif);
                  console.log(htg);
                  rootRef.child('Agenda').push(htg);
                  rootRef.child('Notifikasi').push(notif);
                })
              })

          });
          });
          var bool = 1;
           if (bool) {
                this.setState({nama: '', tanggal:'', deskripsi:'' });
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
                    <li className="breadcrumb-item"><a href="/Admin/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Admin/Event">Event</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Agenda Baru</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group col-md-12">
                                          <label>judul Agenda</label>
                                          <div className="input-group">
                                            <input type='text' placeholder='judul agenda' onChange={this.handleChangeNama} value={this.state.nama} className='form-control'/>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group col-md-12">
                                          <label>Tanggal Agenda</label>

                                          <div className="input-group">
                                              <input type="date" onChange={this.handleChangeTgl}
                                              value={this.state.tgl_lahir} className="form-control"/>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <label>Deskripsi</label>
                                            <textarea className='form-control' onChange={this.handleChangeDeskripsi}>{this.state.deskripsi}</textarea>
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
                            <h3 className="card-title">Daftar KK Wargaku</h3>
                        </div>
                            <div className="card-body">
                                <DaftarAgenda/>
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

export default Agenda;
