import React from 'react';

export default class Listnotif extends React.Component {
  
  render() {
    const { task } = this.props;
    let cek;
    if(task.tipe === "kuning" && task.nik_pengirim === "Satpam"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-warning">Penitipan Di Proses </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "merah" && task.nik_pengirim === "Satpam"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-danger">Penitipan Di Tolak </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "hijau" && task.nik_pengirim === "Satpam"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-success">Penitipan Selesai </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "merah-hapus" && task.nik_pengirim === "Satpam"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-danger">Penitipan Di Hapus </span> Anda {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "biru"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-primary">Penitipan Baru </span> {task.teks}</h3>
                </div>
        );
    }
    return (
        <li>
                {cek}
            </li>
    );
  }
}
