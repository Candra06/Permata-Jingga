import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarAgenda from "./page/DataAgenda/daftaragenda";
import { RefWarga, RefRT, rootRef, timeRef, RefAgenda, upRefWarga } from '../../db';
import RandomKata from 'randomstring';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
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
            status: 'Selesai',
            status_agenda:'',
            tanggal_status: '',
            modal: false, 
            tasks:[], 
            tasksLoading:false,
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: ''
        };
        this.toggle = this.toggle.bind(this);
        let today = new Date;
      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

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

      handleUploadStart = () => this.setState({isUploading: true, progress: 0});
      handleProgress = (progress) => this.setState({progress});
      handleUploadError = (error) => {
      this.setState({isUploading: false});
      }
      handleUploadSuccess = (filename) => {
      this.setState({avatar: filename, progress: 100, isUploading: false});
      upRefWarga.child(filename).getDownloadURL().then(function(url) {
        localStorage.setItem("urlfotowarga", url);
      }).catch(function(error) {

      })
      };
     
	jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
        readonly: false,
        height: 400
    }

    componentDidMount(){
        let tdy = new Date;
        let hari, bulan;
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
        RefAgenda.orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap =>{
            snap.forEach( shot => {
                if(shot.val().tanggal === hariini){
                    rootRef.child("Agenda").child(shot.key).update({status_agenda:'Selesai', status_voting:'Tutup'})
                    console.log(shot.val().status_agenda)
                }
            })
        })
    }
    

      notify(type){

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
                        ordertime: timeRef,
                        urlfoto:localStorage.getItem("urlfotowarga"),
                        filename: this.state.avatar,
                        nort: localStorage.getItem("idrt"),
                        norw: localStorage.getItem("koderw")
                  };
                  RefAgenda.push(dataevente);

              RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                snap.forEach(shot => {

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
      const {perluiuran, addagenda, showalert, teksalert, showalertnik } = this.state;
      let showjml, letbtntambah, formtambah, foo, bulan, hari, cekalert;
        let tdy = new Date();

        if(showalert === 'hide' && showalertnik === 'hide'){

        }else if(showalert === 'block'){
            cekalert = (
                <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
              {teksalert}
            </div>
            )
        }else if(showalertnik === 'block'){
            cekalert = (
                <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
                  {teksalert}
                </div>
              )
        }

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

                <div className="col-md-6">
                    <div className="form-group col-md-12">
                        <label>Pilih Foto Untuk di Unggah</label>
                        <div className="input-group">
                        <div className="custom-file">
                            <CustomUploadButton
                                accept="image/*"
                                name="avatar"
                                filename={file => RandomKata.generate(10) + file.name.split('.')[1] }
                                storageRef={upRefWarga}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
                                >
                                Pilih Foto Utama
                                </CustomUploadButton>
                        </div>
                        {this.state.isUploading &&

                                <p>Progres Upload: {this.state.progress} %</p>
                                }
                                {!this.state.isUploading && this.state.progress >= 100 &&
                                    <p>Upload Selesai</p>
                                }

                        </div>
                    </div>
                </div>
                    <div className="col-md-12">
                    {cekalert}
                    </div>
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
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
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
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
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
