import React from 'react';
import { RefRW, rootRef, RefWarga } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
export default class ListWargaPengajuan extends React.Component {
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
    var nama = task.nama
    return (
        <tr>
        <td>{task.no_kk}</td>
        <td>{task.nama}</td>
        <td>{task.nik}</td>
        <td>{task.gender}</td>
        <td>
                <span>  </span>

            <a href={"http://localhost/wargaku/apps/suratDomisili?nama_pemohon="+nama+"&tempat_lahir="+task.tempatlahir+"&tanggal_lahir="+task.tgl_lahir+"&jenis_kelamin="+task.gender+"&nik="+task.nik+"&no_kk="+task.no_kk} target="_blank"><Button color="primary">Cetak Surat</Button></a>
        </td>
    </tr>
    );
  }
}
