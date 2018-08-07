import React from 'react';
import { RefRW, rootRef, RefWarga, RefWargaTmp, RefUser, upRefWarga } from './../../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { toast } from 'react-toastify';
import RandomKata from 'randomstring';
export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        modal3: false,
        modal4: false,
        nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', no_kk: '',url:'',
        pekerjaan: '', gender: '', email: '', status:'', agama:'', fb: '', wa: '', ig: '', twitter: '', kunci: '',
        pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'', htgemail:0, htgnik:0, tmpemail: '', tmpnik: '',
        
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: ''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
      this.toggle4 = this.toggle4.bind(this);
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
    }
    handleUploadSuccess = (filename) => {
        // try{
        //     if(this.state.filename === ""){

        //     }else{
        //         upRefWarga.child(this.state.filename).delete().then(function() {

        //         })
        //     }
        // }catch(error){

        // }
        
      //localStorage.setItem("urlfotowarga", "");
    this.setState({avatar: filename, progress: 100, isUploading: false});
    upRefWarga.child(filename).getDownloadURL().then(function(url) {
      localStorage.setItem("urlfotowarga", url);
    }).catch(function(error) {

    console.log(error);
    })

    //this.setState({ avatarURL: localStorage.getItem("urlfotowarga")})
    };

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle3() {
        this.setState({
          modal3: !this.state.modal3
        });
      }
      toggle4() {
        this.setState({
          modal4: !this.state.modal4
        });
      }
      toggle2(xkey, xnama, xnik, xtempatlahi, xtgl_lahir, xnohp, xagama, xpekerjaan, xgender, xemail, xstatus, xfb, xwa, xig, xtwitter, xpendidikan, xstatusnikah, xkewarganegaraan, xnamaayah, xnamaibu, xurl) {
        this.setState({
            nama: xnama, nik: xnik, tmpemail: xemail, tmpnik: xnik, tempatlahir: xtempatlahi, tgl_lahir:xtgl_lahir, nohp: xnohp, agama: xagama,
        pekerjaan: xpekerjaan, gender: xgender, email: xemail, status:xstatus, fb: xfb, wa: xwa, ig: xig, twitter:xtwitter , kunci:xkey,
        pendidikan: xpendidikan, status_nikah: xstatusnikah, kewarganegaraan: xkewarganegaraan, namaayah: xnamaayah, namaibu: xnamaibu,
        urlfoto: xurl,
          modal2: !this.state.modal2
        });
      }

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };


      handleChangeNik = event => {
         // console.log(this.state.tmpnik)
        this.setState({ nik: event.target.value });
        localStorage.setItem("tmpnik", event.target.value);
        let hitung = 0;
        RefWarga.orderByChild("nik").equalTo(event.target.value).on('value', snap => {
          snap.forEach(shot => {
              if(shot.val().nik === this.state.tmpnik){

              }else{
            hitung++;
              }

          });
          if(hitung >= 1){
          this.setState({ htgnik: hitung});
          }else{
            this.setState({ htgnik: 0});
            
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
            snap.forEach(shot =>{
                if(shot.val().email === this.state.tmpemail){

                }else{
              hitung++;
                }
  
            });
            if(hitung >= 1){
            this.setState({ htgemail: hitung});
            }else{
              this.setState({ htgemail: 0});
              
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


      deleteTask = (txtemail, txtfile) => {
          try{
        const { key, nik } = this.props.task;
        RefWarga.child(key).remove();
        upRefWarga.child(txtfile).delete().then(function() {

        })
        rootRef.child('User').orderByChild("nik").equalTo(nik).on('value', snap => {
            const tasks = [];
            snap.forEach(shot => {
              tasks.push({ ...shot.val(), key: shot.key });
             
              rootRef.child('User').child(shot.key).remove();
            });
        });
    }catch(error){

    }

      };

      EditFoto = (txtkunci, txtfile) => {
        try{
      const { key } = this.props.task;
      //RefWarga.child(key).remove();
     RefWarga.child(txtkunci).update({
        urlfoto : localStorage.getItem("urlfotowarga"),
        filename : this.state.avatar});
        localStorage.setItem("urlfotowarga", "")
        this.setState({ avatar:"", progress:0})
        toast.success('Foto Berhasil Di Update', {
            position: toast.POSITION.TOP_RIGHT,
        });
        this.toggle4();
      upRefWarga.child(txtfile).delete().then(function() {

      })
  }catch(error){
    RefWarga.child(txtkunci).update({
        urlfoto : localStorage.getItem("urlfotowarga"),
        filename : this.state.avatar});
        localStorage.setItem("urlfotowarga", "")
        this.setState({ avatar:"", progress:0})
        toast.success('Foto Berhasil Di Update', {
            position: toast.POSITION.TOP_RIGHT,
        });
  }

    };
      notify(type, kunci){
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
          }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
            toast.warn('Email tidak valid', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.password === ""){
            toast.warn('Password tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
                    if(this.state.htgemail >= 1){
                        
                    toast.warn('Email Yang anda masukkan telah di pakai!!');
                    }else if(this.state.htgnik >= 1){
                        
                        toast.warn('NIK Yang anda masukkan telah di pakai!!');
                        }else{
                            
                RefWarga.child(kunci).update({ nama: this.state.nama,
                    nik: this.state.nik, tempatlahir: this.state.tempatlahir,
                    pendidikan: this.state.pendidikan,
                    status_nikah: this.state.status_nikah,
                    kewarganegaraan: this.state.kewarganegaraan,
                    namaayah: this.state.namaayah,
                    namaibu: this.state.namaibu,
                    tgl_lahir: this.state.tgl_lahir, nohp: this.state.nohp, agama: this.state.agama,
                    pekerjaan: this.state.pekerjaan, gender: this.state.gender,
                    email: this.state.email, status: this.state.status, twitter: this.state.twitter,
                    fb: this.state.fb, wa: this.state.wa, ig: this.state.ig });

                    if(this.state.nik != this.state.tmpnik){
                        RefUser.orderByChild("nik").equalTo(this.state.tmpnik).on('value', snap => {
                            snap.forEach(shot => {
                                RefUser.child(shot.key).update({ nik: localStorage.getItem("tmpnik")})
                                //console.log("niknya ", shot.val())
                            });
                          });
                    }else{

                    }
                    this.toggle2()
                this.setState({ nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', agama: '',
                pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '',
                pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:''  });
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
            };
        };
  render() {
    const { task } = this.props;
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>{task.nik}</td>
        <td>{task.gender}</td>
        <td>{task.status}</td>
        <td>
        <Button color="success" onClick={this.toggle4} title="Ganti Foto"><i className="fa fa-camera"></i></Button>
        
        <Modal isOpen={this.state.modal4} toggle={this.toggle4}>
                    <ModalHeader toggle={this.toggle4}>Edit Foto {task.nama}</ModalHeader>
                    <ModalBody>
                    <div className="form-group row col-md-12">
                                        <div className="form-group col-md-6">
                                            <label>Pilih Foto</label>
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
                                                    Pilih Foto
                                                    </CustomUploadButton>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Proses Upload</label>
                                          {this.state.isUploading &&
                                          
                                                <p>Upload: {this.state.progress} %</p>
                                                }
                                                {!this.state.isUploading && this.state.progress >= 100 &&
                                                   <div className="alert alert-success col-md-8" role="alert">
                                                   Upload Selesai
                                                    </div>
                                                }

                                        </div>
                                    </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle4}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) => this.EditFoto(task.key, task.filename)}>Simpan</Button>
                    </ModalFooter>
                </Modal>
        <span>  </span>
        <Button color="success" onClick={this.toggle3}><i className="fa fa-list"></i></Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3} frame position="top">
                <ModalHeader toggle={this.toggle3}>
                            <h3 className="card-title">Biodata  {task.nama}</h3>
                </ModalHeader>
                <ModalBody>
                <div className="card-body">
                                <div className="col-12">
                                    <div className="row col-12">
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                        
                                        <div className="widget-user-image" align="center">
                                            <img src={task.urlfoto} style={{ width: 6+'em', height: 6+'em'}} className="img-responsive"/>
                                        </div>
                                        </div>
                                        <div className="col-md-4">
                                        </div>

                                    </div>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Nama</td>
                                            <td>{task.nama}</td>
                                        </tr>
                                        <tr>
                                            <td>NIK</td>
                                            <td>{task.nik}</td>
                                        </tr>
                                        <tr>
                                            <td>Agama</td>
                                            <td>{task.agama}</td>
                                        </tr>
                                        <tr>
                                            <td>TTL</td>
                                            <td>{task.tempatlahir}{', '}{task.tgl_lahir}</td>
                                        </tr>
                                        <tr>
                                            <td>Jenis kelamin</td>
                                            <td>{task.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Pekerjaan</td>
                                            <td>{task.pekerjaan}</td>
                                        </tr>
                                        <tr>
                                            <td>Pendidikan</td>
                                            <td>{task.pendidikan}</td>
                                        </tr>
                                        <tr>
                                            <td>status Pernikahan</td>
                                            <td>{task.status_nikah}</td>
                                        </tr>
                                        <tr>
                                            <td>Kewarganegaraan</td>
                                            <td>{task.kewarganegaraan}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Ayah</td>
                                            <td>{task.namaayah}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Ibu</td>
                                            <td>{task.namaibu}</td>
                                        </tr>
                                        <tr>
                                            <td>Status Keluarga</td>
                                            <td>{task.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{task.email}</td>
                                        </tr>
                                        <tr>
                                            <td>No Telephone</td>
                                            <td>{task.nohp}</td>
                                        </tr>
                                        <tr>
                                            <td>No WA</td>
                                            <td>{task.wa}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama / Link FB</td>
                                            <td>{task.fb}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama / Link IG</td>
                                            <td>{task.ig}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama / Link Twitter</td>
                                            <td>{task.twitter}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" onClick={this.toggle3}>Tutup</Button>{' '}
                    </ModalFooter>
                </Modal>
                <span>  </span>



            <Button color="primary" onClick={() => this.toggle2(task.key, task.nama, task.nik, task.tempatlahir, task.tgl_lahir, task.nohp, task.agama
                    , task.pekerjaan, task.gender, task.email, task.status, task.fb, task.wa, task.ig, task.twitter,
                    task.pendidikan, task.status_nikah, task.kewarganegaraan, task.namaayah, task.namaibu, task.urlfoto)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2}  size="fluid">
                <ModalHeader toggle={this.toggle2}>
                            <h3>Update Data {task.nama}</h3>
                        
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                            <div className="card-body">

                                <div className="row col-12">
                                    <div className="form-group col-md-12">
                                        <label>Nama Warga <sup>*</sup></label>

                                        <input type="text"
                                        onChange={this.handleChangeNama}
                                        value={this.state.nama}
                                        className="form-control" placeholder="Masukkan Nama"/>
                                    </div>

                                    <div className="form-group  col-md-12">
                                        <label>NIK <sup>*</sup></label>

                                        <input type="number"
                                        onChange={this.handleChangeNik}
                                        value={this.state.nik}
                                        className="form-control" placeholder="Masukkan NIK"/>
                                    </div>
                                    <div className="form-group  col-md-12">
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
                                    <div className="form-group  col-md-12">
                                        <label>Tempat Lahir <sup>*</sup></label>

                                        <input type="text"
                                        onChange={this.handleChangeTempatLahir}
                                        value={this.state.tempatlahir}
                                        className="form-control" placeholder="Masukkan Tempat Lahir"/>
                                    </div>
                                    <div className="input-group  col-md-12">
                                        <label>Tanggal Lahir <sup>*</sup></label>

                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                            </div>
                                            <input type="date" className="form-control"
                                            onChange={this.handleChangeTgl}
                                        value={this.state.tgl_lahir}/>
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <label>Status Keluarga  <sup>*</sup></label>
                                        <select className="form-control"  style={{height: 3 + 'em'}} value={this.state.status} onChange={this.handleChangeStatus}>
                                            <option value="">Pilih Status Keluarga</option>
                                                    <option value="Kepala Keluarga">Kepala Keluarga</option>
                                            <option value="Ayah">Ayah</option>
                                            <option value="Istri">Istri</option>
                                            <option value="Anak">Anak</option>
                                            <option value="Kakek">Kakek</option>
                                            <option value="Nenek">Nenek</option>
                                        </select>
                                    </div>

                                    
                                            <div className="form-group col-md-12">
                                                <label>Agama <sup>*</sup> </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.agama} onChange={this.handleChangeAgama}>
                                                    <option value="">Pilih Agama</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Kristen">Kristen</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Budha">Budha</option>
                                                    <option value="Konghuchu">Konghuchu</option>
                                                </select>
                                            </div>

                                    <div className="form-group col-md-12 ">
                                        <label>Jenis Kelamin <sup>*</sup> </label>
                                        <select className="form-control" style={{height: 3 + 'em'}} value={this.state.gender} onChange={this.handleChangeGender}>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Laki-Laki">Laki-Laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>

                                            <div className="form-group col-md-12">
                                                <label>Pendidikan <sup>*</sup> </label>
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
                                            
                                            <div className="form-group col-md-12">
                                                <label>Status Pernikahan <sup>*</sup> </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.status_nikah} onChange={this.handleChangeStatusNikah}>
                                                    <option value="">Pilih Status Pernikahan</option>
                                                    <option value="Sudah Menikah">Sudah Menikah</option>
                                                    <option value="Belum Menikah">Belum Menikah</option>
                                                </select>
                                            </div>
                                            
                                            <div className="form-group col-md-12">
                                                <label>Kewarganegaraan  <sup>*</sup></label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.kewarganegaraan} onChange={this.handleChangeKewarganegaraan}>
                                                    <option value="">Pilih Kewarganegaraan</option>
                                                    <option value="WNI">WNI</option>
                                                    <option value="WNA">WNA</option>
                                                </select>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label>Nama Ayah <sup>*</sup></label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaAyah}
                                                value={this.state.namaayah}
                                                className="form-control" placeholder="Masukkan Nama Ayah"/>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label>Nama Ibu <sup>*</sup></label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaIbu}
                                                value={this.state.namaibu}
                                                className="form-control" placeholder="Masukkan Nama ibu"/>
                                            </div>



                                    <div className="form-group col-md-12">
                                        <label>No Telphone <sup>*</sup></label>
                                        <input type="number"
                                        onChange={this.handleChangeNoHp}
                                        value={this.state.nohp}
                                        className="form-control" placeholder="Masukkan No Telphone" min="1" maxLength="13"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Email <sup>*</sup></label>
                                        <input type="text"
                                        onChange={this.handleChangeEmail}
                                        value={this.state.email}
                                        className="form-control" placeholder="Masukkan Email"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>No WA</label>
                                        <input type="number"
                                        onChange={this.handleChangeWa}
                                        value={this.state.wa}
                                        className="form-control" placeholder="(Optional)" min="1"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Nama / Link FB</label>
                                        <input type="text"
                                        onChange={this.handleChangeFb}
                                        value={this.state.fb}
                                        className="form-control" placeholder="(Optional)"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Nama / Link IG</label>
                                        <input type="text"
                                        onChange={this.handleChangeIg}
                                        value={this.state.ig}
                                        className="form-control " placeholder="(Optional)"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Nama / Link Twitter</label>
                                        <input type="text"
                                        onChange={this.handleChangeTwitter}
                                        value={this.state.twitter}
                                        className="form-control" placeholder="(Optional)"/>
                                    </div>

                                </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success', this.state.kunci)}>Update</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.toggle2}>Batal</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                </Modal>
            <span>  </span>
                <Button color="danger" onClick={this.toggle}><i className="fa fa-trash"></i></Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data  {task.nama} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) => this.deleteTask(task.email, task.filename)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>

        </td>
    </tr>
    );
  }
}
