import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListLaporan from "./page/DataLaporan/daftarlaporan";
import { rootRef, timeRef,  RefPenitipan } from '../../db';
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
class Laporan extends Component {

    constructor(props) {
        super(props);
        this.state = { keterangan: '', alamat:'',statusPost:false,alert:'', alertstatus:false, idpenerima:'', tmprw:'', idrt:'', idrw:'', tglAwal:'', status: 'Pending', jmlku: 0, tglAkhir:'' };

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
        if(today > event.target.value){
          this.setState({alert:"Tanggal awal anda tidak valid", alertstatus:true, statusPost:false});
        }else{
          this.setState({alert:"", alertstatus:false, statusPost:true});
        }
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
   
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Laporan Satpam</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Laporan Satpam</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
               

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Laporan Satpam</h3>
                        </div>
                            <div className="card-body">
                            <ListLaporan/>
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
