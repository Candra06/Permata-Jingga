import React from 'react';
import { RefKK,RefAgenda, rootRef, upRef, timeRef, RefNotif } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

export default class ListAgenda extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        redirect:false,
        nama: '',
            cek: true,
            up:'',
            jumlah:0, jumlahsetuju:0, totalduit:0, duitmasuk:0
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    componentWillMount(){
      const {task} = this.props;
      rootRef.child("PesertaAgenda").orderByChild("kd_event").equalTo(task.kd_event).on('value', snap => {
        
        let no = 0, setuju=0, duitmasuk=0, total=0;
        snap.forEach(shot => {
          if(shot.val().status_agenda === "Hapus"){

          }else{
             if(shot.val().status_terima === "Terima"){
            setuju++;
            no++;
            if(shot.val().status_bayar === "Sudah Bayar"){
            duitmasuk = duitmasuk + parseInt(shot.val().jumlahiuran);
            }else{
              duitmasuk = duitmasuk;
            }
          }else{
            duitmasuk = duitmasuk;
            no++;
          }
          }
         
        });
        total = no * task.jumlahiuran;
        this.setState({ jumlah: no, jumlahsetuju: setuju, totalduit: total, duitmasuk:duitmasuk });
      });
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2() {
        this.setState({
          modal2: !this.state.modal2
        });
      }

   
    deleteTask(){
        const {task} = this.props;
        rootRef.child("PesertaAgenda").orderByChild("kd_event").equalTo(task.kd_event).on('value', snap => {
          snap.forEach(shot => {
            rootRef.child("PesertaAgenda").child(shot.key).update({
              status_agenda: "Hapus"
            });
            const {task} = this.props;
            if(task.perluiuran === "Ya"){
            if(shot.val().status_bayar === "Sudah Bayar"){
            const notif= {
              nama_pengirim:localStorage.getItem("nama"),
              nik_penerima:shot.val().kd_penerima,
              nik_pengirim:localStorage.getItem("nik"),
              teks:"Event "+task.judul+ " Telah Di Hapus, Silahkan Ambil Kembali Uang Anda!!",
              time_notif:timeRef,
              tipe:"merah-agenda"
            }
            RefNotif.push(notif);
          }else{
            const notif= {
              nama_pengirim:localStorage.getItem("nama"),
              nik_penerima:shot.val().kd_penerima,
              nik_pengirim:localStorage.getItem("nik"),
              teks:"Event "+task.judul+ " Telah Di Hapus",
              time_notif:timeRef,
              tipe:"merah-agenda"
            }
            RefNotif.push(notif);
          }
        }else{
          const notif= {
            nama_pengirim:localStorage.getItem("nama"),
            nik_penerima:shot.val().kd_penerima,
            nik_pengirim:localStorage.getItem("nik"),
            teks:"Event "+task.judul+ " Telah Di Hapus",
            time_notif:timeRef,
            tipe:"merah-agenda"
          }
          RefNotif.push(notif);
        }
          });
        });
        RefAgenda.child(task.key).update({
          status_agenda: "Hapus"
        })
        toast.success('Perubahan Data Berhasil Di Simpan', {
          position: toast.POSITION.TOP_RIGHT,
      });
      this.toggle();
      };
      gantistatus = (jenis)=>{
        const { task } = this.props;
        rootRef.child("PesertaAgenda").orderByChild("kd_event").equalTo(task.kd_event).on('value', snap => {
          snap.forEach(shot => {
            rootRef.child("PesertaAgenda").child(shot.key).update({
              status_agenda: jenis
            });
          });
        });
        RefAgenda.child(task.key).update({
          status_agenda: jenis
        })
        toast.success('Perubahan Data Berhasil Di Simpan', {
          position: toast.POSITION.TOP_RIGHT,
      });
      }
      gantistatusvote = (jenis)=>{
        const { task } = this.props;
     
        RefAgenda.child(task.key).update({
          status_voting: jenis
        })
        toast.success('Perubahan Data Berhasil Di Simpan', {
          position: toast.POSITION.TOP_RIGHT,
      });
      }

      keview = () => {
        const { task } = this.props;
        localStorage.setItem("kevent", task.kd_event)
        this.setState({
          redirect: true
        })
      }
  render() {
    if(this.state.redirect){
    return (<Redirect to="/RT/ViewPeserta"/>)
 }
    const { task } = this.props;
const { jumlah, jumlahsetuju, duitmasuk, totalduit } = this.state;
    let show, btnshow, btntutup;
    var NumberFormat = require('react-number-format');
    if(task.status_voting === "Buka"){
      btntutup = (
        <Button color="danger" onClick={(e) => this.gantistatusvote('Tutup')}>Tutup Voting</Button>
      )
    }else if(task.status_voting === "Tutup"){
      btntutup = (
        // <Button color="success">Event Telah Selesai</Button>
        
        <Button color="success" onClick={(e) => this.gantistatusvote('Buka')}>Buka Voting</Button>
      )
    }
    if(task.status_agenda === "Proses"){
      btnshow = (
        <Button color="danger" onClick={(e) => this.gantistatus('Selesai')}>Selesaikan Event</Button>
      )
    }else if(task.status_agenda === "Selesai"){
      btnshow = (
        // <Button color="success">Event Telah Selesai</Button>
        
        <Button color="danger" onClick={(e) => this.gantistatus('Proses')}>Proses Event</Button>
      )
    }
    if(task.perluiuran === "Ya"){
      show = (
        <tbody>
          <tr>
              <td>Nama Event</td>
              <td>{task.judul}</td>
          </tr>
          <tr>
              <td>Tanggal Pelaksanaan</td>
              <td>{task.tanggal}</td>
          </tr>
          <tr>
              <td>Status Agenda</td>
              <td>{task.status_agenda}</td>
          </tr>
          <tr>
              <td>Status Voting</td>
              <td>{task.status_voting}</td>
          </tr>
          <tr>
              <td>Perlu Iuran</td>
              <td>{task.perluiuran}</td>
          </tr>
          <tr>
              <td>Jumlah Iuran</td>
              <td><NumberFormat value={task.jumlahiuran} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
          </tr>
          <tr>
              <td>Total Peserta</td>
              <td>{jumlah} Orang</td>
          </tr>
          <tr>
              <td>Peserta Setuju</td>
              <td>{jumlahsetuju} / {jumlah}</td>
          </tr>
          <tr>
              <td>Total Uang Iuran</td>
              <td><NumberFormat value={totalduit} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
          </tr>
          <tr>
              <td>Total Uang Di Terima</td>
              <td><NumberFormat value={duitmasuk} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
          </tr>
          <tr>
              <td>Deskripsi</td>
              <td>{task.deskripsi}</td>
          </tr>
      </tbody>
      )
    }else{
      show = (
          <tbody>
            <tr>
                <td>Nama Event</td>
                <td>{task.judul}</td>
            </tr>
            <tr>
                <td>Tanggal Pelaksanaan</td>
                <td>{task.tanggal}</td>
            </tr>
          <tr>
              <td>Status Agenda</td>
              <td>{task.status_agenda}</td>
          </tr>
          <tr>
              <td>Status Voting</td>
              <td>{task.status_voting}</td>
          </tr>
            <tr>
                <td>Perlu Iuran</td>
                <td>{task.perluiuran}</td>
            </tr>
            <tr>
                <td>Total Peserta</td>
                <td>{jumlah} Orang</td>
            </tr>
            <tr>
                <td>Peserta Setuju</td>
                <td>{jumlahsetuju} / {jumlah}</td>
            </tr>
            <tr>
                <td>Deskripsi</td>
                <td>{task.deskripsi}</td>
            </tr>
        </tbody>
      )
    }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.judul}</td>
        <td>{task.tanggal}</td>
        <td>{task.status_agenda}</td>
        <td>{jumlah} Orang</td>
        <td>{jumlahsetuju} / {jumlah}</td>
        <td>
        <Button color="primary" onClick={this.toggle2}><i className="fa fa-list" title="Detail Event"></i> </Button>
        <span>  </span>
        <Button color="success" onClick={this.keview}><i className="fa fa-users" title="Peserta Event"></i> </Button>
        <span>  </span>
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

        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
            <ModalHeader toggle={this.toggle2}>Detail Event {task.judul}</ModalHeader>
            <ModalBody>
            <table className="table">
                                    {show}
                                </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle2}>Tutup</Button>{' '}
                {btnshow}{' '}
                {btntutup}
            </ModalFooter>
        </Modal>
        </td>
    </tr>
    );
  }
}
