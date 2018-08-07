import React from 'react';
import { rootRef, RefWarga, RefKK, RefPenitipan, timeRef } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import { Action } from "./../../../../Action";
export default class ListPenitipanBaru extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        nokk: '', jml: '', idrt: '', idrw: '', alasan:''
      }
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      handleChangeAlasan = event => {
        this.setState({alasan:event.target.value});
      }
    action(key, status, penerima, tekstolak, xnama){

        RefPenitipan.child(key).update({status:status});
        var tipe, teks;
        let today =new Date();
        if(status === "Diterima"){
          tipe = "biru-penitipan";
          teks = "Penitipan Rumah Anda Telah Di Terima Oleh Satpam";
        }else if(status === "Ditolak"){
          tipe = 'merah-penitipan';
          teks = "Penitipan Rumah Anda Telah Di Tolak Oleh Satpam Dengan Alasan "+tekstolak;
          this.toggle();
          var notif= {
            nama_pengirim:"Satpam",
            nik_penerima:"Satpam",
            nik_pengirim:"Satpam",
            teks:"Anda Menolak Penitipan Rumah Dari "+xnama,
            time_notif:timeRef,
            tipe:tipe
          }
          rootRef.child('Notifikasi').push(notif);
        }else if(status === "Selesai"){
          tipe = 'hijau-selesai';
          teks = "Masa Penitipan Anda Telah Selesai :)";
        }
        var notif= {
                    nama_pengirim:"Satpam",
                    nik_penerima:penerima,
                    nik_pengirim:"Satpam",
                    teks:teks,
                    time_notif:timeRef,
                    tipe:tipe
                  }
        rootRef.child('Notifikasi').push(notif);
        toast.success('Data Berhasil Di Update', {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

  render() {
    const { task } = this.props;
    let cek, action;
    if(task.status === "Pending"){
      action = (
          <div>
              <a onClick={() =>this.action(task.key, "Diterima", task.nik_penitip, "")}><button className="btn btn-success btn-sm">Terima</button></a>&nbsp;
              <a onClick={(e) =>this.toggle()}><button className="btn btn-danger btn-sm">Tolak</button></a>

          </div>
          );
  }else if(task.status === "Diterima"){
      action = (
          <a onClick={() =>this.action(task.key, "Selesai", task.nik_penitip, "")}><button className="btn btn-success btn-sm">Selesaikan Penitipan</button></a>
          );
  }else if(task.status === "Selesai"){
    action = (
      <button className="btn btn-success btn-sm">Penitipan Telah Selesai</button>
      );
  }
    return (

              <li>
                <i className="fa fa-envelope bg-primary"></i>

                <div className="timeline-item">
                  <span className="time"><i className="fa fa-clock-o"></i> {task.tgl_pengajuan}</span>

                  <h3 className="timeline-header"><a href="#">{task.nama_penitip}</a> mengajukan Penitipan Rumah Kepada Anda</h3>

                  <div className="timeline-body">
                    <p>Dari Tanggal : {task.tglAwal}</p>
                    <p>Hingga Tanggal: {task.tglAkhir}</p>
                    <p>Keterangan : {task.keterangan}</p>
                    <p>Alamat : {task.alamat}</p>
                    <p>Status:{task.status}</p>
                  </div>
                  <div className="timeline-footer">
                    {action}
                  </div>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Form Alasan Penolakan</ModalHeader>
                  <ModalBody>
                      <div className="col-md-12">
                          <label>Alasan Penolakan</label>
                          <input type="text"
                          onChange={this.handleChangeAlasan}
                          value={this.state.alasan}
                          className={"form-control "} placeholder="Masukkan Alasan Penolakan"/>
                      </div>

                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                      <Button color="danger" onClick={(e) => this.action(task.key, "Ditolak", task.nik_penitip, this.state.alasan, task.nama_penitip)}>Simpan Data</Button>

                  </ModalFooter>
              </Modal>
                </div>
              </li>

    );
  }
}
