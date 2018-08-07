import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";

import orderBy from 'lodash/orderBy';
import Listwarga from './page/DataWarga/datatmp/listwarga';
import Listwargaselect from './page/DataWarga/selectdatatmp/listwarga';
//import Daftarrw from "./page/DataRW/selectrw/daftarrwrt";
import Listkelurahan from "./page/DataKelurahan/selectkelurahan/listkelurahan";
import { rootRef, RefKK, RefWargaTmp, RefWarga, RefUser, RefDataKK, upRefWarga,  RefKelurahan } from '../../db';
//import { Action } from "../../Action";
import RandomKata from 'randomstring';
import {  Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

class AddKK extends Component {

    constructor(props) {
        super(props);
        this.state = { nokk: '',addwarga:false, kodetmp:'', kepala: '', cek: true, alamat:'', htgnokk: 0, 
        tampilpage1:'block',
        tampilpage2:'hide',
        tampilpage3:'hide',
        tampilpage4:'hide',
        modal: false,
        nama: '', password:'', nik: '', showalert: 'hide', showalertnik: 'hide', lihatbtn: '',
        teksalert:'', tempatlahir: '', tgl_lahir:'', nohp: '',
        pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '', agama: '',
        pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'',norw:'', nort:'',

        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: '', kab:'', prov:'', kec:'', kodepos:'',kelurahan:'',
         arraykelurahan:[], arraydatawargatmp:[], arrayselectkepala:[], datatmpload:true};

      }

      handleUploadStart = () => this.setState({isUploading: true, progress: 0});
      handleProgress = (progress) => this.setState({progress});
      handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
      }
      handleUploadSuccess = (filename) => {
      this.setState({avatar: filename, progress: 100, isUploading: false});
      upRefWarga.child(filename).getDownloadURL().then(function(url) {
        localStorage.setItem("urlfotowarga", url);
      }).catch(function(error) {

      console.log(error);
      })
      };

      toggle = event => {
        this.setState({
          modal: !this.state.modal
        });
      }
      componentWillMount(){
        this.setState({norw:localStorage.getItem("koderw")});
        this.setState({nort:localStorage.getItem("idrt")});
       
        if(localStorage.getItem("kodetmp") === ""){
          let kod = RandomKata.generate(10);
            this.setState({kodetmp:kod});
            localStorage.setItem("kodetmp", kod);

            }else{
                let hitung = 0;
                RefKK.orderByChild("nokk").equalTo(localStorage.getItem("tmpnokk")).on('value', snap => {
                const tasks = [];
                snap.forEach(shot => {
                    hitung++;
                    tasks.push({ ...shot.val(), key: shot.key });

                });
                this.setState({ tasks, htgnokk: hitung});
                });
                this.setState({
                    kodetmp: localStorage.getItem("kodetmp"),
                    nokk: localStorage.getItem("tmpnokk"),
                    alamat: localStorage.getItem("tmpalamat")

                })
            }
            localStorage.setItem("urlfotowarga","")
            RefDataKK.on('value', snap => {
                snap.forEach(shot => {
                    this.setState({
                        kab:shot.val().kabupaten,
                        kec: shot.val().kecamatan,
                        prov: shot.val().provinsi,
                        kodepos: shot.val().kodepos
                    })
                   
                    
                });
              });
             

              RefKelurahan.on('value', snap => {
                const arraykelurahan = [];
                snap.forEach(shot => {
                    arraykelurahan.push({ ...shot.val(), key: shot.key });
                });
                this.setState({ arraykelurahan });
              });
      }
      handleChangeNo = event => {
        this.setState({ nokk: event.target.value, htgnokk:0 });
        localStorage.setItem("tmpnokk", event.target.value);
        let hitung = 0;
        RefKK.orderByChild("nokk").equalTo(event.target.value).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            hitung++;
            tasks.push({ ...shot.val(), key: shot.key });

          });
          this.setState({ tasks, htgnokk: hitung});
        });
      };

      handleChangeOptionKepala = event => {
        this.setState({ kepala: event.target.value });
      };
     
      handleReset = event => {
        event.preventDefault();
        this.setState({ nokk: '', kepala: '', alamat:'', kelurahan:'' });
        localStorage.setItem("tmpnokk", "");
        //localStorage.setItem("kodetmp", "");
        localStorage.setItem("tmpalamat", "");
        //window.location.reload();
      }
        handleChangeAlamat = event =>{
        this.setState({ alamat: event.target.value });
        localStorage.setItem("tmpalamat", event.target.value);
      }

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };
      handleChangePassword = event => {
        this.setState({password:event.target.value});
      }
      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
        let hitung = 0;
        RefWarga.orderByChild("nik").equalTo(event.target.value).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            hitung++;
            tasks.push({ ...shot.val(), key: shot.key });

          });
          if(hitung >= 1){
          this.setState({ showalertnik: 'block', teksalert:'NIK Sudah Terpakai!', lihatbtn:'hide'});
          }else{
            if(this.state.showalert === 'block'){
              this.setState({ showalertnik: 'hide', teksalert:''});

            }else{
              this.setState({ showalertnik: 'hide', teksalert:'', lihatbtn:'block'});

            }
          }
        });
      };

      handleChangeTempatLahir = event => {
        this.setState({ tempatlahir: event.target.value });
      };
      handleChangeNoHp = event => {
        this.setState({ nohp: event.target.value });
      };

      handleChangeAgama = event => {
        this.setState({ agama: event.target.value });
      };

      handleChangePekerjaan = event => {
        this.setState({ pekerjaan: event.target.value });
      };

      handleChangeGender = event => {
        this.setState({ gender: event.target.value });
      };

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });
        let hitung = 0;
        RefUser.orderByChild("email").equalTo(event.target.value).on('value', snap =>{
            const tasks = [];
            snap.forEach(shot =>{
                hitung++;
                tasks.push({ ...shot.val(), key: shot.key})
            });
            if(hitung >= 1 ){
                this.setState({ showalert: 'block', teksalert:'email sudah digunakan', lihatbtn:'hide'});
            }else{
                if(this.setState.showalertnik === 'block'){
                    this.setState({ showalert: 'hide', teksalert:''});
                }else{
                    this.setState({ showalert: 'hide', teksalert:'', lihatbtn:'block'});
                }
            }
        });
      };

      handleChangeStatus= event => {
        this.setState({ status: event.target.value });
      };
      handleChangeWa = event => {
        this.setState({ wa: event.target.value });
      };

      handleChangeFb = event => {
        this.setState({ fb: event.target.value });
      };

      handleChangeIg = event => {
        this.setState({ ig: event.target.value });
      };
      handleChangeTwitter = event => {
        this.setState({ twitter: event.target.value });
      };
      handleChangeTgl = event => {
        this.setState({ tgl_lahir: event.target.value });
      };


      handleChangePendidikan = event => {
        this.setState({ pendidikan: event.target.value });
      };

      handleChangeStatusNikah = event => {
        this.setState({ status_nikah: event.target.value });
      };

      handleChangeKewarganegaraan = event => {
        this.setState({ kewarganegaraan: event.target.value });
      };
      handleChangeNamaAyah = event => {
        this.setState({ namaayah: event.target.value });
      };
      handleChangeNamaIbu = event => {
        this.setState({ namaibu: event.target.value });
      };


      reloadPassword = event =>{
        this.setState({password:RandomKata.generate({length: 5, charset: '1234567890'})});
      }


      handleResetWarga = event => {
        event.preventDefault();
        this.setState({ nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', agama:'',
        pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '',
        pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:''  });
      }

      HandleTambahWarga(){
        return () => {
            
              let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');
              if(this.state.nama === ""){
                toast.warn('Nama tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(!this.state.nama.match(/^[a-zA-Z]+$/) && !this.state.nama.match(" ")){
                toast.warn('Nama harus berisi huruf', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.nik === ""){
                toast.warn('NIK tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.tempatlahir === ""){
                toast.warn('Tempat Lahir tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.tgl_lahir === ""){
                toast.warn('Tanggal Lahir tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.pekerjaan === ""){
                toast.warn('Pakerjaan tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.pendidikan === ""){
                toast.warn('Pendidikan tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.status === ""){
                toast.warn('Status Keluarga tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.agama === ""){
                toast.warn('Agama tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.gender === ""){
                toast.warn('Jenis Kelamin tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.status_nikah === ""){
                toast.warn('Status Pernikahan tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.kewarganegaraan === ""){
                toast.warn('Kewarganegaraan tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.namaayah === ""){
                toast.warn('Nama ayah tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.namaibu === ""){
                toast.warn('Nama ibu tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.nohp === ""){
                toast.warn('No Telphone tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.email === ""){
                toast.warn('Email tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                toast.warn('Email tidak valid', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.password === ""){
                toast.warn('Password tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else{
                const htg = {
                    kodetmp: localStorage.getItem("kodetmp"),
                    nama: this.state.nama.trim(),
                    nik: this.state.nik.trim(),
                    tempatlahir: this.state.tempatlahir.trim(),
                    tgl_lahir: this.state.tgl_lahir.trim(),
                    nohp: this.state.nohp.trim(),
                    agama: this.state.agama.trim(),
                    pekerjaan: this.state.pekerjaan.trim(),
                    pendidikan: this.state.pendidikan.trim(),
                    status_nikah: this.state.status_nikah.trim(),
                    kewarganegaraan: this.state.kewarganegaraan.trim(),
                    namaayah: this.state.namaayah.trim(),
                    namaibu: this.state.namaibu.trim(),
                    gender: this.state.gender.trim(),
                    email: this.state.email.trim(),
                    status: this.state.status.trim(),
                    no_kk: this.state.nokk.trim(),
                    fb: this.state.fb.trim(),
                    wa: this.state.wa.trim(),
                    ig: this.state.ig.trim(),
                    twitter: this.state.twitter.trim(),
                    password:this.state.password,
                    level:'Warga',
                    urlfoto:localStorage.getItem("urlfotowarga"),
                    filename: this.state.avatar,
                    tipewarga:'Asli'
                  };
               RefWargaTmp.push(htg);
                //rootRef.child('UserTMP').push(akundata);
                this.setState({ addwarga: !this.state.addwarga});
                this.setState({ nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', agama: '',
        pekerjaan: '', gender: '', email: '', status:'',password:'', fb: '', wa: '', ig: '', twitter: '',
        pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'', progress:0  });
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
                
            }
        };
      };

     

      handleChangeOptionKelurahan = event => {
        this.setState({kelurahan: event.target.value});
        
      }
      handlePrevStep2 = event => {
        this.setState({  tampilpage1:'block',
        tampilpage2:'hide',
        tampilpage3:'hide',
        tampilpage4:'hide' });
      }
      handlePrevStep3 = event => {
        this.setState({  tampilpage1:'hide',
        tampilpage2:'block',
        tampilpage3:'hide',
        tampilpage4:'hide' });
      }

      handleNextStep2() {

        //hitung
        const {arraydatawargatmp} = this.state;
            if(arraydatawargatmp.length){

                this.setState({  tampilpage1:'hide',
                tampilpage2:'hide',
                tampilpage3:'block',
                tampilpage4:'hide' });
            }else{
                toast.warn('Data Warga masih kosong!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }
        
      }

      tambahwarga = event =>{
          this.setState({ addwarga: !this.state.addwarga});
      }
      notify(type){
        return () => {

              if (this.state.nokk === "") {
               toast.warn('No KK Tidak Boleh Kosong!!', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }else if(this.state.norw === ""){
                    toast.warn('No RW Tidak Boleh Kosong!!', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }else if(this.state.nort === ""){
                    toast.warn('No RT Tidak Boleh Kosong!!', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }else if(this.state.alamat === ""){
                    toast.warn('Alamat Tidak Boleh Kosong!!', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }else{
                    if(this.state.htgnokk >= 1){

                        toast.warn('No KK anda masukkan sudah di pakai!!!', {
                          position: toast.POSITION.TOP_RIGHT,
                        });
                      }else{
                 
                    RefWargaTmp.orderByChild("kodetmp").equalTo(localStorage.getItem("kodetmp")).on('value', snap => {
                        const arraydatawargatmp = [];
                        let no = 0;
                        snap.forEach(shot => {
                            no++;
                            arraydatawargatmp.push({ ...shot.val(), key: shot.key, nomer:no });
                        });
                        this.setState({ arraydatawargatmp, datatmpload: false });
                        });

                        this.setState({ tampilpage1: 'hide',
                        tampilpage2:'block',
                        tampilpage3:'hide',
                        tampilpage4:'hide'})
                        }
                }

        };
      };


      handleSimpanSemua = event => {
            //console.log("gogogogogo");
          if(this.state.kepala === ""){
            toast.warn('Pilih Kepala Keluarga', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
            const htg = {
                kd_kk:localStorage.getItem("kodetmp"),
                nokk: this.state.nokk.trim(),
                kepala: this.state.kepala,
                idrt: this.state.nort,
                idrw: this.state.norw,
                alamat:this.state.alamat.trim(),
                kelurahan: this.state.kelurahan,
                kecamatan : this.state.kec,
                kabupaten :   this.state.kab,
                provinsi :  this.state.prov,
                kodepos :   this.state.kodepos
              };
              rootRef.child('KK').push(htg);

              RefWargaTmp.orderByChild("kodetmp").equalTo(localStorage.getItem("kodetmp")).on('value', snap => {
                
                snap.forEach(shot => {
                  const datawargadua = {
                    nama: shot.val().nama,
                    nik: shot.val().nik,
                    tempatlahir: shot.val().tempatlahir,
                    tgl_lahir: shot.val().tgl_lahir,
                    nohp: shot.val().nohp,
                    agama: shot.val().agama,
                    pekerjaan: shot.val().pekerjaan,
                    pendidikan: shot.val().pendidikan,
                    status_nikah: shot.val().status_nikah,
                    kewarganegaraan: shot.val().kewarganegaraan,
                    namaayah: shot.val().namaayah,
                    namaibu: shot.val().namaibu,
                    gender:shot.val().gender,
                    email: shot.val().email,
                    status: shot.val().status,
                    fb: shot.val().fb,
                    wa: shot.val().wa,
                    ig: shot.val().ig,
                    twitter: shot.val().twitter,
                    no_kk : this.state.nokk,
                    urlfoto:shot.val().urlfoto,
                    filename: shot.val().filename,
                    tipewarga: shot.val().tipewarga,
                    nort: this.state.nort,
                    norw: this.state.norw
                  }
                  const setakun = {
                    kd_user: RandomKata.generate(10),
                    email: shot.val().email,
                    nik:shot.val().nik,
                    password:shot.val().password,
                    level:shot.val().level
                  }
                 RefWarga.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                  let hitung = 0;
                    snap.forEach(shot => {
                        hitung++;
                    });
                    if(hitung >= 1){

                    }else{

                    rootRef.child('WARGA').push(datawargadua);
                    // rootRef.child('User').push(setakun);
                    RefWargaTmp.child(shot.key).remove();
                    }
                    });
                });
          });







          toast.success('Data Berhasil Di Simpan', {
              position: toast.POSITION.TOP_RIGHT,
            });
            this.setState({ nokk: '', kepala: '', alamat:'',
            nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', agama:'',
                    pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '',
                    pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'', kelurahan:'',
                    tampilpage1:'block',
                    tampilpage2:'hide',
                    tampilpage3:'hide',
                    tampilpage4:'hide'   });
                    localStorage.setItem("tmpnokk", "");

                    localStorage.setItem("kodetmp", "");
                    localStorage.setItem("tmpalamat", "");
                     window.location.reload();
        }
      }
      hapussemua(){
        RefWargaTmp.orderByChild("kodetmp").equalTo(localStorage.getItem("kodetmp")).on('value', snap => {

            snap.forEach(shot => {
              RefWargaTmp.child(shot.key).remove();
            });
          });
        this.setState({ nokk: '', kepala: '', alamat:'',
        nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', agama:'',
                pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '',
                pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'',
                tampilpage1:'block',
                tampilpage2:'hide',
                tampilpage3:'hide',
                tampilpage4:'hide', kelurahan:'', });
                localStorage.setItem("tmpnokk", "");

                localStorage.setItem("kodetmp", "");
                localStorage.setItem("tmpalamat", "");
        window.location.reload();
      }
  render() {
      const {tampilpage1, tampilpage2, tampilpage3, tampilpage4, arraykelurahan, arraydatawargatmp, datatmpload} = this.state;
      let tampilstep;
      let lettambahwarga, letbtntambah;
      const{ showalert, teksalert, showalertnik } = this.state;
      let cekalert;
    
      const orderkelurahan = orderBy(
        arraykelurahan, ['nama'],['asc']
      );
      const orderkeluarga = orderBy(
        arraydatawargatmp
      );


      let datatmplist;
    if (datatmpload) {
        datatmplist = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (arraydatawargatmp.length) {
        datatmplist = (
        <div className="table-responsive">
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Warga</th>
                        <th scope="col">NIK</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Status Keluarga</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderkeluarga.map(task => (
            <Listwarga key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );

    } else {
        datatmplist = <div className="TaskList-empty">Tidak Ada Data Warga</div>;
    }
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
      if(this.state.addwarga){
          letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-danger float-left" onClick={this.tambahwarga}><i className="fa fa-minus"></i> Batal Menambahkan Warga</button>

            </div>
          )
        lettambahwarga = (

            <div className="form-control">
                <div className="card-body">
                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Nama Warga <sup>*</sup></label>

                                                <input type="text"
                                                onChange={this.handleChangeNama}
                                                value={this.state.nama}
                                                className="form-control" placeholder="Masukkan Nama"/>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>NIK <sup>*</sup></label>

                                            <input type="number"
                                            onChange={this.handleChangeNik}
                                            value={this.state.nik}
                                            className="form-control" placeholder="Masukkan NIK"/>
                                        </div>
                                        </div>



                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>Tempat Lahir <sup>*</sup></label>

                                            <input type="text"
                                            onChange={this.handleChangeTempatLahir}
                                            value={this.state.tempatlahir}
                                            className="form-control" placeholder="Masukkan Tempat Lahir"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>Tanggal Lahir <sup>*</sup></label>

                                            <div className="input-group">
                                                <input type="date" onChange={this.handleChangeTgl} value={this.state.tgl_lahir} className="form-control"/>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Pekerjaan <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.pekerjaan} onChange={this.handleChangePekerjaan}>
                                                    <option value="">Pilih Pekerjaan</option>
                                                    <option value="BELUM/TIDAK BEKERJA">BELUM/TIDAK BEKERJA</option>
                                                    <option value="MENGURUS RUMAH TANGGA">MENGURUS RUMAH TANGGA</option>
                                                    <option value="PELAJAR/MAHASISWA">PELAJAR/MAHASISWA</option>
                                                    <option value="PENSIUNAN">PENSIUNAN</option>
                                                    <option value="DOKTER">DOKTER</option>
                                                    <option value="TENTARA NASIONAL INDONESIA">TENTARA NASIONAL INDONESIA</option>
                                                    <option value="WIRASWASTA">WIRASWASTA</option>
                                                    <option value="PEGAWAI NEGERI SIPIL">PEGAWAI NEGERI SIPIL</option>
                                                    <option value="Lain Lain">Lain Lain</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Status Keluarga <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.status} onChange={this.handleChangeStatus}>
                                                    <option value="">Pilih Status Keluarga</option>
                                                    <option value="Kepala Keluarga">Kepala Keluarga</option>
                                                    <option value="Ayah">Ayah</option>
                                                    <option value="Istri">Istri</option>
                                                    <option value="Anak">Anak</option>
                                                    <option value="Kakek">Kakek</option>
                                                    <option value="Nenek">Nenek</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Agama <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.agama} onChange={this.handleChangeAgama}>
                                                    <option value="">Pilih Agama</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Kristen">Kristen</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Budha">Budha</option>
                                                    <option value="Konghuchu">Konghuchu</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Jenis Kelamin <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.gender} onChange={this.handleChangeGender}>
                                                    <option value="">Pilih Jenis Kelamin</option>
                                                    <option value="Laki-Laki">Laki-Laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Pendidikan <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.pendidikan} onChange={this.handleChangePendidikan}>
                                                    <option value="">Pilih Pendidikan</option>
                                                    <option value="TIDAK / BELUM SEKOLAH">TIDAK / BELUM SEKOLAH</option>
                                                    <option value="BELUM TAMAT SD/SEDERAJAT">BELUM TAMAT SD/SEDERAJAT</option>
                                                    <option value="TAMAT SD / SEDERAJAT">TAMAT SD / SEDERAJAT</option>
                                                    <option value="SLTP/SEDERAJAT">SLTP/SEDERAJAT</option>
                                                    <option value="SLTA / SEDERAJAT">SLTA / SEDERAJAT</option>
                                                    <option value="DIPLOMA I / II">DIPLOMA I / II</option>
                                                    <option value="AKADEMI/ DIPLOMA III/S. MUDA	">AKADEMI/ DIPLOMA III/S. MUDA	</option>
                                                    <option value="DIPLOMA IV/ STRATA I">DIPLOMA IV/ STRATA I</option>
                                                    <option value="STRATA II">STRATA II</option>
                                                    <option value="STRATA III">STRATA III</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Status Pernikahan <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.status_nikah} onChange={this.handleChangeStatusNikah}>
                                                    <option value="">Pilih Status Pernikahan</option>
                                                    <option value="Sudah Menikah">Sudah Menikah</option>
                                                    <option value="Belum Menikah">Belum Menikah</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Kewarganegaraan <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.kewarganegaraan} onChange={this.handleChangeKewarganegaraan}>
                                                    <option value="">Pilih Kewarganegaraan</option>
                                                    <option value="WNI">WNI</option>
                                                    <option value="WNA">WNA</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Nama Ayah <sup>*</sup></label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaAyah}
                                                value={this.state.handleChangeNamaAyah}
                                                className="form-control" placeholder="Masukkan Nama Ayah"/>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Nama Ibu <sup>*</sup></label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaIbu}
                                                value={this.state.namaibu}
                                                className="form-control" placeholder="Masukkan Nama Ibu"/>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>No Telphone <sup>*</sup></label>
                                            <input type="number"
                                            onChange={this.handleChangeNoHp}
                                            value={this.state.nohp}
                                            className="form-control" placeholder="Masukkan No Telphone" min="1"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Email <sup>*</sup></label>
                                                <input type="email"
                                                onChange={this.handleChangeEmail}
                                                value={this.state.email}
                                                className="form-control" placeholder="Masukkan Email"/>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="input-group col-md-12">
                                                <label>Password <sup>*</sup></label>

                                                <div className="input-group">
                                                    <div className="input-group-prepend" title="Generate Password   " onClick={this.reloadPassword}>
                                                    <span className="input-group-text"><i className="fa fa-repeat"></i></span>
                                                    </div>
                                                    <input type="text"
                                                        onChange={this.handleChangePassword}
                                                        value={this.state.password}
                                                        className="form-control" placeholder="********"/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>No WA</label>
                                            <input type="number"
                                            onChange={this.handleChangeWa}
                                            value={this.state.wa}
                                            className="form-control" placeholder="(Optional)" min="1"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>Nama / Link FB</label>
                                            <input type="text"
                                            onChange={this.handleChangeFb}
                                            value={this.state.fb}
                                            className="form-control" placeholder="(Optional)"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>Nama / Link IG</label>
                                            <input type="text"
                                            onChange={this.handleChangeIg}
                                            value={this.state.ig}
                                            className="form-control" placeholder="(Optional)"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Nama / Link Twitter</label>
                                                <input type="text"
                                                onChange={this.handleChangeTwitter}
                                                value={this.state.twitter}
                                                className="form-control" placeholder="(Optional)"/>
                                            </div>
                                        </div>
                                <div className="col-md-6">
                                    <div className="form-group col-md-12">
                                        <label>Pilih Foto Warga</label>
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
                        </div>
                </div>

                <div className="card-footer col-12">
                        <button type="submit" className="btn btn-primary" id={this.state.lihatbtn} onClick={this.HandleTambahWarga('success')}>Tambahkan</button>
                        <span>  </span>
                        <button type="reset" className="btn btn-danger"  onClick={this.handleResetWarga}>Reset</button>
                    </div>

            </div>
        )
      }else{
        letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-success float-left" onClick={this.tambahwarga}><i className="fa fa-plus"></i> Tambah Warga</button>

           </div>
        )
      }


      if(tampilpage1 === 'block'){
          tampilstep = (

            <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                <div className="card-header">
                    <h3 className="card-title">Data KK (Step 1) </h3>
                </div>
                <div className="form-control">
                    <div className="card-body">
                    <div className="row">
                       
                            <div className="col-md-6">
                                <div className="form-group col-md-12">
                                    <label>No KK <sup>*</sup></label>

                                    <input type="number"
                                    onChange={this.handleChangeNo}
                                    value={this.state.nokk}
                                    className="form-control" placeholder="Masukkan No KK" min="1"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                    <div className="form-group col-md-12">
                                        <label>Pilih Kelurahan</label>
                                        <select className="form-control" value={this.state.kelurahan} onChange={this.handleChangeOptionKelurahan} style={{height: 3 + 'em'}}>
                                            <option value="">Pilih Kelurahan</option>
                                            {orderkelurahan.map(task => (
                                                <Listkelurahan key={task.key} task={task} />
                                            ))}
                                            </select>
                                    </div>
                            </div>
                            <div className="col-md-6">
                            <div className="form-group mb-12 col-12">
                                <label>Alamat <sup>*</sup></label>
                                <textarea className='form-control' placeholder="Masukkan Alamat Lengkap" onChange={this.handleChangeAlamat} value={this.state.alamat}></textarea>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer col-12">
                        <button type="submit" className="btn btn-primary float-right" onClick={this.notify('success')}>Step 2 <i className="fa fa-chevron-right"></i></button>
                        <span>  </span>
                        <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset Form</button>
                    </div>
                </div>
            </div>
          )
      }else if(tampilpage2 === 'block'){
        tampilstep = (
            <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                <div className="card-header">
                    <h3 className="card-title">Data Warga {this.state.nokk} (Step 2) </h3>
                </div>
                <div className="form-control">
                    <div className="card-body">

                    {datatmplist}
                       <br/>
                       <br/>
                       {letbtntambah}
                       {lettambahwarga}
                    </div>
                    <div className="card-footer col-12">
                        <button type="button" className="btn btn-primary float-left" onClick={this.handlePrevStep2}><i className="fa fa-chevron-left"></i>  Step 1</button>
                        <span>  </span>
                        <button type="button" className="btn btn-primary float-right"  onClick={(e) => this.handleNextStep2()}>Step 3  <i className="fa fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        )
    }else if(tampilpage3 === 'block'){
        tampilstep = (
<div className="card card-info" style={{marginTop: -1 + 'em'}}>
                <div className="card-header">
                    <h3 className="card-title">Pemilihan Kepala Keluarga (Step 3) </h3>
                </div>
                <div className="form-control">
                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6">
                                <div className="form-group col-md-12">
                                    <label>Pilih Kepala Keluarga</label>
                                    <select className="form-control" value={this.state.kepala} onChange={this.handleChangeOptionKepala} style={{height: 3 + 'em'}}>
                                            <option value="">Pilih Kepala Keluarga</option>
                                            {arraydatawargatmp.map(task => (
                                                <Listwargaselect key={task.key} task={task} />
                                            ))}
                                   </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer row">
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary" onClick={this.handlePrevStep3}><i className="fa fa-chevron-left"></i> Step 2</button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary float-right" onClick={this.handleSimpanSemua}><i className="fa fa-floppy-o"></i>  Simpan Semua Data</button>
                                    <span>  </span>
                                    <button type="reset" className="btn btn-danger float-right"  onClick={this.toggle}><i className="fa fa-trash"></i>  Reset Semua Data</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
       )
    }else if(tampilpage4 === 'block'){
       // tampilstep = (

        //)
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
                    <h1>Data KK</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/RT/Home">Home</a></li>
                    <li className="breadcrumb-item active">Add KK</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">

                           {tampilstep}


                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={2000}
                                    />

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data Yang Sudah Anda Input Akan Di Reset Ulang!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) => this.hapussemua()}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
                    </div>

                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default AddKK;
