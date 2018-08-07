import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import { Refkeuangan, Refriwayat, timeRef, Refpemasukan, Refpengeluaran } from '../../db';
import NumberFormat from 'react-number-format';
import Daftarkeuangan from "./page/DataKeuangan/daftarkeuangan";
import Grafik from "./Grafik";

class Keuangan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tanggal:'',
            hariini:'',
            saldoakhir:0,
            masuk:0,
            keluar:0,
            kunciuang:'',
            masukbulanini:0,
            keluarbulanini:0,
            totalkeluar:0,
            totalmasuk:0,
            bulankemarenkeluar:0, bulankemarenmasuk:0,
            blnkeluarkemaren:0, blnmasukkemaren:0,
            hrkeluarkemaren:0, hrmasukkemaren:0,
            tampilandata:'box'
        };
      }
      componentWillMount(){
          
        let tdy = new Date();
        let hari, bulan, harikemaren, bulanharikemaren;
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
        var date = new Date();

        date.setDate(date.getDate() - 1);
        if(date.getDate() >= 10){
            harikemaren = date.getDate()
        }else{
            harikemaren = "0"+date.getDate();
        }
        if((date.getMonth()+1) >= 10){
            bulanharikemaren = (date.getMonth()+1)
        }else{
            bulanharikemaren = "0"+(date.getMonth()+1);
        }
        var kemaren =  date.getFullYear()+"-"+bulanharikemaren+"-"+harikemaren
        var bulankemaren = '';
        
        this.setState({
            tanggal: tdyi,
            hariini: hariini
        })
        var bulann = ['Desember','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
        var bulanchart = bulann[parseInt(bulan)]+"-"+tdy.getFullYear();
        if(date.getMonth() === "0"){
            bulankemaren = 'Desember-'+(tdy.getFullYear()-1)
        }else{
            bulankemaren = bulann[parseInt(tdy.getMonth())]+"-"+tdy.getFullYear()
        }
        Refkeuangan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
          
            snap.forEach(shot => {
                if(shot.val().norw === localStorage.getItem("koderw")){
                    this.setState({ saldoakhir: parseInt(shot.val().jumlah_saldo), kunciuang: shot.key});
                }
  
            });
          });
          let ttlkeluar=0, ttlmasuk=0, blnmasuk=0, blnkeluar=0, totalkeluar=0, totalmasuk=0, blnkeluarkemaren=0, blnmasukkemaren=0;
          let xhrkemarenkeluar=0, xhrkemarenmasuk=0;
          Refpengeluaran.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
            snap.forEach(datakeluar => {
              if(datakeluar.val().tanggal === tdyi || datakeluar.val().tanggal === hariini){
                
                ttlkeluar = ttlkeluar + parseInt(datakeluar.val().jumlah_uang)
              }
              if(datakeluar.val().tanggal === kemaren){
                
                xhrkemarenkeluar = xhrkemarenkeluar + parseInt(datakeluar.val().jumlah_uang)
              }
              if(datakeluar.val().datachart === bulanchart){
                  blnkeluar = blnkeluar + parseInt(datakeluar.val().jumlah_uang)
              }
              if(datakeluar.val().datachart === bulankemaren){
                blnkeluarkemaren = blnkeluarkemaren + parseInt(datakeluar.val().jumlah_uang)
              }
              totalkeluar = totalkeluar + parseInt(datakeluar.val().jumlah_uang)
            });
            this.setState({ keluar: ttlkeluar, keluarbulanini: blnkeluar, totalkeluar: totalkeluar, blnkeluarkemaren: blnkeluarkemaren, hrkeluarkemaren: xhrkemarenkeluar});
        })

        Refpemasukan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
            snap.forEach(datakeluar => {
              if(datakeluar.val().tanggal === tdyi || datakeluar.val().tanggal === hariini){
                
                ttlmasuk = ttlmasuk + parseInt(datakeluar.val().jumlah_uang)
              } 
              if(datakeluar.val().tanggal === kemaren){
                
                xhrkemarenmasuk = xhrkemarenmasuk + parseInt(datakeluar.val().jumlah_uang)
              }
              if(datakeluar.val().datachart === bulanchart){
                blnmasuk = blnmasuk + parseInt(datakeluar.val().jumlah_uang)
            }
            if(datakeluar.val().datachart === bulankemaren){
                blnmasukkemaren = blnmasukkemaren + parseInt(datakeluar.val().jumlah_uang)
              }
            totalmasuk = totalmasuk + parseInt(datakeluar.val().jumlah_uang)
            });
            this.setState({ masuk : ttlmasuk, masukbulanini: blnmasuk, totalmasuk:totalmasuk, blnmasukkemaren:blnmasukkemaren, hrmasukkemaren: xhrkemarenmasuk});
            ttlkeluar=0
            ttlmasuk=0
            blnmasuk=0
            blnkeluar=0
            totalkeluar=0
            totalmasuk=0
            blnkeluarkemaren=0
            blnmasukkemaren=0;
            xhrkemarenkeluar=0
            xhrkemarenmasuk=0;
            //console.log(blnmasuk)
        })
      }

        gantitampilan = (xst) => {
            this.setState({
                tampilandata : xst
            })
        }
      

    
  render() {
      const {tampilandata} = this.state
    let totalnaik = parseInt(this.state.masuk) - parseInt(this.state.keluar)
    let totalnaiksemua = parseInt(this.state.totalmasuk) - parseInt(this.state.totalkeluar)
    let totalnaikbulanini = parseInt(this.state.masukbulanini) - parseInt(this.state.keluarbulanini)
    let ratabulanini = totalnaikbulanini - (parseInt(this.state.blnmasukkemaren) - parseInt(this.state.blnkeluarkemaren));
    let menanghariini = totalnaik - (parseInt(this.state.hrmasukkemaren) - parseInt(this.state.hrkeluarkemaren));
    let tampil;
    if(tampilandata === 'box'){
        tampil = (
            <div className="row">
                                
                <div className="col-lg-12 col-12">
                    <h3>Data Keseluruhan</h3>
                </div>
                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-info">
                        <div className="inner">
                            <h4><NumberFormat value={this.state.saldoakhir} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                            <p>Total Kas RT</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person"></i>
                        </div>
                        <a href="/Bendahara/Keuangan" className="small-box-footer">.</a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-success">
                            <div className="inner">
                                <h4><NumberFormat value={this.state.totalmasuk} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                                <p>Total Pemasukan</p>
                            </div>
                        <div className="icon">
                            <i className="ion ion-hammer"></i>
                        </div>
                        <   a href="" className="small-box-footer">.</a>
                        </div>
                    </div>


                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                            <div className="inner">
                            <h4><NumberFormat value={this.state.totalkeluar} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                                <p>Total Pengeluaran</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-clock"></i>
                            </div>
                        <a href="" className="small-box-footer">.</a>
                        </div>
                    </div>


                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-primary">
                            <div className="inner">
                                <h4><NumberFormat value={parseInt(totalnaiksemua)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                                <p>Total Peningkatan Saldo</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-checkmark"></i>
                            </div>
                            <a href="" className="small-box-footer">.</a>
                        </div>
                    </div>

                    
                    <div className="col-lg-12 col-12">
                        <h3>Data Bulan Ini</h3>
                    </div>
                        <div className="col-lg-3 col-6">

                        <div className="small-box bg-success">
                            <div className="inner">
                                <h4><NumberFormat value={this.state.masukbulanini} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                                <p>Pemasukan Bulan Ini</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-hammer"></i>
                            </div>
                            <a href="" className="small-box-footer">.</a>
                            </div>
                        </div>


                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                            <div className="inner">
                            <h4><NumberFormat value={this.state.keluarbulanini} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                                <p>Pengeluaran Bulan Ini</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-clock"></i>
                            </div>
                            <a href="" className="small-box-footer">.</a>
                            </div>
                        </div>

                    
                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-primary">
                        <div className="inner">
                            <h4><NumberFormat value={parseInt(totalnaikbulanini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                            <p>Peningkatan Saldo Bulan Ini</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-checkmark"></i>
                        </div>
                        <a href="" className="small-box-footer">.</a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-info">
                        <div className="inner">
                            <h4><NumberFormat value={parseInt(ratabulanini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                            <p>Peningkatan Dari Bulan Kemarin</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-checkmark"></i>
                        </div>
                        <a href="" className="small-box-footer">.</a>
                        </div>
                    </div>

                {/* hariini */}
                <div className="col-lg-12 col-12">
                    <h3>Data Hari Ini</h3>
                </div>
                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-success">
                        <div className="inner">
                            <h4><NumberFormat value={this.state.masuk} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                            <p>Pemasukan Hari Ini</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-hammer"></i>
                        </div>
                        <a href="" className="small-box-footer">.</a>
                        </div>
                        </div>


                        <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                        <div className="inner">
                        <h4><NumberFormat value={this.state.keluar} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                            <p>Pengeluaran Hari Ini</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-clock"></i>
                        </div>
                        <a href="" className="small-box-footer">.</a>
                        </div>
                        </div>


                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-primary">
                            <div className="inner">
                                <h4><NumberFormat value={parseInt(totalnaik)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                                <p>Peningkatan Saldo Hari Ini</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-checkmark"></i>
                            </div>
                            <a href="" className="small-box-footer">.</a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-info">
                            <div className="inner">
                                <h4><NumberFormat value={parseInt(menanghariini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                                <p>Peningkatan Dari Hari Kemarin</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-checkmark"></i>
                            </div>
                            <a href="" className="small-box-footer">.</a>
                            </div>
                        </div>
            </div>
        )
    }else{
        tampil = (
            <div className="row">
                                
                <div className="col-lg-12 col-12">
                    <h3>Data Keseluruhan</h3>
                </div>
                    <div className="form-group col-md-3">
                        <label>Total Kas RT</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={this.state.saldoakhir} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>
                    
                    <div className="form-group col-md-3">
                        <label>Total Pemasukan</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={this.state.totalmasuk} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>

                    
                    <div className="form-group col-md-3">
                        <label>Total Pengeluaran</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={this.state.totalkeluar} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>

                    
                    <div className="form-group col-md-3">
                        <label>Total Peningkatan Saldo</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={parseInt(totalnaiksemua)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>

                    
                    <div className="col-lg-12 col-12">
                        <h3>Data Bulan Ini</h3>
                    </div>

                    <div className="form-group col-md-3">
                        <label>Pemasukan Bulan Ini</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={this.state.masukbulanini} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>
                    
                    <div className="form-group col-md-3">
                        <label>Pengeluaran Bulan Ini</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={this.state.keluarbulanini} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>

                    
                    <div className="form-group col-md-3">
                        <label>Peningkatan Saldo Bulan Ini</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={parseInt(totalnaikbulanini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>

                    
                    <div className="form-group col-md-3">
                        <label>Peningkatan Dari Bulan Kemarin</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={parseInt(ratabulanini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>


                {/* hariini */}
                <div className="col-lg-12 col-12">
                    <h3>Data Hari Ini</h3>
                </div>

                <div className="form-group col-md-3">
                        <label>Pemasukan Hari Ini</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={this.state.masuk} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>
                    
                    <div className="form-group col-md-3">
                        <label>Pengeluaran Hari Ini</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={this.state.keluar} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>

                    
                    <div className="form-group col-md-3">
                        <label>Peningkatan Saldo Hari Ini</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={parseInt(totalnaik)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

                        </div>
                    </div>

                    
                    <div className="form-group col-md-3">
                        <label>Peningkatan Dari Hari Kemarin</label>
                        <div className="form-control" style={{ border: 0+'px'}}>
                        <h4><NumberFormat value={parseInt(menanghariini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

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
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-9">
                    <h1>Data Keuangan RT {localStorage.getItem("idrt")}</h1>
                </div>
                <div className="col-sm-3">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Bendahara/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Bendahara/Keuangan">Keuangan</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Informasi Saldo</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-widget="collapse">
                                    <i className="fa fa-minus"></i>
                                </button>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-wrench"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" role="menu">
                                    <a href="#" onClick={(e) => this.gantitampilan('teks')} className="dropdown-item"
                                    style={{ color: '#000'}}>Tampilan Teks</a>
                                    <a href="#" onClick={(e) => this.gantitampilan('box')} className="dropdown-item"
                                    style={{ color: '#000'}}>Tampilan Boxs</a>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-tool" data-widget="remove">
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {tampil}
                    </div>

                    </div>
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Laporan Keuangan</h3>
                        </div>
                        <Daftarkeuangan/>
                           
                    </div>


                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Grafik Keuangan</h3>
                        </div>
                        <Grafik/>
                    </div>

                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default Keuangan;
