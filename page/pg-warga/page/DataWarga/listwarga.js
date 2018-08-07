import React from 'react';
import { RefRW, rootRef, RefWarga } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal3: false,
      }
      this.toggle3 = this.toggle3.bind(this);
    }

      toggle3() {
        this.setState({
          modal3: !this.state.modal3
        });
      }
      
  render() {
    const { task } = this.props;

    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>{task.nik}</td>
        <td>{task.status}</td>
        <td>{task.gender}</td>
        <td>
        <Button color="success" onClick={this.toggle3}>Tampilkan Biodata</Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
                <ModalHeader toggle={this.toggle3}>
                <div className="card-header card-info">
                            <h3 className="card-title">Biodata  {task.nama}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card card-info">

                        <form role="form">
                            <div className="card-body">
                                <div className="row col-12">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Nama</td>
                                            <td>{task.nama}</td>
                                        </tr>
                                        <tr>
                                            <td>NIK</td>
                                            <td>{task.nik}</td>
                                        </tr>
                                        <tr>
                                            <td>Agama</td>
                                            <td>{task.agama}</td>
                                        </tr>
                                        <tr>
                                            <td>TTL</td>
                                            <td>{task.tempatlahir}{', '}{task.tgl_lahir}</td>
                                        </tr>
                                        <tr>
                                            <td>Jenis kelamin</td>
                                            <td>{task.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Pekerjaan</td>
                                            <td>{task.pekerjaan}</td>
                                        </tr>
                                        <tr>
                                            <td>Pendidikan</td>
                                            <td>{task.pendidikan}</td>
                                        </tr>
                                        <tr>
                                            <td>status Pernikahan</td>
                                            <td>{task.status_nikah}</td>
                                        </tr>
                                        <tr>
                                            <td>Kewarganegaraan</td>
                                            <td>{task.kewarganegaraan}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Ayah</td>
                                            <td>{task.namaayah}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Ibu</td>
                                            <td>{task.namaibu}</td>
                                        </tr>
                                        <tr>
                                            <td>Status Keluarga</td>
                                            <td>{task.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{task.email}</td>
                                        </tr>
                                        <tr>
                                            <td>No Telephone</td>
                                            <td>{task.nohp}</td>
                                        </tr>
                                        <tr>
                                            <td>No WA</td>
                                            <td>{task.wa}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama / Link FB</td>
                                            <td>{task.fb}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama / Link IG</td>
                                            <td>{task.ig}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama / Link Twitter</td>
                                            <td>{task.twitter}</td>
                                        </tr>
                                        <tr>
                                            <td>Foto</td>
                                            <td>
                                                <img src={task.urlfoto} style={{ width: 5+'em', height: 5+'em'}}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" onClick={this.toggle3}>Tutup</Button>{' '}
                    </ModalFooter>
                </Modal>
              </td>
    </tr>
    );
  }
}
