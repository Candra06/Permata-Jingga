import React from 'react';
import { RefKK,RefAgenda, rootRef, upRef, timeRef, RefNotif, Refpesertaiuran, RefBayarIuran, RefIuran, Refriwayat } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Workbook from 'react-excel-workbook';
import Listbln from "./../DataIuran/listitembulan";

export default class ListAgenda extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
      modal: false,
      modal2: false,
      modaledit: false,
      modalhapus: false,
        redirect:false,
        nama: '',
        bulaniuran: '',
        jumlah: '',
            cek: true,
            up:'',
           jumlahwarga:0, totalduit:0, jumlah_sudah_bayar:0, arraybayar:[], arraypilihanbulan:[]
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.modaledit = this.modaledit.bind(this);
      this.modalhapus = this.modalhapus.bind(this);
    }

    componentWillMount(){
      const {task} = this.props;
      Refpesertaiuran.orderByChild("kd_iuran").equalTo(task.kd_iuran).on('value', snap => {
        
        let no = 0, totaluang=0, sudahbayar=0, arraybayar=[];
        snap.forEach(shot => {
          if(shot.val().status_bayar === "Sudah Bayar"){
            sudahbayar++;
          }
          no++;

          RefBayarIuran.orderByChild("kd_peserta").equalTo(shot.val().kd_peserta).on('value', snap => {
        
          snap.forEach(databayar => {
            this.state.arraybayar.push({...databayar.val() , nama_keluarga:shot.val().nama_keluarga, alamat:shot.val().alamat});

            })
          })
        });
        
        totaluang = no * task.jumlah_iuran;
        this.setState({ jumlahwarga: no, totalduit: totaluang, jumlah_sudah_bayar: sudahbayar });
      });
      this.pilihbulan();
    }

    pilihbulan = () => {
      let tdy = new Date();
      let xtgl=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'], arraypilihanbulan=[];
     
      for (let i = 0; i < 12; i++) {
          let bln = xtgl[i]+"-"+tdy.getFullYear();
          RefIuran.orderByChild("databulan").equalTo(bln).on('value', snap => {
              let ttl=0;
              snap.forEach(datagrafik => {
                  ttl++;
              })
              if(ttl >= 1){

              }else{
                  arraypilihanbulan.push({bulan:bln})
              }
          })
      }
      //console.log(arraypilihanbulan)
      this.setState({
          arraypilihanbulan
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

      modaledit() {
        const {task} = this.props;
          this.setState({
            bulaniuran: task.databulan,
            jumlah: task.jumlah_iuran,
            modaledit: !this.state.modaledit
          });
        }
        modalhapus() {
          this.setState({
            modalhapus: !this.state.modalhapus
          });
        }

        handleChange = event => {
            this.setState({[event.target.name]:event.target.value});
        }

   
    deleteTask(){
        const {task} = this.props;
        Refpesertaiuran.orderByChild("kd_iuran").equalTo(task.kd_iuran).on('value', snap => {
        
          snap.forEach(shot => {
            Refpesertaiuran.child(shot.key).remove();
            })
          });

          
          let tdy = new Date();
          let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
          Refriwayat.push({
            tipe: 'Hapus-Iuran',
            tanggal: tdyi,
            ordertime: timeRef,
            teksriwayat: localStorage.getItem("nama")+" Menghapus Iuran pada tanggal "+tdyi
        })

        RefIuran.child(task.key).remove();
      };
     
      editdata = () => {
        const {task} = this.props;
    
        if(this.state.bulaniuran === ""){
          toast.warn('Pilih Bulan Iuran!!', {
              position: toast.POSITION.TOP_RIGHT,
            });
      }else if(this.state.jumlah === ""){
          toast.warn('Masukkan Jumlah Iuran', {
              position: toast.POSITION.TOP_RIGHT,
            });
      }else if(this.state.jumlah <= 0){
          toast.warn('Jumlah Iuran Harus Lebih Dari 0', {
              position: toast.POSITION.TOP_RIGHT,
            });
      }else{
         
          let tdy = new Date();
          let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
     
          Refriwayat.push({
              tipe: 'Edit-Iuran',
              tanggal: tdyi,
              ordertime: timeRef,
              teksriwayat: localStorage.getItem("nama")+" Mengubah Data Iuran, data sebelum di edit : jumlah iuran  Rp "+  task.jumlah_uang + " bulan iuran "+ task.databulan +" Menjadi Rp "+ this.state.jumlah + " dan bulan iuran "+ this.state.bulaniuran +" pada tanggal "+tdyi
          })
    
          RefIuran.child(task.key).update({
            databulan: this.state.bulaniuran,
            jumlah_iuran: this.state.jumlah,
          })
    
      
            toast.success('Data Berhasil Di Update', {
            position: toast.POSITION.TOP_RIGHT,
          });
        this.modaledit();
         // window.location.reload();
        }
    
       }
      keview = () => {
        const { task } = this.props;
        localStorage.setItem("kiuran", task.kd_iuran)
        this.setState({
          redirect: true
        })
      }

      
  render() {
    if(this.state.redirect){
    return (<Redirect to="/Bendahara/ViewPesertaIuran"/>)
    }
    const { task } = this.props;
    let tampiledit, tampilhapus;
    const { jumlahwarga, jumlah_sudah_bayar, totalduit, arraybayar, arraypilihanbulan } = this.state;
   // console.log(arraybayar)
   if(jumlah_sudah_bayar > 0){

   }else{
     tampiledit = (
      <button className="btn btn-primary" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}} onClick={this.modaledit} title="Edit Data"><i className="fa fa-pencil"></i> </button>
        
     )

     tampilhapus = (
      <button className="btn btn-danger" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}} onClick={this.modalhapus} title="Hapus Data"><i className="fa fa-trash"></i> </button>
        
     )
   }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.databulan}</td>
        <td><NumberFormat value={task.jumlah_iuran} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
        <td>{task.status_iuran}</td>
        <td>{jumlah_sudah_bayar} / {jumlahwarga}</td>
        <td><NumberFormat value={totalduit} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
        <td>
        <Workbook filename={'Pembayara Iuran '+task.databulan+'.xlsx'} element={<button style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}} className="btn btn-success" title="Export Pembayaran Iuran"><i className="fa fa-file-excel-o"></i> </button>}>
            <Workbook.Sheet data={arraybayar} name="Data Iuran">
              <Workbook.Column label="Nama" value="nama_keluarga"/>
              <Workbook.Column label="Jumlah Uang" value="jumlah_bayar"/>
              <Workbook.Column label="Tanggal" value="tgl_bayar"/>
              <Workbook.Column label="Alamat Rumah" value="alamat"/>
            </Workbook.Sheet>
        </Workbook>
        <button className="btn btn-primary" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}} onClick={this.keview} title="Daftar Warga"><i className="fa fa-users"></i> </button>
        {tampiledit}
        {tampilhapus}
        <Modal isOpen={this.state.modalhapus} toggle={this.modalhapus}>
            <ModalHeader toggle={this.modalhapus}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                <p>Data Master Iuran Bulan {task.databulan} Akan di Hapus!!!</p>
                <small>Data aktifitas Penghapusan tersimpan di dalam sistem</small>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.modalhapus}>Batal</Button>{' '}
                <Button color="danger" onClick={(e) => this.deleteTask()}>Konfirmasi</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modaledit} toggle={this.modaledit} frame>
                <ModalHeader toggle={this.modaledit}>
                    Update Iuran
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                    <div className="card-body">
                      <div className="row col-md-12">
                            <div className="col-md-12">
                              <div className="form-group col-md-12">
                                  <label>Bulan Iuran <sup>*</sup></label>
                                  <select className="form-control" style={{height: 2.5 + 'em'}} value={this.state.bulaniuran} onChange={this.handleChange} name="bulaniuran">
                                      <option value={this.state.bulaniuran}>{this.state.bulaniuran}</option>
                                      {arraypilihanbulan.map(task => (
                                          <Listbln key={task.key} task={task} />
                                      ))}
                                  </select>
                              </div>
                          </div>
                      <div className="col-md-12">
                        <div className="form-group col-md-12">
                            <label>Jumlah Iuran <sup>*</sup></label>
                            <div className="input-group">
                              <input type="number" placeholder="Jumlah Iuran" onChange={this.handleChange} value={this.state.jumlah} name="jumlah" className="form-control"/>
                            </div>
                        </div>
                      </div>
              
              </div>
                    </div>

                        <div className="card-footer col-12">
                            <button type="submit" className="btn btn-primary" onClick={(e) => this.editdata()}>Update</button>
                            <span>  </span>
                            <button type="reset" className="btn btn-danger"  onClick={this.modaledit}>Batal</button>
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
