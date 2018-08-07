import React from 'react';
export default class Listpengajuan extends React.Component {



  render() {
    const { task } = this.props;
    let cek;
    if(task.status === "Pending"){
        cek = (
            <span className="badge badge-secondary">{task.status}</span>
        );
    }else if(task.status === "Proses"){
        cek = (
            <span className="badge badge-warning">{task.status}</span>
        );
    }else if(task.status === "Selesai"){
        cek = (
            <span className="badge badge-success">{task.status}</span>
        );
    }else if(task.status === "Tolak"){
        cek = (
            <span className="badge badge-danger">{task.status}</span>
        );
    }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.namapemohon}</td>
        <td>{task.jenis_surat}</td>
        <td>{task.tujuan}</td>
        <td>{cek}</td>

    </tr>
    );
  }
}
