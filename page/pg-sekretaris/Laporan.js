import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataAkun from "./page/DataAkun/daftarakun";
import DataWargaAkun from "./page/DataAkun/daftarwarga";
import { RefUser, RefWarga, timeRef, RefNotif, RefLaporan } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import { Action } from "../../Action";
class Laporan extends Component {

    constructor(props) {
        super(props);
        this.state = { keterangan: '', kondisi:''};

        localStorage.setItem("nikpenitip", "")
      }
      handleChangeKeterangan = event => {
        this.setState({ keterangan: event.target.value });
      };

      handleChangeKondisi= event => {
        this.setState({ kondisi: event.target.value });
      };


      handleReset = event => {
        event.preventDefault();
        this.setState({ keterangan: '', kondisi:'', tampil:'hide' });
        localStorage.setItem("nikpenitip", "")
      }

      notify(type){
        return () => {
            let tdy = new Date();
            let mn = tdy.getMinutes();
            let sc = tdy.getSeconds();
            const akundata = {
                kd_titip:localStorage.getItem("kodetitip"),
                tgl_laporan: tdy.getDate()+"-"+(tdy.getMonth()+1)+"-"+tdy.getFullYear()+" "+tdy.getHours()+":"+(tdy.getMinutes() < 1 ? "0"+tdy.getMinutes() : tdy.getMinutes())+":"+(tdy.getSeconds() < 1 ? "0"+tdy.getMinutes() : tdy.getMinutes()),
                keterangan:this.state.keterangan.trim(),
                status_rumah:this.state.kondisi.trim(),
                nama_pelapor:localStorage.getItem("nik"),
                ordertime:timeRef,
                nama_penitip:localStorage.getItem("namapenitip")
              }
              var notif= {
                nama_pengirim:"Satpam",
                nik_penerima:localStorage.getItem("nikpenitip"),
                nik_pengirim:"Satpam",
                teks:"Satpam Mengimkan Laporan Penitipan Rumah Anda",
                time_notif:timeRef,
                tipe:"biru-laporan"
              }
             // Action("addAkun", akundata).then ((result) => {
                 //   console.log(result);
              //      if(result!==''){
             //           console.log("success");
             //       }else{
             //           console.log("errors");
             //       }
             //   })
              if (akundata.keterangan.length && akundata.status_rumah.length) {
                RefLaporan.push(akundata);
                RefNotif.push(notif);
                this.setState({ keterangan: '', kondisi:'', tampil:'hide'  });
                localStorage.setItem("kodetitip", "")
                localStorage.setItem("namapenitip", "")
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
             // window.location.reload();
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
        };
      };
      adduser = () => {
          if(localStorage.getItem("kodetitip") === ""){
            toast.warn('Silahkan Pilih Data Penitipan', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
          this.setState({ tampil: "block" })
        }
      }
  render() {
    const { tampil } = this.state;
    let cekk;


    if(tampil === 'hide'){

    }else if(tampil === 'block'){
        cekk = (
            <div className="row">
            <div className="col-md-4" style={{paddingTop: 1.5 + 'em'}}  id={tampil}>
                <div className="form-group col-md-12">
                <label>Kondisi Rumah </label>
                <select className="form-control" style={{height: 3 + 'em'}}  value={this.state.kondisi} onChange={this.handleChangeKondisi}>
                    <option value="">Pilih Kondisi Rumah</option>
                    <option value="Aman">Aman</option>
                    <option value="Kurang Aman">Kurang Aman</option>
                    <option value="Tidak Aman">Tidak Aman</option>
                </select>
                </div>
            </div>
            <div className="col-md-4" style={{paddingTop: 1.5 + 'em'}} id={tampil}>
                <div className="form-group col-md-12">
                    <label>Keterangan</label>
                    <input type="email"
                    onChange={this.handleChangeKeterangan}
                    value={this.state.keterangan}
                    className="form-control" placeholder="Masukkan Keterangan Laporan"/>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2" style={{marginTop: -1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Data Laporan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data Laporan</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Laporan</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body" style={{overflow: 'auto!important'}}>
                                    <div className="row col-md-12">
                                        <div className="form-group col-md-6">
                                            <DataWargaAkun/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <button className="btn btn-primary" onClick={this.adduser}>Pilih Data</button>
                                        </div>
                                    </div>
                                    {cekk}
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify()}>Kirim Laporan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>

                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Akun</h3>
                        </div>
                            <div className="card-body" style={{overflow: "auto!important"}}>
                            <DataAkun/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={3000}
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

export default Laporan;
