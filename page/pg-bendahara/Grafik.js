import React, { Component } from "react";
import { RefWarga, RefRT, Refkeuangan, Refpemasukan, Refpengeluaran, RefBayarIuran } from './../../db';
import {Bar} from 'react-chartjs-2';

class Grafik extends Component {

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
                let xuang=[], warna= [], jmlprev=0, jmlprevbanding=0, warnabanding=[], jmlpreviuran=0, warnaiuran=[], xuangiuran=[];
                
                let xuangkeluar=[], warnakeluar= [], jmlprevkeluar=0, saldobulanan=[];
                for (let i = 0; i < 12; i++) {
                  let bln = xtgl[i]+"-"+tdy.getFullYear();
                  Refpemasukan.orderByChild("datachart").equalTo(bln).on('value', snap => {
                    let ttl=0;
                    snap.forEach(datagrafik => {
                      if(datagrafik.val().nort === shot.val().nort){
                        ttl = ttl + parseInt(datagrafik.val().jumlah_uang);
                      }

                    });
                      //console.log(ttl)
                      if(parseInt(ttl) >= jmlprev){
                        jmlprev = ttl;
                        warna.push('green')
                      }else{
                        jmlprev = ttl;
                        warna.push('red')
                      }
                    xuang.push(parseInt(ttl));

                      //pengeluaran
                  Refpengeluaran.orderByChild("datachart").equalTo(bln).on('value', snap => {
                    let ttlkeluar=0;
                    snap.forEach(datagrafik => {
                      if(datagrafik.val().nort === shot.val().nort){
                        ttlkeluar = ttlkeluar + parseInt(datagrafik.val().jumlah_uang);
                      }

                    });
                      //console.log(ttl)
                      if(parseInt(ttlkeluar) >= jmlprevkeluar){
                        jmlprevkeluar = ttlkeluar;
                        warnakeluar.push('green')
                      }else{
                        jmlprevkeluar = ttlkeluar;
                        warnakeluar.push('red')
                      }
                    xuangkeluar.push(parseInt(ttlkeluar));
                  
                  let vv = parseInt(ttl) - parseInt(ttlkeluar);
                  if(parseInt(vv) >= jmlprevbanding){
                    jmlprevbanding = vv;
                    warnabanding.push('green')
                  }else{
                    jmlprevbanding = vv;
                    warnabanding.push('red')
                  }
                  saldobulanan.push(parseInt(vv))
                  });
                });

                RefBayarIuran.orderByChild("databulan").equalTo(bln).on('value', snap => {
                  let ttlkeluar=0;
                  snap.forEach(dataiuran => {
                    if(dataiuran.val().nort === shot.val().nort){
                      ttlkeluar = ttlkeluar + parseInt(dataiuran.val().jumlah_bayar);
                    }

                  });
                    //console.log(ttl)
                    if(parseInt(ttlkeluar) >= jmlpreviuran){
                      jmlpreviuran = ttlkeluar;
                      warnaiuran.push('green')
                    }else{
                      jmlpreviuran = ttlkeluar;
                      warnaiuran.push('red')
                    }
                  xuangiuran.push(parseInt(ttlkeluar));

                  })
                  
                
                }
                        this.setState({
                          Data: {
                            labels: xtgl,
                            datasets:[
                               {
                                  label:'Grafik Bulanan',
                                  data: xuang,
                                  backgroundColor:warna
                               }
                            ]
                         },

                         Datakeluar: {
                          labels: xtgl,
                          datasets:[
                             {
                                label:'Grafik Bulanan',
                                data: xuangkeluar,
                                backgroundColor:warnakeluar
                             }
                          ]
                       },

                       Databanding: {
                        labels: xtgl,
                        datasets:[
                           {
                              label:'Grafik Peningkatan Pemasukan Perbulan',
                              data: saldobulanan,
                              backgroundColor:warnabanding
                           }
                        ]
                     },

                     Dataiuran: {
                      labels: xtgl,
                      datasets:[
                         {
                            label:'Grafik Iuran',
                            data: xuangiuran,
                            backgroundColor:warnaiuran
                         }
                      ]
                   }
                        })

                        
              ttlmasuk=0;
              ttlkeluar=0;
              

              });


          })
        })

      });
    });

  }

  render() {
    const { masuk, keluar } = this.state;
    let grafikmasuk,teksshow, grafikkeluar,teksshowkeluar, grafikbanding,teksshowbanding, grafikiuran,teksshowiuran;

    if(this.state.showmasuk){
      teksshow = "Sembunyikan"
      grafikmasuk = (
        <div className="card-body">
          <Bar
          data = {this.state.Data}
          options = {{
            responsive: true, maintainAspectRatio: true, legend: {
              display: false,
              position: 'bottom',
              reverse: true,
              onClick: null
            } }} />
        </div>
      )
    }else{
      teksshow = "Tampilkan"
    }

    if(this.state.showkeluar){
      teksshowkeluar = "Sembunyikan"
      grafikkeluar = (
        <div className="card-body">
          <Bar
          data = {this.state.Datakeluar}
          options = {{ 
            responsive: true, maintainAspectRatio: true }} />
        </div>
      )
    }else{
      teksshowkeluar = "Tampilkan"
    }

    if(this.state.showbanding){
      teksshowbanding = "Sembunyikan"
      grafikbanding = (
        <div className="card-body">
          <Bar
          data = {this.state.Databanding}
          options = {{ 
            responsive: true, maintainAspectRatio: true }} />
        </div>
      )
    }else{
      teksshowbanding = "Tampilkan"
    }

    if(this.state.showiuran){
      teksshowiuran = "Sembunyikan"
      grafikiuran = (
        <div className="card-body">
          <Bar
          data = {this.state.Dataiuran}
          options = {{ 
            responsive: true, maintainAspectRatio: true }} />
        </div>
      )
    }else{
      teksshowiuran = "Tampilkan"
    }
    return (
       
              <div className="card-body">

                <div className="row">
                  <section className="col-lg-6 connectedSortable">
                    <div className="card">
                      <div className="card-header p-2">
                      <h3 className="card-title">Grafik Pemasukan</h3>

                            <div className="card-tools">
                              <button type="button" onClick={this.gantishow} className="btn btn-tool">
                                {teksshow}
                              </button>
                            </div>
                        </div>
                      {grafikmasuk}
                    </div>
                  </section>

                  <section className="col-lg-6 connectedSortable">
                    <div className="card">
                      <div className="card-header p-2">
                      <h3 className="card-title">Grafik Pengeluaran</h3>

                            <div className="card-tools">
                              <button type="button" onClick={this.gantishowkeluar} className="btn btn-tool">
                                {teksshowkeluar}
                              </button>
                            </div>
                        </div>
                      {grafikkeluar}
                    </div>
                  </section>

                  <section className="col-lg-6 connectedSortable">
                    <div className="card">
                      <div className="card-header p-2">
                      <h3 className="card-title">Grafik Peningkatan Saldo</h3>

                            <div className="card-tools">
                              <button type="button" onClick={this.gantishowbanding} className="btn btn-tool">
                                {teksshowbanding}
                              </button>
                            </div>
                        </div>
                      {grafikbanding}
                    </div>
                  </section>

                  <section className="col-lg-6 connectedSortable">
                    <div className="card">
                      <div className="card-header p-2">
                      <h3 className="card-title">Grafik Iuran</h3>

                            <div className="card-tools">
                              <button type="button" onClick={this.gantishowiuran} className="btn btn-tool">
                                {teksshowiuran}
                              </button>
                            </div>
                        </div>
                      {grafikiuran}
                    </div>
                  </section>

                </div>
              </div>
          
    );
  }
}

export default Grafik;
