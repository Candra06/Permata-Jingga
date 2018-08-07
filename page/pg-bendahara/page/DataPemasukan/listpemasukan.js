import React from 'react';
import { Refpemasukan, Refriwayat, timeRef, Refkeuangan } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

export default class ListAgenda extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        tanggal:'',
        asaldana: '',
        jumlah: 0,
        keterangan:'-',
        saldoakhir:0,
        kunciuang:'',
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
    componentWillMount(){
          
        let tdy = new Date();
        let hari, bulan;
        let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
        if(tdy.getDate() >= 10){
            hari = tdy.getDate()
        }else{
            hari = "0"+tdy.getDate();
        }
        if((tdy.getMonth()+1) >= 10){
            bulan = (tdy.getMonth()+1)
        }else{
            bulan = "0"+(tdy.getMonth()+1);
        }
        let hariini = tdy.getFullYear()+"-"+bulan+"-"+hari;
        
        this.setState({
            tanggal: tdyi,
            hariini: hariini
        })

        Refkeuangan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
          
            snap.forEach(shot => {
                if(shot.val().norw === localStorage.getItem("koderw")){
                    this.setState({ saldoakhir: parseInt(shot.val().jumlah_saldo), kunciuang: shot.key});
                }
  
            });
          });
      }
    handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
      };
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2() {
          
    const { task } = this.props;
        this.setState({
            jumlah: task.jumlah_uang,
            tanggal: task.tanggal,
            keterangan: task.keterangan,
            asaldana: task.asaldana,
          modal2: !this.state.modal2
        });
      }

   editdata = () => {
    const {task} = this.props;

    if(this.state.asaldana === ""){
        toast.warn('Masukkan Asal Dana!!', {
            position: toast.POSITION.TOP_RIGHT,
          });
    }else if(this.state.jumlah === ""){
        toast.warn('Masukkan Jumlah Uang', {
            position: toast.POSITION.TOP_RIGHT,
          });
    }else if(this.state.jumlah <= 0){
        toast.warn('Jumlah Uang harus lebih dari 0!!', {
            position: toast.POSITION.TOP_RIGHT,
          });
    }else if(this.state.tanggal === ""){
        toast.warn('Pilih Tanggal', {
            position: toast.POSITION.TOP_RIGHT,
          });
    }else{
        
        let saldobaru = parseInt(this.state.saldoakhir) -  parseInt(task.jumlah_uang) + parseInt(this.state.jumlah);
        Refkeuangan.child(this.state.kunciuang).update({
            jumlah_saldo: parseInt(saldobaru)
        })
      let tdy = new Date();
      let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
      var bulan = ['bln','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
      var pecah = this.state.tanggal.split("-");
      var bulanchart = bulan[parseInt(pecah[1])]+"-"+pecah[0];
      Refriwayat.push({
          tipe: 'Edit-Pemasukan',
          tanggal: tdyi,
          ordertime: timeRef,
          teksriwayat: localStorage.getItem("nama")+" Mengubah pemasukan dari saldo pemasukan Rp "+  task.jumlah_uang + " Menjadi Rp "+ this.state.jumlah + " pada tanggal "+tdyi
      })

      Refpemasukan.child(task.key).update({
        asaldana: this.state.asaldana,
        tanggal: this.state.tanggal,
        keterangan: this.state.keterangan,
        datachart: bulanchart,
        jumlah_uang: this.state.jumlah
      })

  
        toast.success('Data Berhasil Di Update', {
        position: toast.POSITION.TOP_RIGHT,
      });
    this.toggle2();
     // window.location.reload();
    }

   }
    deleteTask(){
        const {task} = this.props;
        let jumlahawal = 0, kunci='';
        Refkeuangan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
            snap.forEach(shottt => {
                if(shottt.val().norw === localStorage.getItem("koderw")){
                    jumlahawal = shottt.val().jumlah_saldo;
                    kunci = shottt.key;
                }
            });
            
          });
            let saldobaru = parseInt(jumlahawal) -  parseInt(task.jumlah_uang);
            Refkeuangan.child(kunci).update({
                jumlah_saldo: parseInt(saldobaru)
            })
          let tdy = new Date();
          let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();

          Refriwayat.push({
              tipe: 'Hapus-Pemasukan',
              tanggal: tdyi,
              ordertime: timeRef,
              teksriwayat: localStorage.getItem("nama")+" Menghapus pemasukan dengan saldo sebesar Rp "+ task.jumlah_uang + " pada tanggal "+tdyi
          })

          Refpemasukan.child(task.key).remove();
          toast.success('Data Pemasukan Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
          });
          this.toggle();
      };
      
  render() {
 
    const { task } = this.props;
    let showbtn;
    if(task.tipemasuk === 'FormPemasukan'){
        showbtn = "block"
    }else{
        showbtn = "hide"
    }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama_pembuat}</td>
        <td><NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
        <td>{task.asaldana}</td>
        <td>{task.tanggal}</td>
        <td>{task.keterangan}</td>
        <td>
        <button className="btn btn-primary" id={showbtn} onClick={this.toggle2} style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}}><i className="fa fa-pencil" title="Edit Data"></i> </button>
            
        <button className="btn btn-danger" id={showbtn} onClick={this.toggle} style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}}><i className="fa fa-trash" title="Hapus Event"></i> </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                <p>Data Pemasukan dengan jumlah uang <NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /> Akan di Hapus!!!</p>
                <small>Data aktifitas Penghapusan tersimpan di dalam sistem</small>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                <Button color="danger" onClick={(e) => this.deleteTask()}>Konfirmasi</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame>
                <ModalHeader toggle={this.toggle2}>
                    Update Pemasukan
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                    <div className="card-body">
                            <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <label>Asal Dana<sup>*</sup></label>
                                <div className="input-group">
                                    <input type="text" placeholder="Masukkan Asal Dana" onChange={this.handleChange} name="asaldana" value={this.state.asaldana} className="form-control"/>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <label>Jumlah Uang<sup>*</sup></label>
                                <div className="input-group">
                                    <input type="number" min="1" placeholder="Masukkan Jumlah Uang" onChange={this.handleChange} name="jumlah" value={this.state.jumlah} className="form-control"/>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    <label>Tanggal Pemasukan<sup>*</sup></label>
                                    <div className="input-group">
                                        <input type="date" max={this.state.hariini} onChange={this.handleChange} name="tanggal" value={this.state.tanggal} className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    <label>Keterangan</label>
                                    <div className="input-group">
                                        <input type="text" placeholder="Masukkan Keterangan" onChange={this.handleChange} name="keterangan" value={this.state.keterangan} className="form-control"/>
                                    </div>
                                </div>
                            </div>
                    </div>

                        <div className="card-footer col-12">
                            <button type="submit" className="btn btn-primary" onClick={(e) => this.editdata()}>Update</button>
                            <span>  </span>
                            <button type="reset" className="btn btn-danger"  onClick={this.toggle2}>Batal</button>
                        </div>

                    </div>
                </div>
                </ModalBody>

                </Modal>

        </td>
    </tr>
    );
  }
}
