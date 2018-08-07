import React from 'react';
import { rootRef, Pengumuman } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { toast } from 'react-toastify';

export default class ListPesan extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        modal3: false,
        search:'',
        nama: '', nik: '', tempatlahir: '', tgl_lahir:'', nohp: '', no_kk: '',
        pekerjaan: '', gender: '', email: '', status:'', fb: '', wa: '', ig: '', twitter: '', kunci: ''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
    }
    handleFilter = event => {
          this.setState({ search: event.target.value });
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
      toggle2(xkey, xnama, xnik, xtempatlahi, xtgl_lahir, xnohp, xno_kk, xpekerjaan, xgender, xemail, xstatus, xfb, xwa, xig, xtwitter) {
        this.setState({
            nama: xnama, nik: xnik, tempatlahir: xtempatlahi, tgl_lahir:xtgl_lahir, nohp: xnohp, no_kk: xno_kk,
        pekerjaan: xpekerjaan, gender: xgender, email: xemail, status:xstatus, fb: xfb, wa: xwa, ig: xig, twitter:xtwitter , kunci:xkey,
          modal2: !this.state.modal2
        });
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

    deleteTask = (kun) => {
        const { key } = this.props.task;
        Pengumuman.child(key).remove();  
        
      };

      notify(type, kunci){
        return () => {
                if (this.state.nama.length && this.state.nik.length) {
       
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
                    this.toggle2();
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;

    return (
        <tr>
        <td>{task.nama_pengirim}</td>
        <td>{task.nama_rw}</td>
        <td>{task.isi}</td>
        <td>{task.tanggal}</td>
        <td>
        <Button color="danger" onClick={this.toggle}>Delete</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data  {task.nik} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={() =>this.deleteTask(task.id_pengumuman)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>

        </td>
    </tr>
    );
  }
}
