import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import Daftarrw from "./page/DataRW/selectrw/daftarrw";
import DaftarKK from "./page/DataKK/daftarkk";
import Daftarrt from "./page/DataRT/selectrt/daftarrt";
import { rootRef, RefKK } from '../../db';
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
class KK extends Component {

    constructor(props) {
        super(props);
        this.state = { nokk: '', jml: '', cek: true, alamat:'', htgkk:''};

        localStorage.setItem("DataRW", "");
        localStorage.setItem("DataRT", "");
      }

      handleChangeNo = event => {
        this.setState({ nokk: event.target.value });
        let hitung = 0;
        RefKK.orderByChild("nokk").equalTo(event.target.value).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            hitung++;
            tasks.push({ ...shot.val(), key: shot.key });
          });
          this.setState({  htgkk: hitung});
        });
      };

      handleChangeJml = event => {
        this.setState({ jml: event.target.value });
      };
      handleChangeAlamat = event =>{
        this.setState({ alamat: event.target.value });
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nokk: '', jml: '' });
      }

      notify(type){
        return () => {
            const htg = {
                kd_kk:RandomKata.generate({length: 10, charset:'1234567890'}),
                nokk: this.state.nokk.trim(),
                jml: this.state.jml.trim(),
                idrt: localStorage.getItem("DataRT").trim(),
                idrw: localStorage.getItem("koderw").trim(),
                alamat:this.state.alamat.trim(),
              };
              console.log(localStorage.getItem("DataRT"));
              console.log(localStorage.getItem("koderw"));
              if(this.state.htgkk >= 1){
                toast.warn('NO KK anda masukkan sudah di pakai!!!', {
                  position: toast.POSITION.TOP_RIGHT,
                });
                // console.log("tidak aman");
              }else{
                if (htg.nokk.length && htg.jml.length && localStorage.getItem("DataRT").length) {
                  rootRef.child('KK').push(htg);
                  this.setState({nokk: '', jml: '' });
                  localStorage.setItem("DataRT", "");
                  toast.success('Data Berhasil Di Simpan', {
                  position: toast.POSITION.TOP_RIGHT,
                });
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
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
                    <h1>Data KK</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Admin/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Admin/Warga">Warga</a></li>
                    <li className="breadcrumb-item active">Data KK</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info style={{marginTop: -1 + 'em'}}">
                        <div className="card-header">
                            <h3 className="card-title">Tambah KK Baru</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group col-md-12">
                                    <label>Pilih RT</label>
                                       <Daftarrt/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group col-md-12">
                                        <label>No KK</label>

                                        <input type="number"
                                        onChange={this.handleChangeNo}
                                        value={this.state.nokk}
                                        className="form-control" placeholder="Masukkan No KK" min="1"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group col-md-12">
                                        <label>Jumlah Keluarga</label>

                                        <input type="number"
                                        onChange={this.handleChangeJml}
                                        value={this.state.jml}
                                        className="form-control" placeholder="Jumlah Keluarga" min="1"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-12 col-12">
                                        <label>Alamat</label>
                                        <textarea className='form-control' onChange={this.handleChangeAlamat}>{this.state.alamat}</textarea>
                                    </div>
                                </div>
                          </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar KK Wargaku</h3>
                        </div>
                            <div className="card-body">
                                <DaftarKK/>
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

export default KK;
