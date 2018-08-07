import React from 'react';
import { RefKK,RefAgenda, rootRef, upRef, timeRef, RefNotif, RefWarga, Refpesertaiuran, RefBayarIuran, Refkeuangan, Refriwayat, Refpemasukan } from './../../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import Randomkata from 'randomstring';

export default class ListPeserta extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        modal3: false,
        nama:'',kuncinya:'', totalakhir:0,
        redirect:false,
       
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
    }

    componentWillMount(){
        Refkeuangan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
            let newsaldo = 0, kuncinya='';
            snap.forEach(shot => {
                if(shot.val().norw === localStorage.getItem("koderw")){
                    newsaldo = parseInt(shot.val().jumlah_saldo);
                    kuncinya = shot.key;
                }
  
            });
            this.setState({
                kuncinya: kuncinya,
                totalakhir: newsaldo
            })
        })
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
        toggle3() {
            this.setState({
              modal3: !this.state.modal3
            });
          }
  
    deleteTask(){
        const {task, jumlahiuran, databulan} = this.props;
        const {totalakhir, kuncinya} = this.state;
        
        if(task.status_bayar === "Sudah Bayar"){
          

                let uu = 0;
                uu = parseInt(totalakhir) - parseInt(jumlahiuran);
                Refkeuangan.child(kuncinya).update({
                    jumlah_saldo: parseInt(uu)
                })
            
        RefBayarIuran.orderByChild("kd_peserta").equalTo(task.kd_peserta).on('value', snap => {
              snap.forEach(shot => {
                RefBayarIuran.child(shot.key).remove();
            Refpemasukan.orderByChild("kd_masuk").equalTo(shot.val().kd_bayar).on('value', snap => {
                snap.forEach(shott => {
                  Refpemasukan.child(shott.key).remove();
                })
              })
              })
            })

        }else{

        }
        let yy = new Date();
        let tdy = yy.getFullYear()+"-"+(yy.getMonth()+1)+"-"+yy.getDate();
        Refriwayat.push({
            tipe: 'Hapus-Peserta-Iuran',
            tanggal:tdy,
            ordertime: timeRef,
            teksriwayat: localStorage.getItem("nama")+" Menghapus data warga Iuran "+ databulan +" dengan nama "+ task.nama_keluarga + " pada tanggal "+tdy
        })
        Refpesertaiuran.child(task.key).remove();
           

        toast.success('Data Warga Iuran Berhasil Di Hapus', {
          position: toast.POSITION.TOP_RIGHT,
      });
      this.toggle();
      };

      pembayaran = () =>{
        const {task, jumlahiuran, databulan} = this.props;
        const {totalakhir, kuncinya} = this.state;
        
                let uu = 0;
                uu = parseInt(totalakhir) + parseInt(jumlahiuran);
                Refkeuangan.child(kuncinya).update({
                    jumlah_saldo: parseInt(uu)
                })
       
                Refpesertaiuran.child(task.key).update({
                    status_bayar: 'Sudah Bayar'
                });
              
        let yy = new Date();
        let tdy = yy.getFullYear()+"-"+(yy.getMonth()+1)+"-"+yy.getDate();
        let hari, bulan;
        if(yy.getDate() >= 10){
            hari = yy.getDate()
        }else{
            hari = "0"+yy.getDate();
        }
        if((yy.getMonth()+1) >= 10){
            bulan = (yy.getMonth()+1)
        }else{
            bulan = "0"+(yy.getMonth()+1);
        }
        let hariini = yy.getFullYear()+"-"+bulan+"-"+hari;
        Refriwayat.push({
            tipe: 'Bayar-Iuran',
            tanggal:tdy,
            ordertime: timeRef,
            teksriwayat: localStorage.getItem("nama")+" Melakukan Pembayaran Iuran "+ databulan +"  dengan nama "+ task.nama_keluarga + " pada tanggal "+tdy
        })
        let kodemasuk = Randomkata.generate(10);
        RefBayarIuran.push({
            kd_bayar: kodemasuk,
            kd_iuran: task.kd_iuran,
            kd_peserta: task.kd_peserta,
            jumlah_bayar: jumlahiuran,
            databulan: databulan,
            tgl_bayar: tdy,
            nort:localStorage.getItem("idrt"),
            norw:localStorage.getItem("koderw")
        })
           
        Refpemasukan.push({
            kd_masuk: kodemasuk,
            asaldana:'Iuran Bulanan',
            tipemasuk:'IuranBulanan',
            datachart: databulan,
            jumlah_uang: jumlahiuran,
            keterangan: 'Iuran '+task.nama_keluarga,
            nort: localStorage.getItem("idrt"),
            nama_pembuat: localStorage.getItem("nama"),
            ordertime: timeRef,
            tanggal: hariini
        })
        toast.success('Data Berhasil Di Simpan', {
          position: toast.POSITION.TOP_RIGHT,
      });
      this.toggle2();
      }
    
  render() {
 const {task, jumlahiuran} = this.props;
 let btnbayar;
 if(task.status_bayar === "Sudah Bayar"){
    btnbayar = (
    <button className="btn btn-success" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.5 +'em'}} onClick={this.toggle3}><i className="fa fa-check" title="Pembayaran Selesai"></i> </button>
    )
 }else{
btnbayar = (
    <button className="btn btn-success" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.5 +'em'}} onClick={this.toggle2}><i className="fa fa-money" title="Lakukan Pembayaran"></i> </button>
)
 }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama_keluarga}</td>
        <td>{task.nokk}</td>
        <td>{task.status_bayar}</td>
        <td>{task.alamat}</td>
        <td>
        {btnbayar}
        <button className="btn btn-danger" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.5 +'em'}} onClick={this.toggle}><i className="fa fa-trash" title="Hapus Warga"></i> </button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                <ModalBody>
                    Data Warga {task.nama_keluarga} Akan di Hapus!!!<br/>
                    Perhatian!!! Jika ada warga yang telah membayar, harap mengembalikan uanga iuran yang telah di setor!!
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                    <Button color="danger" onClick={(e) => this.deleteTask()}>Konfirmasi</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
                <ModalHeader toggle={this.toggle2}>Form Pembayaran Iuran</ModalHeader>
                <ModalBody>
                    Pastikan Anda Menerima Uang Sebesar <NumberFormat value={jumlahiuran} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /><br/>
                    Perhatian!!! Data Tidak Dapat Di Ubah!!
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle2}>Batal</Button>{' '}
                    <Button color="success" onClick={(e) => this.pembayaran()}>Konfirmasi</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
                <ModalHeader toggle={this.toggle3}>Pembayaran Selesai</ModalHeader>
                <ModalBody>
                    {task.nama_keluarga} Telah Lunas Iuran<br/>
                    
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
