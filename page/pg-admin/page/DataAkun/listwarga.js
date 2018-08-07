import React from 'react';
import { RefRW, rootRef, RefWarga } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        modal3: false,
        nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', no_kk: '',
        pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '', kunci: ''
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
      toggle2(xkey, xnama, xnik, xtempatlahi, xtgl_lahir, xnohp, xno_kk, xpekerjaan, xgender, xemail, xstatus, xfb, xwa, xig, xtwitter) {
        this.setState({
            nama: xnama, nik: xnik, tempatlahir: xtempatlahi, tgl_lahir:xtgl_lahir, nohp: xnohp, no_kk: xno_kk,
        pekerjaan: xpekerjaan, gender: xgender, email: xemail, status:xstatus, fb: xfb, wa: xwa, ig: xig, twitter:xtwitter , kunci:xkey,
          modal2: !this.state.modal2
        });
        console.log(this.state.kunci);
      }

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleChangeNik = event => {
        this.setState({ nik: event.target.value });
      };

      handleChangeTempatLahir = event => {
        this.setState({ tempatlahir: event.target.value });
      };
      handleChangeNoHp = event => {
        this.setState({ nohp: event.target.value });
      };

      handleChangeNoKK = event => {
        this.setState({ no_kk: event.target.value });
      };

      handleChangePekerjaan = event => {
        this.setState({ pekerjaan: event.target.value });
      };

      handleChangeGender = event => {
        this.setState({ gender: event.target.value });
      };

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });
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

    deleteTask = () => {
        const { key } = this.props.task;
        RefWarga.child(key).remove();
      };

      notify(type, kunci){
        return () => {
        const newTask = {
            nama: this.state.nama.trim(),
            nik: this.state.nik.trim(),
            tempatlahir: this.state.tempatlahir.trim(),
            tgl_lahir: this.state.tgl_lahir.trim(),
            nohp: this.state.nohp.trim(),
            no_kk: this.state.no_kk.trim(),
            pekerjaan: this.state.pekerjaan.trim(),
            gender: this.state.gender.trim(),
            email: this.state.email.trim(),
            status: this.state.status.trim(),
            fb: this.state.fb.trim(),
            wa: this.state.wa.trim(),
            ig: this.state.ig.trim(),
            twitter: this.state.twitter.trim()
        };
                if (newTask.nama.length && newTask.nik.length) {
                rootRef.child('WARGA').child(kunci).update({ nama: this.state.nama,
                    nik: this.state.nik, tempatlahir: this.state.tempatlahir,
                    tgl_lahir: this.state.tgl_lahir, nohp: this.state.nohp, no_kk: this.state.no_kk,
                    pekerjaan: this.state.pekerjaan, gender: this.state.gender,
                    email: this.state.email, status: this.state.status, twitter: this.state.twitter,
                    fb: this.state.fb, wa: this.state.wa, ig: this.state.ig  });
                this.setState({ nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', no_kk: '',
                pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: ''  });
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;

    return (
        <tr>
        <td>{task.no_kk}</td>
        <td>{task.nama}</td>
        <td>{task.nik}</td>
        <td>{task.gender}</td>
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
                                            <td>No KK</td>
                                            <td>{task.no_kk}</td>
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
                                            <td>Status Keluarga</td>
                                            <td>{task.status}</td>
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



            <Button color="primary" onClick={() => this.toggle2(task.key, task.nama, task.nik, task.tempatlahir, task.tgl_lahir, task.nohp, task.no_kk
                    , task.pekerjaan, task.gender, task.email, task.status, task.fb, task.wa, task.ig, task.twitter)}>Edit</Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2}  size="fluid">
                <ModalHeader toggle={this.toggle2}>
                            <h3>Update Data {task.nama}</h3>
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <form className="form-control">
                            <div className="card-body">

                                <div className="row col-12">
                                    <div className="form-group ">
                                        <label>Nama Warga</label>

                                        <input type="text"
                                        onChange={this.handleChangeNama}
                                        value={this.state.nama}
                                        className="form-control" placeholder="Masukkan Nama"/>
                                    </div>
                                    <div className="form-group  ">
                                        <label>No KK</label>

                                        <input type="number"
                                        onChange={this.handleChangeNoKK}
                                        value={this.state.no_kk}
                                        className="form-control" placeholder="Masukkan No KK" min="1"/>
                                    </div>

                                    <div className="form-group  ">
                                        <label>NIK</label>

                                        <input type="number"
                                        onChange={this.handleChangeNik}
                                        value={this.state.nik}
                                        className="form-control" placeholder="Masukkan NIK"/>
                                    </div>
                                    <div className="form-group  ">
                                        <label>Pekerjaan</label>

                                        <input type="text"
                                        onChange={this.handleChangePekerjaan}
                                        value={this.state.pekerjaan}
                                        className="form-control" placeholder="Masukkan Pekerjaan"/>
                                    </div>
                                    <div className="form-group  ">
                                        <label>Tempat Lahir</label>

                                        <input type="text"
                                        onChange={this.handleChangeTempatLahir}
                                        value={this.state.tempatlahir}
                                        className="form-control" placeholder="Masukkan Tempat Lahir"/>
                                    </div>
                                    <div className="form-group  ">
                                        <label>Tanggal Lahir</label>

                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                            </div>
                                            <input type="text" className="form-control"
                                            onChange={this.handleChangeTgl}
                                        value={this.state.tgl_lahir}
                                        data-inputmask="'alias': 'dd/mm/yyyy'" data-mask/>
                                        </div>
                                    </div>
                                    <div className="form-group  ">
                                        <label>Status Keluarga </label>
                                        <select className="form-control" value={this.state.status} onChange={this.handleChangeStatus}>
                                            <option value="">Pilih Status Keluarga</option>
                                            <option value="Ayah">Ayah</option>
                                            <option value="Istri">Istri</option>
                                            <option value="Anak">Anak</option>
                                            <option value="Kakek">Kakek</option>
                                            <option value="Nenek">Nenek</option>
                                        </select>
                                    </div>
                                    <div className="form-group  ">
                                        <label>Jenis Kelamin </label>
                                        <select className="form-control" value={this.state.gender} onChange={this.handleChangeGender}>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Laki-Laki">Laki-Laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                    <div className="form-group  ">
                                        <label>No Telphone</label>
                                        <input type="number"
                                        onChange={this.handleChangeNoHp}
                                        value={this.state.nohp}
                                        className="form-control" placeholder="Masukkan No Telphone" min="1"/>
                                    </div>
                                    <div className="form-group  ">
                                        <label>Email</label>
                                        <input type="text"
                                        onChange={this.handleChangeEmail}
                                        value={this.state.email}
                                        className="form-control" placeholder="Masukkan Email"/>
                                    </div>
                                    <div className="form-group  ">
                                        <label>No WA</label>
                                        <input type="number"
                                        onChange={this.handleChangeWa}
                                        value={this.state.wa}
                                        className="form-control" placeholder="Masukkan No WA" min="1"/>
                                    </div>
                                    <div className="form-group  ">
                                        <label>Nama / Link FB</label>
                                        <input type="text"
                                        onChange={this.handleChangeFb}
                                        value={this.state.fb}
                                        className="form-control" placeholder="(Optional)"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Nama / Link IG</label>
                                        <input type="text"
                                        onChange={this.handleChangeIg}
                                        value={this.state.ig}
                                        className="form-control" placeholder="(Optional)"/>
                                    </div>
                                    <div className="form-group">
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
                        </form>
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
                        <Button color="danger" onClick={this.deleteTask}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
