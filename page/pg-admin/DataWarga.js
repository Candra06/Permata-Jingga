import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarWargaku from "./page/DataWarga/daftarwarga";
//import { RefUser, RefKK, RefWarga, rootRef, upRefWarga, RefRW, RefRT } from '../../db';
class DataWarga extends Component {

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
                            <h1>Data Warga</h1>
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
                                    <DaftarWargaku/>
                            </div>
                        </div>
                    </section>
                </div>
          <Footer/>
        </div>
    );
  }
}

export default DataWarga;
