import React from 'react';
import { RefKK, rootRef } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default class ListPengajuan extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        nokk: '', jml: '', idrt: '', idrw: ''
      }

    }
    deleteTask = () => {
        const { key } = this.props.task;
        RefKK.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
  render() {
    const { task } = this.props;
    let cek, action;
    if(task.tipe === "teal"){
        cek = (

                    <span className="timeline-header border-red"><span className="badge badge-secondary">Baru</span></span>
        );
        action = (
            <div>
                <a href="#" className="btn btn-warning btn-sm">proses pengajuan</a> &nbsp;
                <a href="#" className="btn btn-danger btn-sm">tolak pengajuan</a>
            </div>
            );
    }else if(task.tipe === "kuning"){
        cek = (

                    <span className="timeline-header border-red"><span className="badge badge-warning">Pengajuan Di Proses </span></span>
        );
        action = (
            <a href="#" className="btn btn-danger btn-sm">pengajuan telah selesai</a>
            );
    }else if(task.tipe === "merah"){
        cek = (

                    <span className="timeline-header border-red"><span className="badge badge-danger">Pengajuan Di Tolak </span> </span>
        );
    }else if(task.tipe === "hijau"){
        cek = (

                    <span className="timeline-header border-red"><span className="badge badge-success">Pengajuan Selesai </span></span>
        );
        action = (
            <a href="#" className="btn btn-success btn-sm">selesai</a>
            );
    }else if(task.tipe === "biru"){
        cek = (
                    <span className="timeline-header border-red"><span className="badge badge-primary">Pengumuman  </span> {task.teks}</span>
        );
        action = (
            <div></div>
            );
    }
    return (

              <li>
                <i className="fa fa-bell bg-primary"></i>

                <div className="timeline-item">
                  <span className="time"><i className="fa fa-clock-o"></i> {task.tanggal}</span>

                  <h3 className="timeline-header"><a href="#">{task.nama_pengirim}</a> mengajukan kepada anda</h3>

                  <div className="timeline-body">
                    <p>{task.teks}</p>

                  </div>
                  <div className="timeline-footer">

                  </div>
                </div>
              </li>

    );
  }
}
