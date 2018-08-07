import React from 'react';
import {  Refriwayat, timeRef, Refkeuangan, Refpengeluaran } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

export default class Listpemasukan extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        tanggal:'',
        keperluan: '',
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
      const { task } = this.props;
        this.setState({[event.target.name]:event.target.value});
        if(event.target.name === "jumlah"){
          let q = parseInt(this.state.saldoakhir) + parseInt(task.jumlah_uang);
          if(parseInt(event.target.value) > parseInt(q)){
              toast.warn('Jumlah Uang Tidak Boleh Melebihi Saldo Saat Ini!!', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              this.setState({jumlah:this.state.saldoakhir});
          }else{
              this.setState({jumlah:event.target.value});
          }
      }
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
            keperluan: task.keperluan,
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
        
        let saldobaru = parseInt(this.state.saldoakhir) +  parseInt(task.jumlah_uang) - parseInt(this.state.jumlah);
        Refkeuangan.child(this.state.kunciuang).update({
            jumlah_saldo: parseInt(saldobaru)
        })
      let tdy = new Date();
      let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
      var bulan = ['bln','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
      var pecah = this.state.tanggal.split("-");
      var bulanchart = bulan[parseInt(pecah[1])]+"-"+pecah[0];
      Refriwayat.push({
          tipe: 'Edit-Pengeluaran',
          tanggal: tdyi,
          ordertime: timeRef,
          teksriwayat: localStorage.getItem("nama")+" Mengubah Pengeluaran dari saldo Pengeluaran Rp "+  task.jumlah_uang + " Menjadi Rp "+ this.state.jumlah + " pada tanggal "+tdyi
      })

      Refpengeluaran.child(task.key).update({
        keperluan: this.state.keperluan,
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
            let saldobaru = parseInt(jumlahawal) +  parseInt(task.jumlah_uang);
            Refkeuangan.child(kunci).update({
                jumlah_saldo: parseInt(saldobaru)
            })
          let tdy = new Date();
          let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();

          Refriwayat.push({
              tipe: 'Hapus-Pengeluaran',
              tanggal: tdyi,
              ordertime: timeRef,
              teksriwayat: localStorage.getItem("nama")+" Menghapus Pengeluaran dengan saldo sebesar Rp "+ task.jumlah_uang + " pada tanggal "+tdyi
          })

          Refpengeluaran.child(task.key).remove();
          toast.success('Data pengeluaran Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
          });
          this.toggle();
      };
      
  render() {
 
    const { task } = this.props;
    
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama_pembuat}</td>
        <td><NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
        <td>{task.keperluan}</td>
        <td>{task.tanggal}</td>
        <td>{task.keterangan}</td>
        <td>
        <Button color="primary" onClick={this.toggle2}><i className="fa fa-pencil" title="Edit Data"></i> </Button>
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
                                  <label>Keperluan<sup>*</sup></label>
                                  <div className="input-group">
                                    <input type="text" placeholder="Masukkan Keperluan" onChange={this.handleChange} name="keperluan" value={this.state.keperluan} className="form-control"/>
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
                                    <label>Tanggal Pengeluaran<sup>*</sup></label>
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
        <span>  </span>
        <Button color="danger" onClick={this.toggle}><i className="fa fa-trash" title="Hapus Event"></i> </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                <p>Data Pengeluaran dengan jumlah uang <NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /> Akan di Hapus!!!</p>
                <small>Data aktifitas Penghapusan tersimpan di dalam sistem</small>
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
