import React from 'react';
import { RefKK, rootRef, timeRef, RefPengajuan, RefWarga } from './../../../../db';
import RandomKata from "randomstring";
import { Redirect } from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import { ToastContainer, toast } from 'react-toastify';

import { Action } from "./../../../../Action";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

export default class ListPengajuanBaru extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false, nama: '',
        nokk: '', jml: '', idrt: '', idrw: '', valid:''
      }
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
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
                    nik_penerima: penerima,
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

    handleChangeKode = event => {
      this.setState({kode:event.target.value});
      if(event.target.value == ''){
        this.setState({valid:"is-invalid"});
      }
    }

    deleteTask = () => {
        const { key } = this.props.task;
        RefKK.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
      cetak(datanik, datakebutuhan) {

        const { task } = this.props;
        var idrt='';
        var idrw='', alamat='', nikrt='', namart='';
        var teks= '';

        console.log(datanik);
        RefWarga.orderByChild("nik").equalTo(datanik).on('value', snap => {
          const tasks = [];
          snap.forEach(shottt => {
            tasks.push({ ...shottt.val(), key: shottt.key });
            const orderedTasks = orderBy(
              tasks
            );

            orderedTasks.map(task => (
              //console.log(task),
              localStorage.setItem("vnokk", task.no_kk),
              //console.log(localStorage.getItem("vnokk")),
            localStorage.setItem("vnama", task.nama),
            //console.log(localStorage.getItem("vnama")),
            localStorage.setItem("vtempatlahir", task.tempatlahir),
            localStorage.setItem("vtgllahir", task.tgl_lahir),
            localStorage.setItem("vstatus", task.status),
            localStorage.setItem("vgender", task.gender),
            localStorage.setItem("vagama", task.agama)
            ))
          });
        });

        RefPengajuan.orderByChild("pemohon").equalTo(localStorage.getItem("vnokk")).on('value', snap => {
          snap.forEach(shott => {
            if(shott.val().status === "Proses"){
                teks = shott.val().kebutuhan;
                localStorage.setItem("teks", teks);
            }
          });
        });
        RefKK.orderByChild("nokk").equalTo(localStorage.getItem("vnokk")).on('value', snap => {
          snap.forEach(shot => {
            idrt = shot.val().idrt;
            idrw = shot.val().idrw;
            alamat = shot.val().alamat;
            localStorage.setItem("idrt", shot.val().idrt);
            localStorage.setItem("idrw", shot.val().idrw);
            localStorage.setItem("alamat", shot.val().alamat);
          });
        });
        var htg = {
          id_surat:RandomKata.generate(10),
          kode_surat:this.state.kode,
          nik_pembuat:localStorage.getItem("nik"),
          nik_pemohon:datanik
        }
        Action("addSurat", htg).then ((result) => {
            if(result!=''){
                console.log("success");
            }else{
                console.log("errors");
            }
        })
        window.open("http://webbeta.wargaku.id/apps/PengantarRW?nama_pemohon="+localStorage.getItem("vnama")+"&id_surat="+htg.id_surat+"&kebutuhan="+datakebutuhan+"&tempat_lahir="+localStorage.getItem("vtempatlahir")+"&status="+localStorage.getItem("vstatus")+"&tanggal_lahir="+localStorage.getItem("vtgllahir")+"&jenis_kelamin="+localStorage.getItem("vgender")+"&idrt="+localStorage.getItem("idrt")+"&idrw="+localStorage.getItem("idrw")+"&nik="+datanik+"&agama="+localStorage.getItem("vagama")+"&alamat="+alamat+"&no_kk="+localStorage.getItem("vnokk")+"&nikrt="+nikrt+"&kode="+this.state.kode+"&nama_rt="+localStorage.getItem("nama"), "_blank");

       //this.toggle();
       }
  render() {
    const { task } = this.props;
    let cek, action;
    if(task.status === "Pending"){
        action = (
            <div>
                <a onClick={() =>this.action(task.key, "Proses", task.pemohon, task.jenis_kebutuhan)}><button className="btn btn-primary btn-sm">Proses</button></a>&nbsp;
                <a onClick={() =>this.action(task.key, "Tolak", task.pemohon, task.jenis_kebutuhan)}><button className="btn btn-danger btn-sm">Tolak</button></a>
            </div>
            );
    }else if(task.status === "Proses"){
        action = (
            <a onClick={() =>this.action(task.key, "Selesai", task.pemohon, task.jenis_kebutuhan)}><button className="btn btn-success btn-sm">Selesaikan Pengajuan</button></a>
            );
    }else if(task.status === "Selesai"){
      action = (
        <div>
          <a onClick={this.toggle}><button className="btn btn-success btn-sm">Print Pengajuan</button></a>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Form Input kode surat</ModalHeader>
                  <ModalBody>
                      <div className="col-md-12">
                          <label>kode surat</label>
                          <input type="text"
                          onChange={this.handleChangeKode}
                          value={this.state.kode}
                          className={"form-control "+this.state.valid} placeholder="Masukkan kode surat"/>
                           <div className="invalid-feedback">
                            kode harus diisi
                          </div>
                      </div>

                      <div className="col-md-12">
                      <p style={{fontSize: 0.7 + 'em', marginTop: 1 + 'em'}}>Notice: Jika Hasil Print Tidak Keluar, Silahkan Di Cetak Ulang!!</p>
                      </div>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                      <Button color="danger" onClick={(e) => this.cetak(task.pemohon, task.kebutuhan)}>Cetak Data</Button>

                  </ModalFooter>
              </Modal>
        </div>
          );
  }

    return (

              <li>
                <i className="fa fa-envelope bg-primary"></i>

                <div className="timeline-item">
                  <span className="time"><i className="fa fa-clock-o"></i> {task.tgl_pengajuan}</span>

                  <h3 className="timeline-header"><a href="">{task.user.nama}</a> mengajukan kepada anda</h3>

                  <div className="timeline-body">
                    <p>Jenis kebutuhan:{task.jenis_kebutuhan}</p>
                    <p>Kebutuhan:{task.kebutuhan}</p>
                    <p>Status:{task.status}</p>
                  </div>
                  <div className="timeline-footer">
                    {action}

                  </div>
                </div>
              </li>


    );
  }
}
