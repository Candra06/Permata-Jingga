import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataRW from "./page/DataRW/daftarrw";
import { rootRef } from '../../db';
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
class RW extends Component {
  
    constructor(props) {
        super(props);
        this.state = { no: '', nik: '', kop: '' };
        
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
                koderw: RandomKata.generate(10)
              };
              if (htg.no.length && htg.nik.length) {
                rootRef.child('RW').push(htg);
                this.setState({ no: '' , nik: '', kop: '' });
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
                }else{
                    toast.warn('Form Masih ada yang kosong');
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
                    <h1>Data RW</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data RW</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Tambah RW Baru</h3>
                        </div>
                        <form className="form-control">
                            <div className="card-body">
                                <div className="row col-12">
                                    <div className="input-group mb-3 col-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input type="number" 
                                        onChange={this.handleChangeNo}
                                        value={this.state.no}
                                        className="form-control" placeholder="Masukkan No RW"  min="1"/>
                                    </div>
                                    <div className="input-group mb-3 col-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                        <input type="number"
                                        onChange={this.handleChangeNik}
                                        value={this.state.nik}
                                        className="form-control" placeholder="Masukkan NIK Kepala RW"  min="1" minLength="14"/>
                                    </div>
                                    <div className="input-group mb-3 col-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        </div>
                                        <input type="text" 
                                        onChange={this.handleChangeKop}
                                        value={this.state.kop}
                                        className="form-control" placeholder="Masukkan KOP (Opsional)"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </form>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar RW Wargaku</h3>
                        </div>
                            <div className="card-body">
                            <DataRW/>
                                <div>
                                    <ToastContainer 
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={10000}
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
 
export default RW;