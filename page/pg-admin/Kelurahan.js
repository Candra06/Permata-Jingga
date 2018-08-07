import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";

import DataKelurahan from "./page/DataKelurahan/daftarkelurahan";
import { rootRef, RefWarga, RefKelurahan, RefHapus } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import { Action } from "../../Action";

import RandomKata from 'randomstring';
class Kelurahan extends Component {

    constructor(props) {
        super(props);
        this.state = { nama :'' };
      }
      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleReset = event => {
        event.preventDefault();
        this.setState({ nama:'' });
      }

//       componentWillMount(){
//           localStorage.setItem("xkodekelurahan", RandomKata.generate(10))
//     RefHapus.orderByChild("tipe").equalTo('kelurahan').on('value', snap => {
//       snap.forEach(shot => {
//           if(shot.val().kodehapus === localStorage.getItem("xkodekelurahan")){

//           }else{
//           RefHapus.child(shot.key).remove();
//           }           
//       });
//   });
//       }
      notify(type){
        return () => {
            const htg = {
                nama: this.state.nama.trim()
              };
              let hitung = 0;
              RefKelurahan.orderByChild("nama").equalTo(this.state.nama).on('value', snap => {
                snap.forEach(shot => {
                    hitung++;                    
                });

                });
                if(hitung >= 1){
                    toast.warn('Nama Kelurahan Sudah Digunakan!!', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }else{
              if (htg.nama.length) {
                RefKelurahan.push(htg);
                this.setState({ nama:''});
                toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                //Action("addRT", htg).then ((result) => {
                //    console.log(result);
                //if(result!=''){
                //        console.log("success");
                //        console.log(result);
                        // window.location='/AddEvent';
                //    }else{
                //        console.log("errors");
                //    }
               // })
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
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Data Kelurahan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data Kelurahan</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Kelurahan</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group col-md-4">
                                        <label>Nama Kelurahan <sup>*</sup></label>
                                            <input type="text"
                                            onChange={this.handleChangeNama}
                                            value={this.state.nama}
                                            className="form-control " placeholder="Masukkan Nama Kelurahan"/>
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
                            <h3 className="card-title">Daftar Kelurahan</h3>
                        </div>
                            <div className="card-body">
                            <DataKelurahan/>
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

export default Kelurahan;
