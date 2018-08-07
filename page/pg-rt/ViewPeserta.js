import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import { Redirect } from 'react-router-dom';
import DataPeserta from "./page/DataAgenda/Peserta/daftarpeserta";
import { rootRef } from "../../db";
class ViewPeserta extends Component {

    constructor(props) {
        super(props);
        this.state = { modal: false, redirect: false, tasks:[], loaddata:false,
        judul:''};

      }
        componentWillMount(){
            rootRef.child("Agenda").orderByChild("kd_event").equalTo(localStorage.getItem("kevent")).on('value', snap => {
                snap.forEach(shot => {
                 
                this.setState({ judul: shot.val().judul});
                });
              });
        }
 
        handleSelesai=()=>{
            this.setState({
                redirect: true
            })
        }
  render() {
    if(this.state.redirect){
    return (<Redirect to="/RT/Agenda"/>)
 }
   const {judul} = this.state;
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Data Peserta {judul}</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/RT/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/RT/Agenda">Agenda</a></li>
                    <li className="breadcrumb-item active">Data Peserta</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">

                <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                <div className="card-header">
                    <h3 className="card-title">Data Peserta </h3>
                </div>
                <div className="form-control">
                    <div className="card-body">

                    <DataPeserta kode={localStorage.getItem("kevent")}/>
                    </div>
                    <div className="card-footer col-12">
                        <button type="button" className="btn btn-primary float-right"  onClick={this.handleSelesai}>Selesai  <i className="fa fa-chevron-right"></i></button>
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

export default ViewPeserta;
