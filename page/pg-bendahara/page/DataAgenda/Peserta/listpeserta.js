import React from 'react';
import { RefKK,RefAgenda, rootRef, upRef, timeRef, RefNotif, RefWarga } from './../../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

export default class ListPeserta extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        nama:'',
        redirect:false,
       
      }
      this.toggle = this.toggle.bind(this);
    }

    // componentWillMount(){
    //   const {task} = this.props;
    //   RefWarga.orderByChild("nik").equalTo(task.kd_penerima).on('value', snap => {
        
    //     snap.forEach(shot => {
       
    //     this.setState({ nama: shot.val().nama });
    //     });
    //   });
    // }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
  
    deleteTask(){
        const {task} = this.props;
   
            rootRef.child("PesertaAgenda").child(task.key).update({
              status_agenda: "Hapus"
            });
            const notif= {
              nama_pengirim:localStorage.getItem("nama"),
              nik_penerima:task.kd_penerima,
              nik_pengirim:localStorage.getItem("nik"),
              teks:"Anda telah di hapus dari Event "+task.judul,
              time_notif:timeRef,
              tipe:"merah-agenda-hapus"
            }
            RefNotif.push(notif);

        toast.success('Peserta Berhasil Di Hapus', {
          position: toast.POSITION.TOP_RIGHT,
      });
      this.toggle();
      };
    
  render() {
 const {task} = this.props;
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>{task.status_terima}</td>
        <td>{task.status_bayar}</td>
        <td>
        <Button color="danger" onClick={this.toggle}><i className="fa fa-trash" title="Hapus Event"></i> </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                Data Event {task.judul} Akan di Hapus!!!<br/>
                Perhatian!!! Jika ada warga yang telah membayar, harap mengembalikan uanga iuran yang telah di setor!!
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                <Button color="danger" onClick={(e) => this.deleteTask()}>Konfirmasi</Button>
            </ModalFooter>
        </Modal>
        </td>
    </tr>
    );
  }
}
