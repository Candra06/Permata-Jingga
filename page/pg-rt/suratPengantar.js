import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataRW from "./page/DataWarga/dataWargaPengajuan";
//import { rootRef } from '../../db';
import { ToastContainer } from 'react-toastify';
//import { Action } from "../../Action";
import RandomKata from 'randomstring';
class SuratPengantar extends Component {

    constructor(props) {
        super(props);
        this.state = { nama: '',password:'', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', no_kk: '',
        pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '' };
      }
      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
      };

      handleChangeTempatLahir = event => {
        this.setState({ tempatlahir: event.target.value });
      };
      handleChangeNoHp = event => {
        this.setState({ nohp: event.target.value });
      };

      handleChangeNoKK = event => {
        this.setState({ no_kk: event.target.value });
      };

      handleChangePekerjaan = event => {
        this.setState({ pekerjaan: event.target.value });
      };

      handleChangeGender = event => {
        this.setState({ gender: event.target.value });
      };

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });
      };

      handleChangeStatus= event => {
        this.setState({ status: event.target.value });
      };
      handleChangeWa = event => {
        this.setState({ wa: event.target.value });
      };

      handleChangeFb = event => {
        this.setState({ fb: event.target.value });
      };

      handleChangeIg = event => {
        this.setState({ ig: event.target.value });
      };
      handleChangeTwitter = event => {
        this.setState({ twitter: event.target.value });
      };
      handleChangeTgl = event => {
        this.setState({ tgl_lahir: event.target.value });
      };

      handleReset = event => {
        event.preventDefault();
        this.setState({ nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', no_kk: '',
        pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: ''  });
      }
      reloadPassword = event =>{
        this.setState({password:RandomKata.generate(10)});
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
                    <li className="breadcrumb-item active">Data Warga</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Warga</h3>
                        </div>
                            <div className="card-body">
                            <DataRW/>
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

export default SuratPengantar;
