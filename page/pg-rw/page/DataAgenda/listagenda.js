import React from 'react';
import { RefKK,RefEvent, rootRef, upRef, timeRef } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import RandomKata from 'randomstring';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { toast } from 'react-toastify';

export default class ListAgenda extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        nama: '',
            tgl_lahir: '',
            deskripsi:'',
            cek: true,
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: '',
            up:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(tnama, ttgl, tdeskripsi) {
        this.setState({
            nama: tnama,
            tgl_lahir: ttgl,
            deskripsi: tdeskripsi,
          modal2: !this.state.modal2
        });
      }

      handleUploadStart = () => this.setState({isUploading: true, progress: 0});
      handleProgress = (progress) => this.setState({progress});
      handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
      }
      handleUploadSuccess = (filename) => {
      this.setState({avatar: filename, progress: 100, isUploading: false});
      upRef.child(filename).getDownloadURL().then(function(url) {
         localStorage.setItem("urlfoto", url);
      }).catch(function(error) {

      console.log(error);
      })
      };

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleChangeTgl = event => {
        this.setState({ tgl_lahir: event.target.value });
        console.log(event.target.value)
      };
      handleChangeDeskripsi = event => {
        this.setState({deskripsi:event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nama: '',
        tgl_lahir: '',
        deskripsi:'',
        cek: true,
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: ''});
      }
    deleteTask(filenya){
        const { key } = this.props.task;

        rootRef.child("Agenda").child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
  render() {
    const { task } = this.props;

    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.judul}</td>
        <td>{task.tanggal}</td>
        <td>{task.deskripsi}</td>
        <td>
        <Button color="danger" onClick={this.toggle}><i className="fa fa-trash"></i></Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                Data Event {task.nama} Akan di Hapus!!!
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                <Button color="danger" onClick={(e) => this.deleteTask(task.filename)}>Konfirmasi</Button>
            </ModalFooter>
        </Modal>
        </td>
    </tr>
    );
  }
}
