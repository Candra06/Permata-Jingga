import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListPenitipan from "./page/DataPenitipan/daftarpenitipan";
import { rootRef, timeRef, RefKK, RefPenitipan, RefWarga } from '../../db';
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
class RT extends Component {

    constructor(props) {
        super(props);
        this.state = { keterangan: '', alamat:'',statusPost:false,alert:'', alertstatus:false, idpenerima:'', tmprw:'', idrt:'', idrw:'', tglAwal:'', status: 'Pending', jmlku: 0, tglAkhir:'' };

      }

      componentDidMount(){
        RefWarga.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
            //const tasks = [];
            snap.forEach(shott => {
             // console.log("datanya:", shott.val())
              //tasks.push({ ...shot.val(), key: shot.key });

          RefKK.orderByChild("nokk").equalTo(shott.val().no_kk).on('value', snap => {
            let xalamat='';
            snap.forEach(shot => {
              xalamat = shot.val().alamat;
            });
            this.setState({ alamat:xalamat });
          });
            });
          });
      }
      handleChangeketerangan = event => {
        this.setState({ keterangan: event.target.value });
      };
      handleChangeAlamat = event => {
        this.setState({alamat:event.target.value});
      }
      handleChangeTglAwal = event => {
        let date = new Date();
        let today = date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+date.getDate();
        this.setState({ tglAwal: event.target.value });
        console.log("valuenya", event.target.value)
        if( event.target.value >today){
          this.setState({alert:"Tanggal awal anda tidak valid", alertstatus:true, statusPost:false});
        }else{
          this.setState({alert:"", alertstatus:false, statusPost:true});
        }
        console.log(event.target.value);
        //console.log(today);
      };
      handleChangeTglAkhir = event => {
        this.setState({ tglAkhir: event.target.value });
        if(event.target.value < this.state.tglAwal){
          this.setState({alert:"Tanggal akhir anda tidak valid", alertstatus:true, statusPost:false});
        }else{
          this.setState({alert:"", alertstatus:false, statusPost:true});
        }
      };
      handleReset = event => {
        event.preventDefault();
        this.setState({ keterangan: '', tujuan: '', tglAwal:'',tglAkhir:'', status: 'Pending' });
      }

      notify(type){
        return () => {
            let today = new Date();
            const htg = {
                kd_titip:RandomKata.generate({length:10, charset:"1234567890"}),
                keterangan: this.state.keterangan.trim(),
                tglAwal: this.state.tglAwal.trim(),
                tglAkhir: this.state.tglAkhir.trim(),
                tgl_pengajuan: today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear(),
                ordertime: timeRef,
                alamat:this.state.alamat,
                status: this.state.status.trim(),
                nama_penitip:localStorage.getItem("nama"),
                nik_penitip: localStorage.getItem("nik")
              };
              const notif = {
                nik_penerima: "Satpam",
                nama_pengirim : localStorage.getItem("nama"),
                nik_pengirim: localStorage.getItem("nik"),

                teks: localStorage.getItem("nama")+ " Menitipkan Rumah dari tanggal ("+ htg.tglAwal +")"+" sampai tanggal ("+ htg.tglAkhir +")" ,
                tipe: "biru",
                time_notif: timeRef
              };
              const notif2 = {
                nik_penerima: "Satpam",
                nik_pengirim: localStorage.getItem("nik"),
                teks: " Membuat Pengajuan Penitipan Rumah Kepada Satpam " ,
                tipe: "teal",
                time_notif: timeRef
              };
              if(this.state.statusPost){
                if (htg.keterangan.length && htg.tglAwal.length && htg.tglAkhir.length) {
                  RefPenitipan.push(htg);
                  rootRef.child('Notifikasi').push(notif2);
                  rootRef.child('Notifikasi').push(notif);
                  this.setState({ kebutuhan: '', jenis_kebutuhan: '', tujuan: '', tgl_pengajuan:'', status: 'Pending', idpenerima:'' });
                  toast.success('Data Berhasil Di Simpan', {
                  position: toast.POSITION.TOP_RIGHT,
                });
                  }else{
                      toast.warn('Form Masih ada yang kosong', {
                          position: toast.POSITION.TOP_RIGHT,
                        });
                  }
              }else{
                toast.warn('Isian form tidak valid', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }
        };
      };
  render() {
    const {alert, alertstatus} = this.state;
    let pesan;
    if(alertstatus){
      pesan = (
        <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 1 + 'em'}}>
        {alert}!!
          </div>
      )
    }else{
      pesan = (
        <div></div>
      )
    }
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Penitipan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Penitipan</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Buat Penitipan Baru</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                    {/*<div className="form-group col-sm-9">
                                        <label>Tujuan Pengajuan</label>
                                        <select className="form-control" style={{height: 3 + 'em'}} value={this.state.tujuan} onChange={this.handleChangeTujuan}>
                                            <option value="">Tujuan Pengajuan</option>
                                            <option value="RT">RT</option>
                                            <option value="RW">RW</option>
                                        </select>
                                    </div>*/}
                                    <div className='form-group col-sm-6'>
                                      <label>Tanggal Awal</label>
                                      <input type='date' placeholder='masukkan tanggal awal penitipan' onChange={this.handleChangeTglAwal} value={this.tglAwal}/>
                                    </div>
                                    <div className='form-group col-sm-6'>
                                      <label>Tanggal Akhir</label>
                                      <input type='date' placeholder='masukkan tanggal akhir penitipan' onChange={this.handleChangeTglAkhir} value={this.tglAkhir}/>
                                    </div>
                                    <div className="form-group col-sm-12">
                                        <label>keterangan</label>
                                        <textarea className="form-control" onChange={this.handleChangeketerangan}
                                        value={this.state.keterangan} rows="3" placeholder="Masukkan keterangan"></textarea>
                                    </div>
                                    <div className="form-group col-sm-12">
                                        <label>alamat</label>
                                        <textarea className="form-control" onChange={this.handleChangeAlamat}
                                        value={this.state.alamat} rows="3" placeholder="Masukkan alamat"></textarea>
                                    </div>
                                    {pesan}
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
                            <h3 className="card-title">Daftar Penitipan Anda</h3>
                        </div>
                            <div className="card-body">
                            <ListPenitipan/>
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

export default RT;
