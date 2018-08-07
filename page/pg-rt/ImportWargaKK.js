import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ImWargaAsli from "./../ImWargaKK";
import { ToastContainer } from 'react-toastify';
class ImportWargaKK extends Component {


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
                    <h1>Import Warga KK</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/RT/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="">Import Data</a></li>
                    <li className="breadcrumb-item active">Warga KK</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">


                                <ImWargaAsli/>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={2500}
                                    />
                            

                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default ImportWargaKK;
