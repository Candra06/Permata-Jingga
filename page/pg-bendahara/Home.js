import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import { RefWarga, RefRT, Refkeuangan, Refpemasukan, Refpengeluaran, RefBayarIuran } from './../../db';
import { ToastContainer } from 'react-toastify';
import NumberFormat from 'react-number-format';
import {Bar} from 'react-chartjs-2';
import Grafik from "./Grafik";

class Home extends Component {

  constructor(){
    super();
  this.state = ({ totalsaldo : 0, keluar:0, masuk:0, persentase:0, modal: false, 
    Data:{}, showmasuk: false, Datakeluar:{}, showkeluar: false, Databanding:{}, showbanding: false,
    Dataiuran:{}, showiuran: false});

  this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  gantishow = () => {
    this.setState({
      showmasuk: !this.state.showmasuk
    })
  }

  gantishowkeluar = () => {
    this.setState({
      showkeluar: !this.state.showkeluar
    })
  }
  gantishowbanding = () => {
    this.setState({
      showbanding: !this.state.showbanding
    })
  }
  gantishowiuran = () => {
    this.setState({
      showiuran: !this.state.showiuran
    })
  }

  componentDidMount() {
    RefWarga.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      snap.forEach(shot => {
        RefRT.orderByChild("norw").equalTo(shot.val().norw).on('value', snap => {
          snap.forEach(shott => {
            if(shott.val().no === parseInt(shot.val().nort)){
              localStorage.setItem("nikrt", shott.val().nik)
              localStorage.setItem("idrt", shott.val().no);
              localStorage.setItem("koderw",  shott.val().norw)
              }

              Refkeuangan.orderByChild("nort").equalTo(shot.val().nort).on('value', snap => {
                snap.forEach(shottt => {
                    if(shottt.val().norw === shott.val().norw){
                        this.setState({ totalsaldo: parseInt(shottt.val().jumlah_saldo)});
                    }
                });
              });
              
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

                let ttlmasuk=0, ttlkeluar=0, xtgl=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
              Refpemasukan.orderByChild("nort").equalTo(shot.val().nort).on('value', snap => {
                snap.forEach(datamasuk => {
                 // xtgl.push(datamasuk.val().tanggal)
                 // xuang.push(datamasuk.val().jumlah_uang)
                  if(datamasuk.val().tanggal === hariini || datamasuk.val().tanggal === tdyi){
                    
                    ttlmasuk = ttlmasuk + parseInt(datamasuk.val().jumlah_uang)
                  }
                });
                        this.setState({ masuk: ttlmasuk});
                // let xuang=[], warna= [], jmlprev=0, jmlprevbanding=0, warnabanding=[], jmlpreviuran=0, warnaiuran=[], xuangiuran=[];
                
                // let xuangkeluar=[], warnakeluar= [], jmlprevkeluar=0, saldobulanan=[];
                // for (let i = 0; i < 12; i++) {
                //   let bln = xtgl[i]+"-"+tdy.getFullYear();
                //   Refpemasukan.orderByChild("datachart").equalTo(bln).on('value', snap => {
                //     let ttl=0;
                //     snap.forEach(datagrafik => {
                //       if(datagrafik.val().nort === shot.val().nort){
                //         ttl = ttl + parseInt(datagrafik.val().jumlah_uang);
                //       }

                //     });
                //       //console.log(ttl)
                //       if(parseInt(ttl) >= jmlprev){
                //         jmlprev = ttl;
                //         warna.push('green')
                //       }else{
                //         jmlprev = ttl;
                //         warna.push('red')
                //       }
                //     xuang.push(parseInt(ttl));

                //       //pengeluaran
                //   Refpengeluaran.orderByChild("datachart").equalTo(bln).on('value', snap => {
                //     let ttlkeluar=0;
                //     snap.forEach(datagrafik => {
                //       if(datagrafik.val().nort === shot.val().nort){
                //         ttlkeluar = ttlkeluar + parseInt(datagrafik.val().jumlah_uang);
                //       }

                //     });
                //       //console.log(ttl)
                //       if(parseInt(ttlkeluar) >= jmlprevkeluar){
                //         jmlprevkeluar = ttlkeluar;
                //         warnakeluar.push('green')
                //       }else{
                //         jmlprevkeluar = ttlkeluar;
                //         warnakeluar.push('red')
                //       }
                //     xuangkeluar.push(parseInt(ttlkeluar));
                  
                //   let vv = parseInt(ttl) - parseInt(ttlkeluar);
                //   if(parseInt(vv) >= jmlprevbanding){
                //     jmlprevbanding = vv;
                //     warnabanding.push('green')
                //   }else{
                //     jmlprevbanding = vv;
                //     warnabanding.push('red')
                //   }
                //   saldobulanan.push(parseInt(vv))
                //   });
                // });

                // RefBayarIuran.orderByChild("databulan").equalTo(bln).on('value', snap => {
                //   let ttlkeluar=0;
                //   snap.forEach(dataiuran => {
                //     if(dataiuran.val().nort === shot.val().nort){
                //       ttlkeluar = ttlkeluar + parseInt(dataiuran.val().jumlah_bayar);
                //     }

                //   });
                //     //console.log(ttl)
                //     if(parseInt(ttlkeluar) >= jmlpreviuran){
                //       jmlpreviuran = ttlkeluar;
                //       warnaiuran.push('green')
                //     }else{
                //       jmlpreviuran = ttlkeluar;
                //       warnaiuran.push('red')
                //     }
                //   xuangiuran.push(parseInt(ttlkeluar));

                //   })
                  
                
                // }
                //         this.setState({
                //           Data: {
                //             labels: xtgl,
                //             datasets:[
                //                {
                //                   label:'Grafik Bulanan',
                //                   data: xuang,
                //                   backgroundColor:warna
                //                }
                //             ]
                //          },

                //          Datakeluar: {
                //           labels: xtgl,
                //           datasets:[
                //              {
                //                 label:'Grafik Bulanan',
                //                 data: xuangkeluar,
                //                 backgroundColor:warnakeluar
                //              }
                //           ]
                //        },

                //        Databanding: {
                //         labels: xtgl,
                //         datasets:[
                //            {
                //               label:'Grafik Peningkatan Pemasukan Perbulan',
                //               data: saldobulanan,
                //               backgroundColor:warnabanding
                //            }
                //         ]
                //      },

                //      Dataiuran: {
                //       labels: xtgl,
                //       datasets:[
                //          {
                //             label:'Grafik Iuran',
                //             data: xuangiuran,
                //             backgroundColor:warnaiuran
                //          }
                //       ]
                //    }
                //         })

              Refpengeluaran.orderByChild("nort").equalTo(shot.val().nort).on('value', snap => {
                snap.forEach(datakeluar => {
                  if(datakeluar.val().tanggal === tdyi || datakeluar.val().tanggal === hariini){
                    
                    ttlkeluar = ttlkeluar + parseInt(datakeluar.val().jumlah_uang)
                  }
                });
                this.setState({ keluar: ttlkeluar});
                        
              let p = parseInt(ttlmasuk) - parseInt(ttlkeluar);

              this.setState({
                persentase: p
              })
              ttlmasuk=0;
              ttlkeluar=0;
              p=0;
              });

              });


          })
        })

      });
    });

  }

  render() {
    const { masuk, keluar } = this.state;
    let totalnaik = parseInt(masuk) - parseInt(keluar);

    
    return (
        <div className="wrapper">

          <Nav/>


          <Layout/>

          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Dashboard Bendahara</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="">Home</a></li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                </div>
              </div>

            </div>

            <section className="content">
              <div className="container-fluid">

                <div className="row">
                  <div className="col-lg-3 col-6">

                    <div className="small-box bg-info">
                      <div className="inner">
                        <h4><NumberFormat value={this.state.totalsaldo} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h4>

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
                  
            <ToastContainer
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000} />
          <Footer/>

        </div>
    );
  }
}

export default Home;
