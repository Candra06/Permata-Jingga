import React from 'react';
import { RefPengajuan, RefPenitipan, RefKK, RefRT, RefRW, timeRef, RefNotif, rootRef, RefAgenda } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
export default class Listagenda extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modalsetuju: false,
        modal2: false,
        modaltolak: false,
        modaltanya: false,
        modalvote: false,
        alert:'',
        jumlah:0, jumlahsetuju:0, totalduit:0, duitmasuk:0
      }
      this.togglesetuju = this.togglesetuju.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggletolak = this.toggletolak.bind(this);
      this.toggletanya = this.toggletanya.bind(this);
    }
 
    togglesetuju() {
        this.setState({
            modalsetuju: !this.state.modalsetuju
        });
      }
      toggle2() {
        this.setState({
          modal2: !this.state.modal2
        });
      }
      toggletolak() {
          this.setState({
            modaltolak: !this.state.modaltolak
          });
        }
        toggletanya() {
            const {task} = this.props;
           RefAgenda.orderByChild("kd_event").equalTo(task.kd_event).on('value', snap => {
                snap.forEach(shot => {
                 if(shot.val().status_voting === "Buka"){

                    this.setState({
                        modaltanya: !this.state.modaltanya
                    });
                 }else{
                    this.togglevote();
                 }
                    
                });
              });
        }
        togglevote=()=> {
          this.setState({
            modalvote: !this.state.modalvote
          });
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
     
    gantistatus = (tipe, kunci)=>{
        rootRef.child("PesertaAgenda").child(kunci).update({
            status_terima: tipe
        })
        if(tipe === "Tolak"){
            toast.success('Anda Menolak Mengikuti Event', {
                position: toast.POSITION.TOP_RIGHT,
              });
        }else if(tipe === "Terima"){
            toast.success('Anda Menerima Mengikuti Event', {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
        this.setState({
                modalsetuju: false,
                modaltolak: false,
                modaltanya: false
              
        })
    }
  render() {
    const { task } = this.props;
    const { jumlah, jumlahsetuju, duitmasuk, totalduit } = this.state;
    let show, showbtn, tanpabayar, cekbayar;
    var NumberFormat = require('react-number-format');

    if(task.status_terima === "Terima"){
        showbtn = (
            <Button color="success" onClick={this.togglesetuju}><i className="fa fa-check" title="Persetujuan Event"></i> </Button>
       
        )
    }else if(task.status_terima === "Tolak"){
        showbtn = (
            <Button color="danger" onClick={this.toggletolak}><i className="fa fa-times" title="Persetujuan Event"></i> </Button>
       
        )
    }if(task.status_terima === "Pending"){
        showbtn = (
            <Button color="primary" onClick={this.toggletanya}><i className="fa fa-question" title="Persetujuan Event"></i> </Button>
       
        )
    }
    if(task.perluiuran === "Ya"){
        tanpabayar = task.status_bayar;
        if(task.status_bayar === "Sudah Bayar"){
            cekbayar = "Pembayaran anda telah lunas"
        }else{
            cekbayar = "Anda Belum Melakukan Pembayaran ke bendahara, Silahkan Melakukan pembayaran!!"
        }
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
              <td>Deskripsi</td>
              <td>{task.deskripsi}</td>
          </tr>
      </tbody>
      )
    }else{
        tanpabayar = "Tanpa Bayar";
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
        <td>{task.nama_pengirim}</td>
        <td>{task.judul}</td>
        <td>{task.tanggal}</td>
        <td>{task.perluiuran}</td>
        <td><NumberFormat value={task.jumlahiuran} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
        <td>{task.status_terima}</td>
        <td>{tanpabayar}</td>
        <td>
        <button className="btn btn-primary" style={{margin: 0.1+'em'}} onClick={this.toggle2}><i className="fa fa-list" title="Detail Event"></i> </button>
        <span>  </span>
        {showbtn}


        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
            <ModalHeader toggle={this.toggle2}>Detail Event {task.judul}</ModalHeader>
            <ModalBody>
            <table className="table">
                                    {show}
            </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle2}>Tutup</Button>{' '}
                {/* {btnshow} */}
            </ModalFooter>
        </Modal>

         <Modal isOpen={this.state.modalsetuju} toggle={this.togglesetuju}>
            <ModalHeader toggle={this.togglesetuju}> Event {task.judul}</ModalHeader>
            <ModalBody>
            <p>
                Anda Telah Setuju untuk mengikuti event {task.judul}<br/>
                {cekbayar}
            </p>
                <p style={{ fontSize: 0.7 +'em', marginTop: 0.5 +'em'}}>Klik tombol merah untuk mengganti pilihan anda menjadi tidak setuju!</p>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.togglesetuju}>Tutup</Button>{' '}
            <Button color="danger" onClick={(e) => this.gantistatus('Tolak', task.key)}>Batal/Tolak Mengikuti Event</Button>{' '}
                
            </ModalFooter>
        </Modal>

         <Modal isOpen={this.state.modaltolak} toggle={this.toggletolak}>
            <ModalHeader toggle={this.toggletolak}> Event {task.modaltolak}</ModalHeader>
            <ModalBody>
            <p>
                Anda Telah Menolak untuk mengikuti event {task.judul}<br/>
             
            </p>
                <p style={{ fontSize: 0.7 +'em', marginTop: 0.5 +'em'}}>Klik tombol hijau untuk mengganti pilihan anda menjadi Setuju/Terima!</p>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.toggletolak}>Tutup</Button>{' '}
            <Button color="success" onClick={(e) => this.gantistatus('Terima', task.key)}>Setuju/Terima Mengikuti Event</Button>{' '}
                
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modaltanya} toggle={this.toggletanya}>
            <ModalHeader toggle={this.toggletanya}>Persetujuan Event {task.judul}</ModalHeader>
            <ModalBody>
            <p style={{marginBottom: 2+'em'}}>
                Tentukan pilihan anda untuk mengikuti event {task.judul}<br/>
             
            </p>
                    <Button color="success" onClick={(e) => this.gantistatus('Terima', task.key)}>Setuju/Terima</Button>{' '}
                    <span>  </span>
                    <Button color="danger" onClick={(e) => this.gantistatus('Tolak', task.key)}>Batal/Tolak</Button>{' '}
              
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.toggletanya}>Tutup</Button>{' '}
                
            </ModalFooter>
        </Modal>

        
        <Modal isOpen={this.state.modalvote} toggle={this.togglevote}>
            <ModalHeader toggle={this.togglevote}>Voting Event {task.judul}</ModalHeader>
            <ModalBody>
            <p style={{marginBottom: 2+'em'}}>
                Maaf Voting Event {task.judul}, Telah Di tutup!
            </p>
                   
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.togglevote}>Tutup</Button>{' '}
                
            </ModalFooter>
        </Modal>
        </td>
    </tr>
    );
  }
}
