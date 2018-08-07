import React from 'react';

export default class Listhasil extends React.Component {
  render() {
    const { task } = this.props;
    let ket;

    if(task.tipe === 'merah'){
      ket = (
        <span className="badge badge-danger">Import Gagal </span>
      )
    }else if(task.tipe === 'hijau'){
      ket = (
        <span className="badge badge-success">Import Berhasil </span>
      )
    }
    return (
      <tr>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>{ket} {task.keterangan}</td>
      </tr>
    );
  }
}
