import React from 'react';
import { RefUser, RefLaporan } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { toast } from 'react-toastify';

export default class Listkk extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        keterangan: '', kondisi:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(txtketerangan, txtstatus) {
        this.setState({
            keterangan: txtketerangan,
            kondisi: txtstatus,
          modal2: !this.state.modal2
        });
      }
      handleChangeKeterangan = event => {
        this.setState({ keterangan: event.target.value });
      };

      handleChangeKondisi= event => {
        this.setState({ kondisi: event.target.value });
      };


      handleReset = event => {
        event.preventDefault();
        this.setState({ keterangan: '', kondisi:''});
      }
    deleteTask(kodeuser){
        const { key } = this.props.task;
        RefLaporan.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };

      notify(type, kunci, kodeuser){
        return () => {
        const akundata = {
            keterangan:this.state.keterangan.trim(),
            status_rumah:this.state.kondisi.trim(),
        };
                if (akundata.keterangan.length && akundata.status_rumah.length) {
                RefLaporan.child(kunci).update({ keterangan: this.state.keterangan, status_rumah: this.state.kondisi });
                this.setState({ keterangan: '', kondisi:'' });

                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2();
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;

    return (
        <tr>
        <td>{task.nama_penitip}</td>
        <td>{task.status_rumah}</td>
        <td>{task.keterangan}</td>
        <td>{task.tgl_laporan}</td>
        <td>
            
            <span>  </span>
                <Button color="danger" onClick={this.toggle}><i className="fa fa-trash"></i></Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data Laporan {task.keterangan} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) =>this.deleteTask(task.key)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
