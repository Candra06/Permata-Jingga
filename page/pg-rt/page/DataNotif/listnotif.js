import React from 'react';

export default class Listnotif extends React.Component {

  render() {
    const { task } = this.props;
    let cek;
    if(task.tipe === "teal"){
        cek = (
                <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-secondary">Anda </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "kuning"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-warning">Pengajuan Di Proses </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "merah"){
        cek = (
            <a href="/RT/Pengajuan" className={"nav-link "+(this.state.link === "//RT/Pengajuan" ? "active" : "")}>
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-danger">Pengajuan Di Tolak </span> {task.teks}</h3>
            </div>
            </a>
        );
    }else if(task.tipe === "hijau"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-success">Pengajuan Selesai </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "merah-hapus"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-danger">Pengajuan Di Hapus </span> Anda {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "merah-agenda"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-danger">Agenda Di Hapus </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "biru"){
        cek = (
            
            <div className="timeline-item">
                
                    <h3 className="timeline-header border-red"><a href="/RT/Pengajuan" style={{color:"black"}}><span className="badge badge-primary">Pengajuan Baru </span> {task.teks}</a></h3>
                  
            </div>
            
        );
    }else if(task.tipe === "biru-penitipan"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-primary">Penitipan Rumah Di Terima </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "merah-penitipan"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-danger">Penitipan Rumah Di Tolak </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "hijau-selesai"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-success">Penitipan telah selesai </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "biru-laporan"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-success">Laporan Baru satpam </span> {task.teks}</h3>
                </div>
        );
    }else if(task.tipe === "biru-agenda"){
        cek = (
            <div className="timeline-item">

                    <h3 className="timeline-header border-red"><span className="badge badge-success">Agenda Baru </span> {task.teks}</h3>
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
