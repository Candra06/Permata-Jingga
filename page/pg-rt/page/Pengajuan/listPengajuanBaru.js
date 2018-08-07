import React from 'react';
import { rootRef, RefWarga, RefKK, RefPengajuan, timeRef } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import { Action } from "./../../../../Action";
export default class ListPengajuanBaru extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        nokk: '', jml: '', idrt: '', idrw: '', kode:''
      }
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      handleChangeKode = event => {
        this.setState({kode:event.target.value});
        if(event.target.value == ''){
          this.setState({valid:"is-invalid"});
        }
      }
    action(key, status, penerima, jenis){

        rootRef.child('Pengajuan').child(key).update({status:status});
        var tipe, teks;
        let today =new Date();
        if(status === "Proses"){
          tipe = "kuning";
          teks = "Pengajuan "+jenis+" anda sedang di proses pada tanggal ("+today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()+")";
        }else if(status === "Tolak"){
          tipe = 'merah';
          teks = "Pengajuan "+jenis+" anda di tolak pada tanggal ("+today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()+")";
        }else{
          tipe = 'hijau';
          teks = "Pengajuan "+jenis+" anda telah selesai di proses pada tanggal ("+today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()+")";
        }
        var notif= {
                    nama_pengirim:localStorage.getItem("nama"),
                    nik_penerima:penerima,
                    nik_pengirim:localStorage.getItem("nik"),
                    teks:teks,
                    time_notif:timeRef,
                    tipe:tipe
                  }
        rootRef.child('Notifikasi').push(notif);
        toast.success('Data Berhasil Di Update', {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
    cetak = event => {
      const { task } = this.props;
      var idrt='';
      var idrw='', alamat='', nikrt='', namart='';
      var teks= '';
      console.log(task.pemohon);
      RefWarga.orderByChild("nik").equalTo(task.pemohon).on('value', snap => {
        snap.forEach(shot => {
          console.log(shot.val());
          localStorage.setItem("nama_pemohon", shot.val().nama);
          // this.setState({nama:shot.val().nama});
          // console.log(shot.val().nama);
          localStorage.setItem("status", shot.val().status);
          // this.setState({status:shot.val().status});
          localStorage.setItem("tgl_lahir", shot.val().tgl_lahir);
          localStorage.setItem("tempatlahir", shot.val().tempatlahir);
          // this.setState({tgl_lahir:shot.val().tgl_lahir});
          localStorage.setItem("gender", shot.val().gender);
          // this.setState({gender:shot.val().gender});
          localStorage.setItem("nik_pemohon", shot.val().nik);
          // this.setState({nik:shot.val().nik});
          localStorage.setItem("agama", shot.val().agama);
          // this.setState({agama:shot.val().agama});
          localStorage.setItem("vno_kk", shot.val().no_kk);

        });
      });

      RefPengajuan.orderByChild("pemohon").equalTo(task.pemohon).on('value', snap => {
        snap.forEach(shott => {
          if(shott.val().status === "Proses"){
              teks = shott.val().kebutuhan;
              localStorage.setItem("teks", teks);
          }
        });
      });
      console.log(this.state);
      var htg = {
        id_surat:RandomKata.generate(10),
        kode_surat:task.kd_surat,
        nik_pembuat:localStorage.getItem("nik"),
        nik_pemohon:task.pemohon
      }
      console.log(localStorage.getItem("vno_kk"));
      RefKK.orderByChild("nokk").equalTo(localStorage.getItem("vno_kk")).on('value', snap => {
        snap.forEach(shot => {
          idrt = shot.val().idrt;
          idrw = shot.val().idrw;
          alamat = shot.val().alamat;
          localStorage.setItem("vidrt", shot.val().idrt);
          localStorage.setItem("vidrw", shot.val().idrw);
          localStorage.setItem("alamat", shot.val().alamat);
        });
      });
      var htg = {
        id_surat:RandomKata.generate(10),
        kode_surat:task.kd_surat,
        nik_pembuat:localStorage.getItem("nik"),
        nik_pemohon:task.pemohon
      }
      Action("addSurat", htg).then ((result) => {
          console.log(result);
          if(result!=''){
              console.log("success");
              console.log(result);
          }else{
              console.log("errors");
          }
      })
      // console.log(localStorage.getItem('nama_pemohon'));
      window.open("http://webbeta.wargaku.id/apps?nama_pemohon="+localStorage.getItem('nama_pemohon')+"&id_surat="+htg.id_surat+"&kebutuhan="+task.kebutuhan+"&tempat_lahir="+localStorage.getItem('tempatlahir')+"&status="+localStorage.getItem('status')+"&tanggal_lahir="+localStorage.getItem('tgl_lahir')+"&jenis_kelamin="+localStorage.getItem('gender')+"&idrt="+localStorage.getItem("idrt")+"&idrw="+localStorage.getItem("koderw")+"&nik="+localStorage.getItem('nik_pemohon')+"&agama="+localStorage.getItem('agama')+"&alamat="+localStorage.getItem('alamat')+"&no_kk="+localStorage.getItem('no_kk')+"&nikrt="+nikrt+"&kode="+task.kd_surat+"&nama_rt="+localStorage.getItem("nama"), "_blank");
    }
  render() {
    const { task } = this.props;
    let cek, action;
    console.log(task)
    if(task.status === "Pending"){

      action = (
          <div>
              <a onClick={() =>this.action(task.key, "Proses", task.pemohon, task.jenis_surat)}><button className="btn btn-primary btn-sm">Proses</button></a>&nbsp;
              <a onClick={() =>this.action(task.key, "Tolak", task.pemohon, task.jenis_surat)}><button className="btn btn-danger btn-sm">Tolak</button></a>
          </div>
          );
  }else if(task.status === "Proses"){
      action = (
          <a onClick={() =>this.action(task.key, "Selesai", task.pemohon, task.jenis_surat)}><button className="btn btn-success btn-sm">Selesaikan Pengajuan</button></a>
          );
  }else if(task.status === "Selesai"){
      action = (
        <div>
          <a onClick={(e) => this.cetak(task.pemohon, task.kebutuhan)}><button className="btn btn-success btn-sm">Print Pengajuan</button></a>

        </div>
          );
  }
    return (

              <li>
                <i className="fa fa-envelope bg-primary"></i>

                <div className="timeline-item">
                  <span className="time"><i className="fa fa-clock-o"></i> {task.tgl_pengajuan}</span>

                  <h3 className="timeline-header"><a href="#">{task.user.nama}</a> mengajukan kepada anda</h3>

                  <div className="timeline-body">
                    <p>jenis kebutuhan:{task.jenis_surat}</p>
                    <p>kebutuhan:{task.kebutuhan}</p>
                    <p>Status:{task.status}</p>
                    <p style={{fontSize: 0.7 + 'em', marginTop: 1 + 'em'}}>Notice: Jika Hasil Print Tidak Keluar, Silahkan Di Cetak Ulang!!</p>
                  </div>
                  <div className="timeline-footer">
                    {action}
                  </div>
                </div>
              </li>

    );
  }
}
