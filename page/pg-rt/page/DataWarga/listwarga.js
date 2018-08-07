import React from 'react';
import { RefRW, rootRef, RefWarga } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
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
        <td>{task.gender}</td>
        <td>{task.tipewarga}</td>
        <td>
        <Button color="success" onClick={this.toggle3}><i className="fa fa-list"></i></Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3} frame position="top">
                <ModalHeader toggle={this.toggle3}>
                <div className="card-header card-info">
                            <h3 className="card-title">Biodata  {task.nama}</h3>
                        </div></ModalHeader>
                <ModalBody>
                <div className="card-body">
                                <div className="col-12">
                                    <div className="row col-12">
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                        
                                        <div className="widget-user-image" align="center">
                                            <img src={task.urlfoto} style={{ width: 6+'em', height: 6+'em'}} className="img-responsive"/>
                                        </div>
                                        </div>
                                        <div className="col-md-4">
                                        </div>

                                    </div>
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
                                            <td>No KK</td>
                                            <td>{task.no_kk}</td>
                                        </tr>
                                        <tr>
                                            <td>RW/RT</td>
                                            <td>{task.norw}{'/'}{task.nort}</td>
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
                                    </tbody>
                                </table>
                                </div>
                            </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" onClick={this.toggle3}>Batal</Button>{' '}
                    </ModalFooter>
                </Modal>
                
        </td>
    </tr>
    );
  }
}
