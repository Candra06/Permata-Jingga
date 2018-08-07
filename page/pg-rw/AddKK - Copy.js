import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataRT from "./page/DataRT/selectrt/daftarrt";
import DataWarga from "./page/DataWarga/datatmp/daftarwarga";
import SelectDataWarga from "./page/DataWarga/selectdatatmp/daftarwarga";
import Daftarkelurahan from "./page/DataKelurahan/selectkelurahan/daftarkelurahan";
import { rootRef, RefKK, RefRW, RefWargaTmp, RefWarga, RefUser, RefDataKK, upRefWarga } from '../../db';
import { Action } from "../../Action";
import RandomKata from 'randomstring';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
class AddKK extends Component {

    constructor(props) {
        super(props);
        this.state = { nokk: '',addwarga:false, kodetmp:'', kepala: '', cek: true, alamat:'', htgnokk: 0, tampilpage1:'block',
        tampilpage2:'hide',
        tampilpage3:'hide',
        tampilpage4:'hide',
        modal: false,
        nama: '', password:'', nik: '', showalert: 'hide', showalertnik: 'hide', lihatbtn: '',
        teksalert:'', tempatlahir: '', tgl_lahir:'', nohp: '',
        pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '', agama: '',
        pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'',
        
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: ''       
        };
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
        if(localStorage.getItem("kodetmp") === ""){
          let kod = RandomKata.generate(10);
            this.setState({kodetmp:kod});
            console.log(kod)
            localStorage.setItem("kodetmp", kod);
            console.log(localStorage.getItem("kodetmp"))
            localStorage.setItem("kodetmp", kod);
            localStorage.setItem("DataRT", "");
            localStorage.setItem("DataRW", "");
            localStorage.setItem("DataKelurahan", "");

            }else{
                this.setState({
                    kodetmp: localStorage.getItem("kodetmp"),
                    nokk: localStorage.getItem("tmpnokk"),
                    alamat: localStorage.getItem("tmpalamat")

                })
            }

            RefDataKK.on('value', snap => {
                snap.forEach(shot => {
                    localStorage.setItem("DataKec", shot.val().kecamatan);
                    localStorage.setItem("DataKab", shot.val().kabupaten);
                    localStorage.setItem("DataProv", shot.val().provinsi);
                    localStorage.setItem("DataPos", shot.val().kodepos);

                });
              });
              console.log(localStorage.getItem("koderw"))
            RefRW.orderByChild("no").equalTo(localStorage.getItem("koderw")).on('value', snap =>{
                const tasks = [];
                snap.forEach(shot => {
                    tasks.push({ ...shot.val(), key: shot.key})
                });
                this.setState({tasks, taskLoading: false, idrw: localStorage.getItem("DataRW")});
            })
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

      handleChangeKepala = event => {
        this.setState({ kepala: event.target.value });
      };
      handleChangeAlamat = event =>{
        this.setState({ alamat: event.target.value });
        localStorage.setItem("tmpalamat", event.target.value);
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nokk: '', kepala: '', alamat:'' });
        localStorage.setItem("tmpnokk", "");
        //localStorage.setItem("kodetmp", "");
        localStorage.setItem("tmpalamat", "");
        localStorage.setItem("DataRT", "");
        window.location.reload();
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
                fb: this.state.fb.trim(),
                wa: this.state.wa.trim(),
                ig: this.state.ig.trim(),
                twitter: this.state.twitter.trim(),
                nik: this.state.nik.trim(),
                password:this.state.password,
                level:'Warga',
                urlfoto:localStorage.getItem("urlfotowarga"),
                filename: this.state.avatar
              };
              if (htg.nama.length && htg.nik.length && htg.agama.length && htg.nohp.length && htg.gender.length && htg.agama.length && htg.email.length && htg.password.length) {
                RefWargaTmp.push(htg);
                //rootRef.child('UserTMP').push(akundata);
                this.setState({ addwarga: !this.state.addwarga});
                this.setState({ nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', agama: '',
        pekerjaan: '', gender: '', email: '', status:'',password:'', fb: '', wa: '', ig: '', twitter: '',
        pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'', progress:0  });
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
        };
      };


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

      handleNextStep2 = event => {
        this.setState({  tampilpage1:'hide',
        tampilpage2:'hide',
        tampilpage3:'block',
        tampilpage4:'hide' });
      }

      tambahwarga = event =>{
          this.setState({ addwarga: !this.state.addwarga});
      }
      notify(type){
        return () => {
            const htg = {
                kd_kk:this.state.kodetmp,
                nokk: this.state.nokk.trim(),
                kepala: localStorage.getItem("KepalaKK"),
                idrt: localStorage.getItem("DataRT"),
                idrw: localStorage.getItem("koderw"),
                alamat:this.state.alamat.trim(),
              };

              if (htg.nokk.length && localStorage.getItem("DataRT").length) {
                if(this.state.htgnokk >= 1){

                    toast.warn('No KK anda masukkan sudah di pakai!!!', {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  }else{
                //rootRef.child('TMPKK').push(htg);
                //this.setState({nokk: '', jml: '' });
                //localStorage.setItem("DataRW", "");
               // localStorage.setItem("DataRT", "");
            //    toast.success('Data Berhasil Di Simpan', {
            //    position: toast.POSITION.TOP_RIGHT,
            //  });

              this.setState({ tampilpage1: 'hide',
              tampilpage2:'block',
              tampilpage3:'hide',
              tampilpage4:'hide'})
            }
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }

        };
      };


      handleSimpanSemua = event => {
            //console.log("gogogogogo");
          if(localStorage.getItem("KepalaKK") === ""){
            toast.warn('Form Masih ada yang kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
            const htg = {
                kd_kk:this.state.kodetmp,
                nokk: this.state.nokk.trim(),
                kepala: localStorage.getItem("KepalaKK"),
                idrt: localStorage.getItem("DataRT"),
                idrw: localStorage.getItem("koderw"),
                alamat:this.state.alamat.trim(),
                kelurahan: localStorage.getItem("DataKelurahan"),
                kecamatan : localStorage.getItem("DataKec"),
                kabupaten :   localStorage.getItem("DataKab"),
                provinsi :  localStorage.getItem("DataProv"),
                kodepos :   localStorage.getItem("DataPos")
              };
              rootRef.child('KK').push(htg);

              RefWargaTmp.orderByChild("kodetmp").equalTo(localStorage.getItem("kodetmp")).on('value', snap => {
                const tasks = [];
                snap.forEach(shot => {
                  tasks.push({ ...shot.val(), key: shot.key });
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
                    filename: shot.val().filename
                  }
                  const setakun = {
                    kd_user:RandomKata.generate(10),
                    email: shot.val().email,
                    nik:shot.val().nik,
                    password:shot.val().password,
                    level:shot.val().level
                  }
                  let hitung = 0;
                    RefWarga.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                    snap.forEach(shot => {
                        hitung++;
                    });
                    if(hitung >= 1){

                    }else{

                    rootRef.child('WARGA').push(datawargadua);
                    rootRef.child('User').push(setakun);
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
                    pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'',
                    tampilpage1:'block',
                    tampilpage2:'hide',
                    tampilpage3:'hide',
                    tampilpage4:'hide'   });
                    localStorage.setItem("tmpnokk", "");

                    localStorage.setItem("kodetmp", "");
                    localStorage.setItem("tmpalamat", "");
                    localStorage.setItem("DataRW", "");
                    localStorage.setItem("DataRT", "");
            localStorage.setItem("KepalaKK", "")
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
                tampilpage4:'hide'   });
                localStorage.setItem("tmpnokk", "");

                localStorage.setItem("kodetmp", "");
                localStorage.setItem("tmpalamat", "");
                localStorage.setItem("DataRW", "");
                localStorage.setItem("DataRT", "");
        localStorage.setItem("KepalaKK", "")
        window.location.reload();
      }
  render() {
      const {tampilpage1, tampilpage2, tampilpage3, tampilpage4} = this.state;
      let tampilstep;
      let lettambahwarga, letbtntambah;
      const{ showalert, teksalert, showalertnik } = this.state;
      let cekalert;
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
                                                <label>Nama Warga</label>

                                                <input type="text"
                                                onChange={this.handleChangeNama}
                                                value={this.state.nama}
                                                className="form-control" placeholder="Masukkan Nama"/>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>NIK</label>

                                            <input type="number"
                                            onChange={this.handleChangeNik}
                                            value={this.state.nik}
                                            className="form-control" placeholder="Masukkan NIK"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Pekerjaan </label>
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
                                            <label>Tempat Lahir</label>

                                            <input type="text"
                                            onChange={this.handleChangeTempatLahir}
                                            value={this.state.tempatlahir}
                                            className="form-control" placeholder="Masukkan Tempat Lahir"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>Tanggal Lahir</label>

                                            <div className="input-group">
                                                <input type="date" onChange={this.handleChangeTgl} value={this.state.tgl_lahir} className="form-control"/>
                                            </div>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Status Keluarga </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.status} onChange={this.handleChangeStatus}>
                                                    <option value="">Pilih Status Keluarga</option>
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
                                                <label>Agama </label>
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
                                                <label>Jenis Kelamin </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.gender} onChange={this.handleChangeGender}>
                                                    <option value="">Pilih Jenis Kelamin</option>
                                                    <option value="Laki-Laki">Laki-Laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Pendidikan </label>
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
                                                <label>Status Pernikahan </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.status_nikah} onChange={this.handleChangeStatusNikah}>
                                                    <option value="">Pilih Status Pernikahan</option>
                                                    <option value="Sudah Menikah">Sudah Menikah</option>
                                                    <option value="Belum Menikah">Belum Menikah</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Kewarganegaraan </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.kewarganegaraan} onChange={this.handleChangeKewarganegaraan}>
                                                    <option value="">Pilih Kewarganegaraan</option>
                                                    <option value="WNI">WNI</option>
                                                    <option value="WNA">WNA</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Nama Ayah</label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaAyah}
                                                value={this.state.handleChangeNamaAyah}
                                                className="form-control" placeholder="(Optional)"/>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Nama Ibu</label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaIbu}
                                                value={this.state.namaibu}
                                                className="form-control" placeholder="(Optional)"/>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                            <label>No Telphone</label>
                                            <input type="number"
                                            onChange={this.handleChangeNoHp}
                                            value={this.state.nohp}
                                            className="form-control" placeholder="Masukkan No Telphone" min="1"/>
                                        </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group col-md-12">
                                                <label>Email</label>
                                                <input type="text"
                                                onChange={this.handleChangeEmail}
                                                value={this.state.email}
                                                className="form-control" placeholder="Masukkan Email"/>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="input-group col-md-12">
                                                <label>Password</label>

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
                                            className="form-control" placeholder="Masukkan No WA" min="1"/>
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
                                <label>Pilih RT</label>

                                <DataRT/>
                            </div>
                        </div>

                            <div className="col-md-6">
                                <div className="form-group col-md-12">
                                    <label>No KK</label>

                                    <input type="number"
                                    onChange={this.handleChangeNo}
                                    value={this.state.nokk}
                                    className="form-control" placeholder="Masukkan No KK" min="1"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                    <div className="form-group col-md-12">
                                        <label>Pilih Kelurahan</label>
                                        <Daftarkelurahan/>
                                    </div>
                            </div>
                            <div className="col-md-6">
                            <div className="form-group mb-12 col-12">
                                <label>Alamat</label>
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

                    <DataWarga/>
                       <br/>
                       <br/>
                       {letbtntambah}
                       {lettambahwarga}
                    </div>
                    <div className="card-footer col-12">
                        <button type="button" className="btn btn-primary float-left" onClick={this.handlePrevStep2}><i className="fa fa-chevron-left"></i>  Step 1</button>
                        <span>  </span>
                        <button type="button" className="btn btn-primary float-right"  onClick={this.handleNextStep2}>Step 3  <i className="fa fa-chevron-right"></i></button>
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
                                    <label>Pilih Kepala KK</label>
                                    <SelectDataWarga/>
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
                    <li className="breadcrumb-item"><a href="/Admin/Home">Home</a></li>
                    <li className="breadcrumb-item active">Data KK</li>
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
