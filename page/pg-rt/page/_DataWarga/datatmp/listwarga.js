import React from 'react';
import { RefRW, rootRef, RefWarga, RefWargaTmp, RefUser } from './../../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { toast } from 'react-toastify';
export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        modal3: false,
        nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', no_kk: '',password:'',
        pekerjaan: '', gender: '', email: '', status:'', agama:'', fb: '', wa: '', ig: '', twitter: '', kunci: '',
        pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'', htgemail:0, htgnik:0, tmpemail: '', tmpnik: ''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
    }

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
      toggle2(xkey, xnama, xnik, xtempatlahi, xtgl_lahir, xnohp, xagama, xpekerjaan, xgender, xemail, xstatus, xfb, xwa, xig, xtwitter, xpendidikan, xstatusnikah, xkewarganegaraan, xnamaayah, xnamaibu, xpassword) {
        this.setState({
            nama: xnama, nik: xnik, tmpemail: xemail, tmpnik: xnik, tempatlahir: xtempatlahi, tgl_lahir:xtgl_lahir, nohp: xnohp, agama: xagama,
        pekerjaan: xpekerjaan, gender: xgender, email: xemail, status:xstatus, fb: xfb, wa: xwa, ig: xig, twitter:xtwitter , kunci:xkey,
        pendidikan: xpendidikan, status_nikah: xstatusnikah, kewarganegaraan: xkewarganegaraan, namaayah: xnamaayah, namaibu: xnamaibu, password: xpassword,
          modal2: !this.state.modal2
        });
      }

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleChangePassword = event => {
        this.setState({ password: event.target.value });
      };

      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
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


      deleteTask = (txtemail) => {
        const { key } = this.props.task;
        RefWargaTmp.child(key).remove();

        rootRef.child('UserTMP').orderByChild("email").equalTo(txtemail).on('value', snap => {
            const tasks = [];
            snap.forEach(shot => {
              tasks.push({ ...shot.val(), key: shot.key });
             
              rootRef.child('UserTMP').child(shot.key).remove();
            });
        });

      };

      notify(type, kunci){
        return () => {
        const newTask = {
            nama: this.state.nama.trim(),
            nik: this.state.nik.trim(),
            tempatlahir: this.state.tempatlahir.trim(),
            tgl_lahir: this.state.tgl_lahir.trim(),
            nohp: this.state.nohp.trim(),
            agama: this.state.agama.trim(),
            pekerjaan: this.state.pekerjaan.trim(),
            gender: this.state.gender.trim(),
            pendidikan: this.state.pendidikan.trim(),
            status_nikah: this.state.status_nikah.trim(),
            kewarganegaraan: this.state.kewarganegaraan.trim(),
            namaayah: this.state.namaayah.trim(),
            namaibu: this.state.namaibu.trim(),
            email: this.state.email.trim(),
            status: this.state.status.trim(),
            fb: this.state.fb.trim(),
            wa: this.state.wa.trim(),
            ig: this.state.ig.trim(),
            twitter: this.state.twitter.trim(),
            password: this.state.password.trim()
        };
                if (newTask.nama.length && newTask.nik.length && newTask.nohp.length && newTask.email.length && newTask.password.length) {
                    if(this.state.htgemail >= 1){
                        
                    toast.warn('Email Yang anda masukkan telah di pakai!!');
                    }else if(this.state.htgnik >= 1){
                        
                        toast.warn('NIK Yang anda masukkan telah di pakai!!');
                        }else{
                RefWargaTmp.child(kunci).update({ nama: this.state.nama,
                    nik: this.state.nik, tempatlahir: this.state.tempatlahir,
                    pendidikan: this.state.pendidikan,
                    status_nikah: this.state.status_nikah,
                    kewarganegaraan: this.state.kewarganegaraan,
                    namaayah: this.state.namaayah,
                    namaibu: this.state.namaibu,
                    tgl_lahir: this.state.tgl_lahir, nohp: this.state.nohp, agama: this.state.agama,
                    pekerjaan: this.state.pekerjaan, gender: this.state.gender,
                    email: this.state.email, status: this.state.status, twitter: this.state.twitter,
                    fb: this.state.fb, wa: this.state.wa, ig: this.state.ig, password: this.state.password });
                    this.toggle2()
                this.setState({ nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', agama: '',
                pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '',
                pendidikan:'', status_nikah:'', kewarganegaraan:'', namaayah:'', namaibu:'', password:''  });
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;
    return (
        <tr>
        <td>{task.nama}</td>
        <td>{task.nik}</td>
        <td>{task.gender}</td>
        <td>{task.status}</td>
        <td>
        <Button color="success" onClick={this.toggle3}>Lihat Data</Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3} frame position="top">
                <ModalHeader toggle={this.toggle3}>
                <div className="card-header card-info">
                            <h3 className="card-title">Biodata  {task.nama}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">

                        <form role="form">
                            <div className="card-body">
                                <div className="row col-12">
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
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" onClick={this.toggle3}>Batal</Button>{' '}
                    </ModalFooter>
                </Modal>
                <span>  </span>



            <Button color="primary" onClick={() => this.toggle2(task.key, task.nama, task.nik, task.tempatlahir, task.tgl_lahir, task.nohp, task.agama
                    , task.pekerjaan, task.gender, task.email, task.status, task.fb, task.wa, task.ig, task.twitter,
                    task.pendidikan, task.status_nikah, task.kewarganegaraan, task.namaayah, task.namaibu, task.password)}>Edit</Button>
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
                                        <label>Nama Warga</label>

                                        <input type="text"
                                        onChange={this.handleChangeNama}
                                        value={this.state.nama}
                                        className="form-control" placeholder="Masukkan Nama"/>
                                    </div>

                                    <div className="form-group  col-md-12">
                                        <label>NIK</label>

                                        <input type="number"
                                        onChange={this.handleChangeNik}
                                        value={this.state.nik}
                                        className="form-control" placeholder="Masukkan NIK"/>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <label>Pekerjaan</label>

                                        <input type="text"
                                        onChange={this.handleChangePekerjaan}
                                        value={this.state.pekerjaan}
                                        className="form-control" placeholder="Masukkan Pekerjaan"/>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <label>Tempat Lahir</label>

                                        <input type="text"
                                        onChange={this.handleChangeTempatLahir}
                                        value={this.state.tempatlahir}
                                        className="form-control" placeholder="Masukkan Tempat Lahir"/>
                                    </div>
                                    <div className="input-group  col-md-12">
                                        <label>Tanggal Lahir</label>

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
                                        <label>Status Keluarga </label>
                                        <select className="form-control"  style={{height: 3 + 'em'}} value={this.state.status} onChange={this.handleChangeStatus}>
                                            <option value="">Pilih Status Keluarga</option>
                                            <option value="Ayah">Ayah</option>
                                            <option value="Istri">Istri</option>
                                            <option value="Anak">Anak</option>
                                            <option value="Kakek">Kakek</option>
                                            <option value="Nenek">Nenek</option>
                                        </select>
                                    </div>

                                    
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

                                    <div className="form-group col-md-12 ">
                                        <label>Jenis Kelamin </label>
                                        <select className="form-control" style={{height: 3 + 'em'}} value={this.state.gender} onChange={this.handleChangeGender}>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Laki-Laki">Laki-Laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>

                                            <div className="form-group col-md-12">
                                                <label>Pendidikan </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.pendidikan} onChange={this.handleChangePendidikan}>
                                                    <option value="">Pilih Pendidikan</option>
                                                    <option value="SD">SD</option>
                                                    <option value="SMP">SMP</option>
                                                    <option value="SMA">SMA</option>
                                                    <option value="D3">D3</option>
                                                    <option value="S1">S1</option>
                                                    <option value="S2">S2</option>
                                                </select>
                                            </div>
                                            
                                            <div className="form-group col-md-12">
                                                <label>Status Pernikahan </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.status_nikah} onChange={this.handleChangeStatusNikah}>
                                                    <option value="">Pilih Status Pernikahan</option>
                                                    <option value="Sudah Menikah">Sudah Menikah</option>
                                                    <option value="Belum Menikah">Belum Menikah</option>
                                                </select>
                                            </div>
                                            
                                            <div className="form-group col-md-12">
                                                <label>Kewarganegaraan </label>
                                                <select className="form-control" style={{height: 3 + 'em'}} value={this.state.kewarganegaraan} onChange={this.handleChangeKewarganegaraan}>
                                                    <option value="">Pilih Kewarganegaraan</option>
                                                    <option value="WNI">WNI</option>
                                                    <option value="WNA">WNA</option>
                                                </select>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label>Nama Ayah</label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaAyah}
                                                value={this.state.namaayah}
                                                className="form-control" placeholder="(Optional)"/>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label>Nama Ibu</label>
                                                <input type="text"
                                                onChange={this.handleChangeNamaIbu}
                                                value={this.state.namaibu}
                                                className="form-control" placeholder="(Optional)"/>
                                            </div>



                                    <div className="form-group col-md-12">
                                        <label>No Telphone</label>
                                        <input type="number"
                                        onChange={this.handleChangeNoHp}
                                        value={this.state.nohp}
                                        className="form-control" placeholder="Masukkan No Telphone" min="1"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Email</label>
                                        <input type="text"
                                        onChange={this.handleChangeEmail}
                                        value={this.state.email}
                                        className="form-control" placeholder="Masukkan Email"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Password Akun</label>
                                        <input type="password"
                                        onChange={this.handleChangePassword}
                                        value={this.state.password}
                                        className="form-control" placeholder="Masukkan Password"/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>No WA</label>
                                        <input type="number"
                                        onChange={this.handleChangeWa}
                                        value={this.state.wa}
                                        className="form-control" placeholder="Masukkan No WA" min="1"/>
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
                <Button color="danger" onClick={this.toggle}>Delete</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data  {task.nama} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) => this.deleteTask(task.email)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
