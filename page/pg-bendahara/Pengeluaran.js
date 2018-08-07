import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import Daftarpengeluaran from "./page/DataPengeluaran/daftarpengeluaran";
import { Refkeuangan, Refpengeluaran, Refriwayat, timeRef } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

class Pengeluaran extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keperluan: '',
            jumlah: 0,
            keterangan:'-',
            tanggal:'',
            hariini:'',
            saldoakhir:0,
            kunciuang:'',
            addagenda: false,
        };
      }
      componentWillMount(){
          
        let tdy = new Date();
        let hari, bulan;
        let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
        if(tdy.getDate() >= 10){
            hari = tdy.getDate()
        }else{
            hari = "0"+tdy.getDate();
        }
        if((tdy.getMonth()+1) >= 10){
            bulan = (tdy.getMonth()+1)
        }else{
            bulan = "0"+(tdy.getMonth()+1);
        }
        let hariini = tdy.getFullYear()+"-"+bulan+"-"+hari;
        
        this.setState({
            hariini: hariini
        })

        Refkeuangan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
          
            snap.forEach(shot => {
                if(shot.val().norw === localStorage.getItem("koderw")){
                    this.setState({ saldoakhir: parseInt(shot.val().jumlah_saldo), kunciuang: shot.key});
                }
  
            });
          });
      }
      handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
        if(event.target.name === "jumlah"){
            if(parseInt(event.target.value) > parseInt(this.state.saldoakhir)){
                toast.warn('Jumlah  Uang Tidak Boleh Melebihi Saldo Saat Ini!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                this.setState({jumlah:this.state.saldoakhir});
            }else{
                this.setState({jumlah:event.target.value});
            }
        }
      };
      
      handleReset = event => {
        event.preventDefault();
        this.setState({ keperluan: '',
        jumlah: 0,
        keterangan:'' });
      }
    
    

      notify(type){

        // console.log(localStorage.getItem("idrt"));
        return () => {

            if(this.state.keperluan === ""){
                toast.warn('Masukkan Keperluan!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.jumlah === 0){
                toast.warn('Masukkan Jumlah Uang', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.jumlah <= 0){
                toast.warn('Jumlah Uang harus lebih dari 0!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.tanggal === ""){
                toast.warn('Pilih Tanggal', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
                let yy = new Date();
                let tdy = yy.getFullYear()+"-"+(yy.getMonth()+1)+"-"+yy.getDate();
                  let saldobaru =0;
                  saldobaru = parseInt(this.state.saldoakhir) - parseInt(this.state.jumlah);
                  var bulan = ['bln','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
                var pecah = this.state.tanggal.split("-");
                var bulanchart = bulan[parseInt(pecah[1])]+"-"+pecah[0];
                const datakeluar = {
                    nort:localStorage.getItem("idrt"),
                    keperluan: this.state.keperluan,
                    tanggal: this.state.tanggal,
                    keterangan: this.state.keterangan,
                    jumlah_uang: this.state.jumlah,
                    ordertime: timeRef,
                    datachart: bulanchart,
                    nama_pembuat: localStorage.getItem("nama")
                  };
                  Refpengeluaran.push(datakeluar);

                  
                    Refriwayat.push({
                        tipe: 'Pengeluaran',
                        tanggal: this.state.tanggal,
                        ordertime: timeRef,
                        teksriwayat: localStorage.getItem("nama")+" Menggunakan saldo sebesar Rp "+ this.state.jumlah + " pada tanggal "+this.state.tanggal + ", untuk keperluan "+ this.state.keperluan
                    })
                    Refkeuangan.child(this.state.kunciuang).update({
                        jumlah_saldo: saldobaru
                    })
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
            this.bersih();
             // window.location.reload();
            }
           
        };
      };

      tambahagenda = () =>{
          this.setState({
              addagenda: !this.state.addagenda
          })
      }
      bersih = () =>{
          this.setState({keperluan: '',
          jumlah: 0,
          keterangan:'-',
          addagenda: false });
      }
  render() {
      const {addagenda} = this.state;
      let letbtntambah, formtambah, foo;
      
      if(addagenda){
        letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-danger float-left" onClick={this.tambahagenda}><i className="fa fa-minus"></i> Batal Membuat Pengeluaran</button>

            </div>
          )

          formtambah = (
            <div className="card-body">
            <div className="row col-md-12">
                <div className="col-md-4">
                  <div className="form-group col-md-12">
                      <label>Keperluan<sup>*</sup></label>
                      <div className="input-group">
                        <input type="text" placeholder="Masukkan Keperluan" onChange={this.handleChange} name="keperluan" value={this.state.keperluan} className="form-control"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group col-md-12">
                      <label>Jumlah Uang<sup>*</sup></label>
                      <div className="input-group">
                        <input type="number" min="1" placeholder="Masukkan Jumlah Uang" onChange={this.handleChange} name="jumlah" value={this.state.jumlah} className="form-control"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group col-md-12">
                      <label>Tanggal Pengeluaran<sup>*</sup></label>
                      <div className="input-group">
                        <input type="date" max={this.state.hariini} onChange={this.handleChange} name="tanggal" value={this.state.tanggal} className="form-control"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group col-md-12">
                        <label>Keterangan</label>
                        <div className="input-group">
                            <input type="text" placeholder="Masukkan Keterangan" onChange={this.handleChange} name="keterangan" value={this.state.keterangan} className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          )
          foo = (
            <div className="card-footer col-12">
            <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
            <span>  </span>
            <button type="reset" className="btn btn-danger"  onClick={(e) => this.handleReset}>Reset</button>
        </div>
          )
      }else{
        letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-success float-left" onClick={this.tambahagenda}><i className="fa fa-plus"></i> Buat Pengeluaran</button>

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
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-9">
                    <h1>Data Pengeluaran - Saldo Saat Ini <NumberFormat value={this.state.saldoakhir} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h1>
                </div>
                <div className="col-sm-3">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Bendahara/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Bendahara/Pengeluaran">Pengeluaran</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Pengeluaran</h3>

                        </div>
                        <div className="form-control">
                            {letbtntambah}
                            {formtambah}
                           {foo}
                            </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Pengeluaran</h3>
                           
                        </div>
                                <Daftarpengeluaran/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={2000}
                                    />
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

export default Pengeluaran;
