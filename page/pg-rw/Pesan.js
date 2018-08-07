import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataRT from "./page/DataRT/daftarrt";
import Daftarrw from "./page/DataRW/selectrw/daftarrw";
import dataPesan from "./page/DataPesan/Daftarpesan";
import { rootRef, timeRef } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
class Pengumuman extends Component {

    constructor(props) {
        super(props);
        this.state = { pengirim: '', judul: '', isi: '', tujuan:'', tgl:'' };
        let today =new Date("DD-MM-YYYY");
        localStorage.setItem("DataRW", "");
        console.log(today);
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
                    <h1>Kirim Pesan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Pesan Pribadi</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Kirim Pesan</h3>
                        </div>
                        <form className="form-control">
                            <div className="card-body">

                                <div className="mb-3">
                                    <textarea className="textarea" placeholder="Place some text here" className="form-control"></textarea>
                                </div>
                                </div>

                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Kirim</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </form>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Pesan</h3>
                        </div>
                            <div className="card-body">
                            <daftarPesan/>
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

export default Pengumuman;
