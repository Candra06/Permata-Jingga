import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarAgenda from "./page/DataAgenda/daftaragenda";
import { RefWarga, rootRef, timeRef, RefAgenda } from '../../db';
import RandomKata from 'randomstring';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
class Agenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            judul: '',
            tanggal: '',
            deskripsi:'',
            perluiuran:'',
            addagenda: false,
            jumlahiuran:0,
            cek: true,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    //   deleteTask(){
    //     RefAgenda.orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap => {
    //       const tasks = [];
    //       snap.forEach(shot => {
    //         tasks.push({ ...shot.val(), key: shot.key });
    //         RefAgenda.child(shot.key).remove();
    //       });
    //     });
    //     toast.success('Data Berhasil Di Hapus', {
    //         position: toast.POSITION.TOP_RIGHT,
    //     });
    //     this.toggle()
    //   };
      handleChangejudul = event => {
        this.setState({ judul: event.target.value });
      };

      handleChangeTgl = event => {
        this.setState({ tanggal: event.target.value });
      };
      handleChangeDeskripsi = (value) => {
        this.setState({deskripsi:value});
      }
      handleChangePerlu = event => {
        this.setState({ perluiuran: event.target.value });
      };
      handleChangeJumlah = event => {
        this.setState({jumlahiuran:event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ judul: '', tanggal: '', deskripsi:'' });
      }
     
    /**
     * @property Jodit jodit instance of native Jodit
     */
	jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
        readonly: false,
        height: 400
        // all options from https://xdsoft.net/jodit/doc/
    }
    

      notify(type){

        // console.log(localStorage.getItem("idrt"));
        return () => {

            if(this.state.judul === ""){
                toast.warn('Masukkan Judul!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.tanggal === ""){
                toast.warn('Pilih Tanggal Agenda', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.deskripsi === ""){
                toast.warn('Masukkan Deskripsi', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.perluiuran === ""){
                toast.warn('Pilih Perlu Iuran', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.perluiuran === "Ya" && this.state.jumlahiuran === 0){
                toast.warn('Masukkan Jumlah Iuran', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
                const { judul, perluiuran, tanggal, deskripsi, jumlahiuran} = this.state;
                let kode = RandomKata.generate(10);
                const dataevente = {
                    kd_event:kode,
                    kd_pembuat:localStorage.getItem("nik"),
                    nama_pengirim:localStorage.getItem("nama"),
                    judul: this.state.judul,
                    tanggal: this.state.tanggal,
                    deskripsi: this.state.deskripsi,
                    perluiuran: this.state.perluiuran,
                    jumlahiuran: this.state.jumlahiuran,
                    status_agenda: "Proses",
                    status_voting: "Buka",
                    ordertime: timeRef
                  };
                  RefAgenda.push(dataevente);

              RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                snap.forEach(shot => {
                  // tasks.push({ ...shot.val(), key: shot.key });
                  const htg = {
                    kd_event:kode,
                    kd_pembuat:localStorage.getItem("nik"),
                    kd_penerima:shot.val().nik,
                    nama_pengirim:localStorage.getItem("nama"),
                    judul: judul,
                    tanggal: tanggal,
                    deskripsi: deskripsi,
                    perluiuran: perluiuran,
                    jumlahiuran: jumlahiuran,
                    status_terima: "Pending",
                    status_bayar: "Pending",
                    status_agenda: "Proses",
                    ordertime: timeRef
                  };
                  const notif= {
                    nama_pengirim:localStorage.getItem("nama"),
                    nik_penerima:shot.val().nik.trim(),
                    nik_pengirim:localStorage.getItem("nik"),
                    teks:judul,
                    time_notif:timeRef,
                    tipe:"biru"
                  }
                  if(shot.val().nik === localStorage.getItem("nik")){

                  }else{
                 rootRef.child('Notifikasi').push(notif);
                }
                if(shot.val().nort === localStorage.getItem("idrt")){
                    
                rootRef.child('PesertaAgenda').push(htg);
                }
                // console.log(htg);
                // console.log(notif);
                })
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
          this.setState({judul: '', tanggal:'', deskripsi:'', perluiuran:'', jumlahiuran:0 });
      }
  render() {
      const {perluiuran, addagenda} = this.state;
      let showjml, letbtntambah, formtambah, foo, bulan, hari;
        let tdy = new Date();
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
      if(perluiuran === "Ya"){
        showjml = (
            
          <div className="col-md-3">
          <div className="form-group col-md-12">
              <label>Jumlah Iuran <sup>*</sup></label>

              <div className="input-group">
                  <input type="number" min="1" onChange={this.handleChangeJumlah}
                  value={this.state.jumlahiuran} className="form-control"/>
              </div>
          </div>
        </div>
        )
    }
      if(addagenda){
        letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-danger float-left" onClick={this.tambahagenda}><i className="fa fa-minus"></i> Batal Menambahkan Agenda</button>

            </div>
          )

          formtambah = (
            <div className="card-body">
            <div className="row col-md-12">
                <div className="col-md-3">
                  <div className="form-group col-md-12">
                      <label>Judul Agenda <sup>*</sup></label>
                      <div className="input-group">
                        <input type="text" placeholder="judul agenda" onChange={this.handleChangejudul} value={this.state.judul} className="form-control"/>
                      </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group col-md-12">
                      <label>Tanggal Agenda <sup>*</sup></label>

                      <div className="input-group">
                          <input type="date" onChange={this.handleChangeTgl}
                          value={this.state.tanggal} min={hariini} className="form-control"/>
                      </div>
                  </div>
                </div>
                    <div className="col-md-3">
                        <div className="form-group col-md-12">
                            <label>Perlu Iuran <sup>*</sup></label>
                            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.perluiuran} onChange={this.handleChangePerlu}>
                                <option value="">Pilihan</option>
                                <option value="Ya">Ya</option>
                                <option value="Tidak">Tidak</option>
                            </select>
                        </div>
                    </div>
                    {showjml}
                <div className="col-md-12">
                    <div className="form-group col-md-12">
                        <label>Deskripsi <sup>*</sup></label>
                        <JoditEditor
                            editorRef={this.setRef}
                            value={this.state.deskripsi}
                            config={this.config}
                            onChange={this.handleChangeDeskripsi}
                        />
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
                        <button type="button" className="btn btn-success float-left" onClick={this.tambahagenda}><i className="fa fa-plus"></i> Tambah Agenda</button>

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
                    <h1>Data Agenda</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/RT/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/RT/Agenda">Agenda</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Agenda</h3>

                        </div>
                        <div className="form-control">
                            {letbtntambah}
                            {formtambah}
                           {foo}
                            </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Agenda</h3>
                           
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
