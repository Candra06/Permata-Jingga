import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataAkun from "./page/DataAkun/daftarakun";
import { ToastContainer } from 'react-toastify';
class Akun extends Component {

   
  render() {
  
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Akun Pengurus RT</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/RT/Home">Home</a></li>
                    <li className="breadcrumb-item active">Pengurus RT</li>
                    <li className="breadcrumb-item active">Akun Pengurus</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Akun Pengurus RT</h3>
                        </div>
                            <div className="card-body" style={{overflow: "auto!important"}}>
                            <DataAkun/>
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

export default Akun;
