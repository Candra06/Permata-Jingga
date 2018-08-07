import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarAgenda from "./page/DataIuran/daftarIuran";
import Listbln from "./page/DataIuran/listitembulan";
import { RefIuran, Refriwayat, timeRef, RefKK, Refpesertaiuran } from '../../db';
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';

class Agenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jumlah: 0,
            bulaniuran: '',
            tanggal:'',
            addagenda: false,
            arraypilihanbulan:[]
        };
      }
        componentWillMount(){
        let tdy = new Date();
        let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
        
        this.setState({
            tanggal: tdyi,
        })
        this.pilihbulan();
        }

        pilihbulan = () => {
            let tdy = new Date();
            let xtgl=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'], arraypilihanbulan=[];
           
            for (let i = 0; i < 12; i++) {
                let bln = xtgl[i]+"-"+tdy.getFullYear();
                RefIuran.orderByChild("databulan").equalTo(bln).on('value', snap => {
                    let ttl=0;
                    snap.forEach(datagrafik => {
                        ttl++;
                    })
                    if(ttl >= 1){

                    }else{
                        arraypilihanbulan.push({bulan:bln})
                    }
                })
            }
            //console.log(arraypilihanbulan)
            this.setState({
                arraypilihanbulan
            })
        }
      
      notify(type){

        return () => {

            if(this.state.bulaniuran === ""){
                toast.warn('Pilih Bulan Iuran!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.jumlah === ""){
                toast.warn('Masukkan Jumlah Iuran', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.jumlah <= 0){
                toast.warn('Jumlah Iuran Harus Lebih Dari 0', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
                const { bulaniuran, jumlah} = this.state;
                let kode = RandomKata.generate(10);
                const dataevente = {
                    kd_iuran:kode,
                    nort:localStorage.getItem("idrt"),
                    norw:localStorage.getItem("koderw"),
                    jumlah_iuran: jumlah,
                    databulan: bulaniuran,
                    status_iuran: "Proses",
                    ordertime: timeRef
                  };
                  RefIuran.push(dataevente);

                  Refriwayat.push({
                    tipe: 'Iuran',
                    tanggal: this.state.tanggal,
                    ordertime: timeRef,
                    teksriwayat: localStorage.getItem("nama")+" Membuat Iuran dengan jumlah iuran sebesar Rp "+ jumlah + " pada tanggal "+this.state.tanggal
                })

              RefKK.orderByChild("idrw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                snap.forEach(shot => {
                  // tasks.push({ ...shot.val(), key: shot.key });
                  if(shot.val().idrt === localStorage.getItem("idrt")){
                  const htg = {
                    kd_iuran:kode,
                    kd_peserta:RandomKata.generate(10),
                    nama_keluarga:shot.val().kepala,
                    alamat: shot.val().alamat,
                    nokk: shot.val().nokk,
                    status_bayar: "Pending",
                  };
                  Refpesertaiuran.push(htg);

                  }
                  
                })
              })
          
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
            this.bersih();
            this.pilihbulan();
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
          this.setState({jumlah: 0, bulaniuran:'', addagenda: false });
      }
      handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
      }
  render() {
      const {addagenda, arraypilihanbulan} = this.state;
      let letbtntambah, formtambah, foo;
        
      if(addagenda){
        letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-danger float-left" onClick={this.tambahagenda}><i className="fa fa-minus"></i> Batal Menambahkan Iuran</button>

            </div>
          )

          formtambah = (
            <div className="card-body">
            <div className="row col-md-12">
                    <div className="col-md-4">
                        <div className="form-group col-md-12">
                            <label>Bulan Iuran <sup>*</sup></label>
                            <select className="form-control" style={{height: 2.5 + 'em'}} value={this.state.bulaniuran} onChange={this.handleChange} name="bulaniuran">
                                <option value="">Pilih Bulan</option>
                                {arraypilihanbulan.map(task => (
                                    <Listbln key={task.key} task={task} />
                                ))}
                            </select>
                        </div>
                    </div>
                <div className="col-md-4">
                  <div className="form-group col-md-12">
                      <label>Jumlah Iuran <sup>*</sup></label>
                      <div className="input-group">
                        <input type="number" placeholder="Jumlah Iuran" onChange={this.handleChange} value={this.state.jumlah} name="jumlah" className="form-control"/>
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
            <button type="reset" className="btn btn-danger"  onClick={(e) => this.bersih()}>Reset</button>
        </div>
          )
      }else{
        letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-success float-left" onClick={this.tambahagenda}><i className="fa fa-plus"></i> Tambah Iuran</button>

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
                <div className="col-sm-6">
                    <h1>Iuran Bulanan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Bendahara/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Bendahara/Iuran">Iuran Bulanan</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Iuran Bulanan</h3>

                        </div>
                        <div className="form-control">
                            {letbtntambah}
                            {formtambah}
                           {foo}
                            </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Iuran Bulanan</h3>
                           
                        </div>
                            <div className="card-body">
                                <DaftarAgenda/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={2000}
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

export default Agenda;
